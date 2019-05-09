
function Move(firstIndex, secondIndex){
  this.first = cards[firstIndex];
  this.second = cards[secondIndex];
  this.sfx = this.first.x;
  this.sfy = this.first.y;
  this.ssx = this.second.x;
  this.ssy = this.second.y;
}
