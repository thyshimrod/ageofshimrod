'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Building = function (){
    this.sizeX = 88;
    this.sizeY = 106;
    this.tileset = "./assets/tileset/pngwing.com.png";
    this.tx = 32;
    this.ty = 440;
    this.x = 100;
    this.y = 100;
    this.spriteset = undefined;
    this.ctx = undefined;
    this.name = "Maison";
    this.capacity = 2;
    this.peons = [];

}

ageofshimrod.Building.prototype ={
    init : function(){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
    },


    renderPosition : function(x,y,ctx){
        ctx.drawImage(
            this.spriteset,
            this.tx,
            this.ty,
            this.sizeX,
            this.sizeY,
            x,
            y,
            64,
            64);
    },

    render : function(){
        this.renderPosition(this.x,this.y,this.ctx);
    },
}
