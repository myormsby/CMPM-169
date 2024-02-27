
let apiEndpoint = 'https://api.openweathermap.org/data/2.5/weather?lat=36.9741&lon=122.03&appid=6845623ad53e049ee251c8bde57d4233';
let data;

let rectWidth = 500;
let rectHeight = 100;
let alphaValue = 0;
let alphaIncrement = 5;

let day;
let night;

let weather;
let light = ['sunny', 'clear']
let dark = ['clouds', 'overcast', 'rain']
let rain = ['rain', 'drizzling', 'showers']

let raindrops = [];

let bird;
let wind;
let water;



function preload() {
  day = loadImage('files/day.jpeg');
  night = loadImage('files/night.jpeg');
  water = loadSound('files/water.mp3');
  wind = loadSound('files/wind.mp3');
  bird = loadSound('files/bird.mp3');
}

function setup() {
    // place our canvas, making it fit our container
    let canvasContainer;
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    // create 
    loadJSON(apiEndpoint, gotData);

    for (let i = 0; i < 100; i++) {
      raindrops[i] = new Raindrop();
    }

}

function draw() {
  


  if (data) {

    weather = data.weather[0].description;
    let isDark = dark.some(word => weather.includes(word));
    let isLight = light.some(word => weather.includes(word));
    let isRain = rain.some(word => weather.includes(word));


    if (isDark == true){
      background(night);
      wind.play();
      wind.setVolume(0.15);
    }

    if (isLight == true){
      background(day);
      bird.loop();
      bird.setVolume(0.15);
    }

    if (isRain == true){
      for (let i = 0; i < raindrops.length; i++) {
        raindrops[i].fall();
        raindrops[i].display();
        water.loop();
        water.setVolume(0.15);
      }
    }

  }

  // Display the data on the canvas
  alphaValue += alphaIncrement;
  if (alphaValue > 255 || alphaValue < 0) {
      alphaIncrement *= -1; // Reverse increment direction when reaching boundaries
  }
  

  // Draw the glowing white rectangle
  fill(255, 255, 255, alphaValue);
  rect(width / 2 - rectWidth / 2, height / 2 - rectHeight / 2, rectWidth, rectHeight);

  textAlign(CENTER, CENTER);
  fill(0);
  textSize(18);
  text(`Current Weather in Santa Cruz: ${weather}`, width / 2, height / 2);


}

function gotData(response) {
  // Callback function to handle the API response
  data = response;
}

class Raindrop {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50);
    this.length = random(5, 20);
    this.speed = random(5, 15);
  }

  fall() {
    this.y += this.speed;
    if (this.y > height) {
      this.y = random(-200, -100);
      this.x = random(width);
    }
  }

  display() {
    stroke(0, 100, 255);
    line(this.x, this.y, this.x, this.y + this.length);
  }
}