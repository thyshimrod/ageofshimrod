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
    this.house = undefined;
}

ageofshimrod.Peon.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
        if (this.findAHouse()) console.log("Maison trouvee");
    },

    findAHouse : function(){
        for (let i = 0 ; i < ageofshimrod.map.buildings.length ; i++){
            let building = ageofshimrod.map.buildings[i];
            if (building.name === "Maison"){
                if (building.peons.length < building.capacity){
                    building.peons.push(this);
                    this.house = building;
                    return true;
                }
            }
        }
        return false;
    },

    renderPosition : function(x,y,ctx){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        ctx.drawImage(
            this.spriteset,
            0,
            0,
            32,
            32,
            x,
            y,
            32,
            32);
    },

    render : function(){
        this.renderPosition(this.x,this.y,this.ctx);
    },
}
