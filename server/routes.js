const express = require('express');

var router = express.Router();

router.get('/api', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message":"Hello from the custom server!"}');
});

module.exports = router;
