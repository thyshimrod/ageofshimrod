'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Decor = function (){
    this.ressources = {};
    this.x = 0;
    this.y = 0;
    this.tileset = "";
    this.spriteset = undefined;
    this.tx = 0;
    this.ty = 0;
    this.sizeX = 0;
    this.sizeY = 0;
    this.ctx = undefined;
    this.name = "";
}

ageofshimrod.Decor.prototype ={
    init : function(templateId){
        var src = ageofshimrod.Decors[templateId];
        this.name = src.name;
        this.tx = src.sprite.x;
        this.ty = src.sprite.y;
        this.sizeY = src.size.y;
        this.sizeX = src.size.x;
        this.tileset = src.tileset;
        this.ressource = {
            "id" : src.ressources.id,
            "quantity" : src.ressources.quantity
        };

        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
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
            this.sizeX,
            this.sizeY);
    },

    render : function(){
        this.renderPosition(this.x,this.y,this.ctx);
    },
}