const express = require('express');
const axios = require('axios');

var api = express.Router();

const CLIENT_ID = process.env.FOURSQUARE_CLIENT_ID;
const CLIENT_SECRET = process.env.FOURSQUARE_CLIENT_SECRET;

var foursquareApi = axios.create({
  baseURL: 'https://api.foursquare.com/v2/',
  params: {
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    v: '20180323'
  }
});

api.get('/', (req, res) => {
  res.send({ message: 'Izzy Trip API' });
});

api.get('/test', async (req, res) => {
  const city = req.query.city;

  if (city) {
    try {
      const foursquareRes = await foursquareApi.get('/venues/explore', {
        params: {
          near: city,
          venuePhotos: 1
        }
      });

      res.send(foursquareRes.data);
    } catch (err) {
      // console.error(err);
      res.send('Error');
    }
  } else {
    res.send({ success: false, message: 'Missing city query string' });
  }
});

module.exports = api;
