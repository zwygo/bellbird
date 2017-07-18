var promise = require('bluebird');

var pgp = require('pg-promise')({promiseLib: promise});
var db = pgp('postgres://localhost:5432/bellbird');

// add query functions

module.exports = {
  getAllAlarms: getAllAlarms,
  createAlarm: createAlarm,
  createUpvote: createUpvote
};

function createUpvote(req, res, next) {
  db.none('INSERT INTO upvotes(alarm_id) VALUES ($1)', [req.body.alarmID])
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Created upvote'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getAllAlarms(req, res, next) {
  db.any('SELECT a.id, a.created_at, a.alarm, count(u.alarm_id) '
    + 'FROM alarms a '
    + 'LEFT OUTER JOIN upvotes u '
    + 'ON a.id = u.alarm_id GROUP BY a.id '
    + 'ORDER BY a.created_at DESC;'
  )
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all alarms'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

const http = require('http');
function createAlarm(req, res, next) {
  db.none('INSERT INTO alarms(alarm) VALUES ($1)', [req.body.alarm])
    .then(function (data) {

      // alarm was successfully created, push notification to phones
      var options = {
        hostname: 'handshake-bellbird.herokuapp.com',
        path: '/push',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      };
      console.log('going to make request');
      var notification = http.request(options, function(res, r, r2) {
        console.log(res.statusCode, res.headers);
      });
      notification.write('{"alarm_id": 12}');
      notification.end();


      console.log('sending response');
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Created alarm'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
