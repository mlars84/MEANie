var myApp = angular.module( 'myApp', [] );

myApp.controller( 'WhereMyPeeps', function( $http ){

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
    vm.allTheRecords = response.data;
    console.log( vm.allTheRecords );
  }, function myError( response ){
    console.log( response.statusText );
    vm.getRecords();
  });

}; //end getRecords

//function to delete a record from DOM and DB
vm.delete = function(id){
    console.log('delete', id);
    $http({
      method: 'DELETE',
      url: '/deleteRecord/' + id,
    }).then(function mySuccess(response){
      vm.getRecords();
    }, function myError(response){
      console.log(response);
    });
  };

}); //end controller function
