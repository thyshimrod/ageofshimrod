'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Monster = function (){
    this.x = 0;
    this.y = 0;
    this.tileset = "./assets/sprite/loup.png";
    this.sizeX = 32;
    this.sizeY = 32;
    this.spriteset = undefined;
    this.ctx = undefined;
    this.house = undefined;
    this.status = 0;
    this.step = ageofshimrod.C.CHARACTER_STEP;
    this.animation = 0;
    this.direction = ageofshimrod.C.DIRECTION_DOWN;
    this.animationTick = 0;
    this.hp = 5;
    this.hpMax = 10;
}

ageofshimrod.Monster.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
    },

    gameLoop : function(){

    },

    renderJaugeHp : function(){
        var prctLife = Math.round((this.hp/this.hpMax)*30);
        if (prctLife < 0) prctLife = 0;
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
        this.ctx.fillRect(this.x+5,this.y-5,30,3);
        this.ctx.beginPath();
        this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
        this.ctx.rect(this.x+5,this.y-5,30,3);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_BORDER_RED;
        this.ctx.fillRect(this.x+5,this.y-5,prctLife,3);
    },

    renderPosition : function(x,y,ctx){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        ctx.drawImage(
            this.spriteset,
            this.animation*this.sizeX,
            this.direction*this.sizeY,
            this.sizeX,
            this.sizeY,
            x,
            y,
            32,
            32);
    },

    render : function(){
        this.renderPosition(this.x,this.y,this.ctx);
        this.renderJaugeHp();
    },
}