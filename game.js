const buttonColors = ["red","blue","green","yellow"];
var randomChosenColor;
var gamePattern=[];
var userClickedPattern=[];
var userIDX = 0;
var level =0;



$(document).on("keypress",function (e) { 
    
    if(level==0){
        nextSequence()
    }
    

    
});

$('.btn').click(function (e) { 
    //console.log(e)
    userChosenColor = e.currentTarget.id;
    //console.log(userChosenColor)
    userClickedPattern.push(userChosenColor);
    userIDX=userIDX+1;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer();
    
});

function nextSequence(){
    level=level+1;
    userClickedPattern=[];
    userIDX=0;
    $('h1').text("Level "+level);
    randomNumber = Math.floor(Math.random()*4);
    randomChosenColor = buttonColors[randomNumber];
    
    gamePattern.push(randomChosenColor);

    console.log(randomChosenColor)
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
    
    
}


function checkAnswer(){
    // console.log(userIDX)
    // console.log(JSON.stringify(userClickedPattern.slice(0,userIDX)))
    // console.log(JSON.stringify(gamePattern.slice(0,userIDX)))
    if(JSON.stringify(userClickedPattern.slice(0,userIDX))===JSON.stringify(gamePattern.slice(0,userIDX))){
        console.log("correct")
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence()
            },1000);
        }

    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");

        var gamePattern=[];
        var userClickedPattern=[];
        var userIDX = 0;
        var level =0;

    }
}

function playSound(color) { 
    var snd = new Audio('./sounds/'+color+'.mp3');
    snd.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100)
}

