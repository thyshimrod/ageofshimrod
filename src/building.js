'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Building = function (){
    this.sizeX = 0;
    this.sizeY = 0;
    this.tileset = "";
    this.tx = 0;
    this.ty = 0;
    this.x = 100;
    this.y = 100;
    this.spriteset = undefined;
    this.ctx = undefined;
    this.name = "";
    this.capacity = 0;
    this.peons = [];

}

ageofshimrod.Building.prototype ={
    init : function(templateId){
        let src = ageofshimrod.Buildings[templateId];
        this.name = src.name;
        this.sizeX = src.size.x;
        this.sizeY = src.size.y;
        this.tx = src.sprite.x;
        this.ty = src.sprite.y;
        this.tileset = src.tileset;
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        this.capacity = src.capacity;
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
