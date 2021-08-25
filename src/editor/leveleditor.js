'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.LevelEditor = function (){
    this.decors = [];
    this.tiles = [];
    this.tileset = "./assets/tileset/tileset1.png";
    this.spriteset = undefined;
    this.ctx = undefined;
    this.tileGrassX = 192;
    this.tileGrassY = 64;
    this.sizeX = 100;
    this.sizeY = 100;
    this.decor = undefined;
    this.name = "levelJs";
    this.status = ageofshimrod.C.EDITOR_STATUS_NONE;
}

ageofshimrod.LevelEditor.prototype ={

    initFromJs : function(levelJs){
        var _this = this;
        levelJs.decors.forEach(function(decorjs){
            let decor = new ageofshimrod.Decor();
            decor.loadFromJs(decorjs);
            _this.decors.push(decor);
        })
    },

    init : function (){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        var objLevel = JSON.parse(localStorage.getItem('levelJs'));
        if (typeof objLevel !== 'undefined' && objLevel !== null){
            this.initFromJs(objLevel);
        }else{
            if(typeof ageofshimrod.Levels !== "undefined" && ageofshimrod.Levels.length>0){
                this.initFromJs(ageofshimrod.Levels[0]);
            }
        }
    },

    chooseDecor : function(idDecor){
        let decor = new ageofshimrod.Decor();
        decor.init(idDecor);
        this.decor = decor;
        this.status = ageofshimrod.C.EDITOR_STATUS_ADD_DECOR;
    },

    saveToJs : function(){
        var saveJs = {};
        var decors = [];
        this.decors.forEach(function(decor){
            let decorJs = decor.getJs();
            decors.push(decorJs);
        })
        saveJs.decors = decors;
        saveJs.name = this.name;
        localStorage.setItem(this.name, JSON.stringify(saveJs));
    },

    clickEvent : function(evt){
        //TODO :planter sur une case /32 ... 
        //TODO : vérifier qu'un decor n'existe pas déjà sur cette case
        if (ageofshimrod.levelEditor.status === ageofshimrod.C.EDITOR_STATUS_ADD_DECOR){
            if (typeof ageofshimrod.levelEditor.decor !== "undefined"){
                let decor = new ageofshimrod.Decor();
                decor.init(ageofshimrod.levelEditor.decor.id);
                decor.x = Math.round((ageofshimrod.gameEditor.mouseX - ageofshimrod.gameEditor.decalageX)/32)*32;
                decor.y = Math.round((ageofshimrod.gameEditor.mouseY - ageofshimrod.gameEditor.decalageY)/32)*32;
                let found = false;
                for (let i=0;i<ageofshimrod.levelEditor.decors.length;i++){
                    if (ageofshimrod.levelEditor.decors[i].x === decor.x && ageofshimrod.levelEditor.decors[i].y === decor.y){
                        found = true;
                        break
                    }
                }
                if (!found) ageofshimrod.levelEditor.decors.push(decor);
            }
        }else if (ageofshimrod.levelEditor.status === ageofshimrod.C.EDITOR_STATUS_REMOVE_DECOR){
            let x = Math.round((ageofshimrod.gameEditor.mouseX- ageofshimrod.gameEditor.decalageX)/32)*32;
            let y = Math.round((ageofshimrod.gameEditor.mouseY- ageofshimrod.gameEditor.decalageY)/32)*32;
            let indexDecor = -1;
            for (let i=0;i<ageofshimrod.levelEditor.decors.length;i++){
                if (ageofshimrod.levelEditor.decors[i].x === x && ageofshimrod.levelEditor.decors[i].y === y){
                    indexDecor = i;
                    break
                }
            }
            if (indexDecor !== -1){
                ageofshimrod.levelEditor.decors.splice(indexDecor, 1);
            }
        }
    },

    render : function(){
        for (let i = 0 ; i < this.sizeX ; i++){
            for (let j = 0 ; j < this.sizeY ; j++){
                if (i*32 < (window.innerWidth - ageofshimrod.gameEditor.decalageX)
                && i*32 >= (-ageofshimrod.gameEditor.decalageX-32) 
                && j*32 < (window.innerHeight - ageofshimrod.gameEditor.decalageY)
                && j*32 >= (-ageofshimrod.gameEditor.decalageY-32)){
                    this.ctx.drawImage(
                        this.spriteset,
                        this.tileGrassX,
                        this.tileGrassY,
                        32,
                        32,
                        i*32 + ageofshimrod.gameEditor.decalageX,
                        j*32 + ageofshimrod.gameEditor.decalageY,
                        32,
                        32);
                }
            }
        }

        var _this = this;
        this.decors.forEach(function(decor){
            decor.render(ageofshimrod.gameEditor);
        })

        if (typeof this.decor !== "undefined"){
            this.decor.renderPosition(ageofshimrod.gameEditor.mouseX,ageofshimrod.gameEditor.mouseY,this.ctx);
        }
    }
}