angular.module('starter.controllers', [])

.controller('GuestsCtrl', function($scope,ListOfGuests,$ionicModal,Guests) {
  $scope.listOfGuest = ListOfGuests.all();
  $scope.total = ListOfGuests.totalOfGuest();
  $ionicModal.fromTemplateUrl('templates/new-guest.html',{
		scope: $scope
	}).then(function(modal){
		$scope.modal = modal;
	});
  $scope.addGuest = function(data){
    var guest = new Guests(data.familyName, data.numberOfPeople);
    data.familyName = '';
    data.numberOfPeople = '';
    ListOfGuests.add(guest);
    $scope.count();
    $scope.modal.hide();
  }
  $scope.reset = function(){
    ListOfGuests.reset();
    $scope.count();
  }
  $scope.count = function(){
    $scope.total = ListOfGuests.totalOfGuest();
  }
})

.controller('TablesCtrl', function($scope,ListOfGuests,ListTable,$ionicModal,Table) {
  $scope.listTable = ListTable.all();
  console.log($scope.listTable);
  $scope.listOfGuest = ListOfGuests.all();
  $scope.selectedTable = null;
  var test = [];
  var testTable1 = new Table(20,"Test",10);
  var testTable2 = new Table(20,"Test",10);
  test.push(testTable1);
  test.push(testTable2);
  console.log(test);
  $ionicModal.fromTemplateUrl('templates/new-tables.html',{
    scope: $scope
  }).then(function(modal){
    $scope.modal = modal;
  })
  $ionicModal.fromTemplateUrl('templates/list-guest.html',{
    scope : $scope
  }).then(function(modal){
    $scope.modalList = modal;
  })
  $scope.showList = function(id){
    $scope.selectedTable = ListTable.get(id);
    $scope.modalList.show();
    console.log($scope.selectedTable);
  }
  $scope.asignTable = function(guest){
    $scope.selectedTable.addGuest(guest);
  }
  $scope.check = function(){
    if($scope.listTable.length === 0){
      $scope.createTable = true;
      console.log($scope.createTable);
    }else{
      $scope.createTable = false;
    }
  }



  $scope.configureTables = function(data){
    ListTable.generate(data.numberOfTable,data.numberOfChairs);
    $scope.modal.hide();
    $scope.check();
  }
  $scope.reset = function(){
    ListTable.reset();
    $scope.check();
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
