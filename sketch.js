var trex,trex_jump,trex_colide,ground,groundimg,invisground,cloudimg,o1,o2,o3,o4,o5,o6,play,end,gamestate,gameover,restart,restartimg,gameoverimg,jumps,dies,checkpoints;
var cloudgroup,obstaclegroup;
var score = 0;
var highestscore = 0;
function preload(){
  trex_jump = loadAnimation("trex1.png","trex3.png","trex4.png");
trex_colide = loadAnimation("trex_collided.png");
  groundimg = loadImage ("ground2.png");
  cloudimg = loadImage ("cloud.png");
  o1 = loadImage ("obstacle1.png");
  o2 = loadImage ("obstacle2.png");
  o3 = loadImage ("obstacle3.png");
  o4 = loadImage ("obstacle4.png");
  o5 = loadImage ("obstacle5.png");
  o6 = loadImage ("obstacle6.png");
  restartimg = loadImage ("restart.png");
  gameoverimg = loadImage ("gameOver.png");
  jumps = loadSound("jump.mp3");
  dies = loadSound("die.mp3");
  checkpoints = loadSound("checkPoint.mp3");

}




function setup() {
  createCanvas(600, 300);
  trex = createSprite(50,270,10,10);
  ground = createSprite(300,290,600,10);
  invisground = createSprite (300,300,600,10);
  trex.addAnimation("run",trex_jump);
  trex.addAnimation("colided", trex_colide);
  ground.addImage(groundimg);
  trex.scale = 0.5;
  ground.velocityX = -5;
  invisground.visible = false;
  cloudgroup = new Group();
  obstaclegroup = new Group();
  play = 1
  end = 0
  gamestate = play;
  gameover = createSprite(300,150,10,10);
  restart = createSprite(300,190,10,10);
  restart.addImage(restartimg);
  gameover.addImage(gameoverimg);
  gameover.scale = 0.5;
  restart.scale = 0.5;
  gameover.visible = false;
  restart.visible = false;
}

function draw() {
  background(245);
  textSize(20);
  fill("grey");
  text("Score: "+ score,380,20);
  text("Highest score: " + highestscore,380,60);
  if(gamestate === play){
     ground.velocityX = -(5 + score/100);
    score = score + Math.round(getFrameRate()/60)
    if (keyDown("space") && trex.y > 271){
   trex.velocityY = -10;
 jumps.play();
    }
    spawnclouds();
  spawnobstacles();
  trex.velocityY = trex.velocityY + 0.6;
  if(score % 100 == 0 && 0 <score){
    checkpoints.play();
  }
      if(ground.x < 0){
    ground.x = 300;
   //ground.x = gound.width/2
  }
  if(obstaclegroup.isTouching(trex)){
    gamestate = end;
    dies.play();
  }
  }
  
  else if (gamestate === end){
    trex.velocityY = 0;
    ground.velocityX = 0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    obstaclegroup.setLifetimeEach(-2);
    cloudgroup.setLifetimeEach(-2);
    trex.changeAnimation("colided",trex_colide);
    restart.visible = true;
    gameover.visible = true;
    if (highestscore < score){
    highestscore = score;
  }
  }
  
if (mousePressedOver(restart)){
  reset()
}
  
  trex.collide(invisground);  
 
  
  drawSprites();
  //console.log(trex.y);

}
function reset(){
  gameover.visible = false;
  restart.visible = false;
  obstaclegroup.destroyEach();
  cloudgroup.destroyEach();
  gamestate = play;
  trex.changeAnimation("run",trex_jump);
  console.log(highestscore)
  score = 0;
}

function spawnclouds(){
  if(frameCount % 70 == 0){
  var cloud = createSprite(610,100,20,10);
  cloud.addImage(cloudimg);
  cloud.velocityX = -15;
  cloud.scale = 0.75;
    var rc = Math.round (random (50,120));
    //console.log (rc);
    cloud.y = rc;
    cloud.lifetime = 41;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudgroup.add(cloud);
  }
}

function spawnobstacles(){
 if (frameCount % 60 == 0){
  var obstacle = createSprite(610,280,10,10);
  obstacle.velocityX = -(5 + 3*score/100);
  var ro = Math.round (random(1,6));
 switch (ro){
 case 1: obstacle.addImage(o1);
        break
 case 2: obstacle.addImage(o2);
        break
 case 3: obstacle.addImage(o3);
        break
 case 4: obstacle.addImage(o4);
        break
 case 5: obstacle.addImage(o5);
       break
 case 6: obstacle.addImage(o6);
        break
 default: break
 }
 obstacle.setCollider("circle",0,0,40);
 obstacle.lifetime = 122;
 obstaclegroup.add(obstacle);
 obstacle.scale = 0.5;
 }
 }
