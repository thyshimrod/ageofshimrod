'use strict';
//debugger;
var ageofshimrod = ageofshimrod || {};

ageofshimrod.C = Object.freeze({
  UI_BORDER_COLOR : "#191970",
  UI_RECT_COLOR : "#E6E6FA",
  UI_FONT_COLOR : "#191970",
  UI_BORDER_RED : "#f81a2d",

  UI_STATUS_SHOW : 0,
  UI_STATUS_HIDDEN : 1,

  CLICK_ON_WINDOW : true,
  CLICK_OUTSIDE_WINDOW : false,

  RESSOURCE_PIERRE : 1,
  RESSOURCE_BOIS : 2,
  RESSOURCE_FOOD : 3,

  DECOR_PIERRE : 0,
  DECOR_ARBRE : 1,
  DECOR_ARBRE_MORT : 1,

  BUILDING_HOUSE : 0,
  BUILDING_LUMBER : 1,

  BUTTON_STATUS_KO : 0,
  BUTTON_STATUS_OK : 1,

  PEON_STATUS_COLLECT : 0,
  PEON_STATUS_GOTO_RESSOURCE : 1,
  PEON_STATUS_GOTO_STOCK : 2,
  PEON_STATUS_WAIT : 3,

  CHARACTER_STEP : 3,

  DIRECTION_UP :3,
  DIRECTION_DOWN :0,
  DIRECTION_LEFT :1,
  DIRECTION_RIGHT :2,

  MAP_STATUS_NORMAL : 0,
  MAP_STATUS_ADD_BUILDING : 1,

  GAME_STATUS_START : 0,
  GAME_STATUS_INGAME : 1,
  GAME_STATUS_ENDGAME : 2,

  EDITOR_STATUS_NONE : 0,
  EDITOR_STATUS_ADD_DECOR : 1,
  EDITOR_STATUS_REMOVE_DECOR : 2

});
