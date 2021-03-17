var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 
var obsgrp;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadAnimation("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
  
  
  
  obst1=loadImage("images/obstacle1.png");
  obst2=loadImage("images/obstacle2.png");
  obst3=loadImage("images/obstacle3.png");
  
  
}

function setup(){
  
createCanvas(displayWidth,displayHeight);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;
 //edges= createEdgeSprites();

//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("running",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist
mainCyclist.setCollider("rectangle",0,0,40,40);
  
gameOver = createSprite(0,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
obsgrp=new Group();  
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    

    camera.position.x=mainCyclist.x;
    camera.position.y=displayHeight/2;
    distance = distance + Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
    //console.log("here");
  }
  
  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    cobstacles();
    if(mainCyclist.isTouching(obsgrp)){
       gameState=END;
       obsgrp.destroyEach();
      
    }
  }else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!",0,displayHeight/2-100);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
              mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    obsgrp.setVelocityXEach(0);
    obsgrp.setLifetimeEach(-1);
    
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=displayWidth;
        redCG.add(player3);
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  obsgrp.destroyEach();
  distance = 0;
}

function cobstacles(){
  if(frameCount%100===0){
    var obst=createSprite(width,height/2);
    obst.y=mainCyclist.y;
    var no=Math.round(random(1,3)) ;
     switch(no){
      case 1:obst.addImage(obst1);
             break;
      case 2:obst.addImage(obst2);
             break;
      case 3:obst.addImage(obst3);
             break;
    }     
    obst.scale=0.1;
    obst.velocityX=-(6 + 2*distance/150);
    obst.lifetime=width;
    
    obsgrp.add(obst);
  }
}