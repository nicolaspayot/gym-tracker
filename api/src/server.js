import _ from 'lodash';
import url from 'url';
import workout from './workout';

const urlRegex = /^\/workouts\/(\d+)/;

function buildJsonResponse(res, data) {
  const body = JSON.stringify(data);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}

export default function server(req, res, next) {

  if (req.method === 'GET') {
    if (req.url === '/workouts') {
      buildJsonResponse(res, workout.get());
      return;
    } else {
      const match = req.url.match(urlRegex);
      if (match) {
        const sessionId = Number(match[1]);
        const session = workout.get(sessionId);
        if (_.isObject(session)) {
          buildJsonResponse(res, workout.get(sessionId));
          return;
        }
      }
    }
  }

  res.statusCode = 404;
  next('Not Found');
}
