'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.StartGame = function (){
    this.x = 300;
    this.y = 100;
    this.width = 400;
    this.height = 500;
    this.ctx = undefined;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
}

ageofshimrod.StartGame.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasTile.getContext("2d");
    },

    clickEvent : function(evt){
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            if (evt.pageX > (this.x+120) && evt.pageX < (this.x+270)
            && evt.pageY > (this.y+300) && evt.pageY < (this.y+340)){
                ageofshimrod.gameEngine.initGame();
                
                this.hideMenu();
            }
            return ageofshimrod.C.CLICK_ON_WINDOW;
        }
        return ageofshimrod.C.CLICK_OUTSIDE_WINDOW;
    },

    showMenu : function(){
        this.status = ageofshimrod.C.UI_STATUS_SHOW;
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
            this.ctx.font = "30px Verdana";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            let text = "Nouvelle Partie";
            this.ctx.fillText(text ,
                this.x + 50, 
                this.y + 30);
            
            this.ctx.font = "20px Verdana";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            text = "Objectifs";
            this.ctx.fillText(text ,
                this.x + 100, 
                this.y + 80);

            this.ctx.font = "20px Verdana";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            text = "Recolter :";
            this.ctx.fillText(text ,
                this.x + 10, 
                this.y + 120);

            let resBois = new ageofshimrod.Ressource();
            resBois.init(ageofshimrod.C.RESSOURCE_BOIS);
            resBois.renderPosition(this.x +30,this.y + 150,this.ctx);

            let resPierre = new ageofshimrod.Ressource();
            resPierre.init(ageofshimrod.C.RESSOURCE_PIERRE);
            resPierre.renderPosition(this.x +120,this.y + 150,this.ctx);

            this.ctx.font = "10px Verdana";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            text = "500";
            this.ctx.fillText(text ,
                this.x + 35, 
                this.y + 200);

            this.ctx.fillText(text ,
                this.x + 125, 
                this.y + 200);

            this.ctx.beginPath();
            this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
            this.ctx.fillRect(this.x+120,this.y+300,150,40);
            this.ctx.beginPath();
            this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
            this.ctx.rect(this.x+120,this.y+300,150,40);
            this.ctx.stroke();
            this.ctx.font = "30px Verdana";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            text = "Jouer";
            this.ctx.fillText(text ,
                this.x + 155, 
                this.y + 330);
            
        }
    },
}
