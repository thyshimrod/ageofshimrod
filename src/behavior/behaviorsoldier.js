'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.BehaviorSoldier = function (){
    this.target = undefined;
    this.character = undefined;
};

ageofshimrod.BehaviorSoldier.prototype ={
    init : function(){
        this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
    },

    loop : function(){
        if (this.character.status === ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION){
            this.character.status = goToTarget(this.character,this.character.affectation);
        }else if (this.character.status === ageofshimrod.C.PEON_STATUS_WAIT){
        }
    }
};
