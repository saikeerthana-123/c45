const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
//const Detector = Matter.Detector;

var engine, world;
var player, backgroundimg1, bg2;
var backgroundSprite;
var rand, randome, randomee;
var obs1,obs2,obs3,obs4;
var obstaclesGroup;
var out;
var slow,normal,fast;
var voldemort;
var vold;

function preload(){
  backgroundimg1 = loadImage("images/floor1.png");
  bg2 = loadImage("images/ocean.png");
  harryPotterImage = loadImage("images/HARRY POTTER 2.png");
  obs1 = loadImage("images/obstacle1.png");
  obs2 = loadImage("images/obstacle2.png");
  obs3 = loadImage("images/obstacle3.png");
  obs4 = loadImage("images/obstacle4.png");
  out = loadSound("sounds/storm.mp3");
  slow = loadSound("sounds/harry_potter.slow.mp3");
  normal = loadSound("sounds/harry_potter.fast.mp3");
  fast = loadSound("sounds/harry_potter.extrafast.mp3");
  voldemort = loadImage("images/voldemort.png");
  }

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;
  obstaclesGroup = createGroup();
  backgroundSprite = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
  backgroundSprite.addImage(backgroundimg1);
  backgroundSprite.scale = 2;
  backgroundSprite.velocityY = 6;
  backgroundSprite.x = backgroundSprite.height/2;
  player = createSprite(windowWidth/2 - 300,windowHeight/2,300,300);
  player.addImage(harryPotterImage);
  player.scale = 0.8;
  vold = createSprite(150,500,50,50);
  vold.velocityY = 6;
 }

function draw() {
  //Engine.update(engine);
  background("white"); 
  vold.addImage(voldemort);
  edges = createEdgeSprites();
  if (backgroundSprite.y > windowHeight) {
    backgroundSprite.y = backgroundSprite.height/2;
  }
  
  if(frameCount % 100 === 0){
     randome = Math.round(random(400,800));
     var obs = createSprite(randome,5,10,10);
     rand = Math.round(random(1,4));
     
     obs.velocityY = 6;
     switch (rand) {
      case 1:
        obs.addImage(obs1);
        break;
      case 2:
        obs.addImage(obs2);
        break;
      case 3:
        obs.addImage(obs3);
        break;
      case 4:
        obs.addImage(obs4);
     }
     obs.scale = 0.5;
     obstaclesGroup.add(obs);
  }
  if (keyDown("space")) {
    player.velocityY = -6;
  }
  if(keyCode === 37){
    player.velocityX = - 10;
  }

  if(keyCode === 39){
    player.velocityX = 10;
  }

  player.velocityY = player.velocityY + 0.8;

  if (obstaclesGroup.isTouching(player)){
    backgroundSprite.addImage(bg2);
    obstaclesGroup.destroyEach();
    obstaclesGroup.setVelocityYeach = 0;
    obstaclesGroup.setVelocityXeach = 0;
    obstaclesGroup.setLifetimeEach(-1);
    player.velocityX = 0;
    player.velocityY = 0;
    out.play();
    
  }
  player.collide(edges[3]);
  drawSprites();
  player.display();
}