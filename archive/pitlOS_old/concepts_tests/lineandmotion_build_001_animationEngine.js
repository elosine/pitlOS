///////////////////////////////////////////////////////////////////
//ANIMATION ENGINE/////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////

// GLOBAL VARIABLES ------------------------------------- //
//TIMING & ANIMATION ENGINE /////////////
var FRAMERATE = 60.0;
var MSPERFRAME = 1000.0 / FRAMERATE;
var SECPERFRAME = 1.0 / FRAMERATE;
var PXPERSEC = 100.0;
var PXPERMS = PXPERSEC / 1000.0;
var PXPERFRAME = PXPERSEC / FRAMERATE;
var framect = 0;
var delta = 0.0;
var lastFrameTimeMs = 0.0;
var pieceClock = 0.0;
var clockadj = 0.0;
//STATUS BAR ////////////////////////////
var sb = true;
var statusbar = document.getElementById('statusbar');
// SET UP ------------------------------------------------------ //
function setup() {
  //requestAnimationFrame starts animation loop
  //start last
  requestAnimationFrame(animationEngine);
}
// ANIMATION ENGINE -------------------------------------------- //
//timestamp is reserved variable that passes the function
//the current time in MS
function animationEngine(timestamp) {
  //THEORY:
  //This engine guarantees a fixed frame duration
  //we measure the amount of time since the last frame
  //if the time elapsed is < our desired amount:
  //MSPERFRAME 1000/FRAMERATE(60fps) or 16.666667MS
  //we do not run update and move to the next frame (requestAnimationFrame)
  //we then add the amount of time elapsed since the last frame to delta
  //until we achieve the desired amount of time, then run update
  //if too much time has elapsed since the last frame
  //the while loop will run update and then subtract the
  //duration of one frame until we have caught up with the fixed framerate
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;
  while (delta >= MSPERFRAME) {
    update(MSPERFRAME);
    delta -= MSPERFRAME;
  }
  requestAnimationFrame(animationEngine);
}
// UPDATE ------------------------------------------------------ //
//run all calculations here
//later run all drawing functions in draw
function update(MSPERFRAME) {
  //advance the frame and time clocks
  framect++;
  //Clock //////////////////////////////////
  pieceClock += MSPERFRAME;
  pieceClock = pieceClock - clockadj;
}
