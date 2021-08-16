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
    this.buttons = [
        {
            "x" : this.x + 100,
            "y" : this.y + 130,
            "size" : 20,
            "name" : "+",
            "status" : ageofshimrod.C.BUTTON_STATUS_OK
        },
        {
            "x" : this.x + 120,
            "y" : this.y + 130,
            "size" : 20,
            "name" : "-",
            "status" : ageofshimrod.C.BUTTON_STATUS_OK
        }
    ]
}

ageofshimrod.ContextualOnBuilding.prototype ={
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

    drawButtons : function(){
        var _this = this;
        this.buttons.forEach(function (btn){
            let text = btn.name;
            _this.ctx.fillText(text ,
                btn.x , 
                btn.y );
            _this.ctx.beginPath();
            if (btn.name == "+"){
                let nbPeon = ageofshimrod.map.findPeonFree();
                btn.status = nbPeon > 0 ? ageofshimrod.C.BUTTON_STATUS_OK : ageofshimrod.C.BUTTON_STATUS_KO;
            }else{
                btn.status = _this.building.peons.length > 0 ? ageofshimrod.C.BUTTON_STATUS_OK : ageofshimrod.C.BUTTON_STATUS_KO;
            }
            _this.ctx.strokeStyle = btn.status === ageofshimrod.C.BUTTON_STATUS_OK ? ageofshimrod.C.UI_BORDER_COLOR : ageofshimrod.C.UI_BORDER_RED;
            _this.ctx.rect(btn.x -7,btn.y-13, btn.size, btn.size);
            _this.ctx.stroke();    
        })
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

            text = "capacite : " + this.building.peons.length + " / " + this.building.capacity;
            this.ctx.fillText(text ,
                this.x + 10, 
                this.y + 130);

            this.drawButtons();
        }
    },
}
