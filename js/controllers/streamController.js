angular.module('app').controller('streamController', ["$http", 'TweetFactory', 'tweets_container', '$cookieStore', function($http, TweetFactory, tweets_container, $cookieStore) {
  var vm = this;

  console.log("CURRENT_USER", $cookieStore.get('current_user'))
  vm.tweets_container = tweets_container;
}])

.factory('TweetFactory', ['$http', '$q', '$cookieStore', function ($http, $q, $cookieStore) {
  function fetchTweets () {
    var d = $q.defer();
    var url = "http://localhost:3000/users/" + auth.profile.id + "/tweets"
    console.log('The url is:', url)
    $http.get(url)
    .success(function(response){
      d.resolve(response);
    }).error(function (error) {
      d.reject(error)
    });
    return d.promise;
  };

  return {
    fetchTweets: fetchTweets
  }
}]);

