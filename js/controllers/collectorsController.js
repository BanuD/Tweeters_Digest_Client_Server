angular.module('app').controller('collectorsController', ["$http", 'leaders', '$rootScope', function($http, leaders, $rootScope) {
  var vm = this;
  vm.leaders = leaders
  // vm.leaders = [{id: 1, handle: "@jennnnn"}, {id: 2, handle: "@danimalkelley"}]
  // vm.selected_leader = vm.leaders[0]
  vm.userCollectors = [{leader_id: 453, query: "some thoughts on cats"}, {leader_id: 333, query: "twitter stuff"}];
  vm.addCollector = function() {
    var url = "http://localhost:3000/" + $rootScope.current_user.id + "/collectors"
    $http.post(url, {
      params: { leader_id: vm.selected_leader, query: vm.query }
    })
    .then(function(data){
      vm.userCollectors.push(data)
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
