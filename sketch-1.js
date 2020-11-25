var PLAY=1;
var gameState=PLAY;

var END=0;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup

var ground;

var time=0;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(600,600);
FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
 ground=createSprite(700,350,1200,20); 
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  monkey=createSprite(50,290,50,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.2
  

}



function draw() {
background("lightblue");
  monkey.collide(ground);
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  textSize(25)
  fill("red");
  text("Survival Time: "+time,200,20)
  text("Score: "+score,400,20);
 
  
  if(gameState === PLAY){
    
    time = Math.ceil(frameCount/frameRate());
    
 if (ground.x < 0)
 {
  ground.x = ground.width/2;
 }
    
    
 if(keyDown("space")&& monkey.y >= 200) {
        monkey.velocityY = -12; }
  
    
  monkey.velocityY= monkey.velocityY+1;
 if(FoodGroup.isTouching(monkey)) {
      FoodGroup.destroyEach();
      score = score+2;
      time=time+5;
    }
  food();
  obstacles();
   if (obstacleGroup.isTouching(monkey))
   {
    gameState=END;
   }
   }
  
  if (gameState===END)
  {
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    
    ground.velocityX= 0;
    monkey.velocityX= 0;
    
     
  if(keyDown("r")){
     gameState=PLAY
    score=0;
    time=0;
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
     
     }
    background("lightblue");
    fill("red");
    textSize(30);
    
  text("Game Over", 300, 300);
    

    fill("red");
       textSize(30);
    text("Restart(R)",300,250)
    
  }
  drawSprites();
}
function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
  }
}

function obstacles() {
  if (frameCount % 300 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.2 ;
    obstacleGroup.add(obstacle);
  }
}





