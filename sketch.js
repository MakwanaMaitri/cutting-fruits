// Game States
var PLAY = 1;
var END = 0;
var gameState = 1;

// all sprites variables
var sword, swordImg;
var fruits, fruitImg;
var enemy, enemyImg;


function preload(){
 
  swordImg = loadImage("sword.png");
  fruitImg = loadImage("fruit1.png","fruit2.png",
                      "fruit3.png","fruit4.png");
  enemyImg = loadImage("alien1.png","alien2.png");
}

function setup(){
   createCanvas(600,600);
  
  //sword 
  sword = createSprite(200,200,50,50);
  sword.addImage("sword",swordImg);
  sword.scale=0.7;
  
  //score variables and groups
   score = 0 ;
   fruitGroup=createGroup();
   enemyGroup=createGroup(); 
  
}
function draw(){
  //background colour
  background("lightBlue")
  
  if(gameState===PLAY){
    
    //call fruits and enemy function
    fruits();
    Enemy();
    
   //positions of sword 
   sword.y = World.mouseY;
   sword.x = World.mouseX;
    
  //increase score 
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    score = score + 2;
    } 
    else
    {
      
    if(enemyGroup.isTouching(sword)){
     gameState=END;
      
     fruitGroup.destroyEach();
     enemyGroup.destroyEach();
     fruitGroup.setVelocityXEach(0);
     enemyGroup.setVelocityXEach(0);
        
      sword.x=200;
      sword.y=200;
      }
    }
  }
  
  drawSprites();
  
    text("Score : "+ score,300,30);
}
 
function fruits(){
  if(World.frameCount%80===0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.addImage("fruit",fruitImg);
    
//using random variable change the position of fruit, to make it more challenging
    
    if(position==1)
      {
        fruit.x=400;
        fruit.velocityX=-(7+(score/4));
      }
      else
      {
        if(position==2){
          fruit.x=0;
          
//Increase the velocity of fruit after score 4 or 10
       fruit.velocityX= (7+(score/4));
      }   
    }
       fruitGroup.add(fruit);
     fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
   
     
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
  }
}

function Enemy(){
  if(World.frameCount%200===0){
     monster = createSprite(400,200,20,20);
     monster.addImage("enemy",enemyImg);
     monster.y = Math.round(random(100,300));
     monster.velocityX = -(8+(score/10));
     monster.setLifetime = 50;
    
    enemyGroup.add(monster);
  }
}