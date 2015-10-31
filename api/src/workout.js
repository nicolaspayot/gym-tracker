import _ from 'lodash';

class Workout {
  constructor() {
    this._sessions = [];
  }

  get(id) {
    if (_.isUndefined(id)) {
      return this._sessions;
    } else {
      return _.find(this._sessions, { id }) || {};
    }
  }

  save(session) {
    const id = session.id;
    if (_.isUndefined(id)) {
      session.id = this._sessions.length + 1;
      this._sessions.push(session);
    } else {
      const index = _.findIndex(this._sessions, { id });
      this._sessions.splice(index, 1, session);
    }
    return session;
  }

  delete(id) {
    const session = _.find(this._sessions, { id });
    this._sessions = _.without(this._sessions, session);
  }
}

export default new Workout();
