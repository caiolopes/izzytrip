import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://izzytrip.herokuapp.com/api/";

export async function getPlaces(city) {
  try {
    const response = await axios.get(`/places?city=${encodeURIComponent(city)}`);

    return response.data;
  } catch (err) {
    console.error(err)
  }
}

export async function createItinerary(it) {
  try {
    const response = await axios.post(`/it`, it);

    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getIt(city) {
  try {
    const response = await axios.get(`/it?city=${encodeURIComponent(city)}`);
    return response.data;
  } catch (err) {
    console.err(err);
  }
}
