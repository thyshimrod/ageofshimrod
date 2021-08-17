'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Peon = function (){
    this.x = 0;
    this.y = 0;
    this.tileset = "./assets/sprite/adam.png";
    this.spriteset = undefined;
    this.ctx = undefined;
    this.house = undefined;
    this.affectation = undefined;
    this.status = ageofshimrod.C.PEON_STATUS_WAIT;
    this.decor = undefined;
    this.step = ageofshimrod.C.CHARACTER_STEP;
    this.animation = 0;
    this.direction = ageofshimrod.C.DIRECTION_DOWN;
}

ageofshimrod.Peon.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasCreature.getContext("2d");
        if (this.findAHouse()) console.log("Maison trouvee");
    },

    gameLoop : function(){
        if (typeof this.affectation === "undefined"){
            this.status = ageofshimrod.C.PEON_STATUS_WAIT;
        }else{
            if (this.status === ageofshimrod.C.PEON_STATUS_WAIT){
                if (typeof this.affectation !== "undefined"){
                    this.status = ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE;
                }
            }else if (this.status === ageofshimrod.C.PEON_STATUS_GOTO_RESSOURCE){
                if (typeof this.decor === "undefined"){
                    for(let i=0;i<ageofshimrod.map.decors.length;i++){
                        if (this.affectation.ressource === ageofshimrod.map.decors[i].ressource.id){
                            this.decor = ageofshimrod.map.decors[i];
                            break;
                        }
                    }
                }else{
                    if (this.x < (this.decor.x - 21) ){
                        this.x += this.step;
                        this.direction = ageofshimrod.C.DIRECTION_RIGHT;
                    } 
                    if (this.x > (this.decor.x + this.decor.sizeX +10) ){
                        this.x -= this.step;
                        this.direction = ageofshimrod.C.DIRECTION_LEFT;
                    } 
                    if (this.y < (this.decor.y - 21) ){
                        this.y += this.step;
                        this.direction = ageofshimrod.C.DIRECTION_DOWN;
                    } 
                    if (this.y > (this.decor.y + this.decor.sizeY +10) ){
                        this.y -= this.step;
                        this.direction = ageofshimrod.C.DIRECTION_UP  
                    } 

                    if (calcDistance(this,this.decor) > 32){
                        this.animation += 1;
                        if (this.animation > 2) this.animation = 0;
                    }
                    
                 }   
            }
        }
    },

    findAHouse : function(){
        for (let i = 0 ; i < ageofshimrod.map.buildings.length ; i++){
            let building = ageofshimrod.map.buildings[i];
            if (building.name === "Maison"){
                if (building.peons.length < building.capacity){
                    building.peons.push(this);
                    this.house = building;
                    return true;
                }
            }
        }
        return false;
    },

    changeAffectation : function(building){
        this.affectation = building;
        let toFind = typeof building === "undefined" ? "None" : building.name;
        var _this = this;
        ageofshimrod.Sprite4Specialist.forEach(function(sprite){
            if (sprite.name === toFind){
                _this.tileset = sprite.sprite;
            }
        })
    },

    renderPosition : function(x,y,ctx){
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
        ctx.drawImage(
            this.spriteset,
            this.animation*32,
            this.direction*32,
            32,
            32,
            x,
            y,
            32,
            32);
    },

    render : function(){
        this.renderPosition(this.x,this.y,this.ctx);
    },
}
