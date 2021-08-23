'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Ressource = function (){
    this.x = 0;
    this.y = 0;
    this.tileset = "";
    this.spriteset = undefined;
    this.tx = 0;
    this.ty = 0;
    this.ctx = undefined;
    this.name = "";
}

ageofshimrod.Ressource.prototype ={
    init : function(templateId){
        var src = ageofshimrod.Ressources[templateId];
        this.name = src.name;
        this.tx = src.sprite.x;
        this.ty = src.sprite.y;
        this.tileset = src.tileset;

        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
    },
    renderPosition : function(x,y,ctx){
        ctx.drawImage(
            this.spriteset,
            this.tx,
            this.ty,
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