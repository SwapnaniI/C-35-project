var balloonAnimation;
var balloon;
var back;
var changeScaleVar;

var database;
var ballPosition;
var position;

function preload(){
    back = loadImage("img1.png");
    balloonAnimation = loadAnimation("img2.png","img3.png","img4.png")
}

function setup(){
    database = firebase.database();
    createCanvas(2500/2,1667/2);

    balloon = createSprite(400, 200, 50, 50);
    balloon.addAnimation("tag",balloonAnimation);
    
    ballPosition = database.ref('balloon/position');
    ballPosition.on("value",readPosition,showError)

}

function draw(){
    background(back);
    if(position!==undefined){

        if(frameCount % 30===0){
        changeScaleVar = random(0.7,1)}         
        balloon.scale = changeScaleVar;

    
    if(keyDown(LEFT_ARROW)){
        writePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(10,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,10);
    }
}
    drawSprites();
    fill(155,100,255)
    textSize(20)
    strokeWeight(3)
    text("Use arrow keys to move",80,100)
}
function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
  }
function showError(){
    console.error("ERROR");
}

function writePosition(x,y){
    database.ref('balloon/position').set({'x':position.x+x,'y':position.y+y});
}

