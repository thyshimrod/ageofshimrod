'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.RecordGame = function (){
    this.listOfRecords = [];
    this.listOfObjectifs = [];
}

ageofshimrod.RecordGame.prototype ={
    init : function(){
        this.listOfRecords = [];
    },

    addObjectif : function(typeObjectif, data){
        let objectif = {
            "id" : typeObjectif,
            "data" : data,
            "status" : ageofshimrod.C.OBJECTIF_STATUS_INPROGRESS
        };
        this.listOfObjectifs.push(objectif);
        console.log(this.listOfObjectifs);
    },

    checkObjectifs : function(){
        for (let i = 0 ; i < this.listOfObjectifs.length ; i ++){
            let objectif = this.listOfObjectifs[i];
            if (objectif.status === ageofshimrod.C.OBJECTIF_STATUS_INPROGRESS){
                if (objectif.id === ageofshimrod.C.RECORD_RECOLT){
                    for (let itRecord = 0 ; itRecord < this.listOfRecords.length ; itRecord++){
                        let record = this.listOfRecords[itRecord];
                        if (record.id === objectif.id){
                            for (let itRessource = 0 ; itRessource < record.ressources.length ; itRessource ++){
                                if (record.ressources[itRessource].id === objectif.data.idRessource){
                                    if (record.ressources[itRessource].quantity >= objectif.data.quantity){
                                        objectif.status = ageofshimrod.C.OBJECTIF_STATUS_DONE;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        let result = true;
        for (let i = 0 ; i < this.listOfObjectifs.length ; i ++){
            if (this.listOfObjectifs[i].status === ageofshimrod.C.OBJECTIF_STATUS_INPROGRESS){
                result = false;
                break;
            }
        }
        if (result){
            ageofshimrod.gameEngine.status = ageofshimrod.C.GAME_STATUS_ENDGAME;
        }
        console.log(this.listOfObjectifs);
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