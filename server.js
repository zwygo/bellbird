const express = require('express');
const app = express();

var db = require('./db/queries');

app.use(express.static(__dirname + '/public'));

const bodyParser = require('body-parser')
app.use(bodyParser.json());

app.use('/api', function(req, res, next) {
  console.log(req.headers);
  if (req.headers['x-token']) {
    next();
    return;
  }

  next();
  // res.sendStatus(401);
});

app.get('/api/alarms', db.getAllAlarms);

app.post('/api/alarms', db.createAlarm);

app.post('/api/upvotes', db.createUpvote);

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
  console.log('App listening on port 3000!');
});
