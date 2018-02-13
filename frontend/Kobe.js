import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

// THREE.js Necessities
let world;
let scene;
let camera;
let renderer;
let light;
let pointLight;
let backLight;
let controls;
let size;
let divisions;
let gridhelper;
let axishelper;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

// Kobe
let mane;
let mane2;
let mane3;
let mane4;
let face;
let head;


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), 0.1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);
  controls = new OrbitControls( camera );
  camera.position.set(0, 0, 0);
  camera.position.z = 20;
  controls.update();
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

function createLights() {
  // light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
  light = new THREE.AmbientLight(0xffffff, .5);
  pointLight = new THREE.PointLight(0xffffff, .5);
  // backLight = new THREE.DirectionalLight(0xffffff, .4);
  // backLight.position.set(-100, 200, 50);
  //
  // scene.add(backLight);
  scene.add(light);
  scene.add(pointLight);
}

function createMane() {
  let geometry = new THREE.BoxGeometry(10, 10, 1);
  let material = new THREE.MeshLambertMaterial({
    color: 0x000000, wireframe: true
  });
  mane = new THREE.Mesh(geometry, material);
  mane2 = new THREE.Mesh(geometry, material);
  mane3 = new THREE.Mesh(geometry, material);
  mane4 = new THREE.Mesh(geometry, material);

  mane.position.y = 1;
  mane.position.z = -5;
  mane.rotation.z = .8;

  mane2.position.y = 1;
  mane2.position.z = -5;
  mane2.rotation.z = 0;

  mane3.position.y = 1;
  mane3.position.z = -5;
  mane3.rotation.z = .35;

  mane4.position.y = 1;
  mane4.position.z = -5;
  mane4.rotation.z = -.35;

  scene.add( mane );
  scene.add( mane2 );
  scene.add( mane3 );
  scene.add( mane4 );
}

function createNose() {
  // (radiusTop, radiusBottom, height, radialSegments);
  let geometry = new THREE.CylinderGeometry(1, 1.5, 3);
  let material = new THREE.MeshLambertMaterial({
    color: 0x000000, wireframe: true
  });
  face = new THREE.Mesh(geometry, material);
  face.rotation.x = 1.5;
  face.position.z = 5;
  scene.add( face );
}

function createHead() {
  let geometry = new THREE.BoxGeometry(5, 6, 1);
  let material = new THREE.MeshLambertMaterial({
    color: 0x000000, wireframe: true
  });
  head = new THREE.Mesh(geometry, material);
  head.position.x = 0;
  head.position.y = 1;
  head.position.z = 0;
  scene.add( head );
}

function createEars() {

}

function animateLoop () {
  requestAnimationFrame( animateLoop );
  renderer.render( scene, camera );
}


init();
createLights();
createMane();
createNose();
createHead();
createHelperGrid();
animateLoop();
