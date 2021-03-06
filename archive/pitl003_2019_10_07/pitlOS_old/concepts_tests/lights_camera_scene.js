///////////////////////////////////////////////////////////////////
// SCENE SET UP ///////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
var CANVASW = 350;
var CANVASH = 234;
var camera, scene, renderer, canvas;

var RUNWAYLENGTH = 600;
createScene();

function createScene() {
  // Camera ///////////////////////////
  /*-----fov — Camera frustum vertical field of view.
  aspect — Camera frustum aspect ratio.
  near — Camera frustum near runway.
  far — Camera frustum far runway.*/
  camera = new THREE.PerspectiveCamera(75, CANVASW / CANVASH, 1, 3000);
  // camera.position.set(0, 198, -25);
  camera.position.set(0, 160, 3);
  camera.rotation.x = rads(-52);
  // Scene ////////////////////////////
  scene = new THREE.Scene();
  // Lights ///////////////////////////
  var sun = new THREE.DirectionalLight(0xFFFFFF, 1.0); //color, intensity
  sun.position.set(300, 400, 175);
  scene.add(sun);
  var sun2 = new THREE.DirectionalLight(0x40A040, 0.6);
  sun2.position.set(-100, 350, -200);
  scene.add(sun2);
  // Renderer /////////////////////////
  renderer = new THREE.WebGLRenderer();
  //renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(CANVASW, CANVASH);
  canvas = document.getElementById('tlcanvas1');
  canvas.appendChild(renderer.domElement);

  // Back runway ///////////////////////
  var runwayMatl =
    new THREE.MeshLambertMaterial({
      color: 0x0040C0
    });
  var runwayGeom = new THREE.PlaneGeometry(
    300,
    RUNWAYLENGTH,
  );
  var runway = new THREE.Mesh(runwayGeom, runwayMatl);
  runway.position.z = -RUNWAYLENGTH/2;
  runway.rotation.x = rads(-90);
  scene.add(runway);



  /*
  //TRACKS ///////////////////////////////////////////
  var cygeom = new THREE.CylinderGeometry(5, 5, 1200, 32);
  var cymatl = new THREE.MeshLambertMaterial({
    color: 0x708090
  });
  var cy1 = new THREE.Mesh(cygeom, cymatl);
  var cy2 = new THREE.Mesh(cygeom, cymatl);
  var cy3 = new THREE.Mesh(cygeom, cymatl);
  var cy4 = new THREE.Mesh(cygeom, cymatl);
  cy1.rotation.x = -90 * Math.PI / 180;
  cy1.position.z = -346;
  cy2.rotation.x = -90 * Math.PI / 180;
  cy2.position.z = -346;
  cy1.position.x = -40;
  cy2.position.x = 40;
  cy3.rotation.x = -90 * Math.PI / 180;
  cy3.position.z = -346;
  cy4.rotation.x = -90 * Math.PI / 180;
  cy4.position.z = -346;
  cy3.position.x = -120;
  cy4.position.x = 120;
  scene.add(cy1);
  scene.add(cy2);
  scene.add(cy3);
  scene.add(cy4);
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

function rads(deg) {
  return (deg * Math.PI) / 180;
}
