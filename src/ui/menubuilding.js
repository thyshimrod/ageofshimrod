'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.MenuBuilding = function (){
    this.x = 100;
    this.y = 100;
    this.width = 300;
    this.height = 400;
    this.ctx = undefined;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
}

ageofshimrod.MenuBuilding.prototype ={
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
            let text = "Batiments";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);

            let y = this.y + 30;
            var _this = this;
            
            for (let i = 0 ; i < ageofshimrod.Buildings.length;i++){
                let bat = new ageofshimrod.Building();
                bat.init(i);
                bat.renderPosition(this.x + 5, y , this.ctx);
                let text = bat.name;
                _this.ctx.fillText(text ,
                    _this.x + 70, 
                     y + 10);
                for (let itMat = 0; itMat < bat.materiauxNeeded.length ; itMat++){
                    let mat = bat.materiauxNeeded[itMat];
                    let res = new ageofshimrod.Ressource();
                    res.init(mat.id);
                    res.renderPosition(_this.x + 100 + itMat*80, y + 20, _this.ctx);
                    text = mat.quantity;
                    _this.ctx.fillText(text ,
                        _this.x + 140 + itMat*80, y + 40,);
                }
                y += 120;
            }
            
        }
    },
}
