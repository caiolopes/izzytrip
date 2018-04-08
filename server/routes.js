const fs = require('fs');
const path = require('path');
const express = require('express');
const axios = require('axios');
// const _ = require('lodash');

const itFile = path.join(__dirname, '/itineraries.json');
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

api.get('/clear', (req, res) => {
  fs.writeFile(itFile, '[]', 'utf8', () => {
    res.send({ sucess: true });
  });
});

api.post('/it', (req, res) => {
  fs.readFile(itFile, 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
      res.send({ sucess: false });
    } else {
      const obj = JSON.parse(data); // now it an object
      obj.push(req.body); // add some data
      const json = JSON.stringify(obj); // convert it back to json
      fs.writeFile(itFile, json, 'utf8', () => {
        res.send({ sucess: true });
      });
    }
  });
});

api.get('/it', (req, res) => {
  fs.readFile(itFile, 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
      res.send({ sucess: false });
    } else {
      const obj = JSON.parse(data);
      res.send(obj);
    }
  });
});

api.get('/places', async (req, res) => {
  const city = req.query.city;

  if (city) {
    try {
      const foursquareRes = await foursquareApi.get('/venues/explore', {
        params: {
          near: city,
          venuePhotos: 1
        }
      });

      const data = foursquareRes.data.response;

      if (data.groups.length > 0) {
        const places = data.groups[0].items
          .map(item => {
            return item.venue;
          })
          .map(place => {
            if (place.featuredPhotos.items.length > 0) {
              const photo = place.featuredPhotos.items[0];
              return {
                ...place,
                image: photo.prefix + '500x500' + photo.suffix
              };
            } else {
              return place;
            }
          });

        const customData = {
          geocode: data.geocode,
          data: places
        };

        res.send(customData);
      } else {
        res.send('Empty');
      }
    } catch (err) {
      console.log(err);
      res.send('Error');
    }
  } else {
    res.send({ success: false, message: 'Missing city query string' });
  }
});

module.exports = api;
