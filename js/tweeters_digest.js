(function(angular){

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
  });

  TweetersDigest.controller('IndexCtrl', function($scope, $auth) {
    $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          console.log("logout successful!!")
        })
        .catch(function(resp) {
          console.log("logout failure!!  :( ")
        });
    };
  });

  TweetersDigest.controller('GetTweets', function($scope, $auth, $http) {
    var something = function(){
      return $http.get("http://localhost:3000/getTweets")
      .then(function(response){
        return response.data
        console.log(response)
      });
    }

    $scope.getTweets = function(){
      something().then(function(data){
        debugger;
        $scope.tweets = data
      })
    }
  });

})(angular)



