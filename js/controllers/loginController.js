angular.module('app').controller('loginController', function($scope, $rootScope, $http, $auth, $state){
  $scope.handleBtnClick = function() {
    $auth.authenticate('twitter')
      .then(function(resp) {
        $rootScope.current_user = resp; //adds current_user to the rootScope which is available everywhere that you pass it into
        console.log("success!!")
        $state.go('stream')
      })
      .catch(function(resp) {
        console.log("failure!!  :( ")
      });
  };

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
