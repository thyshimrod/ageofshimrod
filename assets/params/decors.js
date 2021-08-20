'use strict';

var ageofshimrod = ageofshimrod || {};

ageofshimrod.Decors = [
    {
        "name"    : "Rocher",
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 32, "y" : 1854},
        "size" : { "x" : 32, "y" : 32},
        "ressources": { 
            "id" : ageofshimrod.C.RESSOURCE_PIERRE,
            "quantity" : 1000
        }
    },
    {
        "name"    : "Arbre",
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 160, "y" : 1024},
        "size" : { "x" : 32, "y" : 64},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_BOIS,
            "quantity" : 1000
        }
    },
    {
        "name"    : "Arbre mort",
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 0, "y" : 1120},
        "size" : { "x" : 32, "y" : 64},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_BOIS,
            "quantity" : 200
        }
    },
    {
        "name"    : "Petit rocher",
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 32, "y" : 1792},
        "size" : { "x" : 32, "y" : 32},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_PIERRE,
            "quantity" : 200
        }
    },
    {
        "name"    : "Salades",
        "tileset" : "assets/tileset/tileset1.png",
        "sprite" : { "x" : 224, "y" : 1088},
        "size" : { "x" : 32, "y" : 32},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_FOOD,
            "quantity" : 200
        }
    }
]