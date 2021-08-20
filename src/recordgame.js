'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.RecordGame = function (){
    this.listOfRecords = [];
}

ageofshimrod.RecordGame.prototype ={
    init : function(){
        this.listOfRecords = [];
        this.listOfObjectifs = [];
    },

    addRecord : function(typeRecord, data){
        let found = false;
        for (let i=0;i<this.listOfRecords.length;i++){
            if (this.listOfRecords[i].id === typeRecord){
                found = true;
                if (typeRecord === ageofshimrod.C.RECORD_RECOLT){
                    let ressourceFound = false;
                    for (let itRessource = 0 ; itRessource < this.listOfRecords[i].ressources.length;itRessource++){   
                        if (this.listOfRecords[i].ressources[itRessource].id === data.idRessource){
                            
                            this.listOfRecords[i].ressources[itRessource].quantity += data.quantity;
                            ressourceFound = true;
                            break;
                        }
                        if (!ressourceFound){
                            let ressource = {
                                "id" : data.idRessource,
                                "quantity" : data.quantity
                            }
                            this.listOfRecords[i].ressources.push(ressource);
                        }
                    }
                }
            }
        }

        if (!found){
            let record = {};
            if (typeRecord === ageofshimrod.C.RECORD_RECOLT){
                let ressource  = {
                    "id" : data.idRessource,
                    "quantity" : data.quantity
                }
                let ressources = [];
                ressources.push(ressource);
                record = {
                    "id" : typeRecord,
                    "ressources" : ressources
                }
            }else{
                record = {
                    "id" : typeRecord,
                    "quantity" : data
                }
            }
            this.listOfRecords.push(record);
        }
    },

}