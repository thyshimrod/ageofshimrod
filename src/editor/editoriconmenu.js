'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.EditorIconMenu = function (){
    this.ctx = undefined;
    this.icons = [
        { 
            "x" : 0, "y" : 0, "src" : "./assets/icones/save.png", "name" : "save"
        },
    ]
}

ageofshimrod.EditorIconMenu.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasAnimation.getContext("2d");
    },

    clickEvent : function(evt){
        for (let i = 0 ; i < this.icons.length ; i++){
            if (evt.pageX > this.icons[i].x && evt.pageX < (this.icons[i].x + 32)
            && evt.pageY > this.icons[i].y && evt.pageY < (this.icons[i].y + 32)){
                if(this.icons[i].name === 'save'){
                    ageofshimrod.levelEditor.saveToJs();
                }
                return ageofshimrod.C.CLICK_ON_WINDOW;
            }
        }        
        return ageofshimrod.C.CLICK_OUTSIDE_WINDOW;
    },

    render : function(){
        var _this = this;
        this.icons.forEach( function(icon){
            let spriteset = ageofshimrod.tileset.get(icon.src);
            _this.ctx.drawImage(
                spriteset,
                0,
                0,
                32,
                32,
                icon.x,
                icon.y,
                32,
                32);
        })
    },
}
