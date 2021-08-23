'use strict';

var ageofshimrod = ageofshimrod || {};

ageofshimrod.Decors = [
    {
        "name"    : "Rocher",
        "tileset" : "assets/tileset/rocgros.png",
        "sprite" : { "x" : 0, "y" : 0},
        "size" : { "x" : 32, "y" : 32},
        "ressources": { 
            "id" : ageofshimrod.C.RESSOURCE_PIERRE,
            "quantity" : 1000
        }
    },
    {
        "name"    : "Arbre",
        "tileset" : "assets/tileset/arbre1.png",
        "sprite" : { "x" : 0, "y" : 0},
        "size" : { "x" : 32, "y" : 64},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_BOIS,
            "quantity" : 1000
        }
    },
    {
        "name"    : "Arbre mort",
        "tileset" : "assets/tileset/arbremort.png",
        "sprite" : { "x" : 0, "y" : 0},
        "size" : { "x" : 32, "y" : 64},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_BOIS,
            "quantity" : 200
        }
    },
    {
        "name"    : "Petit rocher",
        "tileset" : "assets/tileset/rocpetit.png",
        "sprite" : { "x" : 0, "y" : 0},
        "size" : { "x" : 32, "y" : 32},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_PIERRE,
            "quantity" : 200
        }
    },
    {
        "name"    : "Salades",
        "tileset" : "assets/tileset/salade.png",
        "sprite" : { "x" : 0, "y" : 0},
        "size" : { "x" : 32, "y" : 32},
        "ressources" : {
            "id" : ageofshimrod.C.RESSOURCE_FOOD,
            "quantity" : 200
        }
    }
]