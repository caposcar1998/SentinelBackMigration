import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;
const TIMER = process.env.TIMER || 900000;
const ENV = process.env.NODE_ENV || 'development';

const SERVER = {
  port: PORT,
  timer: TIMER as number,
  env: ENV,
};

export default SERVER;
