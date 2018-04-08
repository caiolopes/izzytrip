import axios from 'axios';

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 'http://izzytrip.herokuapp.com/api/';

export async function getPlaces(city) {
  try {
    const response = await axios.get('/places');

    return response.data;
  } catch (err) {
    console.error(err)
  }
}
