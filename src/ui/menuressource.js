'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.MenuRessource = function (){
    this.x = 100;
    this.y = 100;
    this.width = 200;
    this.height = 200;
    this.ctx = undefined;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
}

ageofshimrod.MenuRessource.prototype ={
    //TODO Positionner le menu en fonction de la position de la decor
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
    },

    clickEvent : function(evt){
        //TODO Evaluate if click on window or outside
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            this.toggle();
            return ageofshimrod.C.CLICK_ON_WINDOW;
        }
        return ageofshimrod.C.CLICK_OUTSIDE_WINDOW;
    },

    toggle : function(){
        this.status = this.status === ageofshimrod.C.UI_STATUS_SHOW ? ageofshimrod.C.UI_STATUS_HIDDEN : ageofshimrod.C.UI_STATUS_SHOW;
    },


    hideMenu : function(){
        this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
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
            let text = "Ressources";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);
            
            let y = this.y +25;
            for (let i = 0 ; i < ageofshimrod.player.ressources.length;i++){
                let res = ageofshimrod.player.ressources[i];
                let resToDraw = new ageofshimrod.Ressource();
                resToDraw.init(res.id);
                resToDraw.renderPosition(this.x + 5, y , this.ctx);
                let text = res.quantity;
                this.ctx.fillText(text ,
                    this.x + 75, 
                    y + 20);
                y += 50;
            } 
        }
    },
}
