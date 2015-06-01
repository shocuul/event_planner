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
    var id = $scope.listOfGuest.length + 1;
    var guest = new Guests(id,data.familyName, data.numberOfPeople);
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
  // var test = [];
  // var testTable1 = new Table(20,"Test",10);
  // var testTable2 = new Table(20,"Test",10);
  // test.push(testTable1);
  // test.push(testTable2);
  //console.log(test);
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

  $scope.checkTableChairsAvailable = function(table){
    //console.log(table.chairsOcuped());
    if(table.chairsOcuped() < table.chairs){
      return true;
    }else{
      return false;
    }
  }
  $scope.checkTableWhenAnyGuestPresent = function(table){
    if(table.guests != null || table.guests.length === 0){
      return false;
    }else{
      return true;
    }
  }
  $scope.showList = function(id){
    $scope.selectedTable = ListTable.get(id);
    $scope.modalList.show();
    //console.log($scope.selectedTable);
  }
  $scope.asignTable = function(guest){
    var mensaje = $scope.selectedTable.addGuest(guest);
    // var selectedGuest = ListOfGuests.get(guest.familyName);
    //guest.asignTable($scope.selectedTable);
    alert(mensaje);
    ListTable.update();
    ListOfGuests.update();
    $scope.modalList.hide();
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
    console.log($scope.listTable);
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
