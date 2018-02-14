import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

// THREE.js Necessities
let world;
let scene;
let camera;
let renderer;
let light;
let shadowLight;
let pointLight;
let backLight;
let controls;
let floor;
let size;
let divisions;
let gridhelper;
let axishelper;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let wireFrameBool = true;

// Kobe
let mesh;
let mane;
let mane2;
let mane3;
let mane4;
let endMane;
let nose;
let nostril;
let head;


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), 0.1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);
  controls = new OrbitControls( camera );
  camera.position.set(0, 0, 0);
  camera.position.z = 20;
  controls.update();
  mesh = new THREE.Object3D();
  // world = document.getElementById('world');
  // world = document.body.appendChild(renderer.domElement);
  // world.appendChild(renderer.domElement);
  document.body.appendChild(renderer.domElement);
}

function createHelperGrid() {
  size = 20;
  divisions = 20;
  gridhelper = new THREE.GridHelper(size, divisions);
  axishelper = new THREE.AxisHelper(20);
  scene.add( gridhelper );
  scene.add( axishelper );
}

function createFloor() {
  let plane = new THREE.PlaneBufferGeometry(1000, 500);
  let material = new THREE.MeshBasicMaterial({ color: 0xEBE5E7});
  floor = new THREE.Mesh(plane, material);

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -20;
  floor.receiveShadow = true;

  scene.add( floor );
}


// function createLights() {
//   light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
//   // light = new THREE.AmbientLight(0xffffff, .5);
//   pointLight = new THREE.PointLight(0xffffff, .5);
//   backLight = new THREE.DirectionalLight(0xffffff, .4);
//   backLight.position.set(-100, 200, 50);
//   pointLight.position.set(0, -50, 50);
//   scene.add(backLight);
//   scene.add(light);
//   scene.add(pointLight);
// }

function createLights() {
  light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5);

  shadowLight = new THREE.DirectionalLight(0xffffff, .8);
  shadowLight.position.set(200, 200, 200);
  shadowLight.castShadow = true;
  shadowLight.shadowDarkness = .2;

  backLight = new THREE.DirectionalLight(0xffffff, .4);
  backLight.position.set(-100, 200, 50);
  backLight.shadowDarkness = .1;
  backLight.castShadow = true;

  scene.add(backLight);
  scene.add(light);
  scene.add(shadowLight);
}

function createMane() {
  let geometry = new THREE.BoxGeometry(10, 10, 1);
  let material = new THREE.MeshLambertMaterial({
    color: 0xffffff, wireframe: wireFrameBool
  });
  mane = new THREE.Mesh(geometry, material);
  mane2 = new THREE.Mesh(geometry, material);
  mane3 = new THREE.Mesh(geometry, material);
  mane4 = new THREE.Mesh(geometry, material);

  mane.position.y = 1;
  mane.position.z = -1;
  mane.rotation.z = .8;

  mane2.position.y = 1;
  mane2.position.z = -1.1;
  mane2.rotation.z = 0;

  mane3.position.y = 1;
  mane3.position.z = -1.2;
  mane3.rotation.z = .35;

  mane4.position.y = 1;
  mane4.position.z = -1.2;
  mane4.rotation.z = -.35;

  // End of the mane //
  let geometry1 = new THREE.ConeGeometry(3, 4, 3);
  let material1 = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: wireFrameBool
    });

  endMane = new THREE.Mesh( geometry1, material1);
  endMane.position.y = -6;
  endMane.position.z = -1;

  endMane.rotation.x = -.5;
  endMane.rotation.y = 1.05;
  endMane.rotation.z = 3.15;
  // scene.add( mane );
  // scene.add( mane2 );
  // scene.add( mane3 );
  // scene.add( mane4 );
  mesh.add( mane );
  mesh.add( mane2 );
  mesh.add( mane3 );
  mesh.add( mane4 );
  mesh.add( endMane );
}

function createNose() {
  // (radiusTop, radiusBottom, height, radialSegments);
  let geometry = new THREE.CylinderGeometry(1, 1.5, 3);
  let material = new THREE.MeshLambertMaterial({
    color: 0xffffff, wireframe: wireFrameBool
  });
  nose = new THREE.Mesh(geometry, material);
  nose.rotation.x = 1.5;
  nose.position.z = 4.1;
  nose.position.y = -.3;

  //Nostril
  let geometry1 = new THREE.SphereGeometry(.9, 6, 6);
  let material1 = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: wireFrameBool
  });

  nostril = new THREE.Mesh(geometry1, material1);

  nostril.position.z = 5.6;
  nostril.position.y = -.1;
  // scene.add( nose );
  mesh.add( nose );
  mesh.add( nostril );
}
//  HEAD //
function createHead() {
  let geometry = new THREE.BoxGeometry(5, 6, 4);
  let material = new THREE.MeshLambertMaterial({
    color: 0xffffff, wireframe: wireFrameBool
  });
  head = new THREE.Mesh(geometry, material);
  head.position.x = 0;
  head.position.y = 1;
  head.position.z = 1;
  // scene.add( head );
  mesh.add( head );
}

function createEars() {

}

function createMesh() {
  mesh.position.y = 2;
  scene.add( mesh );
}

function animateLoop () {
  requestAnimationFrame( animateLoop );
  // mesh.rotation.x += .05;
  // mesh.rotation.y += .01;
  // mesh.rotation.z += .04;
  renderer.render( scene, camera );
}


init();
createLights();
createFloor();
createMane();
createNose();
createHead();
createHelperGrid();
createMesh();
animateLoop();
