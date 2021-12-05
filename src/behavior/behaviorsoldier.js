'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.BehaviorSoldier = function (){
    this.target = undefined;
    this.affectation = undefined;
};

ageofshimrod.BehaviorSoldier.prototype ={
    init : function(){
    },

    loop : function(){

        return ageofshimrod.C.PEON_STATUS_GOTO_STOCK;
    }
};
