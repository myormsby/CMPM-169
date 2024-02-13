let rose;
let bg;
let song;
let space;

function preload() {
    rose = loadModel('assets/rat.obj', true)
    bg = loadImage('assets/chese.jpg')
    song = loadSound('assets/song.mp3')
    space = loadImage('assets/space.jpg')
}

// setup() function is called once when the program starts
function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    // create an instance of the class

}

// draw() function is called repeatedly, it's the main animation loop
function draw() {
    // call a method on the instance
    push();
    texture(space);
    translate(0, 0, -400);
    plane(width*2, height*2);
    pop();



    song.setVolume(0.15);
    push();
    noStroke();
    scale(1.5);
    rotateY(frameCount * 0.05);
    rotateZ(frameCount * 0.01);
    texture(bg);
    translate(-200, 50, 0);

    model(rose);
    pop();


}

function mousePressed() {
    // Play or pause the song when the mouse is clicked
    if (song.isPlaying()) {
      song.pause();
    } else {
      song.play();
    }
  }
