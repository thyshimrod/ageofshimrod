'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Peon = function (){
    this.x = 0;
    this.y = 0;
    this.tileset = "./assets/sprite/adam.png";
    this.spriteset = undefined;
    this.ctx = undefined;
    this.stoneX = 32;
    this.stoneY = 1854;
}

ageofshimrod.Peon.prototype ={
    init : function(){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
    },

    render : function(){
        this.ctx.drawImage(
            this.spriteset,
            0,
            0,
            32,
            32,
            this.x,
            this.y,
            32,
            32);
    }
}
