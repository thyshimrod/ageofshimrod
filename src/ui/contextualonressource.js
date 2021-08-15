'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.ContextualOnRessource = function (){
    this.x = 100;
    this.y = 100;
    this.width = 200;
    this.height = 200;
    this.ctx = undefined;
    this.ressource = null;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
}

ageofshimrod.ContextualOnRessource.prototype ={
    //TODO ajouter le passage de parametre de la ressource pointée
    //TODO Positionner le menu en fonction de la position de la ressource
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        this.ressource = new ageofshimrod.Ressource();
        this.ressource.init(ageofshimrod.C.RESSOURCE_PIERRE);
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

    render : function(){
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            this.ctx.beginPath();
            this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
            this.ctx.fillRect(this.x,this.y,this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
            this.ctx.rect(this.x,this.y, this.width, this.height);
            this.ctx.stroke();
            this.ctx.font = "1Opx Arial";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            let text = "Ressource";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);
            this.ressource.renderPosition(this.x + 10, this.y + 30, this.ctx);

            text = this.ressource.name;
            this.ctx.fillText(text ,
                this.x + 50, 
                this.y + 50);
        }
    },
}
