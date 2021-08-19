'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.GameEditor = function (){
    this.mouseX = 0;
    this.mouseY = 0;
}

ageofshimrod.GameEditor.prototype ={

    gameLoop: function (){
      ageofshimrod.levelEditor.render();
      ageofshimrod.menuDecor.render();
      ageofshimrod.editorIconMenu.render();
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
        ageofshimrod.editorIconMenu = new ageofshimrod.EditorIconMenu();
        ageofshimrod.editorIconMenu.init();
        
        var ctx = ageofshimrod.canvas.canvasMouse.addEventListener('mousemove', ageofshimrod.gameEditor.mouseMoveEvent);
        var ctx = ageofshimrod.canvas.canvasMouse.addEventListener('click', ageofshimrod.gameEditor.clickEvent);
    },

    clickEvent : function(evt){
      let clickStatus = ageofshimrod.editorIconMenu.clickEvent(evt)
      || ageofshimrod.menuDecor.clickEvent(evt)
      || ageofshimrod.levelEditor.clickEvent(evt);
      
    },

    mouseMoveEvent : function(evt){
        ageofshimrod.gameEditor.mouseX = evt.pageX;
        ageofshimrod.gameEditor.mouseY = evt.pageY;
    }
}

ageofshimrod.gameEditor = new ageofshimrod.GameEditor();
ageofshimrod.gameEditor.init();

setInterval(ageofshimrod.gameEditor.gameLoop,1000/60)