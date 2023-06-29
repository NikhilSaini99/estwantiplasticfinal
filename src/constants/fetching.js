import axios from 'axios';
const baseURL = process.env.NEXT_PUBLIC_API_URL;

const fetching = async (method, path, databody) => {
  const options = {
    method,
    url: `${baseURL}${path}`,
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
