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
            this.ctx.font = "1Opx Arial";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            let text = "Peons";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);

            let peon = new ageofshimrod.Peon();
            peon.renderPosition(this.x + 5, this.y +25,this.ctx);
            text = ageofshimrod.map.peons.length;
            this.ctx.fillText(text ,
                this.x + 50, 
                this.y + 40);
        }
    },
}
