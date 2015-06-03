angular.module('starter.directives', [])

.directive('tabledraw',function(){
  return{
    restric: 'E',
    scope:{
      table: '='
    },
    template : "<canvas id='table-canvas' width='375px' height='200px' background-color:#F00'/>",
    link: function(scope, element, attrs){
      //console.log(element);
      //console.log("canvas table " + scope.table.chairs);
      scope.canvas = element.find('canvas')[0];
      scope.context = scope.canvas.getContext('2d');
      var centerX = scope.canvas.width / 2;
      var centerY = scope.canvas.height / 2;
      var radius = 70;
      var lg_rad = (scope.canvas.width/4) * .80;
      var lg_circ = 2*Math.PI*lg_rad;
      var sm_rad = (lg_circ / parseInt(scope.table.chairs)) / 3;
      scope.context.beginPath();
      scope.context.arc(centerX,centerY, radius,0, 2 * Math.PI, false);
      scope.context.fillStyle = "red";
      scope.context.fill();
      scope.context.lineWidth = 5;
      scope.strokeStyle = '#003300';
      scope.context.fillStyle = "black";
      scope.context.stroke();
      scope.context.font = "30px Georgia";
      scope.context.fillText('Mesa ' + scope.table.id,centerX,centerY);
      scope.context.closePath();
      var colorPicker = ["#eb7616","#df0bb0","#1f9410","#a9ac86","#539fc1","#46cba7","#7c699f","#f7f9b2","#487ab5","#3ef0d7"]
      var colorCircle = [];
      var letterCircle = [];

      if(scope.table.guests){
        for (var i = 0; i < scope.table.guests.length; i++) {
          for (var j = 0; j < scope.table.guests[i].numberOfPeople; j++) {
            colorCircle.push(colorPicker[i]);
            letterCircle.push(scope.table.guests[i].familyName.charAt(0));
          }
        }
      }
      for (var i = colorCircle.length; i < scope.table.chairs; i++) {
        colorCircle.push("#FFFFFF");
      }
      for (var i = 0; i < parseInt(scope.table.chairs); ++i) {
        scope.context.beginPath();
        var angle = i*2*Math.PI/parseInt(scope.table.chairs);
        var x = centerX + Math.cos(angle) * lg_rad;
        var y = centerY + Math.sin(angle) * lg_rad;
        scope.context.arc(x, y, sm_rad, 0, 360, false);
        scope.context.fillStyle = colorCircle[i];
        scope.context.fill();
        if(letterCircle[i] != undefined){

          scope.context.fillStyle = "white";
          scope.context.fillText(letterCircle[i],x-10,y+10);
        }
      }


      // Watch Method for variable change update
      scope.$watch('table.guests', function(newValue,oldValue) {
        //console.log("nuevo valor" + newValue.name);

        scope.context.clearRect ( 0 , 0 , scope.canvas.width, scope.canvas.height );
        var colorCircle = [];
        var letterCircle = [];
        //console.log("colorCircle length" + colorCircle.length);


        //console.log("valor cambiado" + newValue);
        if(newValue){
          for (var i = 0; i < newValue.length; i++) {
            for (var j = 0; j < newValue[i].numberOfPeople; j++) {
              colorCircle.push(colorPicker[i]);
              letterCircle.push(newValue[i].familyName.charAt(0));
            }
          }
        }
        for (var i = colorCircle.length; i < scope.table.chairs; i++) {
          colorCircle.push("#FFFFFF");
        }
        for (var i = 0; i < parseInt(scope.table.chairs); ++i) {
          scope.context.beginPath();
          var angle = i*2*Math.PI/parseInt(scope.table.chairs);
          var x = centerX + Math.cos(angle) * lg_rad;
          var y = centerY + Math.sin(angle) * lg_rad;
          scope.context.arc(x, y, sm_rad, 0, 360, false);
          scope.context.fillStyle = colorCircle[i];
          scope.context.fill();
          if(letterCircle[i] != undefined){

            scope.context.fillStyle = "white";
            scope.context.fillText(letterCircle[i],x-10,y+10);
          }

        }
        //console.log(newValue);
      },true);

    }
  }
});
