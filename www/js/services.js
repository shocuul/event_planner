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
      // return JSON.parse($window.localStorage[key] || '{}');
      return JSON.parse($window.localStorage[key] || null);
    }
  }
})


.factory('Guests',function(){
  var Guests = function(id, familyName, numberOfPeople){
    this.id = id
    this.familyName = familyName;
    this.numberOfPeople = numberOfPeople;
    this.table = null;
  }
  Guests.prototype.asignTable = function (table) {
    this.table = table.id;
  };
  Guests.prototype.deleteTable = function () {
    this.table = null;
  };
  Guests.prototype.update = function (familyName, numberOfPeople) {
    this.familyName = familyName;
    this.numberOfPeople = numberOfPeople;
  };
  return Guests;
})

.factory('ListOfGuests', function(Guests,$localStorage){
  var list = $localStorage.getObject('list');
  var total = $localStorage.get('totalOfGuest');
  //console.log("Total:" + total);
  //console.log("Lista:" + list);

  if(total == undefined){
    total = 0;
  }
  if(list == null){
    list = [];
  }else{
    for (var i = 0; i < list.length; i++) {
      list[i].__proto__ = Guests.prototype;
    }
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
      //console.log(list);

    },
    get : function(guestId){
      for (var i = 0; i < list.length; i++) {
        if(list[i].id === guestId){
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
      //console.log(list);
    },
    reload : function(){
      list = $localStorage.getObject('list');
      total = 0;
      for (var i = 0; i < list.length; i++) {
        total = total + parseInt(list[i].numberOfPeople);
      }
      $localStorage.set('totalOfGuest',total);
    },
    totalOfGuest : function(){
      return total;
    },
    update : function(){
      $localStorage.setObject('list',list);
    }
  }
})

.factory('Table', function(){
  var Table = function(id,name,chairs){
    this.id = id;
    this.name = name;
    this.chairs = chairs;
    this.guests = [];
  }
  Table.prototype.addGuest = function (guests) {
    if(this.guests == null){
      this.guests = [];
    }
    //console.log("Numero de sillas " + this.chairsOcuped());
    if(this.chairs < guests.numberOfPeople){
      return "No alcanzas las sillas";
    }else if ((this.chairsOcuped() + parseInt(guests.numberOfPeople)) > this.chairs) {
      return "Sillas insuficientes";
    }else{
      this.guests.push(guests);
      guests.asignTable(this);
      return "Agregado correctamente";
    }
    return null;
  };

  Table.prototype.rename = function (newName) {
    this.name = newName;
  };
  Table.prototype.deleteGuest = function (guest) {
    if(this.guests == null || this.guests.length === 0){
      return "No hay invitados asignados a esta Mesa";
    }
    this.guests.splice(this.guests.indexOf(guest),1);
    guest.deleteTable();
    return " "+ guest.familyName + " eliminada de la mesa " + this.id;

  };
  Table.prototype.chairsOcuped = function () {
    // body...
    var chairsOcupped = 0;
    if(this.guests != null){
      for (var i = 0; i < this.guests.length; i++) {
        chairsOcupped = chairsOcupped + parseInt(this.guests[i].numberOfPeople);
      }
    }
    return chairsOcupped;
  };
  return Table;
})

.factory('ListTable',function(Table,$localStorage){
  var list = $localStorage.getObject('list-table');
  if (list == null){
    list = [];
  }else{
    for (var i = 0; i < list.length; i++) {
      list[i].__proto__ = Table.prototype;
    }
  }
  return{
    all : function(){
      return list;
    },
    generate : function(numberOfTable,numberOfChairs){
      for (var i = 0; i < numberOfTable; i++) {
        var table = new Table((list.length+1),"Mesa "+i,numberOfChairs);
        list.push(table);
      }
      $localStorage.setObject('list-table',list);
    },
    reload : function(){
      list = $localStorage.getObject('list-table');
    },
    get : function(tableId){
      for (var i = 0; i < list.length; i++) {
        if(list[i].id === parseInt(tableId)){
          return list[i];
        }
      }
      return null;
    },
    reset : function(){
      list.length = 0;
      $localStorage.setObject('list-table',list);
    },
    update : function(){
      $localStorage.setObject('list-table',list);
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
