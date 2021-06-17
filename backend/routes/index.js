// backend/routes/index.js
// External Imports
const express = require('express');
const router = express.Router();

// Internal Imports
const apiRouter = require('./api');

// Use the api routes
router.use('/api', apiRouter);

router.get('/hello/world', function(req, res) {
  res.cookie('XSRF-TOKEN', req.csrfToken());
  res.send('Hello World!');
});

module.exports = router;
