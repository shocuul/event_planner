angular.module('starter.controllers', [])
// ==== Guests Controller ====
.controller('GuestsCtrl', function($scope,ListOfGuests,$ionicModal,Guests,$ionicPopup,$ionicListDelegate) {
  $scope.listOfGuest = ListOfGuests.all();
  $scope.listCanSwipe = true;
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
  $scope.delete = function(guest){
    //console.log('Press delete');
    if(guest.table == null){
      ListOfGuests.remove(guest);
      ListOfGuests.update();
      $ionicListDelegate.closeOptionButtons()
    }else{
      alert('Primero elimine a este invitado de su mesa');
      $ionicListDelegate.closeOptionButtons()
    }
  }
  $scope.reset = function(){
    ListOfGuests.reset();
    $scope.count();
  }
  $scope.count = function(){
    $scope.total = ListOfGuests.totalOfGuest();
  }
  $scope.update = function(guest){
    $scope.guestData = {};
    $scope.guestData.familyName = guest.familyName;
    $scope.guestData.numberOfPeople = parseInt(guest.numberOfPeople);
    var renamePopup = $ionicPopup.show({
      template:'<input type="text" ng-model="guestData.familyName"><input type="number" ng-model="guestData.numberOfPeople">',
      title: 'Editar invitados',
      scope : $scope,
      buttons: [{
        text : 'Cancelar',
        onTap : function(e){
          //e.preventDefault();
          $ionicListDelegate.closeOptionButtons();
        }
      },
      { text : '<b>Guardar</b>',
        type : 'button-positive',
        onTap : function(e){
          if(!$scope.guestData.familyName){
            e.preventDefault();
            //console.log("Nuevo nombre " + $scope.renameData.name);
          }else{
            guest.update($scope.guestData.familyName,$scope.guestData.numberOfPeople);
            ListOfGuests.update();
            $ionicListDelegate.closeOptionButtons();
            //console.log("Nuevo nombre en else" + $scope.renameData.name)
          }
        }}]
    });
    renamePopup.then(function(res){
      //console.log('Tapped!',res);
    });
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
  $scope.isTable = function(guest){
    if(guest.table == null){
      return true;
    }else{
      return false;
    }
  }
  
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
      //console.log('Tapped!',res);
    });
  }

  $scope.setCircleColor = function(guests,guest){
    var className = '';
    var indexColor = guests.indexOf(guest);
    //console.log("Color Seleccionado " + indexColor);
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
        //console.log('In default case');
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
    //alert(mensaje);
    ListTable.update();
    ListOfGuests.update();
    $scope.deleteGuestList.hide();
  }
  $scope.asignTable = function(guest){
    var mensaje = $scope.selectedTable.addGuest(guest);
    // var selectedGuest = ListOfGuests.get(guest.familyName);
    //guest.asignTable($scope.selectedTable);
    //alert(mensaje);
    ListTable.update();
    ListOfGuests.update();
    $scope.modalList.hide();
  }
  $scope.check = function(){
    if($scope.listTable.length === 0){
      $scope.createTable = true;
      //console.log($scope.createTable);
    }else{
      $scope.createTable = false;
    }
  }

  $scope.configureTables = function(data){
    ListTable.generate(data.numberOfTable,data.numberOfChairs);
    $scope.modal.hide();
    //console.log($scope.listTable);
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

.controller('ActionsCtrl', function($scope,$cordovaFile,$cordovaFileOpener2,$localStorage,ListTable,$ionicPopover,$ionicPopup,$cordovaClipboard,ListTable,ListOfGuests) {

  //console.log(exportObject);
  $ionicPopover.fromTemplateUrl('templates/accion-popover.html',{
    scope : $scope
  }).then(function(popover){
    //console.log("popover configured");
    $scope.popover = popover;
  });

  $scope.openPopover = function($event){
    $scope.popover.show($event);
  }


  $scope.import = function(data){
    var confirmPopup = $ionicPopup.confirm({
      title : 'Advertencia',
      template : '¿Esta seguro que desea eliminar los datos existentes para importar los nuevos?'
    });
    confirmPopup.then(function(res){
      if(res){
        console.log('De acuerdo');
        var objectImport = JSON.parse(data.import);
        $localStorage.set('list',objectImport.guest);
        $localStorage.set('list-table',objectImport.tables);
        ListOfGuests.reload();
        ListOfGuests.reload();
        console.log(objectImport);
      }else{
        console.log('Desacuerdo');
      }
    })

  }

  $scope.export = function(){
    // list-table list
    var exportObject = {
      guest : null,
      tables : null
    }
    exportObject.guest = $localStorage.get('list');
    exportObject.tables = $localStorage.get('list-table');
    var exportString = JSON.stringify(exportObject);
    if(!window.cordova){
      console.log(exportString);
    }else{
      $cordovaClipboard.copy(exportString).then(function(){
        alert('Texto de exportado copiado a su portapapeles');
      }, function(){
        alert('Error interno favor de reportarlo');
      });
    }
  }
  $scope.resetGuest = function(){
    ListOfGuests.reset();
    ListOfGuests.reload();
    alert('Invitados reseteados correctamente');
  }

  $scope.resetTables = function(){
    ListTable.reset();
    ListTable.reload();
    alert('Mesas reseteadas correctamente');
  }
  $scope.generatePDF = function(){
    var doc = new jsPDF();
    var tables = ListTable.all();
    doc.setFontSize(40);
    doc.text(20, 20, 'Lista de invitados');
    doc.setFontSize(20);
    var spacing = 30;
    for (var i = 0; i < tables.length; i++) {
       doc.text(20,spacing,tables[i].id.toString());
       doc.text(30,spacing,tables[i].name);
       doc.line(20, spacing+2, 100, spacing+2);
       //console.log(tables[i].guests);
       spacing = spacing + 10;
       //console.log(spacing);
       if(spacing > 250){
         doc.addPage();
         spacing = 20;
       }
       if(tables[i].guests != null){
         doc.setFontSize(15);
          for (var j = 0; j < tables[i].guests.length; j++) {
            doc.text(20,spacing,tables[i].guests[j].familyName);
            doc.text(90,spacing,tables[i].guests[j].numberOfPeople.toString());
            spacing += 10;
          }
          doc.setFontSize(20);
       }


    }
    // doc.text(20, 30, 'This is client-side Javascript, pumping out a PDF.');
    // doc.addPage();
    // doc.text(20, 20, 'Do you like that?');
    // doc.setFont("courier");
    // doc.setFontType("normal");
    // doc.text(20, 30, 'This is a PDF document generated using JSPDF.');
    // doc.text(20, 50, 'YES, Inside of PhoneGap!');
    if(!window.cordova){
      //console.log("en Browser");
      doc.save('Test.pdf');
    }else{
    var pdfOutput = doc.output();
    //console.log(pdfOutput);
    //console.log("file system...");
    // try{
    //   console.log('Guardar Archivo :requestFileSystem');
    //   window.requestFileSystem(LocalFileSystem.PERSISTENT,0,gotFS,fail)
    // }
    var pathTmp = '';
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {

    //  console.log("Nombre: "+fileSystem.name);
    //  console.log("Nombre Root: "+fileSystem.root.name);
    //  console.log("Path del FileSystem "+fileSystem.root.fullPath);

       fileSystem.root.getFile("test.pdf", {create: true}, function(entry) {
          var fileEntry = entry;
          pathTmp = entry.toURL();
          //alert(pathTmp);
          // console.log(entry);

          entry.createWriter(function(writer) {
             writer.onwrite = function(evt) {
             //console.log("write success");
          };

          //console.log("writing to file");
             writer.write( pdfOutput );
          }, function(error) {
             //console.log(error);
          });

       }, function(error){
          //console.log(error);
       });
    },
    function(event){
     //console.log( evt.target.error.code );
    });
    var currentPlatform = ionic.Platform.platform();
    if(currentPlatform === 'ios'){
      $cordovaFileOpener2.open(
      cordova.file.documentsDirectory+'/test.pdf',
      'application/pdf'
      ).then(function() {
          // file opened successfully
      }, function(err) {
          // An error occurred. Show a message to the user
      });
    }else{
      $cordovaFileOpener2.open(
      cordova.file.externalRootDirectory+'/test.pdf',
      'application/pdf'
      ).then(function() {
          // file opened successfully
      }, function(err) {
          // An error occurred. Show a message to the user
      });
    }

  }
  }
});
