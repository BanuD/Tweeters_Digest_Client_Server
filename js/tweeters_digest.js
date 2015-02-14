var TweetersDigest = angular.module('TweetersDigest', ['ng-token-auth']);

TweetersDigest.config(function($authProvider) {
  $authProvider.configure({
    apiUrl: 'http://localhost:3000',
    authProviderPaths: {
      twitter: '/auth/twitter'
    }
  });
});

TweetersDigest.controller('loginController', function($scope, $http, $auth){
  $scope.handleBtnClick = function() {
      $auth.authenticate('twitter')
        .then(function(resp) {
          console.log("success!!")
        })
        .catch(function(resp) {
          console.log("failure!!  :( ")
        });
  };

  $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };
})


