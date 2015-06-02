angular.module('starter.controllers', [])
// ==== Guests Controller ====
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
  $scope.tableAvailable = function(guest){
    if(guest.table != null){
      return true;
    }else{
      return false;
    }
  }
  $scope.reset = function(){
    ListOfGuests.reset();
    $scope.count();
  }
  $scope.count = function(){
    $scope.total = ListOfGuests.totalOfGuest();
  }
})

// ==== Tables Controller
.controller('TablesCtrl', function($scope,$ionicPopup,ListOfGuests,ListTable,$ionicModal,Table) {
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

  $ionicModal.fromTemplateUrl('templates/delete-guest-list.html',{
    scope : $scope
  }).then(function(modal){
    $scope.deleteGuestList = modal;
  })

  $scope.rename = function(table){
    $scope.renameData = {};
    var renamePopup = $ionicPopup.show({
      template:'<input type="text" ng-model="renameData.name">',
      title: 'Ingrese el nombre de la mesa',
      scope : $scope,
      buttons: [{
        text : 'Cancelar'
      },
      { text : '<b>Guardar</b>',
        type : 'button-positive',
        onTap : function(e){
          if(!$scope.renameData.name){
            e.preventDefault();
            //console.log("Nuevo nombre " + $scope.renameData.name);
          }else{
            table.rename($scope.renameData.name);
            ListTable.update();
            //console.log("Nuevo nombre en else" + $scope.renameData.name)
          }
        }}]
    });
    renamePopup.then(function(res){
      console.log('Tapped!',res);
    });
  }

  $scope.setCircleColor = function(guests,guest){
    var className = '';
    var indexColor = guests.indexOf(guest);
    console.log("Color Seleccionado " + indexColor);
    switch (indexColor) {
      case 0:
        className = 'primero';
        break;
      case 1:
        className = 'segundo';
        break;
      case 2:
        className = 'tercero';
        break;
      case 3:
        className = 'cuarto';
        break;
      case 4:
        className = 'quinto';
        break;
      case 5:
        className = 'sexto';
        break;
      case 6:
        className = 'septimo';
        break;
      case 7:
        className = 'octavo';
        break;
      case 8:
        className = 'noveno';
        break;
      case 9:
        className = 'decimo';
        break;
      default:
        console.log('In default case');
        break;

    }
    //console.log(guests.length + " ID " + guest.id);
    return className;

  }
  $scope.checkTableChairsAvailable = function(table){
    //console.log(table.chairsOcuped());
    if(table.chairsOcuped() < table.chairs){
      return true;
    }else{
      return false;
    }
  }
  $scope.tableEmpty = function(table){
    if(table.guests == null || table.guests.length === 0){
      return true;
    }else{
      return false;
    }
  }
  $scope.showDeleteList = function(id){
    $scope.selectedTable = ListTable.get(id);
    $scope.deleteGuestList.show();
  }

  $scope.showList = function(id){
    $scope.selectedTable = ListTable.get(id);
    $scope.modalList.show();
    //console.log($scope.selectedTable);
  }
  $scope.deleteGuest = function(guest){
    var mensaje = $scope.selectedTable.deleteGuest(guest);
    alert(mensaje);
    ListTable.update();
    ListOfGuests.update();
    $scope.deleteGuestList.hide();
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
