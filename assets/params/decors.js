'use strict';

var ageofshimrod = ageofshimrod || {};

ageofshimrod.Decors = {
    1 : {
        "name"    : "Rocher",
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 32, "y" : 1854},
        "size" : { "x" : 32, "y" : "32"},
        "ressources": { 
            "id" : ageofshimrod.C.RESSOURCE_PIERRE,
            "quantity" : 1000
        }
    },
    2 : {
        "name"    : "Arbre",
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 160, "y" : 1024},
        "size" : { "x" : 32, "y" : "64"},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_BOIS,
            "quantity" : 1000
        }
    },
}