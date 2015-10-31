import test from 'tape';
import httpMocks from 'node-mocks-http';
import server from '../src/server';
import workout from '../src/workout';

function setup() {
  workout._sessions = [];
}

test('server request with unknown route', function(t) {
  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/unknown'
  });
  const res = httpMocks.createResponse();
  server(req, res);

  const statusCode = res._getStatusCode();
  const body = res._getData();
  t.equal(statusCode, 404);
  t.equal(body, '404 Not Found', 'should return error 404');
  t.end();
});

test('server workouts GET request with no param', function(t) {
  setup();

  workout._sessions = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];

  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/workouts'
  });
  const res = httpMocks.createResponse();
  server(req, res);

  const body = res._getData();
  t.deepEqual(JSON.parse(body), workout._sessions, 'should return workout sessions list');
  t.end();
});

test('server workouts GET request with id param', function(t) {
  setup();

  workout._sessions = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];

  const req = httpMocks.createRequest({
    method: 'GET',
    url: '/workouts/1'
  });
  const res = httpMocks.createResponse();
  server(req, res);

  const body = res._getData();
  t.deepEqual(JSON.parse(body), workout._sessions[0], 'should return the specified workout session');
  t.end();
});
