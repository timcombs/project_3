#  animate-HTML5prite

### This module takes a horizontal sprite sheet and creates an html5 animation. It uses a constructor function to take the data and connects counter properties used to advance frame-by-frame.
### module.exports exposes methods that takes an array of data objects that correspond to each sprite sheet used in the animation.
### The html will need a canvas element with the id "animate" or one should be attached to the DOM for this to work.
```
<canvas id="animate" width="500" height="500"></canvas>
```

### As always, I stand on the shoulders of peers, can't get anywhere w/out research!

### This module is on npm - https://www.npmjs.com/package/animate-html5prite
### You must have node installed to use this module to use it in your project by running at the command line:
```
npm install animate-html5prite
```
### then require it into .js files by including the line:
```
require('frame-animation');
```

## Data properties on Constructor Function
### structure of the incoming image data
```
var theImg = [{
  name: 'example',
  width: 7500,
  height: 300,
  source: 'img/example.png',
  numberOfFrames: 25,
  ticksPerFrame: 15,
  framesToPlay: 25
}];
```

### data properties that describe sprite sheet
- name    - sprite sheet name
- width   - pixel width of sprite sheet
- height  - pixel height of sprite sheet
- source  - path to image file

### constructed properties
- image     - each instance creates a new frame image
- image.src - fills image with sprite sheet file
- context   - grabs context of html5 canvas element

### counter mechanism info - used in update and render methods
- tickCount       - used to switch to next frame on sprite sheet
                  - resets to zero once ticksPerFrame reached
- ticksPerFrame   - the number of update/render cycles before
                  - next frame is rendered - to decrease the fps
- frameIndex      - index of the current frame to display
                  - resets to zero once numberOfFrames reached
- numberOfFrames  - number of frames on the sprite sheet
- framesToPlay    - number of frames to play before switching
                  - to next sprite sheet
- framesPlayed    - number of frames played for each image
                  - resets to zero once framesToPlay reached

## API - exposes 2 methods
- initAnimation: takes the array of imgDataObj, has two methods - update and render - work as counter and renderer for constructed sprite objects
- gameLoop: calls requestAnimationFrame iterating through the animation

## Simple Example

![example.png](/example/img/example.png?raw=true "example spritesheet")

### Used Browserify - https://browserify.org/ - to create a bundle to test module while development.
### Run bundle by downloading repo and opening up example.html in your favorite browser.
#### NOTE: You will need to install browserify globally to run the bundle
```
npm install browserify -g
```
###    Again, this is just to show how the animation operates.
###    You will use node to require the module into your own projects

## Collborations/Questions/issues
  - Always looking for collaborators
  - Always looking for suggestions
  - Any questions and concerns can be handled by opening an issue on the codebase
  - Feel free to make pull requests!
  
## License

### ISC - see LICENSE.md for more details

  Thanks to William Malone for the tutorial:
  http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
  Thanks to Louis Fremi for a deeper dive into requestAnimationFrame:
  https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
