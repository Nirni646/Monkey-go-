var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, rock, obstacleImage
var FoodGroup, obstacleGroup
var score
var survivalTime

function preload() {
  //loading the image of monkey
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")
  //loading bannana image and obstacle image
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}


function setup() {
  //creating canvas
  createCanvas(400, 400);
    
  //creating monkey variable and adding animation to the monkey
  monkey = createSprite(80, 215, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
  //creating ground sprite 
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = width / 2;
  console.log(ground.x);
  //creating groups of food and obstacles
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  survivalTime = 0
}

function draw() {
  //clearing screen
  background("white");
  text("SurvivalTime:" + survivalTime, 100, 50)
  //making monkey collide with ground
  monkey.collide(ground);
  if(gameState === PLAY){
  if (ground.x > 0) {
    ground.x = width / 2
  }
  if (keyDown("space")) {
    monkey.velocityY = -12;
    
  }
  
  survivalTime = Math.ceil(frameCount / frameRate())


  }
  monkey.velocityY += 0.8;

  
  food();
  obstacle();
  
   
  if(obstacleGroup.isTouching(monkey)){
    gameState = END;
  }
    
  
  if(gameState === END){
    //stop the ground
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0); 
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    monkey.velocityX = 0
    
  }
  
  
  drawSprites();
}

function food() {
  if (frameCount % 100 == 0) {
    //creating banana sprite and adding image to it
    banana = createSprite(400, Math.round(random(120, 200)));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 100;
    FoodGroup.add(banana);
    banana.depth = monkey.depth;
    monkey.depth += 1;

  }
}
//creating my own function of obstracles
function obstacle() {
  if (frameCount % 110 === 0) {
    //creating obstracle sprite and adding image to it
    rock = createSprite(400, 330);
    rock.addImage(obstacleImage);
    rock.scale = 0.1;
    rock.velocityX = -4;
    rock.lifetime = 100;
    obstacleGroup.add(rock);
  }
}





