'use strict';

var ageofshimrod = ageofshimrod || {};

ageofshimrod.Buildings = [
    {
        "name"    : "Maison",
        "typeBuilding" : ageofshimrod.C.BUILDING_HOUSE,
        "size":{"x" : 88, "y" : 106},
        "tileset" : "assets/tileset/pngwing.com.png",
        "sprite" : { "x" : 32, "y" : 440},
        "capacity" : 2,
        "materiaux" : [
            {
                "id" : ageofshimrod.C.RESSOURCE_BOIS,
                "quantity" : 100
            },
        ]
    },
    {
        "name"    : "Bucheron",
        "typeBuilding" : ageofshimrod.C.BUILDING_LUMBER,
        "size":{"x" : 92, "y" : 106},
        "tileset" : "assets/tileset/pngwing.com.png",
        "sprite" : { "x" : 1704, "y" : 602},
        "capacity" : 2,
        "materiaux" : [
            {
                "id" : ageofshimrod.C.RESSOURCE_BOIS,
                "quantity" : 100
            },
            {
                "id" : ageofshimrod.C.RESSOURCE_PIERRE,
                "quantity" : 100
            }
        ],
        "ressource" : ageofshimrod.C.RESSOURCE_BOIS
    },
    {
        "name"    : "Mineur",
        "typeBuilding" : ageofshimrod.C.BUILDING_MINEUR,
        "size":{"x" : 92, "y" : 106},
        "tileset" : "assets/tileset/pngwing.com.png",
        "sprite" : { "x" : 942, "y" : 438},
        "capacity" : 2,
        "materiaux" : [
            {
                "id" : ageofshimrod.C.RESSOURCE_BOIS,
                "quantity" : 100
            },
            {
                "id" : ageofshimrod.C.RESSOURCE_PIERRE,
                "quantity" : 100
            }
        ],
        "ressource" : ageofshimrod.C.RESSOURCE_PIERRE
    },{
        "name"    : "Armee",
        "typeBuilding" : ageofshimrod.C.BUILDING_ARMY,
        "size":{"x" : 94, "y" : 96},
        "tileset" : "assets/tileset/pngwing.com.png",
        "sprite" : { "x" : 1083, "y" : 462},
        "capacity" : 2,
        "materiaux" : [
            {
                "id" : ageofshimrod.C.RESSOURCE_BOIS,
                "quantity" : 100
            },
            {
                "id" : ageofshimrod.C.RESSOURCE_PIERRE,
                "quantity" : 200
            }
        ],
    }
    ,{
        "name"    : "Ferme",
        "typeBuilding" : ageofshimrod.C.BUILDING_FARM,
        "size" : {"x" : 94, "y" : 96},
        "tileset" : "assets/tileset/pngwing.com.png",
        "sprite" : { "x" : 1267, "y" : 610},
        "capacity" : 2,
        "materiaux" : [
            {
                "id" : ageofshimrod.C.RESSOURCE_BOIS,
                "quantity" : 100
            },
            {
                "id" : ageofshimrod.C.RESSOURCE_PIERRE,
                "quantity" : 100
            }
        ],
    }
    ,{
        "name"    : "Tour de defense",
        "typeBuilding" : ageofshimrod.C.BUILDING_TOWER,
        "size" : {"x" : 64, "y" : 92},
        "tileset" : "assets/tileset/tower.png",
        "sprite" : { "x" : 0, "y" : 0},
        "capacity" : 1,
        "materiaux" : [
            {
                "id" : ageofshimrod.C.RESSOURCE_BOIS,
                "quantity" : 100
            },
            {
                "id" : ageofshimrod.C.RESSOURCE_PIERRE,
                "quantity" : 100
            }
        ],
    }
]