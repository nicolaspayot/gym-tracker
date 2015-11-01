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

function handleError404(res) {
  res.statusCode = 404;
  const errorMsg = '404 Not Found';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(errorMsg));
  res.end(errorMsg);
}

export default function server(req, res) {

  // short-circuit annoying favicon requests (https://gist.github.com/kentbrew/763822)
  if (req.url === '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon');
    res.end();
    return;
  }

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

  handleError404(res);
}
