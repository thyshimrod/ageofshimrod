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
  