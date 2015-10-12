export default function server(req, res) {
  const body = 'Hello, World!';
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Length', Buffer.byteLength(body));
  res.end(body);
}
