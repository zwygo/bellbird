bellbird.filter('timeago', function() {
  return function(input) {
    return moment(input).fromNow();
  };
})
