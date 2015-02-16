(function(angular){

  angular.module('app', ['ng-token-auth', 'components', 'ui.router']);

  angular.module('app').config(function($authProvider) {
    $authProvider.configure({
      apiUrl: 'http://localhost:3000',
      authProviderPaths: {
        twitter: '/auth/twitter'
      }
    });
  });

  angular.module('app').config(function($stateProvider, $urlRouterProvider) {
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('stream', {
        url: "/stream",
        templateUrl: "views/partials/stream.html"
      })
      // .state('state1.list', {
      //   url: "/list",
      //   templateUrl: "partials/state1.list.html",
      //   controller: function($scope) {
      //     $scope.items = ["A", "List", "Of", "Items"];
      //   }
      // })
      .state('collectors', {
        url: "/collectors",
        templateUrl: "views/partials/collectors.html"
      })
      // .state('state2.list', {
      //   url: "/list",
      //   templateUrl: "partials/state2.list.html",
      //   controller: function($scope) {
      //     $scope.things = ["A", "Set", "Of", "Things"];
      //   }
      // });
  });

  angular.module('app').controller('loginController', function($scope, $http, $auth){
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

  angular.module('app').controller('IndexCtrl', function($scope, $auth) {
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




})(angular)



