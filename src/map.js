'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Map = function (){
    this.sizeX = 300;
    this.sizeY = 300;
    this.tileset = "./assets/tileset/tileset1.png";
    this.tileGrassX = 192;
    this.tileGrassY = 64;
    this.spriteset = undefined;
    this.ctx = undefined;
}

ageofshimrod.Map.prototype ={
    init : function(){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
    },

    render : function(){
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        for (let i = 0 ; i < this.sizeX ; i++){
            for (let j = 0 ; j < this.sizeY ; j++){
                this.ctx.drawImage(
                    this.spriteset,
                    this.tileGrassX,
                    this.tileGrassY,
                    32,
                    32,
                    i*32,
                    j*32,
                    32,
                    32);
             
            }
        }
    }
}
