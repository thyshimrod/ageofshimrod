'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.GameEngine = function (){
  this.mouseX = 0;
  this.mouseY = 0;
  this.status = ageofshimrod.C.GAME_STATUS_START;
  this.decalageX = 0;
  this.decalageY = 0;
  this.stepDecalage = 3;
  this.tickBirth = 0;
}

ageofshimrod.GameEngine.prototype ={
  gameLoop: function (){
    ageofshimrod.canvas.clearCanvas();
    if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_START){
      ageofshimrod.startGame.render();
      
    }else if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_ENDGAME_WIN || ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_ENDGAME_LOSE){
      ageofshimrod.endGame.showMenu();
      ageofshimrod.endGame.render();
    }else if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_INGAME){
      ageofshimrod.gameEngine.checkNaissance();
      ageofshimrod.map.render();
      ageofshimrod.contextualOnDecor.render();
      ageofshimrod.contextualOnBuilding.render();
      ageofshimrod.iconMenu.render();
      ageofshimrod.menuRessource.render();
      ageofshimrod.menuPeon.render();
      ageofshimrod.menuBuilding.render();
      ageofshimrod.map.gameLoop();
      ageofshimrod.recordGame.checkObjectifs();
      ageofshimrod.gameEngine.checkDecalage();
      ageofshimrod.console.render();
    }
  },

  checkNaissance : function(){
    let d = new Date();
    let newTick = d.getTime();
    if ((newTick - ageofshimrod.gameEngine.tickBirth) > 2000){
      let enoughFood = false;
      for (let i=0 ; i < ageofshimrod.player.ressources.length; i++){
        if (ageofshimrod.player.ressources[i].id === ageofshimrod.C.RESSOURCE_FOOD
          && ageofshimrod.player.ressources[i].quantity > 100){
            enoughFood = true;
            break;
          }
      }
      if (enoughFood){
        ageofshimrod.gameEngine.tickBirth = newTick;
        let peon = new ageofshimrod.Peon();
        peon.init();
        peon.x =32;
        peon.y = 150;
        if (typeof peon.house !== "undefined"){
          ageofshimrod.map.peons.push(peon);
          for (let i=0 ; i < ageofshimrod.player.ressources.length; i++){
            if (ageofshimrod.player.ressources[i].id === ageofshimrod.C.RESSOURCE_FOOD){
                ageofshimrod.player.ressources[i].quantity -= 100;
                break;
              }
          }
        }
      }
      
    }
  },

  checkDecalage : function(){
    if (this.mouseX < 20){
      ageofshimrod.gameEngine.decalageX += ageofshimrod.gameEngine.stepDecalage;
    }else if (this.mouseX > (window.innerWidth - 20)){
      ageofshimrod.gameEngine.decalageX -= ageofshimrod.gameEngine.stepDecalage;
    }
    if (this.mouseY < 20){
      ageofshimrod.gameEngine.decalageY += ageofshimrod.gameEngine.stepDecalage;
    }else if (this.mouseY > (window.innerHeight - 20)){
      ageofshimrod.gameEngine.decalageY -= ageofshimrod.gameEngine.stepDecalage;
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
    }else if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_ENDGAME_WIN || ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_ENDGAME_LOSE){
      ageofshimrod.endGame.clickEvent(evt);
    }else if (ageofshimrod.gameEngine.status === ageofshimrod.C.GAME_STATUS_INGAME){
      let clickOnMenu = ageofshimrod.iconMenu.clickEvent(evt)
      ||  ageofshimrod.console.clickEvent(evt)
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
    ageofshimrod.console = new ageofshimrod.Console();
    ageofshimrod.console.init();
    ageofshimrod.console.addMessage("Game is Starting");
    
    ageofshimrod.endGame = new ageofshimrod.EndGame();
    ageofshimrod.endGame.init();
  },
}

ageofshimrod.gameEngine = new ageofshimrod.GameEngine();
ageofshimrod.gameEngine.init();

setInterval(ageofshimrod.gameEngine.gameLoop,1000/60)

