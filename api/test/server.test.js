import test from 'tape';
import httpMocks from 'node-mocks-http';
import server from '../src/server';
import workout from '../src/workout';

function setup() {
  workout._sessions = [];
}

function mockGETRequest(url) {
  const req = httpMocks.createRequest({ method: 'GET', url });
  const res = httpMocks.createResponse();
  const next = function() {};
  server(req, res, next);

  return {
    statusCode: res._getStatusCode(),
    data: res._getData()
  };
}

test('server request with unknown route', function(t) {
  const { statusCode, data } = mockGETRequest('/unknown');
  t.equal(statusCode, 404, 'should return status code 404');
  t.end();
});

test('server workouts GET request with no param', function(t) {
  setup();
  workout._sessions = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];

  const { data } = mockGETRequest('/workouts');
  t.deepEqual(JSON.parse(data), workout._sessions, 'should return workout sessions list');
  t.end();
});

test('server workouts GET request with id param', function(t) {
  setup();
  workout._sessions = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];

  const { data } = mockGETRequest('/workouts/1');
  t.deepEqual(JSON.parse(data), workout._sessions[0], 'should return the specified workout session');
  t.end();
});

test('server workouts GET request with unknown id param', function(t) {
  setup();
  workout._sessions = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];

  const { statusCode, data } = mockGETRequest('/workouts/3');
  t.equal(statusCode, 404, 'should return status code 404');
  t.end();
});
