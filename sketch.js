   var PLAY = 0;
   var gameState = -1;
   var score = 0;
   var highest=localStorage.getItem("Highest");

   var bulletSound = new Audio("bullet.mp3");
   var killSound = new Audio("kill.mp3");
   var bgSound = new Audio("bg.mp3");
   var mini = 0;
   var low = 50;
   var med = 100;
   var high = 125;
   var current = 150;
 
   function preload(){
    spaceImage= loadImage("images/bgspace.jpg");
    enemyImage= loadImage("images/enemy.png");
    spaceshipImage= loadImage("images/spaceShip.png");
    bullImg = loadImage("images/bullet.png");
    start = loadImage("images/start.png");
    restart = loadImage("images/restart.png");
    enem = loadImage("images/enem.png");
    uf = loadImage("images/ufo.png");
    blasti=loadImage("images/blast.png");
   }
  

   function setup(){
    createCanvas(displayWidth,displayHeight-110);
    space = createSprite(0, 0 ,400, 400);
    space.addImage(spaceImage);  
    space.scale=5;
    space.y = space.height/2;
    
    player = createSprite(displayWidth/2, 650);
    player.addImage(spaceshipImage);
    player.scale= 0.75;

    ufo = createSprite(displayWidth/2, 150);
    ufo.addImage(uf);
    ufo.scale= 0.75;
    ufo.visible=false;

    
    restb = createSprite(displayWidth/2, 300);
    restb.addImage(restart);
    restb.scale= 0.75;
    restb.visible=false;

    startb = createSprite(displayWidth/2,300);
    startb.addImage(start);
    startb.scale=0.7;
    
    meter = createSprite(1200,50,current*1.5,25)
    meter.shapeColor="green";

    EnemyGroup = new Group();
    BulletGroup = new Group();
    textSize(30);
    frameRate(60);
 
   }

   alert("Click Space To Shoot Bullet.");

   function draw() {

    highest = localStorage.getItem("Highest");
    meter.width=current;
    meter.x=1200-((150-current)*0.5)
     
    if(highest===null){
      localStorage.setItem("Highest",0);
    }
    else if(score>=highest){
      localStorage.setItem("Highest",score)
    }
    if(mousePressedOver(startb)){
      startb.visible = false;
      gameState=0;
    }
    if(current>=high&&current>med){
      meter.shapeColor="green";
    }
    else if(current<=med&&current>low){
      meter.shapeColor="#fc9700";
    }
    else if(current<=low&&current>mini){
      meter.shapeColor="crimson";
    }
    else if(current<=mini){
      current=0;
      meter.width=0;
      meter.x=1200;
      meter.shapeColor="rgba(0,0,0,0)";
      gameState=1;
    }
    if (space.y > 500) {       
      space.y = space.height/2;
    }
  background("black");
  if(gameState==0){

    restb.visible=false;

    bgSound.play(true);

    
   player.x=World.mouseX
   
   if(gameState === PLAY){
  
    if(keyWentDown("space"))  {
      
  }

  space.velocityY= 5+(frameCount*0.00075); 

    generateEnemy();
  }
   
  if(keyWentDown("space")){
  bulletSound.play()
  generateBullet(player,5);
  }
 
   for (var i = 0; i < EnemyGroup.length; i++) {
     var temp1=EnemyGroup.get(i);
      if(temp1.y>height+50){
     temp1.destroy();
     score-=10;
   }
   for(var j=0;j< BulletGroup.length;j++){
   if(BulletGroup[j].isTouching(temp1)){
    
     temp1.addImage(blasti);
     temp1.scale=0.2;
     temp1.lifetime=4;
     BulletGroup[j].lifetime=5;
     killSound.play();
     score+=random(1,2.5);
   }
  }
   if(player.isTouching(temp1)){
     current-=10;
     temp1.destroy();
   }
 }  
  
}
else if(gameState==1){

  BulletGroup.destroyEach();
  EnemyGroup.destroyEach();
  player.x=displayWidth/2;
  space.velocityY=0;
  restb.visible=true;
  if(mousePressedOver(restb)){
    restb.visible=false;
    score=0;
    frameCount=0;
    gameState=0;
    current=150;
  }
}
   drawSprites();
   

   stroke("black");
   strokeWeight(10); 
   fill("yellow");
   text("Score:  "+Math.round(score),300,60); 
   text("Highest Score:  "+Math.round(highest),600,60); 
   text("Health:  ",1000,57.5);
   stroke("black");
   strokeWeight(10); 
   fill("rgba(0,0,0,0)")
   rect(1125,35,150,35);
   rect(1275,40,12,17.5);
   }
  
  function generateEnemy() {
   if(World.frameCount%40===0){
     var enemy = createSprite(random(50,1250),0);
     enemy.addImage(enemyImage);
     enemy.velocityY = 5+(frameCount*0.00075);
     enemy.scale = 0.5;
     enemy.lifetime = 300;
     EnemyGroup.add(enemy);
   }
 }
 function generateBullet(goo,bo) {
    var bullet = createSprite(goo.x,goo.y-50,15,50);
    bullet.velocityY = -(bo+(frameCount*0.00075));
    bullet.shapeColor="blue"
    bullet.lifetime = 200;
    bullet.scale=0.2;
    bullet.addImage(bullImg);
    BulletGroup.add(bullet);
    
  }

 

 
   
