import dotenv from 'dotenv';

dotenv.config();

const TWITTER_APP_API_KEY = process.env.TWITTER_APP_API_KEY || '';
const TWITTER_APP_API_SECRET = process.env.TWITTER_APP_API_SECRET || '';
const TWITTER_ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN_KEY || '';
const TWITTER_ACCESS_TOKEN_SECRET =
  process.env.TWITTER_ACCESS_TOKEN_SECRET || '';

const TWITTER = {
  consumer_key: TWITTER_APP_API_KEY,
  consumer_secret: TWITTER_APP_API_SECRET,
  access_token_key: TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET,
};

export default TWITTER;
