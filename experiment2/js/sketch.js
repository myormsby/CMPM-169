let circles = [];

let backgroundMusic;

function preload() {
  backgroundMusic = loadSound('sound.mp3'); 
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(183, 234, 247);

  // Check if it's time to spawn a new circle
  if (random() < 0.05) {
    let newCircle = {
      x: random(width),
      y: random(height),
      diameter: 30,
      alpha: 255  
    };
    circles.push(newCircle);
    
    
  }
  
  if (!backgroundMusic.isPlaying()) {
    backgroundMusic.play();
  }

  // Update and display each circle
  for (let i = circles.length - 1; i >= 0; i--) {
    let circle = circles[i];

    circle.alpha -= 2;
    circle.diameter += 1;
    
    // Display the circle
    noFill();
    stroke(3, 202, 252, circle.alpha);
    ellipse(circle.x, circle.y, circle.diameter);

    // Remove circles that have faded away
    if (circle.alpha <= 0) {
      circles.splice(i, 1);
    }
  }
}

function mousePressed() {
  let newCircle = {
    x: mouseX,
    y: mouseY,
    diameter: 40,
    alpha: 255
  };
  circles.push(newCircle);
}
