'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Peon = function (){
    this.x = 0;
    this.y = 0;
    this.tileset = "./assets/sprite/adam.png";
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
}

ageofshimrod.Peon.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
        if (this.findAHouse()) console.log("Maison trouvee");
    },

    manageGoToRessourceStatus : function(){
        if (typeof this.decor === "undefined" || this.decor.ressource.quantity == 0){
            for(let i=0;i<ageofshimrod.map.decors.length;i++){
                if (this.affectation.ressource === ageofshimrod.map.decors[i].ressource.id
                    && ageofshimrod.map.decors[i].ressource.quantity > 0){
                    this.decor = ageofshimrod.map.decors[i];
                    break;
                }
            }
        }else{
            if (this.x < (this.decor.x - 21) ){
                this.x += this.step;
                this.direction = ageofshimrod.C.DIRECTION_RIGHT;
            } 
            if (this.x > (this.decor.x + this.decor.sizeX +10) ){
                this.x -= this.step;
                this.direction = ageofshimrod.C.DIRECTION_LEFT;
            } 
            if (this.y < (this.decor.y - 21) ){
                this.y += this.step;
                this.direction = ageofshimrod.C.DIRECTION_DOWN;
            } 
            if (this.y > (this.decor.y + this.decor.sizeY +10) ){
                this.y -= this.step;
                this.direction = ageofshimrod.C.DIRECTION_UP  
            } 

            if (calcDistance(this,this.decor) > 32){
                this.animation += 1;
                if (this.animation > 2) this.animation = 0;
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
                    this.ressource.quantity += 1;
                    this.decor.ressource.quantity -= 1;
                    //TODO ANIMATION of collect
                    if (this.ressource.quantity >= 10){
                        this.status = ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
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
        if (this.x < (this.affectation.x - 21) ){
            this.x += this.step;
            this.direction = ageofshimrod.C.DIRECTION_RIGHT;
        } 
        if (this.x > (this.affectation.x + 32 +10) ){
            this.x -= this.step;
            this.direction = ageofshimrod.C.DIRECTION_LEFT;
        } 
        if (this.y < (this.affectation.y - 21) ){
            this.y += this.step;
            this.direction = ageofshimrod.C.DIRECTION_DOWN;
        } 
        if (this.y > (this.affectation.y + 32 +10) ){
            this.y -= this.step;
            this.direction = ageofshimrod.C.DIRECTION_UP  
        } 
        if (calcDistance(this,this.affectation) > 64){
            this.animation += 1;
            if (this.animation > 2) this.animation = 0;
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

    renderPosition : function(x,y,ctx){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        ctx.drawImage(
            this.spriteset,
            this.animation*32,
            this.direction*32,
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
