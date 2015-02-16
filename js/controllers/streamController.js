angular.module('app').controller('streamController', function() {
  var vm = this;
  var something = function(){
    return $http.get("http://localhost:3000/getTweets")
    .then(function(response){
      return response.data
      console.log(response)
    });
  }

  vm.getTweets = function(){
    something().then(function(data){
      vm.tweets = data
    })
  }
});








// angular.module('app').controller('streamController', function($scope, $auth, $http) {
//   var something = function(){
//     return $http.get("http://localhost:3000/getTweets")
//     .then(function(response){
//       return response.data
//       console.log(response)
//     });
//   }

//   $scope.getTweets = function(){
//     something().then(function(data){
//       $scope.tweets = data
//     })
//   }
// });
