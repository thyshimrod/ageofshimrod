'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Player = function (){
    this.ressources = [];
}

ageofshimrod.Player.prototype ={
    init : function(){
        let pierreInit = {
            "id" : ageofshimrod.C.RESSOURCE_PIERRE,
            "quantity" : 100
        };
        this.ressources.push(pierreInit);
        let boisInit = {
            "id" : ageofshimrod.C.RESSOURCE_BOIS,
            "quantity" : 100
        };
        this.ressources.push(boisInit);

    },
}