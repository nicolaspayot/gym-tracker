import test from 'tape';
import httpMocks from 'node-mocks-http';
import server from '../src/server';

test('server request', function(t) {
  const req = httpMocks.createRequest();
  const res = httpMocks.createResponse();
  server(req, res);

  const body = res._getData();
  t.equal(body, 'Hello, World!', 'should return "Hello, World!"');
  t.end();
});
