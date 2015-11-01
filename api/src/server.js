import url from 'url';
import workout from './workout';

const urlRegex = /^\/workouts\/(\d+)/;

function buildJsonResponse(res, body) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}

export default function server(req, res) {

  // short-circuit annoying favicon requests (https://gist.github.com/kentbrew/763822)
  if (req.url === '/favicon.ico') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'image/x-icon');
    res.end();
    return;
  }

  if (req.method === 'GET') {
    if (req.url === '/workouts') {
      const body = JSON.stringify(workout.get());
      buildJsonResponse(res, body);
      return;
    } else {
      const match = req.url.match(urlRegex);
      if (match) {
        const sessionId = Number(match[1]);
        const body = JSON.stringify(workout.get(sessionId));
        buildJsonResponse(res, body);
        return;
      }
    }
  }

  res.statusCode = 404;
  const errorMsg = '404 Not Found';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(errorMsg));
  res.end(errorMsg);
}
