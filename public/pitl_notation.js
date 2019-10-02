// GLOBAL VARIABLES ---------------------------------------------- //
// TIMING & ANIMATION ENGINE /////////////////
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
// SCENE /////////////////////////////////////
var CANVASW = 450;
var CANVASH = 600;
var RUNWAYLENGTH = 1200;
var camera, scene, renderer, canvas;
// STATUS BAR ////////////////////////////////
var sb = true;
var statusbar = document.getElementById('statusbar');
// SET UP -------------------------------------------------------- //
function setup() {
  createScene();
  requestAnimationFrame(animationEngine);
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
  framect++;
  //Clock //////////////////////////////////
  pieceClock += MSPERFRAME;
  pieceClock = pieceClock - clockadj;
}
// DRAW ---------------------------------------------------------- //
function draw() {
  renderer.render(scene, camera);
}
// FUNCTION: createScene ----------------------------------------- //
function createScene() {
  // Camera ////////////////////////////////
  camera = new THREE.PerspectiveCamera(75, CANVASW / CANVASH, 1, 3000);
  // camera.position.set(0, 480, 10);
  camera.position.set(0, 490, -64);
  // camera.rotation.x = rads(-52);
  camera.rotation.x = rads(-60);
  // Scene /////////////////////////////////
  scene = new THREE.Scene();
  // Lights ////////////////////////////////
  var sun = new THREE.DirectionalLight(0xFFFFFF, 1.0);
  sun.position.set(300, 400, 175);
  scene.add(sun);
  var sun2 = new THREE.DirectionalLight(0x40A040, 0.6);
  sun2.position.set(-100, 350, -200);
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
  runway.position.z = -RUNWAYLENGTH/2;
  runway.rotation.x = rads(-90);
  scene.add(runway);

  //TRACKS ///////////////////////////////////////////
  var trgeom = new THREE.CylinderGeometry(13, 13, RUNWAYLENGTH, 32);
  var trmatl = new THREE.MeshLambertMaterial({
    color: 0x708090
  });
  var tr = new THREE.Mesh(trgeom, trmatl);
  tr.rotation.x = -90 * Math.PI / 180;
  tr.position.z = -RUNWAYLENGTH/2;
  tr.position.y = 11;
  scene.add(tr);
  /*
  //GO FRETS ///////////////////////////////////////////
  gofret1 = new THREE.Mesh(tfgeom, gfmatl);
  gofret1.position.x = -120;
  gofret1.position.z = gofretposz;
  gofret1.rotation.z = -90 * Math.PI / 180;
  scene.add(gofret1);
  var gofret2 = new THREE.Mesh(tfgeom, gfmatl);
  gofret2.position.x = -40;
  gofret2.position.z = gofretposz;
  gofret2.rotation.z = -90 * Math.PI / 180;
  scene.add(gofret2);
  var gofret3 = new THREE.Mesh(tfgeom, gfmatl);
  gofret3.position.x = 40;
  gofret3.position.z = gofretposz;
  gofret3.rotation.z = -90 * Math.PI / 180;
  scene.add(gofret3);
  var gofret4 = new THREE.Mesh(tfgeom, gfmatl);
  gofret4.position.x = 120;
  gofret4.position.z = gofretposz;
  gofret4.rotation.z = -90 * Math.PI / 180;
  scene.add(gofret4);
  //GESTURE GO
  gg1 = new THREE.Mesh(gggeom, ggmatl);
  gg2 = new THREE.Mesh(gggeom, ggmatl);
  gg3 = new THREE.Mesh(gggeom, ggmatl);
  gg4 = new THREE.Mesh(gggeom, ggmatl);
  gg1.position.z = gofretposz;
  gg1.position.x = -120;
  scene.add(gg1);
  gg2.position.z = gofretposz;
  gg2.position.x = -40;
  scene.add(gg2);
  gg3.position.z = gofretposz;
  gg3.position.x = 40;
  scene.add(gg3);
  gg4.position.z = gofretposz;
  gg4.position.x = 120;
  scene.add(gg4);
*/
  renderer.render(scene, camera);
}
// FUNCTION: rads ---------------------------------------------- //
function rads(deg) {
  return (deg * Math.PI) / 180;
}
