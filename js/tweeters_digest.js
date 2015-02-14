angular.module('TweetersDigest', ['satellizer', 'ngRoute'])
  .config(function($authProvider) {

    $authProvider.twitter({
      url: 'http://localhost:3000/auth/twitter'
    });

  });

angular.module('TweetersDigest')
  .controller('LoginCtrl', function($scope, $auth) {
    console.log('hi')
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };
  });
