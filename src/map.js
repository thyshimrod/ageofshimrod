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
    this.decors = [];
    this.buildings = [];
}

ageofshimrod.Map.prototype ={
    init : function(){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        
        let stone = new ageofshimrod.Decor();
        stone.init(ageofshimrod.C.DECOR_PIERRE);
        stone.x = 512;
        stone.y = 256;
        this.decors.push(stone);
        let arbre = new ageofshimrod.Decor();
        arbre.init(ageofshimrod.C.DECOR_ARBRE)
        arbre.x = 768;
        arbre.y = 512;
        this.decors.push(arbre);
        let house = new ageofshimrod.Building();
        house.init(ageofshimrod.C.BUILDING_HOUSE);
        house.x = 100;
        house.Y = 100;
        this.buildings.push(house);
        house = new ageofshimrod.Building();
        house.init(ageofshimrod.C.BUILDING_LUMBER);
        house.x = 200;
        house.y = 200;
        this.buildings.push(house);
        let peon = new ageofshimrod.Peon();
        peon.init();
        peon.x =300;
        this.peons.push(peon);
        peon = new ageofshimrod.Peon();
        peon.init();
        peon.x =350;
        this.peons.push(peon);
    },

    gameLoop : function(){
        this.peons.forEach(function(peon){
            peon.gameLoop();
        })
    },

    clickEvent : function(evt){
        for (let i=0;i < this.decors.length ; i++){
            if (this.decors[i].x < evt.pageX && evt.pageX < (this.decors[i].x + this.decors[i].sizeX)
            && this.decors[i].y < evt.pageY && evt.pageY < (this.decors[i].y + this.decors[i].sizeY)){
                ageofshimrod.contextualOnDecor.decor = this.decors[i];
                ageofshimrod.contextualOnDecor.toggle();
            }
        }
        for (let i=0;i < this.buildings.length ; i++){
            if (this.buildings[i].x < evt.pageX && evt.pageX < (this.buildings[i].x +64)
            && this.buildings[i].y < evt.pageY && evt.pageY < (this.buildings[i].y +64)){
                ageofshimrod.contextualOnBuilding.building = this.buildings[i];
                ageofshimrod.contextualOnBuilding.toggle();
            }
        }

    },

    findPeonFree : function(){
        let result = [];
        var _this = this;
        this.peons.forEach(function(peon){
            if (typeof peon.affectation === "undefined"){
                result.push(peon);
            }
        })
        return result;
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

        this.decors.forEach(function(decor){
            decor.render();
        })

        this.buildings.forEach(function(building){
            building.render();
        })
    }
}
