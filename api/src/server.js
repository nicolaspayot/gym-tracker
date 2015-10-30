import workout from './workout';

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
      const sessions = workout.get();
      const body = JSON.stringify(sessions);
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Length', Buffer.byteLength(body));
      res.end(body);
      return;
    }
  }

  res.statusCode = 404;
  const errorMsg = '404 Not Found';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(errorMsg));
  res.end(errorMsg);
}
