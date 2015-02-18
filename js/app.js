(function(angular){

  angular.module('app', ['ng-token-auth', 'ui.router', 'ngCookies']);

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
      .state('/', {
        url: '/',
        templateUrl: 'views/landing.html'
      })

      .state('stream', {
        url: "/stream",
        resolve: {
          tweets_container: function (TweetFactory) {
            return TweetFactory.fetchTweets().then(function(data){
              console.log('resolve', data)
              return data;
            }, function(error) {
              return 'Something';
            })
          }
        },
        templateUrl: "views/partials/stream.html",
        controller: "streamController",
        controllerAs: "stream"
      })
      .state('gatherings', {
        url: "/gatherings",
        resolve: {
          leaders: function (LeaderFactory) {
            return LeaderFactory.fetchLeaders().then(function(data){
              console.log('resolve', data)
              return data;
            }, function(error) {
              return 'Something';
            })
          },
          gatherings: function (GatheringsFactory) {
            return GatheringsFactory.fetchGatherings().then(function(data){
              console.log('resolve', data)
              return data;
            }, function(error) {
              return 'Something';
            })
          }
        },
        templateUrl: "views/partials/gatherings.html",
        controller: "gatheringsController",
        controllerAs: "gatherings",
      })
      // .state('state2.list', {
      //   url: "/list",
      //   templateUrl: "partials/state2.list.html",
      //   controller: function($scope) {
      //     $scope.things = ["A", "Set", "Of", "Things"];
      //   }
      // });
  });

})(angular)



