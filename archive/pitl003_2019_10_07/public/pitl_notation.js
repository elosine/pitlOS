// GLOBAL VARIABLES ---------------------------------------------- //
// TIMING & ANIMATION ENGINE /////////////////////////////
var FRAMERATE = 60.0;
var MSPERFRAME = 1000.0 / FRAMERATE;
var SECPERFRAME = 1.0 / FRAMERATE;
var PXPERSEC = 200.0;
var PXPERMS = PXPERSEC / 1000.0;
var PXPERFRAME = PXPERSEC / FRAMERATE;
var framect = 0;
var delta = 0.0;
var lastFrameTimeMs = 0.0;
var pieceClock = 0.0;
var clockadj = 0.0;
// COLORS /////////////////////////////////////////////////
var clr_limegreen = new THREE.Color("rgb(153, 255, 0)");
var clr_yellow = new THREE.Color("rgb(255, 255, 0)");
var clr_orange = new THREE.Color("rgb(255, 128, 0)");
var clr_red = new THREE.Color("rgb(255, 0, 0)");
var clr_purple = new THREE.Color("rgb(255, 0, 255)");
var clr_neonRed = new THREE.Color("rgb(255, 37, 2)");
var clr_safetyOrange = new THREE.Color("rgb(255, 103, 0)");
// SCENE /////////////////////////////////////////////////
var CANVASW = 950;
var CANVASH = 600;
var RUNWAYLENGTH = 2400;
var camera, scene, renderer, canvas;
// STATUS BAR ///////////////////////////////////////////
var sb = true;
var statusbar = document.getElementById('statusbar');
// GO FRET /////////////////////////////////////////////
var TRDISTFROMCTR = 200;
var GOFRETLENGTH = 15;
var GOFRETHEIGHT = 14;
var GOFRETPOSZ = -GOFRETLENGTH / 2;
var GOFRETWIDTH = (TRDISTFROMCTR*2) - 60;
var goFretMatl = new THREE.MeshLambertMaterial({
  color: "rgb(153,255,0)"
});
goFretGeom = new THREE.CubeGeometry(GOFRETWIDTH, GOFRETHEIGHT, GOFRETLENGTH);
goFretBigGeom = new THREE.CubeGeometry(GOFRETWIDTH + 5, GOFRETHEIGHT + 5, GOFRETLENGTH + 5);
var goFretL, goFretR;
// TEMPO FRETS /////////////////////////////////////////////
var TEMPOFRETLENGTH = 15;
var TEMPOFRETHEIGHT = 15;
var TEMPOFRETWIDTH = GOFRETWIDTH;
var tempoFretMatl = new THREE.MeshLambertMaterial({
  color: "rgb(255,103,0)"
});
var tempoFretGeom = new THREE.CubeGeometry(TEMPOFRETWIDTH, TEMPOFRETHEIGHT, TEMPOFRETLENGTH);
var tempoFretIx = 0;
var tempoFretsL, tempoFretsR;
var goFretTimerL = 0;
var goFretTimerR = 0;
// SET UP -------------------------------------------------------- //
function setup() {
  createScene();
  init();
  requestAnimationFrame(animationEngine);
}
// FUNCTION: init ------------------------------------------------ //
function init() {
  // MAKE TEMPO FRETS ///////////////////////////////////
  tempoFretsL = mkTempoFrets(3, 20, 70, 0, clr_safetyOrange);
  tempoFretsR = mkTempoFrets(4, 20, 63, 1, clr_neonRed);
}
// FUNCTION: createScene ----------------------------------------- //
function createScene() {
  // Camera ////////////////////////////////
  camera = new THREE.PerspectiveCamera(75, CANVASW / CANVASH, 1, 3000);
  camera.position.set(0, 460, 104);
  camera.position.set(0, 500, 39);
  camera.rotation.x = rads(-48);
  // Scene /////////////////////////////////
  scene = new THREE.Scene();
  // LIGHTS ////////////////////////////////
  var sun = new THREE.DirectionalLight(0xFFFFFF, 1.2);
  sun.position.set(100, 600, 175);
  scene.add(sun);
  var sun2 = new THREE.DirectionalLight(0x40A040, 0.6);
  sun2.position.set(-100, 350, 200);
  scene.add(sun2);
  // Renderer //////////////////////////////
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(CANVASW, CANVASH);
  canvas = document.getElementById('tlcanvas1');
  canvas.appendChild(renderer.domElement);
  // RUNWAY //////////////////////////////////
  var runwayMatl =
    new THREE.MeshLambertMaterial({
      color: 0x0040C0
    });
  var runwayGeom = new THREE.PlaneGeometry(
    CANVASW,
    RUNWAYLENGTH,
  );
  var runway = new THREE.Mesh(runwayGeom, runwayMatl);
  runway.position.z = -RUNWAYLENGTH / 2;
  runway.rotation.x = rads(-90);
  scene.add(runway);
  //TRACKS ///////////////////////////////////////////
  var trdiameter = 40;
  var trgeom = new THREE.CylinderGeometry(trdiameter, trdiameter, RUNWAYLENGTH, 32);
  var trmatl = new THREE.MeshLambertMaterial({
    color: 0x708090
  });
  var tr1 = new THREE.Mesh(trgeom, trmatl);
  tr1.rotation.x = rads(-90);
  tr1.position.z = -(RUNWAYLENGTH / 2);
  tr1.position.y = -trdiameter / 2;
  tr1.position.x = -TRDISTFROMCTR;
  scene.add(tr1);
  var tr2 = new THREE.Mesh(trgeom, trmatl);
  tr2.rotation.x = rads(-90);
  tr2.position.z = -(RUNWAYLENGTH / 2);
  tr2.position.y = -trdiameter / 2;
  tr2.position.x = TRDISTFROMCTR;
  scene.add(tr2);
  // GO FRET ////////////////////////////////////////////
  goFretL = new THREE.Mesh(goFretGeom, goFretMatl);
  goFretL.position.z = GOFRETPOSZ;
  goFretL.position.y = GOFRETHEIGHT;
  goFretL.position.x = -TRDISTFROMCTR;
  scene.add(goFretL);
  goFretR = new THREE.Mesh(goFretGeom, goFretMatl);
  goFretR.position.z = GOFRETPOSZ;
  goFretR.position.y = GOFRETHEIGHT;
  goFretR.position.x = TRDISTFROMCTR;
  scene.add(goFretR);
  // RENDER /////////////////////////////////////////////
  renderer.render(scene, camera);
}
// FUNCTION: animationEngine ------------------------------------- //
function animationEngine(timestamp) {
  delta += timestamp - lastFrameTimeMs;
  lastFrameTimeMs = timestamp;
  while (delta >= MSPERFRAME) {
    update(MSPERFRAME);
    draw();
    delta -= MSPERFRAME;
  }
  requestAnimationFrame(animationEngine);
}
// UPDATE -------------------------------------------------------- //
function update(MSPERFRAME) {
  // CLOCK ///////////////////////////////////////////////
  framect++;
  pieceClock += MSPERFRAME;
  pieceClock = pieceClock - clockadj;
  // TEMPO FRETS ////////////////////////////////////////
  for (var i = 0; i < tempoFretsL.length; i++) {
    //add the tf to the scene if it is on the runway
    if (tempoFretsL[i][1].position.z > (-RUNWAYLENGTH)) {
      if (tempoFretsL[i][0]) {
        tempoFretsL[i][0] = false;
        scene.add(tempoFretsL[i][1]);
      }
    }
    //advance tf if it is not past gofret
    if (tempoFretsL[i][1].position.z < GOFRETPOSZ) {
      tempoFretsL[i][1].position.z += PXPERFRAME;
    }
    //When tf reaches goline, blink and remove
    if (framect == tempoFretsL[i][2]) {
      goFretTimerL = framect + 15;
      //remove tf from scene and array
      scene.remove(scene.getObjectByName(tempoFretsL[i][1].name));
      tempoFretsL.splice(i, 1);
    }
  }
  for (var i = 0; i < tempoFretsR.length; i++) {
    //add the tf to the scene if it is on the runway
    if (tempoFretsR[i][1].position.z > (-RUNWAYLENGTH)) {
      if (tempoFretsR[i][0]) {
        tempoFretsR[i][0] = false;
        scene.add(tempoFretsR[i][1]);
      }
    }
    //advance tf if it is not past gofret
    if (tempoFretsR[i][1].position.z < GOFRETPOSZ) {
      tempoFretsR[i][1].position.z += PXPERFRAME;
    }
    //When tf reaches goline, blink and remove
    if (framect == tempoFretsR[i][2]) {
      goFretTimerR = framect + 15;
      //remove tf from scene and array
      scene.remove(scene.getObjectByName(tempoFretsR[i][1].name));
      tempoFretsR.splice(i, 1);
    }
  }
}
// DRAW ---------------------------------------------------------- //
function draw() {
  // GO FRET BLINK TIMER ///////////////////////////////////
  if (framect >= goFretTimerL) {
    goFretL.material.color = clr_limegreen;
    goFretL.geometry = goFretGeom;
  } else {
    goFretL.material.color = clr_yellow;
    goFretL.geometry = goFretBigGeom;
  }
  if (framect >= goFretTimerR) {
    goFretR.material.color = clr_limegreen;
    goFretR.geometry = goFretGeom;
  } else {
    goFretR.material.color = clr_yellow;
    goFretR.geometry = goFretBigGeom;
  }
  // RENDER ///////////////////////////////////
  renderer.render(scene, camera);
}
// FUNCTION: rads ---------------------------------------------- //
function rads(deg) {
  return (deg * Math.PI) / 180;
}
// FUNCTION: mkTempoFrets -------------------------------------- //
function mkTempoFrets(startTime, numbeats, tempo, trnum, clr) {
  var tempoFretSet = [];
  var numPxTilGo = startTime * PXPERSEC;
  var iGoPx = GOFRETPOSZ - numPxTilGo;
  var iGoFrame = numPxTilGo / PXPERFRAME;
  for (var i = 0; i < numbeats; i++) {
    var pxPerBeat = PXPERSEC / (tempo / 60);
    var tempStartPx = iGoPx - (pxPerBeat * i);
    var tempGoFrame = Math.round(iGoFrame + ((pxPerBeat / PXPERFRAME) * i));
    var tempMatl = new THREE.MeshLambertMaterial({
      color: clr
    });
    var tempTempoFret = new THREE.Mesh(tempoFretGeom, tempMatl);
    tempTempoFret.position.z = tempStartPx;
    tempTempoFret.position.y = TEMPOFRETHEIGHT;
    if(trnum==0) {
      tempTempoFret.position.x = -TRDISTFROMCTR;
    }else {
      tempTempoFret.position.x = TRDISTFROMCTR;
    }
    // tempTempoFret.material.color = clr;
    tempTempoFret.name = "tempofret" + tempoFretIx;
    tempoFretIx++;
    var newTempoFret = [true, tempTempoFret, tempGoFrame];
    tempoFretSet.push(newTempoFret);
  }
  return tempoFretSet;
}
