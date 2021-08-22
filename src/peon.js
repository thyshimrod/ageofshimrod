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
    this.decor = undefined;
    this.step = ageofshimrod.C.CHARACTER_STEP;
    this.animation = 0;
    this.direction = ageofshimrod.C.DIRECTION_DOWN;
    this.ressource = {};
    this.animationTick = 0;
    this.collectTick = 0;
    this.hp = 5;
    this.hpMax = 10;
}

ageofshimrod.Peon.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
        if (this.findAHouse()) console.log("Maison trouvee");
    },

    hit : function(damage){
        this.hp -= damage;
    },

    manageGoToRessourceStatus : function(){
        if (typeof this.decor === "undefined" || this.decor.ressource.quantity == 0){
            let distance = -1;
            let decor = undefined;
            for(let i=0;i<ageofshimrod.map.decors.length;i++){
                if (this.affectation.ressource === ageofshimrod.map.decors[i].ressource.id
                    && ageofshimrod.map.decors[i].ressource.quantity > 0){
                    let dist = calcDistance (this,ageofshimrod.map.decors[i]);
                    if (distance === -1 || distance > dist){
                        distance = dist;
                        decor = ageofshimrod.map.decors[i];
                    }
                }
            }
            if (typeof decor !== "undefined"){
                this.decor = decor;
            }
        }else{
            if (this.x < (this.decor.x ) ){
                let step = (this.decor.x-this.x) > this.step ? this.step : (this.decor.x-this.x);
                this.x += step;
                this.direction = ageofshimrod.C.DIRECTION_RIGHT;
            } 
            if (this.x > (this.decor.x  ) ){
                let step = (this.x -this.decor.x) > this.step ? this.step : (this.x -this.decor.x);
                this.x -= step;
                this.direction = ageofshimrod.C.DIRECTION_LEFT;
            } 
            if (this.y < (this.decor.y ) ){
                let step = (this.decor.y-this.y) > this.step ? this.step : (this.decor.y-this.y);
                this.y += step;
                this.direction = ageofshimrod.C.DIRECTION_DOWN;
            } 
            if (this.y > (this.decor.y  ) ){
                let step = (this.y -this.decor.y) > this.step ? this.step : (this.y -this.decor.y);
                this.y -= step;
                this.direction = ageofshimrod.C.DIRECTION_UP  
            } 

            if (calcDistance(this,this.decor) > 32){
                let d = new Date();
                let newTick = d.getTime();
                if (newTick - this.animationTick > ageofshimrod.C.ANIMATION_SPEED){
                    this.animationTick = newTick;
                    this.animation += 1;
                    if (this.animation > 2) this.animation = 0;
                }
            }else{
                this.status = ageofshimrod.C.PEON_STATUS_COLLECT;
            }
         }   
    },

    manageCollectStatus : function(){
        if (this.decor.ressource.quantity > 0){
            if (typeof this.ressource === "undefined"){
                this.ressource = {
                    "id" : this.decor.ressource.id,
                    "quantity" : 0
                }
            }else if (this.ressource.id !== this.decor.ressource.id){
                this.ressource.id = this.decor.ressource.id;
                this.ressource.quantity = 0;
            }else{
                if (this.decor.ressource.quantity > 0){
                    let d = new Date();
                    let newTick = d.getTime();
                    if (newTick - this.collectTick > ageofshimrod.C.COLLECT_SPEED){
                        this.collectTick = newTick;
                        this.ressource.quantity += 1;
                        this.decor.ressource.quantity -= 1;
                        //TODO ANIMATION of collect
                        if (this.ressource.quantity >= 10){
                            this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
                        }
                    }
                }else{
                    this.decor = undefined;
                    this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
                }
            }
        }else{
            this.decor = undefined;
            if (this.ressource.quantity > 0){
                this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
            }else{
                this.status = ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE;
            }
        }
    },

    manageGoToStock : function(){
        if (this.x < (this.affectation.x ) ){
            let step = (this.affectation.x-this.x) > this.step ? this.step : (this.affectation.x-this.x);
            this.x += step;
            this.direction = ageofshimrod.C.DIRECTION_RIGHT;
        } 
        if (this.x > (this.affectation.x) ){
            let step = (this.x -this.affectation.x) > this.step ? this.step : (this.x -this.affectation.x);
            this.x -= step;
            this.direction = ageofshimrod.C.DIRECTION_LEFT;
        } 
        if (this.y < (this.affectation.y) ){
            let step = (this.affectation.y-this.y) > this.step ? this.step : (this.affectation.y-this.y);
            this.y += step;
            this.direction = ageofshimrod.C.DIRECTION_DOWN;
        } 
        if (this.y > (this.affectation.y ) ){
            let step = (this.y -this.affectation.y) > this.step ? this.step : (this.y -this.affectation.y);
            this.y -= step;
            this.direction = ageofshimrod.C.DIRECTION_UP  
        } 
        if (calcDistance(this,this.affectation) > 32){
            let d = new Date();
            let newTick = d.getTime();
            if (newTick - this.animationTick > ageofshimrod.C.ANIMATION_SPEED){
                this.animationTick = newTick;
                this.animation += 1;
                if (this.animation > 2) this.animation = 0;
            }
        }else{
            for (let i=0;i < ageofshimrod.player.ressources.length;i++){
                if (ageofshimrod.player.ressources[i].id === this.ressource.id){
                    let data = { "idRessource" : this.ressource.id, "quantity" : this.ressource.quantity};
                    ageofshimrod.recordGame.addRecord(ageofshimrod.C.RECORD_RECOLT,data);
                    ageofshimrod.player.ressources[i].quantity += this.ressource.quantity;
                    this.ressource.quantity = 0;
                    
                    break;
                }
            }
            this.status = ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE;
        }
    },

    gameLoop : function(){
        if (typeof this.affectation === "undefined"){
            this.status = ageofshimrod.C.PEON_STATUS_WAIT;
        }else{
            if (this.status === ageofshimrod.C.PEON_STATUS_WAIT){
                if (typeof this.affectation !== "undefined"){
                    this.status = ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE;
                }
            }else if (this.status === ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE){
                this.manageGoToRessourceStatus();
            }else if (this.status === ageofshimrod.C.PEON_STATUS_COLLECT){
                this.manageCollectStatus();
            }else if (this.status === ageofshimrod.C.PEON_STATUS_GOTO_STOCK){
                this.manageGoToStock();
            }
        }
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

    changeAffectation : function(building){
        this.affectation = building;
        let toFind = typeof building === "undefined" ? "None" : building.name;
        var _this = this;
        ageofshimrod.Sprite4Specialist.forEach(function(sprite){
            if (sprite.name === toFind){
                _this.tileset = sprite.sprite;
            }
        })
        this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
        this.decor = undefined;
    },

    renderCollect : function(){
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
        this.ctx.fillRect(this.x+5,this.y-15,30,10);
        this.ctx.beginPath();
        this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
        this.ctx.rect(this.x+5,this.y-15,30,10);
        this.ctx.stroke();
        this.ctx.font = "10px Verdana";
        this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
        let text = typeof this.ressource.quantity !== "undefined" ? this.ressource.quantity : 0;
        this.ctx.fillText(text ,
            this.x + 14, 
            this.y - 7);
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
        if (typeof this.affectation !== "undefined" && this.affectation.name !== "Maison"){
           this.renderCollect();
        }
        this.renderJaugeHp();
    },
}