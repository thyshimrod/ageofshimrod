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
    this.status = ageofshimrod.C.MONSTER_STATUS_GOTO_TARGET;
    this.step = ageofshimrod.C.CHARACTER_STEP;
    this.animation = 0;
    this.direction = ageofshimrod.C.DIRECTION_DOWN;
    this.animationTick = 0;
    this.hp = 5;
    this.hpMax = 10;
    this.target = undefined;
    this.attackSpeed = ageofshimrod.C.MONSTER_ATTACK_SPEED;
    this.attackTick = 0;
}

ageofshimrod.Monster.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
    },

    searchTarget : function(){
        let dist = -1;
        for (let i=0; i < ageofshimrod.map.peons.length;i++){
            let distance = calcDistance(this, ageofshimrod.map.peons[i]);
            if (dist === -1 || dist > distance){
                dist = distance;
                this.target = ageofshimrod.map.peons[i]
            }
        }
    },

    gameLoop : function(){
        if (this.status === ageofshimrod.C.MONSTER_STATUS_GOTO_TARGET){
            if (typeof this.target === "undefined"){
                this.searchTarget();
            }else{
                if (this.x < (this.target.x ) ){
                    let step = (this.target.x-this.x) > this.step ? this.step : (this.target.x-this.x);
                    this.x += step;
                    this.direction = ageofshimrod.C.DIRECTION_RIGHT;
                } 
                if (this.x > (this.target.x) ){
                    let step = (this.x -this.target.x) > this.step ? this.step : (this.x -this.target.x);
                    this.x -= step;
                    this.direction = ageofshimrod.C.DIRECTION_LEFT;
                } 
                if (this.y < (this.target.y) ){
                    let step = (this.target.y-this.y) > this.step ? this.step : (this.target.y-this.y);
                    this.y += step;
                    this.direction = ageofshimrod.C.DIRECTION_DOWN;
                } 
                if (this.y > (this.target.y ) ){
                    let step = (this.y -this.target.y) > this.step ? this.step : (this.y -this.target.y);
                    this.y -= step;
                    this.direction = ageofshimrod.C.DIRECTION_UP  
                } 
                let d = new Date();
                let newTick = d.getTime();
                if (newTick - this.animationTick > ageofshimrod.C.ANIMATION_SPEED){
                    this.animationTick = newTick;
                    this.animation += 1;
                    if (this.animation > 2) this.animation = 0;
                }
                
                if (calcDistance(this,this.target) < 32){
                    this.status = ageofshimrod.C.MONSTER_STATUS_ATTACK;
                }
            }
        }else if (this.status === ageofshimrod.C.MONSTER_STATUS_ATTACK){
            
            if (calcDistance(this,this.target) > 32){
                this.status = ageofshimrod.C.MONSTER_STATUS_GOTO_TARGET;
            }else{
                let d = new Date();
                let newTick = d.getTime();
                if (newTick - this.attackTick > this.attackSpeed){
                    this.attackTick = newTick;
                    this.target.hit(1);
                }
                if (this.target.hp <= 0){
                    this.target = undefined;
                    this.status = ageofshimrod.C.MONSTER_STATUS_GOTO_TARGET;
                }
            }
        }
    },

    hit : function(damage){
        this.hp -= damage;
    },

    renderJaugeHp : function(){
        var prctLife = Math.round((this.hp/this.hpMax)*30);
        if (prctLife < 0) prctLife = 0;
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
        this.ctx.fillRect(this.x+5+ageofshimrod.gameEngine.decalageX,this.y-5+ageofshimrod.gameEngine.decalageY,30,3);
        this.ctx.beginPath();
        this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
        this.ctx.rect(this.x+5+ageofshimrod.gameEngine.decalageX,this.y-5+ageofshimrod.gameEngine.decalageY,30,3);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_BORDER_RED;
        this.ctx.fillRect(this.x+5+ageofshimrod.gameEngine.decalageX,this.y-5+ageofshimrod.gameEngine.decalageY,prctLife,3);
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
        if (this.x < (window.innerWidth - ageofshimrod.gameEngine.decalageX)
        && this.x > (-ageofshimrod.gameEngine.decalageX) 
        && this.y < (window.innerHeight - ageofshimrod.gameEngine.decalageY)
        && this.y > (-ageofshimrod.gameEngine.decalageY)){
            this.renderPosition(this.x+ageofshimrod.gameEngine.decalageX,this.y+ageofshimrod.gameEngine.decalageY,this.ctx);
            this.renderJaugeHp();
        }
     },
}