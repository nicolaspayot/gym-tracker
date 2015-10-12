import test from 'tape';
import Workout from '../src/workout';

test('Workout get method with no param', function(t) {
  const workout = new Workout();
  const expected = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];
  workout._sessions = expected;
  const sessions = workout.get();
  t.deepEqual(sessions, expected, 'should get the list of workout sessions');
  t.end();
});

test('Workout get method with id param', function(t) {
  const workout = new Workout();
  const sessions = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];
  workout._sessions = sessions;
  const session = workout.get(1);
  t.deepEqual(session, sessions[0], 'should get the specified workout session');
  t.end();
});

test('Workout save method with new workout session', function(t) {
  const workout = new Workout();
  const expected = { id: 1, name: 'workout session 1' };
  const newItem = workout.save({ name: 'workout session 1' });
  t.deepEqual(workout._sessions[0], expected, 'should add a workout session');
  t.deepEqual(newItem, expected, 'should return added workout session');
  t.end();
});

test('Workout save method with existing workout session', function(t) {
  const workout = new Workout();
  const sessions = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];
  workout._sessions = sessions;
  const expected = { id: 1, name: 'updated workout session 1' };
  const updatedItem = workout.save({ id: 1, name: 'updated workout session 1' });
  t.deepEqual(workout._sessions[0], expected, 'should update a workout session');
  t.deepEqual(updatedItem, expected, 'should return updated workout session');
  t.end();
});

test('Workout delete method with id param', function(t) {
  const workout = new Workout();
  const sessions = [
    { id: 1, name: 'workout session 1'},
    { id: 2, name: 'workout session 2'}
  ];
  workout._sessions = sessions;
  workout.delete(2);
  t.deepEqual(workout._sessions, [sessions[0]], 'should remove the specified workout session');
  t.end();
});
