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
    this.peons = [];
    this.ressources = [];
    this.buildings = [];
}

ageofshimrod.Map.prototype ={
    init : function(){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        let peon = new ageofshimrod.Peon();
        peon.init();
        this.peons.push(peon);
        let stone = new ageofshimrod.Ressource();
        stone.init(ageofshimrod.C.RESSOURCE_PIERRE);
        stone.x = 512;
        stone.y = 256;
        this.ressources.push(stone);
        let house = new ageofshimrod.Building();
        house.init();
        this.buildings.push(house);
    },

    clickEvent : function(evt){
        for (let i=0;i < this.ressources.length ; i++){
            if (this.ressources[i].x < evt.pageX && evt.pageX < (this.ressources[i].x +32)
            && this.ressources[i].y < evt.pageY && evt.pageY < (this.ressources[i].y +32)){
                ageofshimrod.contextualOnRessource.toggle();
            }
        }
        for (let i=0;i < this.buildings.length ; i++){
            if (this.buildings[i].x < evt.pageX && evt.pageX < (this.buildings[i].x +64)
            && this.buildings[i].y < evt.pageY && evt.pageY < (this.buildings[i].y +64)){
                ageofshimrod.contextualOnBuilding.toggle();
            }
        }

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

        this.peons.forEach(function(peon){
            peon.render();
        })

        this.ressources.forEach(function(ressource){
            ressource.render();
        })

        this.buildings.forEach(function(building){
            building.render();
        })
    }
}
