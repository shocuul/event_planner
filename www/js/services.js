angular.module('starter.services', [])

.factory('$localStorage',function($window){
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
})

.factory('Guests',function(){
  var Guests = function(familyName, numberOfPeople){
    this.familyName = familyName;
    this.numberOfPeople = numberOfPeople;
    this.table = null;
  }
  Guests.prototype.asignTable = function (table) {
    this.table = table;
  };
  return Guests;
})

.factory('ListOfGuests', function(Guests,$localStorage){
  try{
    var list = $localStorage.getObject('list');
    var total = $localStorage.get('totalOfGuest');
    console.log(total + list);
  }catch(err){
    var list = [];
    var total = 0;
    console.log(err.message);
    console.log(list);
  }
  if(total == undefined){
    total = 0;
  }
  return{
    all : function(){
      return list;
    },
    add : function(Guests){
      list.push(Guests);
      total = parseInt(total) + parseInt(Guests.numberOfPeople);
      $localStorage.setObject('list',list);
      $localStorage.set('totalOfGuest',total);
      console.log(list);

    },
    get : function(familyName){
      for (var i = 0; i < list.length; i++) {
        if(list[i].familyName === familyName){
          return list[i];
        }
      }
      return null;
    },
    reset : function(){
      list.length = 0;
      $localStorage.setObject('list',list);
      total = 0;
      $localStorage.set('totalOfGuest',total);
      console.log(list);
    },
    totalOfGuest : function(){
      return total;
    }
  }
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
