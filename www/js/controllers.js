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

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
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
