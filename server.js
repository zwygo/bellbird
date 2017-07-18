const express = require('express');
const app = express();

var db = require('./db/queries');

app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.get('/api/alarms', function(req, res, next) {
 db.getAllAlarms(req.query.greater).then(function (data) {
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
});

const http = require('http');
app.post('/api/alarms', function(req, res, next){
  db.createAlarm(req.body.alarm).then(function (data) {
    data.count = 0;
    data.id = parseInt(data.id);

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
});

app.post('/api/upvotes', function(req, res, next) {
  db.createUpvote(req.body.alarmID).then(function (data) {
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
});

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
