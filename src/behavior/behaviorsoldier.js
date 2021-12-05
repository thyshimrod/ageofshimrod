'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.BehaviorSoldier = function (){
    this.target = undefined;
    this.character = undefined;
    this.attackTick = 0;
};

ageofshimrod.BehaviorSoldier.prototype ={
    init : function(){
        this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
    },

    checkForTarget : function(){
        if(ageofshimrod.map.monsters.length>0){
            this.target = ageofshimrod.map.monsters[0];
            this.character.status = ageofshimrod.C.PEON_STATUS_ATTACK_ENNEMY;
        }
    },

    handleAttackEnnemyStatus : function(){
        let retVal = goToTarget(this.character,this.target);
        if (retVal === ageofshimrod.C.PEON_STATUS_WAIT){
            let d = new Date();
            let newTick = d.getTime();
            if (newTick - this.attackTick > this.character.attackSpeed){
                this.attackTick = newTick;
                //TODO change 1 to attack strength
                this.target.hit(1);
            }
            if (this.target.hp <= 0){
                this.target = undefined;
                this.character.status = ageofshimrod.C.PEON_STATUS_WAIT;
            }
        }
    },

    loop : function(){
        if (this.character.status === ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION){
            this.character.status = goToTarget(this.character,this.character.affectation);
            this.checkForTarget();
        }else if (this.character.status === ageofshimrod.C.PEON_STATUS_WAIT){
            if ( calcDistance(this.character, this.character.affectation) > 32){
                this.character.status = ageofshimrod.C.PEON_STATUS_GOTO_AFFECTATION;
            }
            this.checkForTarget();
        }else if (this.character.status === ageofshimrod.C.PEON_STATUS_ATTACK_ENNEMY){
            if (typeof this.target !== "undefined"){
                this.handleAttackEnnemyStatus();
            }else{
                this.character.status = ageofshimrod.C.PEON_STATUS_WAIT;
            }
        }
    }
};
