import test from 'tape';
import httpMocks from 'node-mocks-http';
import server from '../src/server';
import workout from '../src/workout';

function setup() {
  workout._sessions = [];
}

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
