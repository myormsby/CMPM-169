// P_3_1_3_01
//
// Generative Gestaltung – Creative Coding im Web
// ISBN: 978-3-87439-902-9, First Edition, Hermann Schmidt, Mainz, 2018
// Benedikt Groß, Hartmut Bohnacker, Julia Laub, Claudius Lazzeroni
// with contributions by Joey Lee and Niels Poldervaart
// Copyright 2018
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * analysing and sorting the letters of a text
 * changing the letters alpha value in relation to frequency
 *
 * MOUSE
 * position x          : interpolate between normal text and sorted position
 *
 * KEYS
 * a                   : toggle alpha mode
 * s                   : save png
 */
'use strict';

var joinedText;
var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ,.;!?1234567890 ';
var counters = [];

let yellow = (252, 186, 3);
let black = (0, 0, 0);

var posX;
var posY;

let bee;
let bg;

var drawAlpha = true;

function preload() {
  joinedText = loadStrings('js/bee.txt');
  bee = loadSound('js/bee.mp3')
  bg = loadImage('js/bee.jpg')
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

  noStroke();
  textFont('monospace', 18);

  joinedText = joinedText.join(' ');

  // use the following command, to collect all characters in the text automatically
  // alphabet = getUniqCharacters();

  for (var i = 0; i < alphabet.length; i++) {
    counters[i] = 0;
  }

  countCharacters();
}

function draw() {
  background(bg);

  posX = 20;
  posY = 40;

  // Inspired / used from https://editor.p5js.org/generative-design/sketches/P_3_1_3_01
  for (var i = 0; i < joinedText.length; i++) {
    // again, find the index of the current letter in the character set
    var upperCaseChar = joinedText.charAt(i).toUpperCase();
    var index = alphabet.indexOf(upperCaseChar);
    if (index < 0) continue;
    let randomValue = random(1);
    let fillColor = lerp(yellow, black, randomValue);

    if (drawAlpha) {

      fill(fillColor, counters[index] * 3);
    } else {
      fill(0, 0, 0);
    }

    var sortY = index * 20 + 40;
    var m = map(mouseY, 50, width - 50, 0, 1);
    m = constrain(m, 0, 2);
    var interY = lerp(posY, sortY, m);

    text(joinedText.charAt(i), posX, interY);

    posX += textWidth(joinedText.charAt(i));
    if (posX >= width - 200 && upperCaseChar == ' ') {
      posY += 30;
      posX = 20;
    }
  }

}

function mousePressed() {
    // Play or pause the song when the mouse is clicked
    if (bee.isPlaying()) {
      bee.pause();
    } else {
      bee.play();
    }
  }

function countCharacters() {
  for (var i = 0; i < joinedText.length; i++) {
    // get one character from the text and turn it to uppercase
    var c = joinedText.charAt(i);
    var upperCaseChar = c.toUpperCase();
    var index = alphabet.indexOf(upperCaseChar);
    // increase the respective counter
    if (index >= 0) counters[index]++;
  }
}

function getUniqCharacters() {
  var charsArray = joinedText.toUpperCase().split('');
  var uniqCharsArray = charsArray.filter(function(char, index) {
    return charsArray.indexOf(char) == index;
  }).sort();
  return uniqCharsArray.join('');
}

