'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Map = function (){
    this.sizeX = 100;
    this.sizeY = 100;
    this.tileset = "./assets/tileset/tileset1.png";
    this.tileGrassX = 192;
    this.tileGrassY = 64;
    this.spriteset = undefined;
    this.ctx = undefined;
    this.peons = [];
    this.decors = [];
    this.buildings = [];
    this.status = ageofshimrod.C.MAP_STATUS_NORMAL;
    this.newBuilding = undefined;
    this.animations = [];
    this.monsters = [];
    this.eventTick = 0;
}

ageofshimrod.Map.prototype ={
    initFromJs : function(levelJs){
        var _this = this;
        levelJs.decors.forEach(function(decorjs){
            let decor = new ageofshimrod.Decor();
            decor.loadFromJs(decorjs);
            _this.decors.push(decor);
        })
    },


    init : function(){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        this.animations = [];
        this.buildings = [];
        this.peons = [];
        var objLevel = JSON.parse(localStorage.getItem('levelJs'));
        if (typeof objLevel !== 'undefined' && objLevel !== null){
            this.initFromJs(objLevel);
        }else{
            if(typeof ageofshimrod.Levels !== "undefined" && ageofshimrod.Levels.length>0){
                this.initFromJs(ageofshimrod.Levels[0]);
            }
        }
        let house = new ageofshimrod.Building();
        house.init(ageofshimrod.C.BUILDING_HOUSE);
        house.x = 100;
        house.Y = 100;
        this.buildings.push(house);
        house = new ageofshimrod.Building();
        house.init(ageofshimrod.C.BUILDING_LUMBER);
        house.x = 200;
        house.y = 200;
        this.buildings.push(house);
        let peon = new ageofshimrod.Peon();
        peon.init();
        peon.x =300;
        this.peons.push(peon);
        peon = new ageofshimrod.Peon();
        peon.init();
        peon.x =350;
        this.peons.push(peon);

    },

    addBuilding : function(idBuilding){
        this.status = ageofshimrod.C.MAP_STATUS_ADD_BUILDING;
        this.newBuilding = new ageofshimrod.Building();
        this.newBuilding.init(idBuilding);
        var _this = this;
        this.newBuilding.materiauxNeeded.forEach(function(mat){
            for (let i=0;i< ageofshimrod.player.ressources.length;i++){
                if (mat.id === ageofshimrod.player.ressources[i].id){
                    ageofshimrod.player.ressources[i].quantity -= mat.quantity;
                }
            }
        })
    },

    checkDecor : function(){
        let decorToRemove = undefined;
        for (let i=0;i<this.decors.length;i++){
            if (typeof this.decors[i].ressource !== "undefined"){
                if (this.decors[i].ressource.quantity === 0){
                    decorToRemove = this.decors[i];
                    break;
                }
            }
        }
        if (typeof decorToRemove !== "undefined"){
            const index = this.decors.indexOf(decorToRemove);
            if (index !== -1) {
                this.decors.splice(index, 1);
            }
        }
        
    },

    checkLife : function(listOfCreatures){
        let toRemove = undefined;
        listOfCreatures.forEach(function(creature){
            creature.gameLoop();
            if (creature.hp <= 0) toRemove = creature;
        })
        if (typeof toRemove !== "undefined"){
            var animation = new ageofshimrod.Animation();
            animation.init(ageofshimrod.C.ANIMATION_BLOOD, 5000);
            animation.setXY(toRemove.x,toRemove.y);
            animation.layerToDraw = ageofshimrod.canvas.canvasTile.getContext("2d");
            this.animations.push(animation);
            const index = listOfCreatures.indexOf(toRemove);
            if (index !== -1){
                listOfCreatures.splice(index,1);
            }
        }
    },

    checkAnimations : function(){
        let animationToRemove = undefined;
        this.animations.forEach(function(elt){ 
            if (!elt.isActive()) animationToRemove = elt;
        })
        if (typeof animationToRemove !== "undefined"){
            const index = this.animations.indexOf(animationToRemove);
            if (index !== -1){
                this.animations.splice(index,1);
            }
        }
    },

    checkEvent : function(){
        let d = new Date();
        let newTick = d.getTime();
        if (newTick - this.eventTick > 1000){
            this.eventTick = newTick;
            let val = Math.random() * 100;
            if (val < 10){
                if (this.monsters.length === 0){
                    let monster = new ageofshimrod.Monster();
                    monster.init();
                    monster.x = window.innerHeight;
                    monster.y = window.innerWidth;
                    this.monsters.push(monster);
                }
            }
        }
    },

    gameLoop : function(){
        this.checkLife(this.peons);
        this.checkLife(this.monsters);

        this.checkDecor();

        this.checkAnimations();

        this.checkEvent();

        if( this.peons.length === 0){
            ageofshimrod.gameEngine.changeStatus(ageofshimrod.C.GAME_STATUS_ENDGAME_LOSE);
        }
    },

    clickEvent : function(evt){
        if (this.status === ageofshimrod.C.MAP_STATUS_ADD_BUILDING){
            this.newBuilding.x = ageofshimrod.gameEngine.mouseX;
            this.newBuilding.y = ageofshimrod.gameEngine.mouseY;
            this.buildings.push(this.newBuilding);
            this.newBuilding = undefined;
            this.status = ageofshimrod.C.MAP_STATUS_NORMAL;
        }else{
            for (let i=0;i < this.decors.length ; i++){
                if (this.decors[i].x < evt.pageX && evt.pageX < (this.decors[i].x + this.decors[i].sizeX)
                && this.decors[i].y < evt.pageY && evt.pageY < (this.decors[i].y + this.decors[i].sizeY)){
                    ageofshimrod.contextualOnDecor.showMenu(this.decors[i]);
                }
            }
            for (let i=0;i < this.buildings.length ; i++){
                if (this.buildings[i].x < evt.pageX && evt.pageX < (this.buildings[i].x +64)
                && this.buildings[i].y < evt.pageY && evt.pageY < (this.buildings[i].y +64)){
                    ageofshimrod.contextualOnBuilding.showMenu(this.buildings[i]);
                }
            }
        }

    },

    findPeonFree : function(){
        let result = [];
        var _this = this;
        this.peons.forEach(function(peon){
            if (typeof peon.affectation === "undefined"){
                result.push(peon);
            }
        })
        return result;
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

        this.peons.forEach(function(peon){
            peon.render();
        })

        this.monsters.forEach(function(monster){
            monster.render();
        })

        this.decors.forEach(function(decor){
            decor.render();
        })

        this.buildings.forEach(function(building){
            building.render();
        })

        this.animations.forEach(function(animation){
            animation.render();
        })

        if (this.status === ageofshimrod.C.MAP_STATUS_ADD_BUILDING){
            if (typeof this.newBuilding !== "undefined"){
                this.newBuilding.renderPosition(ageofshimrod.gameEngine.mouseX,ageofshimrod.gameEngine.mouseY,this.ctx);
            }
        }
    }
}
