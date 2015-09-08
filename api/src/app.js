var connect = require('connect');

var logger = require('./logger');
var workout = require('./workout');

connect()
  .use(logger)
  .use(workout)
  .listen(3000);
