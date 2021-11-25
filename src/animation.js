'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Animation = function(){
  this.x = 32 ;
  this.y = 32;
  this.tx = 319;
  this.ty = 32;
  this.size = 32;
  this.spriteset = null;
  this.duration = 5000;
  this.startTime = 0;
  this.spriteset = null;
  this.layerToDraw = undefined;
  this.tilesets = {};
};

ageofshimrod.Animation.prototype = {

  init : function(idAnimation,timer = 100){
    var src = ageofshimrod.Animations[idAnimation];
    if (typeof(src) !== "undefined"){
      this.tx = src.x;
      this.ty = src.y;
      this.size = src.size;
      this.x = 0;
      this.y = 0;
      this.spriteset = ageofshimrod.tileset.get(src.tileset);
    }
    this.duration = timer;
    let d = new Date();
    this.startTime = d.getTime();
    this.layerToDraw = ageofshimrod.canvas.canvasAnimation.getContext("2d");
  },

  setXY(x,y){
    this.x = x;
    this.y = y;
  },

  isActive : function(){
    let d = new Date();
    let newTick = d.getTime();
    if (newTick - this.startTime > this.duration){
      return false;
    }
    return true;
  },

  render : function(ctx){
    this.layerToDraw.drawImage(
       this.spriteset,
       this.tx,
       this.ty,
       this.size,
       this.size,
       this.x +ageofshimrod.gameEngine.decalageX,
       this.y +ageofshimrod.gameEngine.decalageY,
       32,
       32);

  }
};
