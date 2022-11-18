const getGeneralSentiment = async (tweets: any[]) => {
  const series = tweets.reduce(
    (arr, curr) => {
      const s = curr.sentiment;
      s > 0 ? arr[0]++ : s < 0 ? arr[1]++ : arr[2]++;
      return arr;
    },
    [0, 0, 0],
  );
  return {
    id: 'General Sentiment',
    series,
    labels: ['Positive', 'Negative', 'Neutral'],
    type: 'pie',
  };
};

const getAccumulatedSentiment = async (tweets: any[]) => {
  const ocurrances = tweets.reduce((acc, curr) => {
    const s = curr.sentiment;
    acc[s] ? acc[s]++ : (acc[s] = 1), acc;
    return acc;
  }, {});
  const keys = Object.keys(ocurrances).sort().map(Number);
  const categories: string[] = [];
  const data: number[] = [];
  for (var i: number = Math.min(...keys); i <= Math.max(...keys); i++) {
    categories.push(i.toString());
    data.push(ocurrances[i] ? ocurrances[i] : 0);
  }
  return {
    id: 'Accumulated Sentiment',
    series: [{ name: 'Total amount', data }],
    categories,
    type: 'bar',
  };
};

export const getTweetCount = async (tweetCount: any) => {
  const data = tweetCount.data.map((count: any) => count.tweet_count);

  const categories = tweetCount.data.map((count: any) =>
    new Date(count.start).toLocaleDateString(),
  );

  return {
    id: 'Daily tweet count',
    series: [{ name: 'Total amount', data }],
    categories,
    type: 'bar',
  };
};

const getTotalTweetsMap = async (tweetsByState: any[]) => {
  var max = 0;
  const states = tweetsByState.reduce((acc, curr) => {
    const key = Object.keys(curr)[0];
    const count = curr[key].length;
    max = Math.max(max, count);
    acc[key] = { count };
    return acc;
  }, {});

  return {
    type: 'Heat',
    data: {
      title: 'Total tweets count per state',
      states,
      max,
      label: 'Tweets count',
    },
  };
};

const getGeneralSentimentMap = async (tweetsByState: any[]) => {
  var max = Number.MIN_VALUE;
  var min = Number.MAX_VALUE;

  const states = tweetsByState.reduce((acc, curr) => {
    const key = Object.keys(curr)[0];

    const sentiment = curr[key].reduce(
      (total: any, curr: any) =>
        total + (curr.sentiment > 0 ? 1 : curr.sentiment < 0 ? -1 : 0),
      0,
    );

    max = Math.max(max, sentiment);
    min = Math.min(min, sentiment);

    acc[key] = { sentiment };
    return acc;
  }, {});

  return {
    type: 'Comparison',
    data: {
      title: 'General sentiment per state',
      states,
      max,
      min,
      label: 'General sentiment',
    },
  };
};

const makeReport = async (
  allTweets: any[],
  tweetsByState: any[],
  tweetCount: any[],
) => {
  const promises = [
    getGeneralSentiment(allTweets),
    getAccumulatedSentiment(allTweets),
    getTweetCount(tweetCount),
    getTotalTweetsMap(tweetsByState),
    getGeneralSentimentMap(tweetsByState),
  ];

  const [
    generalSentiment,
    accumulatedSentiment,
    tweetsCount,
    totalTweets,
    generalSentiments,
  ] = await Promise.all(promises);

  return {
    charts: {
      generalSentiment,
      accumulatedSentiment,
      tweetsCount,
      // TODO: Add more functions per chart or statistic
    },
    statistics: {
      // TODO: Add useful statistics
      total: allTweets.length,
    },
    maps: {
      // TODO: Add useful maps
      totalTweets,
      generalSentiments,
    },
    tweets: allTweets.slice(0, Math.min(allTweets.length, 10)),
  };
};

export default makeReport;
