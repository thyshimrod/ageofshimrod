function calcDistance (A,B){
    if (A != null && typeof A !== 'undefined' && B != null && typeof B !== 'undefined'){
      let distance = 0;
      let a = A.x + ( Math.round(A.sizeX /2)) - B.x - ( Math.round(A.sizeX /2));
      a = a * a;
      let b = A.y + ( Math.round(A.sizeY /2)) - B.y - ( Math.round(A.sizeY /2));
      b = b * b;
      distance = Math.sqrt(a+b);
      return distance;
    }
    return -1;
  }
 
  function goToTarget(creature,target){
    if (creature.x < (target.x ) ){
        let step = (target.x-creature.x) > creature.step ? creature.step : (target.x-creature.x);
        creature.x += step;
        creature.direction = ageofshimrod.C.DIRECTION_RIGHT;
    } 
    if (creature.x > (target.x  ) ){
        let step = (creature.x -target.x) > creature.step ? creature.step : (creature.x - target.x);
        creature.x -= step;
        creature.direction = ageofshimrod.C.DIRECTION_LEFT;
    } 
    if (creature.y < (target.y ) ){
        let step = (target.y-creature.y) > creature.step ? creature.step : (target.y-creature.y);
        creature.y += step;
        creature.direction = ageofshimrod.C.DIRECTION_DOWN;
    } 
    if (creature.y > (target.y  ) ){
        let step = (creature.y -target.y) > creature.step ? creature.step : (creature.y - target.y);
        creature.y -= step;
        creature.direction = ageofshimrod.C.DIRECTION_UP  
    } 

    if (calcDistance(creature,target) > 32){
        let d = new Date();
        let newTick = d.getTime();
        if (newTick - creature.animationTick > ageofshimrod.C.ANIMATION_SPEED){
            creature.animationTick = newTick;
            creature.animation += 1;
            if (creature.animation > 2) creature.animation = 0;
        }
    }
}
  