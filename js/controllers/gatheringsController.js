angular.module('app').controller('gatheringsController', ["$http", 'leaders', 'gatherings', '$cookieStore', function($http, leaders, gatherings, $cookieStore) {
  var vm = this;
  vm.leaders = leaders.all_leaders;
  vm.selected_leader = vm.leaders[0]
  vm.userGatherings = gatherings.gatherings;

  var myfunc = function(){
    for(var i = 0; i < vm.userGatherings.length; i++){
      if(vm.userGatherings[i].leader_id == vm.selected_leader.id ) {
        return vm.userGatherings[i].query
      }
    }
  }
  // vm.leadersGatherings = function(){

  vm.selected_query = myfunc();
  // }

  // vm.query = leadersGatherings()[vm.selected_leader.id]['query']
  // vm.getLeaderQuery = function(leader){

  // }

  // vm.query = getLeaderQuery(vm.selected_leader);

  vm.deleteGathering = function(gathering_id){
    console.log('inside deleteGathering')
    // var url = "http://localhost:3000/users/" + $cookieStore.get('current_user').id + "/gatherings"
    // $http.delete(url)
    // .then(function(response){
    //   vm.userGatherings.remove(response.data.gathering)
    //   //To clear the entered values from the form
    //   // vm.leader = '';
    //   // vm.query = '';
    // })
  }

  vm.addGathering = function() {
    var url = "https://tweeters-digest-api.herokuapp.com/users/" + $cookieStore.get('current_user').id + "/gatherings"
    $http.post(url, {leader_id: vm.selected_leader.id, query: vm.query })
    .then(function(response){
      vm.userGatherings.push(response.data.gathering)
      //To clear the entered values from the form
      // vm.leader = '';
      // vm.query = '';
    })
  };
}])

.factory('LeaderFactory', ['$http', '$q', '$cookieStore', function ($http, $q, $cookieStore) {
  function fetchLeaders () {
    var d = $q.defer();
    var url = "https://tweeters-digest-api.herokuapp.com/users/" + $cookieStore.get('current_user').id + "/leaders"
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
    var url = "https://tweeters-digest-api.herokuapp.com/users/" + $cookieStore.get('current_user').id + "/gatherings"
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
