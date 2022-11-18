import cors from 'cors';
import express from 'express';
import path from 'path';

import SERVER from './config/server';
import reportsRouter from './routers/reports';
import setSubscriptionTimer from './functions/subscriptions/setSubscriptionTimer';

const app = express();
const port = SERVER.port;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static('../client/build'));

// Reports router
app.use('/reports', reportsRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});

setSubscriptionTimer();
