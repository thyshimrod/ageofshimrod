'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.EndGame = function (){
    this.x = 300;
    this.y = 100;
    this.width = 400;
    this.height = 500;
    this.ctx = undefined;
    this.tileset = "./assets/images/conejita-dance.gif";
    this.spriteset = undefined;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
}

ageofshimrod.EndGame.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasAnimation.getContext("2d");
        this.spriteset = ageofshimrod.tileset.get(this.tileset);
    },

    clickEvent : function(evt){
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            if (evt.pageX > (this.x+120) && evt.pageX < (this.x+270)
            && evt.pageY > (this.y+420) && evt.pageY < (this.y+460)){
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
            let text = "Vous avez gagne !!!";
            this.ctx.fillText(text ,
                this.x + 50, 
                this.y + 30);
            
            

            this.ctx.beginPath();
            this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
            this.ctx.fillRect(this.x+120,this.y+420,150,40);
            this.ctx.beginPath();
            this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
            this.ctx.rect(this.x+120,this.y+420,150,40);
            this.ctx.stroke();
            this.ctx.font = "30px Verdana";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            text = "Jouer";
            this.ctx.fillText(text ,
                this.x + 155, 
                this.y + 450);

            this.ctx.drawImage(
                this.spriteset,
                0,
                0,
                305,
                498,
                this.x + 100,
                this.y + 100,
                150,
                200);
            
        }
    },
}
