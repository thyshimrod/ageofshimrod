'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.MenuDecor = function (){
    this.x = 100;
    this.y = 100;
    this.width = 200;
    this.height = 200;
    this.ctx = undefined;
    this.status = ageofshimrod.C.UI_STATUS_SHOW;
    this.btnDecor = [];
}

ageofshimrod.MenuDecor.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
    },

    clickEvent : function(evt){
        //TODO Evaluate if click on window or outside
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            for (let i = 0 ; i < this.btnDecor.length ; i++){
                if (evt.pageX > this.btnDecor[i].x && evt.pageX < (this.btnDecor[i].x + this.btnDecor[i].sizeX)
                && evt.pageY > this.btnDecor[i].y && evt.pageY < (this.btnDecor[i].y + this.btnDecor[i].sizeY))
                console.log(this.btnDecor[i].id);
            }
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
            let text = "Decors";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);
            this.btnDecor = [];
            let spaceX = 0;
            let spaceY = 0;
            for (let i=0;i<ageofshimrod.Decors.length;i++){
                let decor = new ageofshimrod.Decor();
                decor.init(i);
                decor.renderPosition(this.x + 10,this.y + 20 + spaceY,this.ctx);
                let btn = {
                    "x" : this.x + 10,
                    "y" : this.y + 20 + spaceY,
                    "id" : i,
                    "sizeX" : decor.sizeX,
                    "sizeY" : decor.sizeY
                };
                this.btnDecor.push(btn);
                spaceY = spaceY + decor.sizeY + 10;
                
            }
        }
    },
}
