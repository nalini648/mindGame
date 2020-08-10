var userClickedPattern=[];
var gamePattern=[];
var buttonColors=["red","yellow","orange","green"];
//You'll need a way to keep track of whether if the game has started or not,
// so you only call nextSequence() on the first keypress.
var started=false;
//2. Create a new variable called level and start at level 0.
var level=0;
//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().

$(document).keypress(function(){
  if(!started){
     //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
     $("#level-title").text("level" +level);
     nextSequence();
     started= true;
  }
});
$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel){
//3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
  console.log("success");
  //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
  if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}else{
  console.log("wrong");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");

  },200);
  $("#level-title").text("Game Over, Press any key to restart");
  startOver();
}

}

function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("level" + level);
   var randomNumber=Math.floor(Math.random()*4);

var randomChosenColor=buttonColors[randomNumber];
gamePattern.push(randomChosenColor);
// use jQuery to select the  button with th same id as the randomChosenColour
$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColor);
}
function playSound(name){
var audio=new Audio("sounds/" +name+ ".mp3");
audio.play();
}
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");

  },100);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
