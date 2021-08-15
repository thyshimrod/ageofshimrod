'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.ContextualOnBuilding = function (){
    this.x = 100;
    this.y = 100;
    this.width = 200;
    this.height = 200;
    this.ctx = undefined;
    this.building = null;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
}

ageofshimrod.ContextualOnBuilding.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
        this.building = new ageofshimrod.Building();
        this.building.init();
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
            let text = "Batiment";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);
            this.building.renderPosition(this.x + 10, this.y + 30, this.ctx);

            text = this.building.name;
            this.ctx.fillText(text ,
                this.x + 100, 
                this.y + 50);

            text = "capacite : 0 / " + this.building.capacity;
            this.ctx.fillText(text ,
                this.x + 10, 
                this.y + 130);
        }
    },
}
