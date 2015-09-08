module.exports = function(req, res) {
  var body = 'Hello, World!';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}
