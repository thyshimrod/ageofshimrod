'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Peon = function (){
    this.x = 0;
    this.y = 0;
    this.tileset = "./assets/sprite/adam.png";
    this.sizeX = 32;
    this.sizeY = 32;
    this.spriteset = undefined;
    this.ctx = undefined;
    this.house = undefined;
    this.affectation = undefined;
    this.status = ageofshimrod.C.PEON_STATUS_WAIT;
    this.target = undefined;
    this.step = ageofshimrod.C.CHARACTER_STEP;
    this.animation = 0;
    this.direction = ageofshimrod.C.DIRECTION_DOWN;
    this.ressource = {};
    this.animationTick = 0;
    this.collectTick = 0;
    this.hp = 10;
    this.hpMax = 10;
    this.attackSpeed = ageofshimrod.C.PEON_ATTACK_SPEED;
    this.attackTick = 0;
    this.healingTick = 0;
    this.behavior = undefined;
}

ageofshimrod.Peon.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
        if (this.findAHouse()) ageofshimrod.console.addMessage("Un peon est ne. Il a trouve une habitation!")
    },

    hit : function(damage){
        this.hp -= damage;
        if (this.hp <= 0){
            ageofshimrod.console.addMessage("Un peon est mort.");
            if (typeof this.affectation !== "undefined"){
                this.affectation.removePeon(this);
                this.affectation = undefined;
            }
            if (typeof this.house !== "undefined"){
                this.house.removePeon(this);
                this.house = "undefined";
            }
            
        }
    },

    handleHealing : function(){
        let d = new Date();
        let newTick = d.getTime();
        if (newTick - this.healingTick > ageofshimrod.C.PEON_HEALING_SPEED){
            this.hp = this.hp < this.hpMax ? this.hp +1 : this.hp;
            this.healingTick = newTick;
        }
    },

    gameLoop : function(){
        this.handleHealing();
        if (typeof this.affectation === "undefined"){
            this.status = ageofshimrod.C.PEON_STATUS_WAIT;
            //TODO : going back to Home
        }else{
            if (typeof this.behavior !== "undefined"){
                this.behavior.loop();
            }
        }
    },

    findAHouse : function(){
        for (let i = 0 ; i < ageofshimrod.map.buildings.length ; i++){
            let building = ageofshimrod.map.buildings[i];
            if (building.typeBuilding === ageofshimrod.C.BUILDING_HOUSE){
                if (building.peons.length < building.capacity){
                    building.peons.push(this);
                    this.house = building;
                    return true;
                }
            }
        }
        return false;
    },

    changeAffectation : function(building){
        this.affectation = building;
        let toFind = typeof building === "undefined" ? "None" : building.typeBuilding;
        if (typeof building !== "undefined"){
            if ( building.typeBuilding === ageofshimrod.C.BUILDING_ARMY){
                this.behavior = new ageofshimrod.BehaviorSoldier();
            }else if ( building.typeBuilding === ageofshimrod.C.BUILDING_LUMBER 
                    || building.typeBuilding === ageofshimrod.C.BUILDING_MINEUR){
                this.behavior = new ageofshimrod.BehaviorLumber();
            }else if ( building.typeBuilding === ageofshimrod.C.BUILDING_FARM ){
                this.behavior = new ageofshimrod.BehaviorFarmer();
            }
        }
        if (typeof this.behavior !== "undefined"){
            this.behavior.character = this;
            this.behavior.init();
        }
        var _this = this;
        ageofshimrod.Sprite4Specialist.forEach(function(sprite){
            if (sprite.name === toFind){
                _this.tileset = sprite.sprite;
            }
        })
        this.target = undefined;
    },

    renderCollect : function(){
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
        this.ctx.fillRect(this.x+5+ageofshimrod.gameEngine.decalageX,this.y-15+ageofshimrod.gameEngine.decalageY,30,10);
        this.ctx.beginPath();
        this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
        this.ctx.rect(this.x+5+ageofshimrod.gameEngine.decalageX,this.y-15+ageofshimrod.gameEngine.decalageY,30,10);
        this.ctx.stroke();
        this.ctx.font = "10px Verdana";
        this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
        let text = 0;
        if (typeof this.behavior !== "undefined" && typeof this.behavior.ressource !== "undefined"){
            text = this.behavior.ressource.quantity;
        }
        this.ctx.fillText(text ,
            this.x + 14 +ageofshimrod.gameEngine.decalageX, 
            this.y - 7+ageofshimrod.gameEngine.decalageY);
    },

    renderJaugeHp : function(){
        var prctLife = Math.round((this.hp/this.hpMax)*30);
        if (prctLife < 0) prctLife = 0;
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
        this.ctx.fillRect(this.x+5 +ageofshimrod.gameEngine.decalageX ,this.y-5 +ageofshimrod.gameEngine.decalageY,30,3);
        this.ctx.beginPath();
        this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
        this.ctx.rect(this.x+5 +ageofshimrod.gameEngine.decalageX,this.y-5 +ageofshimrod.gameEngine.decalageY,30,3);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_BORDER_RED;
        this.ctx.fillRect(this.x+5 +ageofshimrod.gameEngine.decalageX ,this.y-5 +ageofshimrod.gameEngine.decalageY,prctLife,3);
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
        && this.x >= (-ageofshimrod.gameEngine.decalageX) 
        && this.y < (window.innerHeight - ageofshimrod.gameEngine.decalageY)
        && this.y >= (-ageofshimrod.gameEngine.decalageY)){
            this.renderPosition(this.x +ageofshimrod.gameEngine.decalageX,this.y +ageofshimrod.gameEngine.decalageY,this.ctx);
            if (typeof this.affectation !== "undefined" &&
             (this.affectation.typeBuilding === ageofshimrod.C.BUILDING_MINEUR || this.affectation.typeBuilding === ageofshimrod.C.BUILDING_LUMBER)
            ){
                this.renderCollect();
            }
            this.renderJaugeHp();
        }
    },
}