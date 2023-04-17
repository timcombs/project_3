var frameAnimate = require('../frame-animation');

var theImg = [{
  name: 'example',
  width: 7500,
  height: 300,
  source: 'img/example.png',
  numberOfFrames: 25,
  ticksPerFrame: 15,
  framesToPlay: 25
}];

frameAnimate.initAnimation(theImg);
frameAnimate.gameLoop();