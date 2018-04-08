require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

// middlewares
app.use(cors());
app.use(bodyParser.json());

// routes
app.get('/', (req, res) => {
  res.send('IzzyTrip API');
});

/**
 * Error Handler middleware
 */
app.use(function(err, req, res, next) {
  if (err.status && err.message) {
    res.status(err.status).send({ message: err.message });
  } else if (err.status) {
    res.sendStatus(err.status);
  } else {
    res.sendStatus(500);
  }
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = app;
