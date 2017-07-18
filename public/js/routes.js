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
