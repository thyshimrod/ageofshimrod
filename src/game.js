'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.GameEngine = function (){
}

ageofshimrod.GameEngine.prototype ={
  gameLoop: function (){
    ageofshimrod.canvas.clearCanvas();
    ageofshimrod.map.render();
    ageofshimrod.contextualOnDecor.render();
    ageofshimrod.contextualOnBuilding.render();
    ageofshimrod.iconMenu.render();
  },

  clickEvent : function(evt){
    let clickOnMenu = ageofshimrod.iconMenu.clickEvent(evt)
    || ageofshimrod.contextualOnDecor.clickEvent(evt)
    || ageofshimrod.contextualOnBuilding.clickEvent(evt);

    if (clickOnMenu === ageofshimrod.C.CLICK_OUTSIDE_WINDOW){
      ageofshimrod.map.clickEvent(evt);
    }
  },

  init : function(){
    ageofshimrod.canvas = new ageofshimrod.Canvas();
    ageofshimrod.canvas.init();
    ageofshimrod.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
    ageofshimrod.canvas.canvasMouse.addEventListener("click",ageofshimrod.gameEngine.clickEvent);
    ageofshimrod.tileset = new ageofshimrod.Tileset();
    ageofshimrod.map = new ageofshimrod.Map();
    ageofshimrod.map.init();
    ageofshimrod.contextualOnDecor = new ageofshimrod.ContextualOnDecor();
    ageofshimrod.contextualOnDecor.init();
    ageofshimrod.contextualOnBuilding = new ageofshimrod.ContextualOnBuilding();
    ageofshimrod.contextualOnBuilding.init();
    ageofshimrod.iconMenu = new ageofshimrod.IconMenu();
    ageofshimrod.iconMenu.init();
    ageofshimrod.player = new ageofshimrod.Player();
    ageofshimrod.player.init();
  },
}

ageofshimrod.gameEngine = new ageofshimrod.GameEngine();
ageofshimrod.gameEngine.init();

setInterval(ageofshimrod.gameEngine.gameLoop,1000/60)

