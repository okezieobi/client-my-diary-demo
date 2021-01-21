import { config } from 'dotenv';

config();

export default {
  backendAPI(endpoint) {
    const url = process.env.NODE_ENV === 'production' ? `${process.env.REACT_APP_BACKEND_API}/api/v1/${endpoint}` : `api/v1/${endpoint}`;
    return url;
  },
};
