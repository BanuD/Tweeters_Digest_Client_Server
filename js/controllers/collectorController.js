angular.module('app').controller('CollectorController', function() {
  var vm = this;

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
});
