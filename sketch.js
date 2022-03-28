// declare variables
var rocket, rocketImg;
var asteroid, asteroidImg, crashSnd, asteroidGrp;
var star, starImg, starSnd, starGrp;
var music;
var gameState = "begin";
var score = 0;

function preload() {
  rocketImg = loadImage("rocket.png");
  starImg = loadImage("star.png");
  asteroidImg = loadImage("asteroid.png");

  starSnd = loadSound("star.mp3");
  crashSnd = loadSound("crash.mp3");
  music = loadSound("music.mp3");
}

function setup() {
  createCanvas(600, 600);

  music.loop();

  // create groups
  asteroidGrp = new Group();
  starGrp = new Group();

  // rocket setup
  rocket = createSprite(300, 500, 500, 500);
  rocket.addImage(rocketImg)
  rocket.scale = 0.2;
  // rocket.debug = true;
  rocket.setCollider("circle", 0, 0, 200)
}

function draw() {
  background("black");

  if (gameState == "begin") {
    fill("white");
    textSize(40);
    textAlign("center");
    text("PRESS SPACE TO START", 300, 300);
    if (keyDown("space")) {
      gameState = "play";
    }
  } else if (gameState == "play") {
    rocket.x = mouseX;
    createStars();
    createAsteroids();

    fill("white");
    textSize(20);
    textAlign("right");
    text("SCORE: "+score, 590, 25);

    if (starGrp.isTouching(rocket)) {
      starGrp.destroyEach();
      score += 10;
      starSnd.play();
    } else if (asteroidGrp.isTouching(rocket)) {
      gameState = "end"
      crashSnd.play();
    }
  } else if (gameState == "end") {
    starGrp.setLifetimeEach(-1);
    asteroidGrp.setLifetimeEach(-1);
    starGrp.setVelocityYEach(0);
    asteroidGrp.setVelocityYEach(0);
    fill("white");
    textSize(40);
    textAlign("center");
    text("PRESS SPACE TO RESTART", 300, 280);
    textSize(30);
    text("Score: "+score, 300, 320)
    if (keyDown("space")) {
      gameState = "play";
      score = 0;
      starGrp.destroyEach();
      asteroidGrp.destroyEach();
    }
  }

  drawSprites();
}

function createStars() {
  // spawns stars randomly
  if (frameCount % 150 == 0) {
    // star setup
    star = createSprite(300, 0, 40, 10);
    star.addImage(starImg);
    star.scale = 0.2;

    // star position
    star.x = Math.round(random(0, 600));
    star.velocityY = (6+score/7);
    star.depth = rocket.depth - 1;

    star.lifetime = 225;

    starGrp.add(star);
  }
}

function createAsteroids() {
  // spawns asteroids randomly
  if (frameCount % 160 == 0) {
    // asteroid setup
    asteroid = createSprite(300, 0, 500, 500);
    asteroid.addImage(asteroidImg)
    asteroid.scale = 0.2;

    // asteroid position
    asteroid.x = Math.round(random(0, 600));
    asteroid.velocityY = (6+score/7);
    asteroid.depth = rocket.depth - 1;

    asteroid.lifetime = 225;

    asteroidGrp.add(asteroid);
  }
}
