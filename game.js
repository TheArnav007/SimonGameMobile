var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 1;
var started = false;

function nextSequence() {
  var randomNumber = Math.round(Math.random() * 3);
  var randomChoosenColor = buttonColors[randomNumber];
  var choosenBox = $("#" + randomChoosenColor);
  playSound(randomChoosenColor);
  choosenBox.fadeOut(100).fadeIn(100);
  gamePattern.push(randomChoosenColor);
  $("#level-title").text("Level " + level);
  level++;
}

function playSound(sound) {
  var audio = new Audio("sounds/" + sound + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentIndex) {
  if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
        userClickedPattern = [];
      }, 300);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 600);
    level = 1;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
  }
}
$(document).on("click", function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});
var userClickedPattern = [];
$(".btn").on("click", function() {
  var userChoosenColor = $(this).attr("id");
  playSound(userChoosenColor);
  animatePress(userChoosenColor);
  userClickedPattern.push(userChoosenColor);
  checkAnswer(userClickedPattern.length - 1);
});
