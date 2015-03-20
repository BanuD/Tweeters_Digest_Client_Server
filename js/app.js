(function(angular){

  angular.module('app', ['auth0', 'angular-storage', 'angular-jwt', 'ng-token-auth', 'ui.router', 'ngCookies', 'ui.bootstrap'])
    .config(function (authProvider, $routeProvider, $httpProvider, jwtInterceptorProvider) {
      authProvider.init({
      domain: 'tweetersdigestrilke.auth0.com',
      clientID: '2QZm3SZfyqqZbIRDUwyXYjYID0qP9yf5'
      });
      jwtInterceptorProvider.tokenGetter = ['store', function(store) {
        // Return the saved token
        return store.get('token');
      }];

      $httpProvider.interceptors.push('jwtInterceptor');
    })
    .run(function($rootScope, auth, store, jwtHelper, $location) {
      $rootScope.$on('$locationChangeStart', function() {
        if (!auth.isAuthenticated) {
          var token = store.get('token');
          if (token) {
            if (!jwtHelper.isTokenExpired(token)) {
              auth.authenticate(store.get('profile'), token);
            } else {
              $location.path('/login');
            }
          }
        }

      });
    })


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



