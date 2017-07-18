bellbird.service('API', function($http) {

  function call(method, url, data) {
    return $http({method: method, url: '/api' + url, data: data});
  }

  return {
    call: call
  };

});
