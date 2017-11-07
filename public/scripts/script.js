angular.module( 'myApp', [] )
  .controller( 'MeanieController', function( $http ){
  const vm = this

  //function to add record
  vm.addRecord = () => {
    let objectToSend = { 
      name: vm.nameIn,
      location: vm.locationIn
    }
    $http({
      method: 'POST',
      url: '/testPost',
      data: objectToSend
    })
      vm.nameIn =''
      vm.locationIn=''
  } //end addRecord

  //function to get record from DB
  vm.getRecords = () => {
    $http({
      method: 'GET',
      url: '/getRecords',
    }).then(res => {
      vm.allTheRecords = res.data
      console.log( vm.allTheRecords )
    })
    .catch(err => {
      console.log(err)
    })
  } //end getRecords

  //function to delete a record from DOM and DB
  vm.delete = (id) => {
      console.log('delete', id)
      $http({
        method: 'DELETE',
        url: '/deleteRecord/' + id,
      }).then(res => {
        vm.getRecords()
      })
      .catch(err => {
        console.log(err)
      })
    }

}) //end controller function
