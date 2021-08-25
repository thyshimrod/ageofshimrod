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
}

ageofshimrod.Peon.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
        if (this.findAHouse()) console.log("Maison trouvee");
    },

    hit : function(damage){
        this.hp -= damage;
    },

    goToTarget : function(target){
        if (this.x < (target.x ) ){
            let step = (target.x-this.x) > this.step ? this.step : (target.x-this.x);
            this.x += step;
            this.direction = ageofshimrod.C.DIRECTION_RIGHT;
        } 
        if (this.x > (target.x  ) ){
            let step = (this.x -target.x) > this.step ? this.step : (this.x - target.x);
            this.x -= step;
            this.direction = ageofshimrod.C.DIRECTION_LEFT;
        } 
        if (this.y < (target.y ) ){
            let step = (target.y-this.y) > this.step ? this.step : (target.y-this.y);
            this.y += step;
            this.direction = ageofshimrod.C.DIRECTION_DOWN;
        } 
        if (this.y > (target.y  ) ){
            let step = (this.y -target.y) > this.step ? this.step : (this.y - target.y);
            this.y -= step;
            this.direction = ageofshimrod.C.DIRECTION_UP  
        } 

        if (calcDistance(this,target) > 32){
            let d = new Date();
            let newTick = d.getTime();
            if (newTick - this.animationTick > ageofshimrod.C.ANIMATION_SPEED){
                this.animationTick = newTick;
                this.animation += 1;
                if (this.animation > 2) this.animation = 0;
            }
        }
    },

    manageGoToRessourceStatus : function(){
        if (typeof this.target === "undefined" || this.target.ressource.quantity == 0){
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
                this.target = decor;
            }
        }else{
            this.goToTarget(this.target);
            if (calcDistance(this,this.target) < 32){
                this.status = ageofshimrod.C.PEON_STATUS_COLLECT;
            }
         }   
    },

    manageCollectStatus : function(){
        if (this.target.ressource.quantity > 0){
            if (typeof this.ressource === "undefined"){
                this.ressource = {
                    "id" : this.target.ressource.id,
                    "quantity" : 0
                }
            }else if (this.ressource.id !== this.target.ressource.id){
                this.ressource.id = this.target.ressource.id;
                this.ressource.quantity = 0;
            }else{
                if (this.target.ressource.quantity > 0){
                    let d = new Date();
                    let newTick = d.getTime();
                    if (newTick - this.collectTick > ageofshimrod.C.COLLECT_SPEED){
                        this.collectTick = newTick;
                        this.ressource.quantity += 1;
                        this.target.ressource.quantity -= 1;
                        if (this.ressource.quantity >= 10){
                            this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
                        }
                    }
                }else{
                    this.target = undefined;
                    this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
                }
            }
        }else{
            this.target = undefined;
            if (this.ressource.quantity > 0){
                this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
            }else{
                this.status = ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE;
            }
        }
    },

    manageGoToAffectation : function(){
        this.goToTarget(this.affectation);
        if (calcDistance(this,this.affectation) < 32){
            if (this.affectation.typeBuilding === ageofshimrod.C.BUILDING_ARMY){
                this.status = ageofshimrod.C.PEON_STATUS_GOTO_ENNEMY;
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
        }
    },

    manageStatusGoToEnnemy : function(){
        if (typeof this.target === "undefined"){
            let distance = -1;
            for(let i=0;i<ageofshimrod.map.monsters.length;i++){
                let dist = calcDistance (this,ageofshimrod.map.monsters[i]);
                if (distance === -1 || distance > dist){
                    distance = dist;
                    this.target = ageofshimrod.map.monsters[i];
                }  
            }
            if (typeof this.target === "undefined"){
                this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
            }
        }else{
            this.goToTarget(this.target);
            if (calcDistance(this,this.target)< 32){
                this.status = ageofshimrod.C.PEON_STATUS_ATTACK_ENNEMY;
            }
        }
    },

    manageAttackStatus : function(){
        if (calcDistance(this,this.target) > 32){
            this.status = ageofshimrod.C.PEON_STATUS_GOTO_ENNEMY;
        }else{
            let d = new Date();
            let newTick = d.getTime();
            if (newTick - this.attackTick > this.attackSpeed){
                this.attackTick = newTick;
                this.target.hit(1);
            }
            if (this.target.hp <= 0){
                this.target = undefined;
                this.status = ageofshimrod.C.PEON_STATUS_GOTO_ENNEMY;
            }
        }
    },

    gameLoop : function(){
        if (typeof this.affectation === "undefined"){
            this.status = ageofshimrod.C.PEON_STATUS_WAIT;
        }else{
            if (this.status === ageofshimrod.C.PEON_STATUS_WAIT){
                if (typeof this.affectation !== "undefined"){
                    if (this.affectation.typeBuilding === ageofshimrod.C.BUILDING_LUMBER 
                        || this.affectation.typeBuilding === ageofshimrod.C.BUILDING_MINEUR){
                        this.status = ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE;
                    }else if (this.affectation.typeBuilding === ageofshimrod.C.BUILDING_ARMY){
                        this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
                    }
                }
            }else if (this.status === ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE){
                this.manageGoToRessourceStatus();
            }else if (this.status === ageofshimrod.C.PEON_STATUS_COLLECT){
                this.manageCollectStatus();
            }else if (this.status === ageofshimrod.C.PEON_STATUS_GOTO_STOCK){
                this.manageGoToAffectation();
            }else if (this.status === ageofshimrod.C.PEON_STATUS_GOTO_ENNEMY){
                this.manageStatusGoToEnnemy();
            }else if (this.status === ageofshimrod.C.PEON_STATUS_ATTACK_ENNEMY){
                this.manageAttackStatus();
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
        var _this = this;
        ageofshimrod.Sprite4Specialist.forEach(function(sprite){
            if (sprite.name === toFind){
                _this.tileset = sprite.sprite;
            }
        })
        this.status = ageofshimrod.C.PEON_STATUS_WAIT;
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
        let text = typeof this.ressource.quantity !== "undefined" ? this.ressource.quantity : 0;
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