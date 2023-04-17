/*
  This module exposes methods that accept a horizontal sprite sheet and creates
  an html5 Canvas animation. The html will need a canvas element with the id "animate"
  or one should be attached to the DOM for this to work.

  As always, I stand on the shoulders of peers, can't get anywhere w/out research!

  Thanks to William Malone for the tutorial: http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
  Thanks to Louis Fremi for a deeper dive into requestAnimationFrame:
  https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
*/

'use strict';

// declaring variables, assign initial values
var currentImage = {};
var imageDataObjects = [];
var canvas;
var objectIndex = 0;
var framesPlayed = 0;
var framesToPlay;

// object to be exported
var frameAnimation = {};

// store canvas element in variable
canvas = document.getElementById('animate');

// imgDataArr is an array of objects with the img data
// each imgDataObj refers to a separate sprite sheet
function initAnimation(imgDataArr) {
  //instantiate & store full imageDataObjects in array
  for (var i = 0; i < imgDataArr.length; i++) {
    imageDataObjects.push(new Sprite(imgDataArr[i]));
  }

  // the Sprite that contains current sprite sheet data
  currentImage = imageDataObjects[0];
}

// calls requestAnimationFrame, updates image object & renders frame
function gameLoop() {
  canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(gameLoop);
  currentImage.update();
  currentImage.render();
}

// image constructor function takes img data to instantiate new object
function Sprite(imgDataObj) {
  this.name = imgDataObj.name;
  this.width = imgDataObj.width;
  this.height = imgDataObj.height;

  this.image = new Image();
  this.image.src = imgDataObj.source;
  this.context = canvas.getContext('2d');

  this.tickCount = 0;
  this.ticksPerFrame = imgDataObj.ticksPerFrame || 0;
  this.frameIndex = 0;
  this.numberOfFrames = imgDataObj.numberOfFrames || 1;
  this.framesToPlay = imgDataObj.framesToPlay;
  this.framesPlayed = 0;
}

// update method - called from current image/sprite sheet
Sprite.prototype.update = function() {
  this.tickCount += 1;
  if (this.tickCount > this.ticksPerFrame) {
    this.tickCount = 0;
    if (this.frameIndex < this.numberOfFrames - 1) {
      this.frameIndex += 1;
    }else{
      this.frameIndex = 0;
    }
    if (this.framesPlayed < this.framesToPlay) {
      this.framesPlayed = this.framesPlayed + 1;
    }else{
      this.framesPlayed = 0;
      //changes to the next imageDataObject
      if (objectIndex + 1 < imageDataObjects.length) {
        objectIndex = objectIndex + 1;
        currentImage = imageDataObjects[objectIndex];
      }else{
        objectIndex = 0;
        currentImage = imageDataObjects[objectIndex];
      }
    }
  }
};

// render method - called from current image/sprite sheet
Sprite.prototype.render = function() {
  this.context.clearRect(0, 0, this.width, this.height);
  this.context.drawImage(
    this.image,
    this.frameIndex * this.width / this.numberOfFrames,
    0,
    this.width / this.numberOfFrames,
    this.height,
    0,
    0,
    this.width / this.numberOfFrames,
    this.height
  );
};

// TODO: refactor this so it can be used to switch between multiple animations
// // method to switch from one animation to another
// Sprite.prototype.switchOut = function() {
//   this.context.clearRect(0, 0, 500, 500);
//   this.tickCount = this.ticksPerFrame;
//   this.framesPlayed = this.framesToPlay;
//   this.frameIndex = 0;
// };

frameAnimation.initAnimation = initAnimation;
frameAnimation.gameLoop = gameLoop;

module.exports = frameAnimation;