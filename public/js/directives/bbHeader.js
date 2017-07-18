bellbird.directive('bbHeader', function() {
  return {
    restrict: 'E',
    templateUrl: '/html/bbHeader.html',
    controller: function($scope) {
      $scope.var = 'aces';
    }
  }
})