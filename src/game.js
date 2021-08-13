'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.GameEngine = function (){
}

ageofshimrod.GameEngine.prototype ={
  gameLoop: function (){
    ageofshimrod.canvas.clearCanvas();
    ageofshimrod.map.render();
  },

  clickEvent : function(evt){
    
  },

  init : function(){
    ageofshimrod.canvas = new ageofshimrod.Canvas();
    ageofshimrod.canvas.init();
    ageofshimrod.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
    ageofshimrod.canvas.canvasMouse.addEventListener("click",ageofshimrod.gameEngine.clickEvent);
    ageofshimrod.tileset = new ageofshimrod.Tileset();
    ageofshimrod.map = new ageofshimrod.Map();
    ageofshimrod.map.init();
  },
}

ageofshimrod.gameEngine = new ageofshimrod.GameEngine();
ageofshimrod.gameEngine.init();

setInterval(ageofshimrod.gameEngine.gameLoop,1000/60)
