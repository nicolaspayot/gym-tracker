var http = require('http');

function workout(req, res) {
  var body = 'Hello, World!';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}

module.exports = function() {
  return http.createServer(workout);
}
