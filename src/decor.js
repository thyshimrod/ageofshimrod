'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Decor = function (){
    this.ressource = {};
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
    this.id = -1;
}

ageofshimrod.Decor.prototype ={
    init : function(templateId){
        this.id = templateId;
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

    loadFromJs : function(decorJs){
        this.init(decorJs.id);
        this.x = decorJs.x;
        this.y = decorJs.y;
    },

    getJs : function(){
        let decorJs = {};
        decorJs.id = this.id;
        decorJs.x = this.x;
        decorJs.y = this.y;
        return decorJs;
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
        if (this.x < (window.innerWidth - ageofshimrod.gameEngine.decalageX)
        && this.x >= (-ageofshimrod.gameEngine.decalageX) 
        && this.y < (window.innerHeight - ageofshimrod.gameEngine.decalageY)
        && this.y >= (-ageofshimrod.gameEngine.decalageY)){
            this.renderPosition(this.x+ageofshimrod.gameEngine.decalageX,this.y+ageofshimrod.gameEngine.decalageY,this.ctx);
        }
    },
}