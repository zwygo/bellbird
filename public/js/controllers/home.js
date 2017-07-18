bellbird.controller('home', function($scope, $stateParams, $timeout, API) {

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
      console.log('success', data.data);
    }).catch(function(err) {
      console.log('error', err);
    });
  };

  $scope.upvote = function(alarm) {
    alarm.count++;
    API.call('POST', '/upvotes', {alarmID: alarm.id});
  };

});
