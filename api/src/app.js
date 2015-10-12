import connect from 'connect';

import logger from './logger';
import server from './server';

connect()
  .use(logger)
  .use(server)
  .listen(3000);
