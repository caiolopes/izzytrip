const express = require('express');
const axios = require('axios');
// const _ = require('lodash');
const placesResJson = require('./places.json');

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

api.get('/it', (req, res) => {
  const data = {
    geocode: {
      displayString: 'Salvador, BA'
    },
    data:  [
      {
        title: 'Visita a brotas sensacional',
        time: '3 dias',
        description:
        'Lorem eius eos eaque molestias iure veniam reiciendis beatae Facere veniam provident repellendus repudiandae sequi. Inventore vero doloribus corporis omnis ab Quo eum quidem sint nulla quia. Corporis dolor quo.',
        budget: 'R$ 500,00',
        places: [
          {
            id: '4bbb5abc935e95218a102990',
            name: 'Farol da Barra /  Forte de Santo Antônio da Barra',
            contact: {
              phone: '+557132643296',
              formattedPhone: '+55 71 3264-3296'
            },
            location: {
              address: 'Av. Oceânica',
              lat: -13.010225,
              lng: -38.5327,
              labeledLatLngs: [
                { label: 'display', lat: -13.010225, lng: -38.5327 }
              ],
              postalCode: '40140-650',
              cc: 'BR',
              neighborhood: 'Barra',
              city: 'Salvador',
              state: 'BA',
              country: 'Brasil',
              formattedAddress: [
                'Av. Oceânica',
                'Salvador, BA',
                '40140-650',
                'Brasil'
              ]
            },
            categories: [
              {
                id: '4bf58dd8d48988d15d941735',
                name: 'Lighthouse',
                pluralName: 'Lighthouses',
                shortName: 'Lighthouse',
                icon: {
                  prefix:
                  'https://ss3.4sqi.net/img/categories_v2/parks_outdoors/lighthouse_',
                  suffix: '.png'
                },
                primary: true
              }
            ],
            verified: false,
            stats: { tipCount: 638, usersCount: 16773, checkinsCount: 30227 },
            url: 'http://www.museunauticodabahia.org.br',
            rating: 9.6,
            ratingColor: '00B551',
            ratingSignals: 3313,
            allowMenuUrlEdit: true,
            beenHere: { count: 0, marked: false, lastCheckinExpiredAt: 0 },
            hours: {
              status: 'Closed until 9:00 AM',
              richStatus: { entities: [], text: 'Closed until 9:00 AM' },
              isOpen: false,
              isLocalHoliday: false
            },
            photos: {
              count: 1,
              groups: [
                {
                  type: 'venue',
                  name: 'Venue photos',
                  count: 1,
                  items: [
                    {
                      id: '51290266e4b00ea5945891f6',
                      createdAt: 1361642086,
                      prefix: 'https://igx.4sqi.net/img/general/',
                      suffix:
                      '/43862422_MsZG1ifoBV2g3WizCRHALr9ucHIIf67WCmm_EozNlqQ.jpg',
                      width: 612,
                      height: 612,
                      user: {
                        id: '43862422',
                        firstName: 'Sidney',
                        lastName: 'Queiroz',
                        gender: 'male',
                        photo: {
                          prefix: 'https://igx.4sqi.net/img/user/',
                          suffix: '/QNU0Q4UDWRFLQA1D.jpg'
                        }
                      },
                      visibility: 'public'
                    }
                  ]
                }
              ]
            },
            hereNow: { count: 0, summary: 'Nobody here', groups: [] },
            featuredPhotos: {
              count: 1,
              items: [
                {
                  id: '51290266e4b00ea5945891f6',
                  createdAt: 1361642086,
                  prefix: 'https://igx.4sqi.net/img/general/',
                  suffix:
                  '/43862422_MsZG1ifoBV2g3WizCRHALr9ucHIIf67WCmm_EozNlqQ.jpg',
                  width: 612,
                  height: 612,
                  user: {
                    id: '43862422',
                    firstName: 'Sidney',
                    lastName: 'Queiroz',
                    gender: 'male',
                    photo: {
                      prefix: 'https://igx.4sqi.net/img/user/',
                      suffix: '/QNU0Q4UDWRFLQA1D.jpg'
                    }
                  },
                  visibility: 'public'
                }
              ]
            },
            image:
            'https://igx.4sqi.net/img/general/500x500/43862422_MsZG1ifoBV2g3WizCRHALr9ucHIIf67WCmm_EozNlqQ.jpg'
          }
        ],
        likes: 10
      }
    ]
  };

  res.send(data);
});

api.get('/places', async (req, res) => {
  const city = req.query.city;

  res.send(placesResJson);

  return;

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
