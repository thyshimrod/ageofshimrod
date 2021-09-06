'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.MenuBuilding = function (){
    this.x = 100;
    this.y = 100;
    this.width = 300;
    this.height = 400;
    this.ctx = undefined;
    this.status = ageofshimrod.C.UI_STATUS_HIDDEN;
    this.listOfBuildingToClick = [];
}

ageofshimrod.MenuBuilding.prototype ={
    init : function(){
        this.ctx = ageofshimrod.canvas.canvasAnimation.getContext("2d");
    },

    clickEvent : function(evt){
        if (this.status === ageofshimrod.C.UI_STATUS_SHOW){
            if (evt.pageX > this.x && evt.pageX < (this.x + this.width)
               && evt.pageY > this.y && evt.pageY < (this.y + this.height)){
                for (let i=0;i<this.listOfBuildingToClick.length;i++){
                    if (evt.pageY > this.listOfBuildingToClick[i].y && evt.pageY < (this.listOfBuildingToClick[i].y + 100)
                     && this.listOfBuildingToClick[i].status === ageofshimrod.C.BUTTON_STATUS_OK){
                         ageofshimrod.map.addBuilding(this.listOfBuildingToClick[i].id);
                         this.toggle();
                     }
                }
            }else{
                this.toggle();
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
            let heightY = 0;
            for (let i=0;i<ageofshimrod.Buildings.length;i++){
                heightY += ageofshimrod.Buildings[i].size.y +20;
            }
            this.height = heightY;
            this.ctx.beginPath();
            this.ctx.fillStyle = ageofshimrod.C.UI_RECT_COLOR;
            this.ctx.fillRect(this.x,this.y,this.width,this.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = ageofshimrod.C.UI_BORDER_COLOR;
            this.ctx.rect(this.x,this.y, this.width, this.height);
            this.ctx.stroke();
            this.ctx.font = "10px Verdana";
            this.ctx.fillStyle = ageofshimrod.C.UI_FONT_COLOR;
            let text = "Batiments";
            this.ctx.fillText(text ,
                this.x + 40, 
                this.y + 10);

            let y = this.y + 30;
            var _this = this;
            this.listOfBuildingToClick = [];
            for (let i = 0 ; i < ageofshimrod.Buildings.length;i++){
                this.ctx.fillStyle = ageofshimrod.C.UI_BORDER_COLOR;
                let bat = new ageofshimrod.Building();
                bat.init(i);
                bat.renderPosition(this.x + 5, y , this.ctx);
                let text = bat.name;
                
                _this.ctx.fillText(text ,
                    _this.x + 70, 
                     y + 10);
                let statusBtn = ageofshimrod.C.BUTTON_STATUS_OK;
                for (let itMat = 0; itMat < bat.materiauxNeeded.length ; itMat++){
                    let mat = bat.materiauxNeeded[itMat];
                    let res = new ageofshimrod.Ressource();
                    res.init(mat.id);
                    res.renderPosition(_this.x + 100 + itMat*80, y + 20, _this.ctx);
                    let statusMat = true;
                    for (let itMatPlayer=0;itMatPlayer < ageofshimrod.player.ressources.length;itMatPlayer++){
                        if (ageofshimrod.player.ressources[itMatPlayer].id === mat.id){
                            if (ageofshimrod.player.ressources[itMatPlayer].quantity < mat.quantity){
                                statusMat = false;
                                statusBtn = ageofshimrod.C.BUTTON_STATUS_KO;
                            }
                        }
                    }
                    _this.ctx.fillStyle = statusMat  ? ageofshimrod.C.UI_BORDER_COLOR : ageofshimrod.C.UI_BORDER_RED;
                    text = mat.quantity;
                    _this.ctx.fillText(text ,
                        _this.x + 140 + itMat*80, y + 40,);
                    
                }
                let toClick = {
                    "x" : this.x + 5,
                    "y" : y,
                    "name" : bat.name,
                    "id" : i,
                    "status" : statusBtn
                };
                this.listOfBuildingToClick.push(toClick);
                y += 120;
            }
            
        }
    },
}
