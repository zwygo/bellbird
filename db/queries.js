var promise = require('bluebird');

var pgp = require('pg-promise')({promiseLib: promise});
var db = pgp('postgres://localhost:5432/bellbird');

module.exports = {
  getAllAlarms: getAllAlarms,
  createAlarm: createAlarm,
  createUpvote: createUpvote
};

function createUpvote(alarmID) {
  return db.none('INSERT INTO upvotes(alarm_id) VALUES ($1)', [alarmID]);
}

function getAllAlarms(greater) {
  var query = 'SELECT a.id, a.created_at, a.alarm, count(u.alarm_id) '
    + 'FROM alarms a '
    + 'LEFT OUTER JOIN upvotes u '
    + 'ON a.id = u.alarm_id ';
  if (greater) {
    query += 'WHERE a.id > ' + greater + ' ';
  }
  query += 'GROUP BY a.id '
    + 'ORDER BY a.created_at DESC;';
  return db.any(query);
}

function createAlarm(alarm) {
  return db.one(
    'INSERT INTO alarms(alarm) VALUES ($1) RETURNING id, created_at, alarm',
    [alarm]
  );
}
