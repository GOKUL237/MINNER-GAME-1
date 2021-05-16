var bg,bgImg,player,invisibleground,obstaclesGroup,topobstacles,Gameoverimg,Gameover,line,lineimg,GOLD,GOLDimg
var startButton,startButtonimg
var gameState="INTRO"
var score
var coin
var lavabg,lavabgImg
var restart,restartImg
function preload(){
bgImg=loadImage("bg1.png")  
lavabgImg=loadImage("bg2.jpg")
Gameoverimg=loadImage("GAMEOVER3.PNG.png")
GOLDimg=loadImage("rsz_gold.PNG")
lineimg=loadImage("slab.png")
restartImg=loadImage("restart.png")

startButtonimg=loadImage("STARTBUTTON.png")
playerRUN=loadAnimation("minerIMG/RUN1.png","minerIMG/RUN2.png","minerIMG/RUN3.png","minerIMG/RUN4.png")
playerStand=loadAnimation("minerIMG/STAND.png")
playerJump=loadAnimation("minerIMG/JUMP.png") 
playerMINE=loadAnimation("minerIMG/MINE1.png","minerIMG/MINE2.png","minerIMG/MINE3.png")
playerFall=loadAnimation("minerIMG/FALL1.png") 

 
obstacle1=loadImage("obstaclesIMG/obstacle1.png")
obstacle2=loadImage("obstaclesIMG/obstacle2.png") 
obstacle3=loadImage("obstaclesIMG/obstacle3.png")
obstacle4=loadImage("obstaclesIMG/obstacle4.png")
obstacle5=loadImage("obstaclesIMG/obstacle5.png") 
}
function setup() {
  createCanvas(windowWidth,windowHeight);

//introText.scale=10
bg=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
 bg.addImage("ground",bgImg)
 bg.velocityX=-6;
bg.scale=0.8


startButton=createSprite(1300,450)
startButton.addImage("text",startButtonimg)
startButton.visible=false

restart= createSprite(1300,900)
restart.addImage("RESTART",restartImg)
restart.visible=false
restart.scale=0.3

obstaclesGroup=new Group();
topobstacles=new Group();
invisibleground=createSprite(windowWidth/2,980,windowWidth,20)
slabgroup=new Group();
coingroup=new Group();
player=createSprite(200,250,50,50)
player.addAnimation("RUN",playerRUN)
player.addAnimation("JUMP",playerJump)
player.addAnimation("MINE",playerMINE)
player.addAnimation("FALL",playerFall)
player.visible=false
player.scale=2


score =0
coin=0
}   
function draw() {
  background(255,255,255);  
  drawSprites();

  textSize(40)
  fill("yellow")
  text("Score-"+score,300,50)
fill("yellow")
  text("Coin-"+coin,300,100)

  if (gameState==="INTRO"){
    bg.velocityX=0;
  textSize(50)
  fill("yellow")
  strokeWeight(5)
  text("HELP THE MINER TO GET GOLD",800,100)
  
text("PRESS SPACE TO ESCAPE FROM OBSTACLE",800,150)
fill("BLUE")
stroke("yellow")
text("CLICK ON START BUTTON TO START THE GAME",800,300)
startButton.visible=true
if(mousePressedOver(startButton)){
gameState="play"


}
  }
if(gameState==="play"){
startButton.visible=false
player.visible=true
bg.velocityX=-6

 spawnObstacles();
topObstacles();
spawnCoin();
spawnSlab();
slabgroup.collide(player)
score=score+Math.round(getFrameRate()/60);
if (coingroup.isTouching(player)){
coin+=1
coingroup.destroyEach();
}



   if (keyDown(UP_ARROW)){

    player.changeAnimation("JUMP",playerJump)
    player.velocityY=-10
    }
    player.velocityY=player.velocityY+0.8

if(bg.x<0){
  bg.x=800

}
if(coin===5){
  gameState="bonus"

  
  
   }
}

if (obstaclesGroup.isTouching(player)){
gameState="end"
restart.visible=true

}
else if (gameState==="end"){
Gameover=createSprite(1300,450)
Gameover.addImage("gameover",Gameoverimg)
player.changeAnimation("FALL",playerFall)
bg.velocityX=0
obstaclesGroup.setLifetimeEach(-1)
topobstacles.setLifetimeEach(-1)
obstaclesGroup.setVelocityXEach(0)
topobstacles.setVelocityXEach(0)
bg.velocityX=0

} 
if(mousePressedOver(restart)){
  gameState="play"
  restart.debug=true
  obstaclesGroup.destroyEach()
topobstacles.destroyEach()
restart.visible=false
}
player.collide(invisibleground)
if (gameState==="bonus"){

lavabg=createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight)
lavabg.addImage("lavabg",lavabgImg)
lavabg.velocityX=-4;
lavabg.scale=2


}

}
function spawnObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(600,950,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles   
    var rand = Math.round(random(1,3));
    switch(rand) {   
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle5);
              break;  
     
      
      default: break;
       
    }
  
      
    //obstacle.scale = 0.5;
  //  obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
  }
}
function topObstacles() {
  if(frameCount % 160 === 0) {
    var obstacle = createSprite(600,random(50,250),10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle3);
              break;
      case 2: obstacle.addImage(obstacle4);
              break;
      
      
      default: break;
       
    }
  
      
    //obstacle.scale = 0.5;
  //  obstacle.lifetime = 300;                             

    topobstacles.add(obstacle);
  }
}
function spawnCoin(){
if (frameCount% 60===0){

 var  GOLD=createSprite (600,random(10,980),10,40)

GOLD.addImage("gold",GOLDimg)
 GOLD.scale=0.1;
 GOLD.velocityX= -7;
coingroup.add(GOLD);

}


}
function spawnSlab(){
if (frameCount% 160===0){
 var  line=createSprite(600,random(50,250),random(250,300),10,40)
  line.addImage("slab",lineimg)
  line.width=500
line.velocityX=-3;
line.velocityY=0;
slabgroup.add(line); 
}   

}

  














