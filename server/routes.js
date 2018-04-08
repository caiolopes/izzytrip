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

String.prototype.levenstein = function(string) {
  var a = this,
    b = string + '',
    m = [],
    i,
    j,
    min = Math.min;

  if (!(a && b)) return (b || a).length;

  for (i = 0; i <= b.length; m[i] = [i++]);
  for (j = 0; j <= a.length; m[0][j] = j++);

  for (i = 1; i <= b.length; i++) {
    for (j = 1; j <= a.length; j++) {
      m[i][j] =
        b.charAt(i - 1) === a.charAt(j - 1)
          ? m[i - 1][j - 1]
          : (m[i][j] = min(
              m[i - 1][j - 1] + 1,
              min(m[i][j - 1] + 1, m[i - 1][j])
            ));
    }
  }

  return m[b.length][a.length];
};

api.get('/', (req, res) => {
  res.send({ message: 'Izzy Trip API' });
});

api.get('/clear', (req, res) => {
  fs.writeFile(itFile, '{}', 'utf8', () => {
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
      obj.data.push(req.body); // add some data
      const json = JSON.stringify(obj); // convert it back to json
      fs.writeFile(itFile, json, 'utf8', () => {
        res.send({ sucess: true });
      });
    }
  });
});

api.get('/it', (req, res) => {
  const city = req.query.city || '';

  if (city) {
    fs.readFile(itFile, 'utf8', function readFileCallback(err, data) {
      if (err) {
        console.log(err);
        res.send({ sucess: false });
      } else {
        const its = JSON.parse(data);

        const response = its.data.filter(it => {
          if (it.geocode.where.levenstein(city.toLowerCase()) <= 2) {
            return it;
          }
        });

        res.send({ data: response });
      }
    });
  } else {
    res.send({ success: false, message: 'Missing city query string' });
  }
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
