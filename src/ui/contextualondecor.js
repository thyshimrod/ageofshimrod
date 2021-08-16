'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.ContextualOnDecor = function (){
    this.x = 100;
    this.y = 100;
    this.width = 200;
    this.height = 200;
    this.ctx = undefined;
    this.decor = null;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
}

ageofshimrod.ContextualOnDecor.prototype ={
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
            let text = "Decor";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);
            this.decor.renderPosition(this.x + 10, this.y + 30, this.ctx);

            text = this.decor.name;
            this.ctx.fillText(text ,
                this.x + 50, 
                this.y + 50);
            
            text = "Ressources";
            this.ctx.fillText(text ,
                this.x + 75, 
                this.y + 80);
            let res = new ageofshimrod.Ressource();
            res.init(this.decor.ressource.id);
            res.renderPosition(this.x + 5, this.y + 100,this.ctx);
            text = this.decor.ressource.quantity;
            this.ctx.fillText(text ,
                this.x + 50, 
                this.y + 120);
            
        }
    },
}
