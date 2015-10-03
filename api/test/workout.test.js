import test from 'tape';
import request from 'supertest';
import workout from '../src/workout';

test('workout GET request', function(t) {
  const expected = 'Hello, World!';
  request(workout)
    .get('/hello')
    .expect(200)
    .expect('Content-Type', 'text/plain')
    .end((err, res) => {
      t.equal(res.text, expected, `should return ${expected} as text result`);
      t.error(err);
      t.end();
    });
});
