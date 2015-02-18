angular.module('app').controller('gatheringsController', ["$http", 'leaders', 'gatherings', '$cookieStore', function($http, leaders, gatherings, $cookieStore) {
  var vm = this;
  vm.leaders = leaders.all_leaders;
  vm.selected_leader = vm.leaders[0]
  vm.userGatherings = gatherings.gatherings;

  // var myfunc = function(){
  //   for(var i = 0; i < vm.userGatherings.length; i++){
  //     if(vm.userGatherings[i].leader_id == vm.selected_leader.id ) {
  //       return vm.userGatherings[i].query
  //     }
  //   }
  // }
  // vm.leadersGatherings = function(){

  // vm.selected_query = ""
  // }

  // vm.query = leadersGatherings()[vm.selected_leader.id]['query']
  // vm.getLeaderQuery = function(leader){

  // }

  // vm.query = getLeaderQuery(vm.selected_leader);

  vm.modifyGathering = function(gathering_leader_id){
    console.log('inside modifyGathering')
    for(var i = 0; i < vm.leaders.length; i++){
      if(vm.leaders[i].id == gathering_leader_id){
        vm.selected_leader = vm.leaders[i];
      }
    }
  }

  vm.addGathering = function() {
    var url = "http://localhost:3000/users/" + $cookieStore.get('current_user').id + "/gatherings"
    $http.post(url, {leader_id: vm.selected_leader.id, query: vm.selected_leader.query })
    .then(function(response){
      for(var i = 0; i < vm.userGatherings.length; i++){
        if(vm.userGatherings[i].id == response.data.gathering.id) {
          vm.userGatherings.splice(i, 1)
        }
      }
      vm.userGatherings.push(response.data.gathering)
    })
  };
}])

.factory('LeaderFactory', ['$http', '$q', '$cookieStore', function ($http, $q, $cookieStore) {
  function fetchLeaders () {
    var d = $q.defer();
    var url = "http://localhost:3000/users/" + $cookieStore.get('current_user').id + "/leaders"
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
}])

.factory('GatheringsFactory', ['$http', '$q', '$cookieStore', function ($http, $q, $cookieStore) {
  function fetchGatherings () {
    var d = $q.defer();
    var url = "http://localhost:3000/users/" + $cookieStore.get('current_user').id + "/gatherings"
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
    fetchGatherings: fetchGatherings
  }
}]);
