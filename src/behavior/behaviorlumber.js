'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.BehaviorLumber = function (){
    this.target = undefined;
    this.character = undefined;
    this.ressource = undefined;
    this.collectTick = 0;
};

ageofshimrod.BehaviorLumber.prototype ={
    init : function(){
        this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
    },

    unloadRessources : function(){
        if (typeof this.ressource !== "undefined" && this.ressource.quantity  > 0){
            for (let i=0;i < ageofshimrod.player.ressources.length;i++){
                if (ageofshimrod.player.ressources[i].id === this.ressource.id){
                    let data = { 
                                "idRessource" : this.ressource.id,
                                "quantity"   : this.ressource.quantity
                            };
                    ageofshimrod.recordGame.addRecord(ageofshimrod.C.RECORD_RECOLT,data);
                    ageofshimrod.player.ressources[i].quantity += this.ressource.quantity;
                    this.ressource.quantity = 0;
                    break;
                }
            }
        }
    },

    manageGoToRessourceStatus : function(){
        if (typeof this.target === "undefined" || this.target.ressource.quantity == 0){
            let distance = -1;
            let decor = undefined;
            for(let i=0;i<ageofshimrod.map.decors.length;i++){
                if (this.character.affectation.ressource === ageofshimrod.map.decors[i].ressource.id
                    && ageofshimrod.map.decors[i].ressource.quantity > 0){
                    let dist = calcDistance (this.character,ageofshimrod.map.decors[i]);
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
            goToTarget(this,this.target);
            if (calcDistance(this,this.target) < 32){
                this.status = ageofshimrod.C.PEON_STATUS_COLLECT;
            }
         }   
    },

    findNewTarget : function(){
        if (typeof this.target === "undefined" || this.target.ressource.quantity == 0){
            let distance = -1;
            let decor = undefined;
            for(let i=0;i<ageofshimrod.map.decors.length;i++){
                if (this.character.affectation.ressource === ageofshimrod.map.decors[i].ressource.id
                    && ageofshimrod.map.decors[i].ressource.quantity > 0){
                    let dist = calcDistance (this.character,ageofshimrod.map.decors[i]);
                    if (distance === -1 || distance > dist){
                        distance = dist;
                        decor = ageofshimrod.map.decors[i];
                    }
                }
            }
            if (typeof decor !== "undefined"){
                this.target = decor;
            }
        }
    },

    handleCollect : function(){
        if (typeof this.target !== "undefined" && this.target.ressource.quantity > 0){
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
                            this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
                        }
                    }
                }else{
                    this.target = undefined;
                    this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
                }
            }
        }else{
            this.target = undefined;
            if (this.ressource.quantity > 0){
                this.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
            }else{
                this.character.status = ageofshimrod.C.PEON_STATUS_WAIT;
            }
        }
    },
   
    loop : function(){
        if (this.character.status === ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION){
            this.character.status = goToTarget(this.character,this.character.affectation);
            if (this.character.status === ageofshimrod.C.PEON_STATUS_WAIT) this.unloadRessources();
        }else if (this.character.status === ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE){
            let retVal = goToTarget(this.character,this.target);
            if (retVal === ageofshimrod.C.PEON_STATUS_WAIT){
                this.character.status = ageofshimrod.C.PEON_STATUS_COLLECT;
            }
        }else if (this.character.status === ageofshimrod.C.PEON_STATUS_COLLECT){
            this.handleCollect();
        }else if (this.character.status === ageofshimrod.C.PEON_STATUS_WAIT){
            if ( calcDistance(this.character, this.character.affectation) > 32){
                this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
            }else{
                this.findNewTarget();
                if (typeof this.target !== "undefined"){
                    this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE;
                }
            }
        }
    }
};
