import connect from 'connect';
import errorhandler from 'errorhandler';

import faviconInterceptor from './favicon-interceptor';
import logger from './logger';
import server from './server';

connect()
  .use(logger)
  .use(faviconInterceptor)
  .use(server)
  .use(errorhandler())
  .listen(3000);
