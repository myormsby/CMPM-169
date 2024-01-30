let drawing = false;
let textColor;
let lastColorChangeTime = 0;
let textSizeValue = 3;
let textColorStart;
let textColorEnd;
let meow = false;

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    background(183, 234, 247);
    textColor = color(0);
    textSize(textSizeValue);

}

function draw() {
    if (drawing) {
      // Draw text at the mouse position when the mouse is pressed and held
      fill(textColor);
      textSize(textSizeValue);
      text("owo?", mouseX, mouseY);
      if (textSizeValue < 20) {
        textSizeValue += 0.3;
      }
    }

    if (drawing && keyIsPressed && key === '3' && millis() - lastColorChangeTime >= 30) {
        // Change text color every second
        textColor = color(random(255), random(255), random(255));
        lastColorChangeTime = millis(); // Update the last color change time
    }
}
  
  function mousePressed() {
    // Start drawing when the mouse is pressed
    drawing = true;
    if (meow == true){
        textColor = color(random(255), random(255), random(255));
    }
  }
  
  function mouseReleased() {
    // Stop drawing when the mouse is released
    drawing = false;
    textSizeValue = 3;

  }

  function keyPressed() {
    // Change text color when any key is pressed
    if (key === '1') {
        textColor = color(0);
      }
    if (key === '2') {
        textColor = color(random(255), random(255), random(255));
      }

    if (key == '4'){
        background(183, 234, 247);
    }

    if (key == '5'){
        meow = true;
    }

    if (key == '6'){
        meow = false;
    }
  }