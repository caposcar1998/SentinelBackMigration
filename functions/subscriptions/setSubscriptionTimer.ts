import { auth } from '../../config/firebase';
import SERVER from '../../config/server';
import makeSubscriptionReport from './makeSubscriptionReport';
import getPendingSubscriptions from './getPendingSubscriptions';

const makePendingReports = async () => {
  const pendingSubs = await getPendingSubscriptions();

  pendingSubs.forEach((subscription) => {
    makeSubscriptionReport(subscription);
  });

  console.log('Generated all pending subscription reports...');
};

const setSubscriptionTimer = async () => {
  if (SERVER.env.trim() === 'production') {
    await auth();

    await makePendingReports();
    setInterval(async () => {
      const hour = new Date().getHours();
      if (hour == 2) await makePendingReports();
    }, SERVER.timer);
  }
};

export default setSubscriptionTimer;
