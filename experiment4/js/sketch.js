let song;
    let img;
    let bg;
    let amplitude;
    let hat;
    let dance;
    let mic;
    

    let yPosition = 200; // Initial y-coordinate
    let speed = 10; // Speed of downward movement
    let duration = 3; // Duration in seconds

    let confetti = [];
    

    function preload() {
      // Load the song
      song = loadSound('js/song.mp3');

      // Load an image
      img = loadImage('js/cockroach.png');
      bg = loadImage('js/bg.jpg');
      hat = loadImage('js/hat.webp');
      mic = loadImage('js/mic.png')

      // Load a gif
      dance = loadImage('js/dance.gif')
    }

    function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
      amplitude = new p5.Amplitude();
      hat.resize(190,100)
      frameRate(30)

      for (let i = 0; i < 100; i++) {
        confetti[i] = new Confetto(random(width), random(height));
      }
      dance.resize(100,100)
      song.setVolume(0.15)
    }

    function draw() {
      background(bg);
      mic.resize(100,100)
      image(mic, 650, 250)
      //spawn friends :D

      friends = dance
      image(dance, 500, 450);
      image(dance, 100, 425);
      image(dance, 1200, 475);
      image(dance, 1400, 450);
      image(dance, 300, 500);
      image(dance, 1600, 500);

      for (let i = 0; i < confetti.length; i++) {
        confetti[i].display();
        confetti[i].fall();
      }



      

      // Get the volume level (amplitude) of the song
      let vol = amplitude.getLevel();

      // Map the volume to a movement range
      let moveAmount = map(vol, 0, 1, -0, 80);

      // Move the image up and down based on the volume
      image(img, width / 2 - img.width / 2, height / 2 - img.height / 2 + moveAmount + 50);

      // move hat
      image(hat, width / 2 - img.width / 2 +25, yPosition);


    }

    function mousePressed() {
      // Play or pause the song when the mouse is clicked
      if (song.isPlaying()) {
        song.pause();
      } else {
        song.play();
      }
    }

        class Confetto {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(10, 20);
        this.color = color(random(255), random(255), random(255));
        this.speed = random(1, 5);
      }

      display() {
        fill(this.color);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
      }

      fall() {
        this.y += this.speed;

        // Reset confetto if it goes below the canvas
        if (this.y > height + this.size) {
          this.y = random(-50, 0);
        }
      }
    }