'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.GameEngine = function (){
  this.mouseX = 0;
  this.mouseY = 0;
  this.status = ageofshimrod.C.GAME_STATUS_START;
}

ageofshimrod.GameEngine.prototype ={
  gameLoop: function (){
    if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_START){
      ageofshimrod.startGame.render();
      
    }else if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_ENDGAME){
      ageofshimrod.endGame.showMenu();
      ageofshimrod.endGame.render();
    }else if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_INGAME){
      ageofshimrod.canvas.clearCanvas();
      ageofshimrod.map.render();
      ageofshimrod.contextualOnDecor.render();
      ageofshimrod.contextualOnBuilding.render();
      ageofshimrod.iconMenu.render();
      ageofshimrod.menuRessource.render();
      ageofshimrod.menuPeon.render();
      ageofshimrod.menuBuilding.render();
      ageofshimrod.map.gameLoop();
      ageofshimrod.recordGame.checkObjectifs();

    }
  },

  changeStatus : function(newStatus){
    ageofshimrod.canvas.clearCanvas();
    this.status = newStatus;
  },

  mouseMove : function(evt){
    ageofshimrod.gameEngine.mouseX = evt.pageX;
    ageofshimrod.gameEngine.mouseY = evt.pageY;
  },

  clickEvent : function(evt){
    if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_START){
      ageofshimrod.startGame.clickEvent(evt);
    }else if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_ENDGAME){
      ageofshimrod.endGame.clickEvent(evt);
    }else if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_INGAME){
      let clickOnMenu = ageofshimrod.iconMenu.clickEvent(evt)
      || ageofshimrod.menuRessource.clickEvent(evt)
      || ageofshimrod.menuPeon.clickEvent(evt)
      || ageofshimrod.menuBuilding.clickEvent(evt)
      || ageofshimrod.contextualOnDecor.clickEvent(evt)
      || ageofshimrod.contextualOnBuilding.clickEvent(evt);

      if (clickOnMenu === ageofshimrod.C.CLICK_OUTSIDE_WINDOW){
        ageofshimrod.map.clickEvent(evt);
      }
    }
  },

  initGame : function(){
    ageofshimrod.map = new ageofshimrod.Map();
    ageofshimrod.map.init();
    ageofshimrod.player = new ageofshimrod.Player();
    ageofshimrod.player.init();
    ageofshimrod.recordGame.init();
    ageofshimrod.gameEngine.changeStatus(ageofshimrod.C.GAME_STATUS_INGAME);
  },

  init : function(){
    ageofshimrod.canvas = new ageofshimrod.Canvas();
    ageofshimrod.canvas.init();
    ageofshimrod.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
    ageofshimrod.canvas.canvasMouse.addEventListener("click",ageofshimrod.gameEngine.clickEvent);
    ageofshimrod.canvas.canvasMouse.addEventListener("mousemove",ageofshimrod.gameEngine.mouseMove);
    ageofshimrod.tileset = new ageofshimrod.Tileset();
    
    ageofshimrod.contextualOnDecor = new ageofshimrod.ContextualOnDecor();
    ageofshimrod.contextualOnDecor.init();
    ageofshimrod.contextualOnBuilding = new ageofshimrod.ContextualOnBuilding();
    ageofshimrod.contextualOnBuilding.init();
    ageofshimrod.iconMenu = new ageofshimrod.IconMenu();
    ageofshimrod.iconMenu.init();
    ageofshimrod.recordGame = new ageofshimrod.RecordGame();
    
    ageofshimrod.menuRessource = new ageofshimrod.MenuRessource();
    ageofshimrod.menuRessource.init();
    ageofshimrod.menuPeon = new ageofshimrod.MenuPeon();
    ageofshimrod.menuPeon.init();
    ageofshimrod.menuBuilding = new ageofshimrod.MenuBuilding();
    ageofshimrod.menuBuilding.init();
    ageofshimrod.startGame = new ageofshimrod.StartGame();
    ageofshimrod.startGame.init();
    ageofshimrod.startGame.showMenu();
    
    ageofshimrod.endGame = new ageofshimrod.EndGame();
    ageofshimrod.endGame.init();
  },
}

ageofshimrod.gameEngine = new ageofshimrod.GameEngine();
ageofshimrod.gameEngine.init();

setInterval(ageofshimrod.gameEngine.gameLoop,1000/60)

