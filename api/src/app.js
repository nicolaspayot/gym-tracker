const connect = require('connect');

import { logger } from './logger';
import { workout } from './workout';

connect()
  .use(logger)
  .use(workout)
  .listen(3000);
