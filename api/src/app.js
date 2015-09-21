import connect from 'connect';

import logger from './logger';
import workout from './workout';

connect()
  .use(logger)
  .use(workout)
  .listen(3000);
