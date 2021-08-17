'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.IconMenu = function (){
    this.ctx = undefined;
    this.icons = [
        { 
            "x" : 0, "y" : 0, "src" : "./assets/icones/ressourceicon.jpg", "name" : "ressource"
        },
        { 
            "x" : 32, "y" : 0, "src" : "./assets/icones/buildicon.jpg", "name" : "building"
        },
        { 
            "x" : 64, "y" : 0, "src" : "./assets/icones/peon.jpg", "name" : "peon"
        },
    ]
}

ageofshimrod.IconMenu.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasAnimation.getContext("2d");
    },

    closeMenu : function(){
        ageofshimrod.menuPeon.hideMenu();
        ageofshimrod.menuRessource.hideMenu();
        ageofshimrod.menuBuilding.hideMenu();
    },

    clickEvent : function(evt){
        for (let i = 0 ; i < this.icons.length ; i++){
            if (evt.pageX > this.icons[i].x && evt.pageX < (this.icons[i].x + 32)
            && evt.pageY > this.icons[i].y && evt.pageY < (this.icons[i].y + 32)){
                this.closeMenu();
                if(this.icons[i].name === 'ressource'){
                    ageofshimrod.menuRessource.toggle();
                }else if(this.icons[i].name === 'peon'){
                    ageofshimrod.menuPeon.toggle();
                }else if(this.icons[i].name === 'building'){
                    ageofshimrod.menuBuilding.toggle();
                }
                return ageofshimrod.C.CLICK_ON_WINDOW;
            }
        }        
        return ageofshimrod.C.CLICK_OUTSIDE_WINDOW;
    },

    render : function(){
        var _this = this;
        this.icons.forEach( function(icon){
            let spriteset = ageofshimrod.tileset.get(icon.src);
            _this.ctx.drawImage(
                spriteset,
                0,
                0,
                32,
                32,
                icon.x,
                icon.y,
                32,
                32);
        })
    },
}
