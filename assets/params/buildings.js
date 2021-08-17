'use strict';

var ageofshimrod = ageofshimrod || {};

ageofshimrod.Buildings = [
    {
        "name"    : "Maison",
        "size":{"x" : 88, "y" : 106},
        "tileset" : "assets/tileset/pngwing.com.png",
        "sprite" : { "x" : 32, "y" : 440},
        "capacity" : 2,
        "materiaux" : [
            {
                "id" : 2,
                "quantity" : 100
            },
        ]
    },
    {
        "name"    : "Bucheron",
        "size":{"x" : 92, "y" : 106},
        "tileset" : "assets/tileset/pngwing.com.png",
        "sprite" : { "x" : 1704, "y" : 602},
        "capacity" : 2,
        "materiaux" : [
            {
                "id" : 2,
                "quantity" : 100
            },
            {
                "id" : 1,
                "quantity" : 100
            }
        ],
        "ressource" : ageofshimrod.C.RESSOURCE_BOIS
    },
    {
        "name"    : "Mineur",
        "size":{"x" : 92, "y" : 106},
        "tileset" : "assets/tileset/pngwing.com.png",
        "sprite" : { "x" : 942, "y" : 438},
        "capacity" : 2,
        "materiaux" : [
            {
                "id" : 2,
                "quantity" : 100
            },
            {
                "id" : 1,
                "quantity" : 100
            }
        ],
        "ressource" : ageofshimrod.C.RESSOURCE_PIERRE
    }
]