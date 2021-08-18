'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.GameEditor = function (){

}

ageofshimrod.GameEditor.prototype ={

    gameLoop: function (){
      ageofshimrod.levelEditor.render();
      ageofshimrod.menuDecor.render();
    },

    init : function(){
        ageofshimrod.tileset = new ageofshimrod.Tileset();
        ageofshimrod.canvas = new ageofshimrod.Canvas();
        ageofshimrod.canvas.init();
        ageofshimrod.canvas.setCanvasSize(window.innerWidth,window.innerHeight);
        ageofshimrod.levelEditor = new ageofshimrod.LevelEditor();
        ageofshimrod.levelEditor.init();
        ageofshimrod.menuDecor = new ageofshimrod.MenuDecor();
        ageofshimrod.menuDecor.init();
        
        var ctx = ageofshimrod.canvas.canvasMouse.addEventListener('mousemove', ageofshimrod.gameEditor.mouseMoveEvent);
        var ctx = ageofshimrod.canvas.canvasMouse.addEventListener('click', ageofshimrod.gameEditor.clickEvent);
    },

    clickEvent : function(evt){
      ageofshimrod.menuDecor.clickEvent(evt);
    },

    mouseMoveEvent : function(evt){
        
    }
}

ageofshimrod.gameEditor = new ageofshimrod.GameEditor();
ageofshimrod.gameEditor.init();

setInterval(ageofshimrod.gameEditor.gameLoop,1000/60)