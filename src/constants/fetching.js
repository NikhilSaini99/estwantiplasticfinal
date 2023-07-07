import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;
import { API_HOST } from './server';

const fetching = async (method, path, databody) => {
  const options = {
    method,
    url: `${API_HOST}${path}`,
    data: databody,
  };

  try {
    const response = await axios(options);
    return response;
  } catch (err) {
    return err;
  }
};

export default fetching;
