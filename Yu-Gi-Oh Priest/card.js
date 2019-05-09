
function Card(i){
  this.x = width / (2 * totalCards) + 2 * i * scl;
  this.y = height / 2;
  this.color = map(i, 0, totalCards - 1, 0, 255);
  this.show = function(){
    if (state == 0){
    image(this.image, this.x, this.y, scl, scl * aspect);
  } else {
    image(faceDownImg, this.x, this.y, scl, scl * aspect);
  }
  }
  this.isKing = (i == Math.floor(totalCards / 2));
  var kingSpot = Math.floor(totalCards / 2);
  if (i == kingSpot){
    this.image = kingImg;
  } else if (i < kingSpot){
    this.image = jokers[i];
  } else {
    this.image = jokers[i - 1];
  }
}
