import dotenv from 'dotenv'
dotenv.config()

const baseUrl = process.env.REACT_APP_REST_API_URL;
const mlUrl = process.env.ML_URL;
const baseHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const iosHeaders = {
  'Cache-Control': 'no-cache'
}

export { baseUrl, baseHeaders, iosHeaders };
