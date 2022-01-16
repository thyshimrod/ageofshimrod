'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.MainMenu = function (){
    this.x = 300;
    this.y = 100;
    this.width = 400;
    this.height = 500;
    this.ctx = undefined;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
    this.btns = [
        { "x" : 410, "y" :  250, "sizeX" : 150 , "sizeY" : 40, "action" : "play"}
    ]
}

ageofshimrod.MainMenu.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasAnimation.getContext("2d");
        let data = {
            "idRessource" : ageofshimrod.C.RESSOURCE_BOIS,
            "quantity" : 500
        };
        ageofshimrod.recordGame.addObjectif(ageofshimrod.C.RECORD_RECOLT,data);
        data = {
            "idRessource" : ageofshimrod.C.RESSOURCE_PIERRE,
            "quantity" : 500
        };
        ageofshimrod.recordGame.addObjectif(ageofshimrod.C.RECORD_RECOLT,data);
    },

    clickEvent : function(evt){
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            var _this = this;
            var _evt = evt;
            this.btns.forEach(function (btn){
                if (_evt.pageX > btn.x && _evt.pageX < (btn.x + btn.sizeX)
                && _evt.pageY > btn.y && _evt.pageY < (btn.y + btn.sizeY)){
                    if (btn.action === "play"){
                        ageofshimrod.gameEngine.changeStatus(ageofshimrod.C.GAME_STATUS_START);
                    }
                    _this.hideMenu();
                    return ageofshimrod.C.CLICK_ON_WINDOW;
                }
            });
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

    renderButtons : function(){
        this.ctx.beginPath();
        this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
        this.ctx.fillRect(this.btns[0].x,this.btns[0].y,this.btns[0].sizeX,this.btns[0].sizeY);
        this.ctx.beginPath();
        this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
        this.ctx.rect(this.btns[0].x,this.btns[0].y,this.btns[0].sizeX,this.btns[0].sizeY);
        this.ctx.stroke();
        this.ctx.font = "30px Verdana";
        this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
        let text = "Jouer";
        this.ctx.fillText(text ,
            this.btns[0].x + 30 ,this.btns[0].y + 30);
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
            let text = "Age Of Shimrod";
            this.ctx.fillText(text ,
                this.x + 80, 
                this.y + 30);
                
            this.renderButtons();
        }
    },
}
