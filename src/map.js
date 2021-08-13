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
    this.stoneX = 32;
    this.stoneY = 1854;
    this.peons = [];
}

ageofshimrod.Map.prototype ={
    init : function(){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        let peon = new ageofshimrod.Peon();
        peon.init();
        this.peons.push(peon);
    },

    render : function(){
        
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
        this.ctx.drawImage(
            this.spriteset,
            this.stoneX,
            this.stoneY,
            32,
            32,
            192,
            192,
            32,
            32);

        this.peons.forEach(function(peon){
            peon.render();
        })
    }
}
