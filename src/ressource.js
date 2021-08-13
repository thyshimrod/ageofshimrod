'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Ressource = function (){
    this.x = 0;
    this.y = 0;
    this.tileset = "./assets/tileset/tileset1.png";
    this.spriteset = undefined;
    this.tx = 32;
    this.ty = 1854;
    this.ctx = undefined;
}

ageofshimrod.Ressource.prototype ={
    init : function(){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
    },

    render : function(){
        this.ctx.drawImage(
            this.spriteset,
            this.tx,
            this.ty,
            32,
            32,
            this.x,
            this.y,
            32,
            32);
    },
}