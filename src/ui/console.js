'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Console = function (){
  this.active = false;
  this.x = 300;
  this.y = 0;
  this.width = 700;
  this.height = 100;
  this.messages = [];
  this.ctx = null;
  this.nbMessageMax = 8;
};

ageofshimrod.Console.prototype ={

    init : function(){
        this.messages = [];
    },

    renderMessages : function(){
        let nbMessage = 0;
        for (let i = this.messages.length-1; i >= 0 && nbMessage < this.nbMessageMax ; i--){
            let text = this.messages[i];
            this.ctx.fillStyle = text.alert;
            this.ctx.fillText(text.text,
                this.x + 10, 
                this.y + 10 + 10* (this.nbMessageMax - nbMessage));
            nbMessage ++;
        }
    },

    render : function(){
        this.ctx = ageofshimrod.canvas.canvasAnimation.getContext("2d");
        this.ctx.font = "10px Verdana";
        this.ctx.fillStyle = ageofshimrod.C.COLOR_CONTEXTUAL;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.beginPath();
        this.ctx.strokeStyle = ageofshimrod.C.COLOR_TURQUOISE;
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
        this.renderMessages();
    },

    addMessage : function(text,alert = ageofshimrod.C.MESSAGE_ALERT_INFO){
        this.messages.push({"text" : text, "alert" : alert});
    },

    clickEvent : function(event){
        if(event.pageX < (this.x + this.width ) && event.pageX > this.x
        && event.pageY < (this.y + this.height) && event.pageY > this.y){
            return ageofshimrod.C.CLICK_ON_WINDOW;
        }
        return ageofshimrod.C.CLICK_OUTSIDE_WINDOW;
    }

}