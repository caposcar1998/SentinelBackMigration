import { addDoc, collection } from 'firebase/firestore/lite';

import { firestore } from '../../config/firebase';
import fetchData from '../reports/fetchData';
import makeReport from '../reports/makeReport';

const saveSubscriptionReport = async (
  userId: string,
  subscriptionId: string,
  report: any,
) => {
  await addDoc(
    collection(
      firestore,
      `reports/${userId}/subscriptions/${subscriptionId}/reports`,
    ),
    report,
  );
};

const makeSubscriptionReport = async (subscription: any) => {
  const { topic, location } = subscription.query;
  const until = new Date();

  const [allTweets, tweetsByState, tweetCount, trends] = await fetchData(
    topic,
    until,
    location,
  );

  const report = {
    query: {
      topic,
      location,
      until,
      created_at: until.toISOString(),
    },
    ...(await makeReport(allTweets, tweetsByState, tweetCount)),
    trends,
  };

  saveSubscriptionReport(subscription.user, subscription.id, report);
};

export default makeSubscriptionReport;
