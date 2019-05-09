var totalCards = 7;
var won = 0;
var lost = 0;
var cards = [];
var moves = [];
var jokers = [];
var kingImg;
var faceDownImg;
var goImg;
var bg;
var startTime;
var ding;
var buzzer;
var song;
var scl = 100;
var shuffles = 5;
var duration = Math.max(180 / shuffles , 20);
var previousMoveIndex = 0;
var goXstart;
var goXend;
var goYstart;
var goYend;
var aspect = 16 / 9;
var state = 0; // 0 ---> waiting to go!, 1 ---> shuffling, 2 ---> picking



function preload() {
  for (var i = 0; i < 6; i++){
    jokers.push(loadImage('images/joker' + String(i) + '.jpg'));
  }
  kingImg = loadImage('images/king.png');
  faceDownImg = loadImage('images/faceDown.jpg');
  goImg = loadImage('images/Go.png');
  bg = loadImage('images/bg.jpg');
  ding = loadSound('sounds/ding.wav');
  buzzer = loadSound('sounds/buzzer.wav');
  song = loadSound('sounds/song.mp3');
}



function setup(){
  rectMode(CENTER);
  imageMode(CENTER);
  //textAlign(CENTER);
  createCanvas(totalCards * 200, 600);
  setInitialValues();
  for (var i = 0; i < totalCards; i++){
    cards.push(new Card(i));
  }
  song.play();
}

function draw() {
   textSize(20);
   translate(width / 2, height / 2);
   background(bg);
   translate(- width / 2, - height / 2);
   for (var i = cards.length - 1; i >= 0; i --){
     var c = cards[i];
     c.show();
   }
   if (state == 1){
      animate();
   }
      showUI();
}
function showUI(){
  fill(0, 255, 0);
  rect(width / 10, height * 0.9, width / 10, height / 20);
  strokeWeight(1.2);
  stroke(0);
  text('GO!', width * 0.085, height * 0.915);
  strokeWeight(1);
  image(goImg, width / 10, height * 0.9, width / 10, height / 10);
  text('Rounds won : ' + String(won), width / 20, height / 10);
  fill(255, 0, 0);
  text('Rounds lost : ' + String(lost), 8.5 * width / 10, height / 10);
}
function setInitialValues(){
  goXstart = width / 10 - (1 / 2) * width / 10;
  goXend = width / 10 + (1 / 2) * width / 10;
  goYstart = height * 0.9 - (1 / 2) * height / 10;
  goYend = height * 0.9 + (1 / 2) * height / 10;
}
function mousePressed(){
  if (state == 0){
    if ((mouseX >= goXstart && mouseX <= goXend) && (mouseY >= goYstart && mouseY <= goYend)){
          state = 1;
          setShuffle();
        }
  } else if (state == 2){
     for (var i = 0; i < moves.length; i++){
       moves[i] = null;
     }
     clickedIndex = findClickedCard(mouseX, mouseY);
     if (clickedIndex >= 0){
       if (cards[clickedIndex].isKing){
         ding.play();
         won ++;
       } else {
         buzzer.play();
         lost ++;
       }
      state = 0;
     }
  }
}


function setShuffle(){
 for (var k = 0; k < shuffles; k ++){
   var firstIndex = Math.round(random(0, totalCards - 1));
   var secondIndex = Math.round(random(0, totalCards - 1));
   if (firstIndex == secondIndex){
     if (firstIndex == 0){
       firstIndex ++;
     } else {
       secondIndex --;
     }
   }
   moves[k] = new Move(firstIndex, secondIndex);
   startTime = frameCount;
 }
}

function animate(){
  var currentMoveIndex = Math.floor((frameCount - startTime) / duration);
  if (currentMoveIndex < moves.length){
    if(currentMoveIndex > previousMoveIndex){
      reAssessMoves();
      previousMoveIndex = currentMoveIndex;
    }
   var move = moves[currentMoveIndex];
   var centerX = (move.sfx + move.ssx) / 2;
   var centerY = (move.sfy + move.ssy) / 2;
   var r = Math.abs((move.sfx - move.ssx) / 2);
   var timeElapsed = frameCount - startTime - currentMoveIndex * duration;
   var angle = map(timeElapsed, 0, duration - 1, 0, PI);
   var first = move.first;
   var second = move.second;
   var dir = (move.sfx > move.ssx) ? 1 : -1;
   var dx = r * cos(angle);
   var dy = r * sin(angle);
   first.x = centerX + dir * dx;
   first.y = centerY + dir * dy;
   second.x = centerX - dir * dx;
   second.y = centerY - dir * dy;
 } else {
   state = 2;
   shuffles ++;
   duration = Math.max(180 / shuffles , 20);
   previousMoveIndex = 0;
 }
}

function reAssessMoves(){
  for (var i = 0; i < moves.length; i ++){
    var m = moves[i];
    m.sfx = m.first.x;
    m.sfy = m.first.y;
    m.ssx = m.second.x;
    m.ssy = m.second.y;
  }
}


function findClickedCard(x, y){
  var halfWidth = scl / 2;
  var halfHeight = halfWidth * aspect;
  for (var i = 0; i < cards.length; i ++){
    var c = cards[i];
    if (x >= c.x - halfWidth && x <= c.x + halfWidth
         && y >= c.y - halfHeight && y <= c.y + halfHeight){
           return i;
         }
  }
   return -1;
}

/*
function animate(){
  if (frameCount - startTime < shuffles * duration){
    var currentMove = Math.floor((frameCount - startTime) / duration);
    var angle = map(frameCount - (startTime + currentMove * duration), 0, duration, 0, PI);
    var move = moves[currentMove];
    var first = move.first;
    var second = move.second;
    var centerX = (move.sfx + move.ssx) / 2;
    var centerY = (move.sfy + move.ssy) / 2;
    var circleSize = Math.abs(move.sfx - move.ssx);
    var dx = circleSize * cos(angle) / 2;
    var dy = circleSize * sin(angle) / 2;
    var dir = (first.x > second.x) ? -1 : 1;
    first.x = centerX + dir * dx;
    first.y = centerY + dir * dy;
    second.x = centerX - dir * dx;
    second.y = centerY - dir * dy;
 } else {
   state = 2;
 }
}
*/
