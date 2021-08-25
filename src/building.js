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
    this.materiauxNeeded = [];
    this.typeBuilding = undefined;

}

ageofshimrod.Building.prototype ={
    init : function(templateId){
        let src = ageofshimrod.Buildings[templateId];
        this.name = src.name;
        this.sizeX = src.size.x;
        this.sizeY = src.size.y;
        this.tx = src.sprite.x;
        this.ty = src.sprite.y;
        this.typeBuilding = src.typeBuilding;
        this.tileset = src.tileset;
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        this.capacity = src.capacity;
        for (let i=0;i<src.materiaux.length;i++){
            let mat = {
                "id" : src.materiaux[i].id,
                "quantity" : src.materiaux[i].quantity
            }
            this.materiauxNeeded.push(mat);
        }
        this.ressource = src.ressource;
    },

    removePeon : function(peon){
        const index = this.peons.indexOf(peon);
        if (index !== -1) {
            this.peons.splice(index, 1);
        }
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
        if (this.x < (window.innerWidth - ageofshimrod.gameEngine.decalageX)
        && this.x >= (-ageofshimrod.gameEngine.decalageX) 
        && this.y < (window.innerHeight - ageofshimrod.gameEngine.decalageY)
        && this.y >= (-ageofshimrod.gameEngine.decalageY)){
            this.renderPosition(this.x+ageofshimrod.gameEngine.decalageX,this.y+ageofshimrod.gameEngine.decalageY,this.ctx);
        }
    },
}
