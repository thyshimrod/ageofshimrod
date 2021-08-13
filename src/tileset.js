'use strict';
var ageofshimrod = ageofshimrod || {};

ageofshimrod.Tileset = function (){
  this.tilesets = {};
};

ageofshimrod.Tileset.prototype = {
  get : function(name){
    if (!(name in this.tilesets)){
      var tileset = new Image();
      tileset.src = name;
      this.tilesets[name] = tileset;
    }
    return this.tilesets[name];
  }
};
