'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.LevelEditor = function (){
    this.decors = [];
    this.tiles = [];
    this.tileset = "./assets/tileset/tileset1.png";
    this.spriteset = undefined;
    this.ctx = undefined;
    this.tileGrassX = 192;
    this.tileGrassY = 64;
    this.sizeX = 100;
    this.sizeY = 100;
    this.decor = undefined;
}

ageofshimrod.LevelEditor.prototype ={
    init : function (){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
    },

    chooseDecor : function(idDecor){
        let decor = new ageofshimrod.Decor();
        decor.init(idDecor);
        this.decor = decor;
    },

    render : function(){
        for (let i = 0 ; i < this.sizeX ; i++){
            for (let j = 0 ; j < this.sizeY ; j++){
                if (i*32 < window.innerWidth && j*32 < window.innerHeight){
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

        if (typeof this.decor !== "undefined"){
            this.decor.renderPosition(ageofshimrod.gameEditor.mouseX,ageofshimrod.gameEditor.mouseY,this.ctx);
        }
    }
}