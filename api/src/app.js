import connect from 'connect';
import errorhandler from 'errorhandler';

import logger from './logger';
import server from './server';

connect()
  .use(logger)
  .use(server)
  .use(errorhandler())
  .listen(3000);
