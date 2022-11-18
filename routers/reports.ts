import { Request, Response, Router } from 'express';
import { query, validationResult } from 'express-validator';

import fetchData from '../functions/reports/fetchData';
import makeReport from '../functions/reports/makeReport';

const router = Router();

router.get(
  '/search',
  query('topic').isString(),
  query('until').isISO8601().toDate(),
  query('location').isString().isLength({ min: 3 }),
  async (req: Request, res: Response) => {
    console.log(req.query.location)
    console.log(req.query.until)
    console.log(req.query.topic)
    if (!validationResult(req).isEmpty()) {
      return res.status(400).json({ msg: 'Invalid request data' });
    }
    
    const { topic, until, location } = req.query;
    const [allTweets, tweetsByState, tweetCount, trends] = await fetchData(
      topic as string,
      new Date(until as string),
      location as string,
    );

    return res.status(200).json({
      report: {
        query: {
          topic,
          location,
          until,
          created_at: new Date().toISOString(),
        },
        ...(await makeReport(allTweets, tweetsByState, tweetCount)),
        trends,
      },
    });
  },
);

export default router;
