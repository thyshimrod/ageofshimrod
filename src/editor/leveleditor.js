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
            console.log("here");
            console.log(objLevel);
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
        if (typeof this.decor !== "undefined"){
            let decor = new ageofshimrod.Decor();
            decor.init(this.decor.id);
            decor.x = ageofshimrod.gameEditor.mouseX;
            decor.y = ageofshimrod.gameEditor.mouseY;
            this.decors.push(decor);
        }
    },

    render : function(){
        for (let i = 0 ; i < this.sizeX ; i++){
            for (let j = 0 ; j < this.sizeY ; j++){
                if (i*32 < window.innerWidth && j*32 < window.innerHeight){
                    this.ctx.drawImage(
                        this.spriteset,
                        this.tileGrassX,
                        this.tileGrassY,
                        32,
                        32,
                        i*32,
                        j*32,
                        32,
                        32);
                }
            }
        }

        var _this = this;
        this.decors.forEach(function(decor){
            decor.render();
        })

        if (typeof this.decor !== "undefined"){
            this.decor.renderPosition(ageofshimrod.gameEditor.mouseX,ageofshimrod.gameEditor.mouseY,this.ctx);
        }
    }
}