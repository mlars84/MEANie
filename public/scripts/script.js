var myApp = angular.module( 'myApp', [] );

myApp.controller( 'WhereMyPeeps', '$http', function( $http ){

var vm = this;

//function to add record
vm.addRecord = function(){
  var objectToSend ={
    name: vm.nameIn,
    location: vm.locationIn
  };
  $http({
    method: 'POST',
    url: '/testPost',
    data: objectToSend
  });
  vm.nameIn ='';
  vm.locationIn='';
}; //end addRecord

//function to get record from DB
vm.getRecords = function(){
  $http({
    method: 'GET',
    url: '/getRecords',
  }).then( function( response ){
    vm.allTheRecords = response;
    console.log( vm.allTheRecords );
  }).then( function myError(response) {
    console.log(response.statusText);
  });
}; //end getRecords
}); //end controller function
