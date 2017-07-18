var bellbird = angular.module('bellbird', ['ui.router', 'ngAnimate']);

bellbird.config(function(
  $stateProvider,
  $urlRouterProvider,
  $locationProvider
) {

  $stateProvider

    .state('home', {
      name: 'home',
      url: '/?cat',
      templateUrl: '/html/home.html',
      controller: 'home'
    })

    .state('ace', {
      name: 'ace',
      url: '/ace',
      templateUrl: '/html/ace.html'
    })

    ;

    $locationProvider.html5Mode({enabled: true, requireBase: false});

});

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

bellbird.service('API', function($http) {

  function call(method, url, data) {
    return $http({method: method, url: '/api' + url, data: data});
  }

  return {
    call: call
  };

});

bellbird.directive('bbHeader', function() {
  return {
    restrict: 'E',
    templateUrl: '/html/bbHeader.html',
    controller: function($scope) {
      $scope.var = 'aces';
    }
  }
})
bellbird.filter('timeago', function() {
  return function(input) {
    return moment(input).fromNow();
  };
})
