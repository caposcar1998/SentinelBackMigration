import {
  collectionGroup,
  getDocs,
  query,
  where,
} from 'firebase/firestore/lite';

import { firestore } from '../../config/firebase';

interface Subscription {
  id: string;
  user: string;
  config: any;
  query: any;
}

const isPending = (
  periodicy: 'weekly' | 'monthly' | 'daily',
  startDate: Date,
): Boolean => {
  if (periodicy == 'daily') return true;

  const today = new Date();

  return periodicy == 'weekly'
    ? startDate.getDay() == today.getDay()
    : startDate.getDate() == today.getDate();
};

const getPendingSubscriptions = async (): Promise<Subscription[]> => {
  const conditions = [
    where('config.isActive', '==', true),
    where(
      'config.startDate',
      '<=',
      new Date(new Date().setHours(23, 59, 59, 999)),
    ),
  ];

  const validSubsQuery = query(
    collectionGroup(firestore, 'subscriptions'),
    ...conditions,
  );

  const querySnapshot = await getDocs(validSubsQuery).catch((error) => {
    console.log(error.message);
  });

  if (!querySnapshot) return [];

  const pendingSubs = querySnapshot.docs
    .map((subscription) => {
      return {
        id: subscription.id,
        user: subscription.ref.parent.parent!!.id,
        config: subscription.get('config'),
        query: subscription.get('query'),
      };
    })

    .filter((subscription) =>
      isPending(
        subscription.config.periodicy,
        subscription.config.startDate.toDate(),
      ),
    );

  return pendingSubs;
};

export default getPendingSubscriptions;
