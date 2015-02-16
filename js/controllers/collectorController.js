angular.module('app').controller('CollectorController', ["$http", 'leaders',  function($http, leaders) {
  var vm = this;
  vm.leaders = leaders

  vm.collectors = [];
  vm.addCollector = function() {
    $http.post("http://localhost:3000/collectors", {
      params: { leader: vm.leader, query: vm.query }
    })
    .then(function(data){
      vm.collectors.push(data)
      //To clear the entered values from the form
      vm.leader = '';
      vm.query = '';
    })
  };
}])

.factory('LeaderFactory', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
  function fetchLeaders () {
    var d = $q.defer();
    //COME BACK WHEN ROUTE WORKING!!!!!!!!!!!!!!!
    var url = "http://localhost:3000/users/" + $rootScope.current_user.id + "/leaders"
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
    fetchLeaders: fetchLeaders
  }
}]);
