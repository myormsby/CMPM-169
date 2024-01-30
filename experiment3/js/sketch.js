let drawing = false;

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create an instance of the class
    myInstance = new MyClass(VALUE1, VALUE2);

    var centerHorz = windowWidth / 2;
    var centerVert = windowHeight / 2;
}

function draw() {
  if (drawing) {
    // Draw a circle at the mouse position when the mouse is pressed and held
    ellipse(mouseX, mouseY, 20, 20);
  }
}

function mousePressed() {
  // Start drawing when the mouse is pressed
  drawing = true;
}

function mouseReleased() {
  // Stop drawing when the mouse is released
  drawing = false;
}