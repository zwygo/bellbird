bellbird.controller('home', function(
  $element,
  $interval,
  $scope,
  $timeout,
  API
) {

  $scope.loading = true;
  API.call('GET', '/alarms').then(function(data) {
    console.log('success', data.data);
    $scope.alarms = data.data.data;
    $timeout(function() {$scope.loading = false;}, 1000);
  }).catch(function(err) {
    console.log('error', err);
    $scope.loading = false;
  });

  $scope.newAlarm = {alarm: ''};

  $scope.soundAlarm = function() {
    var alarm = $scope.newAlarm.alarm.toUpperCase();
    if (!alarm) {
      return;
    }
    console.log(alarm);
    $scope.newAlarm = {alarm: ''};
    var body = {alarm: alarm};
    API.call('POST', '/alarms', body).then(function(data) {
      $scope.alarms.unshift(data.data.data);
    }).catch(function(err) {
      console.log('error', err);
    });
  };

  $scope.upvote = function(alarm) {
    alarm.count++;
    API.call('POST', '/upvotes', {alarmID: alarm.id});
  };

  // poll requests to retrieve new alarms
  $interval(function() {
    API.call('GET', '/alarms?greater=' + $scope.alarms[0].id).then(
      function(newAlarms) {
        if (newAlarms.data.data.length > 0) {
          $scope.alarms = newAlarms.data.data.concat($scope.alarms);
        }
      }
    );
  }, 3000);

});
