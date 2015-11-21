export default function faviconInterceptor(req, res, next) {
  // short-circuit annoying favicon requests (https://gist.github.com/kentbrew/763822)
  if (req.url === '/favicon.ico') {
    res.setHeader('Content-Type', 'image/x-icon');
    res.end();
    return;
  }
  next();
}
