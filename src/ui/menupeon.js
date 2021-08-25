'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.MenuPeon = function (){
    this.x = 100;
    this.y = 100;
    this.width = 200;
    this.height = 200;
    this.ctx = undefined;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
}

ageofshimrod.MenuPeon.prototype ={
    //TODO Positionner le menu en fonction de la position de la decor
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasAnimation.getContext("2d");
    },

    clickEvent : function(evt){
        //TODO Evaluate if click on window or outside
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            this.toggle();
            return ageofshimrod.C.CLICK_ON_WINDOW;
        }
        return ageofshimrod.C.CLICK_OUTSIDE_WINDOW;
    },

    hideMenu : function(){
        this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
    },

    toggle : function(){
        this.status = this.status === ageofshimrod.C.UI_STATUS_SHOW ? ageofshimrod.C.UI_STATUS_HIDDEN : ageofshimrod.C.UI_STATUS_SHOW;
    },

    render : function(){
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            this.ctx.beginPath();
            this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
            this.ctx.fillRect(this.x,this.y,this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
            this.ctx.rect(this.x,this.y, this.width, this.height);
            this.ctx.stroke();
            this.ctx.font = "10px Verdana";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            let text = "Peons";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);

           /* let peon = new ageofshimrod.Peon();
            peon.renderPosition(this.x + 5, this.y +25,this.ctx);
            text = ageofshimrod.map.peons.length;
            this.ctx.fillText(text ,
                this.x + 50, 
                this.y + 40);
                */
            let peons = [];
            ageofshimrod.map.peons.forEach(function (peon){
                let affectation = typeof peon.affectation === "undefined" ? "None" : peon.affectation.typeBuilding;
                if (peons.length == 0){
                    let peonJs = { "id" : affectation, "quantity" : 1};
                    peons.push(peonJs);
                }else{
                    let found = false;
                    for (let i = 0 ; i < peons.length ; i++){
                        if (peons[i].id === affectation){
                            peons[i].quantity += 1;
                            found = true;
                            break;
                        }
                    }
                    if (!found){
                        let peonJs = { "id" : affectation, "quantity" : 1};
                        peons.push(peonJs);
                    }
                }

            })

            for (let i = 0 ; i < peons.length ; i++){
                let sprite = "";
                ageofshimrod.Sprite4Specialist.forEach(function(it){
                    if (it.name === peons[i].id){
                        sprite = it.sprite;
                    }
                })
                this.spriteset = ageofshimrod.tileset.get(sprite);
                this.ctx.drawImage(
                    this.spriteset,
                    0,
                    0,
                    32,
                    32,
                    this.x + 40,
                    this.y + 30 + i*32 +10,
                    32,
                    32);
                text = peons[i].quantity;
                this.ctx.fillText(text ,
                    this.x + 100, 
                    this.y + 50 + i*32 +10);
            }
        }
    },
}
