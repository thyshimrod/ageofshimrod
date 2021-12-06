'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.BehaviorFarmer = function (){
    this.target = undefined;
    this.character = undefined;
    this.ressource = undefined;
    this.collectTick = 0;
};

ageofshimrod.BehaviorFarmer.prototype ={
    init : function(){
        this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
    },
   
    loop : function(){
        if (this.character.status === ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION){
            this.character.status = goToTarget(this.character,this.character.affectation);
        }else if (this.character.status === ageofshimrod.C.PEON_STATUS_WAIT){
            if ( calcDistance(this.character, this.character.affectation) > 32){
                this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
            }
        }
    }
};
