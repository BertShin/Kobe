import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

// THREE.js Necessities
let world;
let scene;
let camera;
let renderer;
let hemLight;
let shadowLighting;
let pointLight;
let backLighting;
let controls;
let floor;
let size;
let divisions;
let gridhelper;
let axishelper;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
let wireFrameBool = false;

// Kobe
// DECIDED COLOR: 0xb8b8b8
let oColor =  0xb8b8b8;
let head;
let mane;
let mane2;
let mane3;
let mane4;
let endMane;
let nose;
let nostril;
let face;
let ear1;
let ear2;
let inner1;
let inner2;


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), .1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);
  controls = new OrbitControls( camera );
  camera.position.set(0, 0, 0);
  camera.position.z = 12;
  camera.position.y = 0;
  controls.update();
  // world = document.getElementById('world');
  // world = document.body.appendChild(renderer.domElement);
  // world.appendChild(renderer.domElement);

  // ADD EventListeners and other domElements;
  document.body.appendChild(renderer.domElement);
}

function createHelperGrid() {
  size = 20;
  divisions = 20;
  gridhelper = new THREE.GridHelper(size, divisions);
  axishelper = new THREE.AxesHelper(20);
  scene.add( gridhelper );
  scene.add( axishelper );
}

function createFloor() {
  let plane = new THREE.PlaneBufferGeometry(1000, 500);
  let material = new THREE.MeshPhongMaterial({ color: 0xf0f0f0});
  floor = new THREE.Mesh(plane, material);

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -10;
  floor.receiveShadow = true;

  scene.add( floor );
}


function createLights() {
  hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .5);

  backLighting = new THREE.DirectionalLight(0xffffff, .7);
  backLighting.position.set(-50, 50, 50);
  backLighting.castShadow = true;

  shadowLighting = new THREE.DirectionalLight(0xffffff, .7);
  shadowLighting.position.set(10, 10, 10);
  shadowLighting.castShadow = true;

  scene.add(hemLight);
  scene.add(backLighting);
  scene.add(shadowLighting);
}

function createMane() {
  let geometry = new THREE.BoxGeometry(10, 10, 1);
  let material = new THREE.MeshPhongMaterial({
    color: oColor, wireframe: wireFrameBool
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
  let material1 = new THREE.MeshPhongMaterial({
      color: oColor,
      wireframe: wireFrameBool
    });

  endMane = new THREE.Mesh( geometry1, material1);
  endMane.position.y = -6;
  endMane.position.z = -1;

  endMane.rotation.x = -.5;
  endMane.rotation.y = 1.05;
  endMane.rotation.z = 3.15;

}

function createNose() {
  // (radiusTop, radiusBottom, height, radialSegments);
  let geometry = new THREE.CylinderGeometry(1, 1.5, 3);
  let material = new THREE.MeshPhongMaterial({
    color: oColor, wireframe: wireFrameBool
  });
  nose = new THREE.Mesh(geometry, material);
  nose.rotation.x = 1.5;
  nose.position.z = 4.1;
  nose.position.y = -.3;

  //Nostril
  let geometry1 = new THREE.SphereGeometry(.8, 6, 6);
  let material1 = new THREE.MeshPhongMaterial({
    color: 0x000000,
    wireframe: wireFrameBool
  });

  nostril = new THREE.Mesh(geometry1, material1);

  nostril.position.z = 5.6;
  nostril.position.y = -.1;
}


//  HEAD //
function createFace() {
  let geometry = new THREE.BoxGeometry(5, 6, 4);
  let material = new THREE.MeshPhongMaterial({
    color: oColor, wireframe: wireFrameBool
  });
  face = new THREE.Mesh(geometry, material);
  face.position.x = 0;
  face.position.y = 1;
  face.position.z = 1;
}

function createEars() {
  // (radius, height, radialsegments, heightsegments)
  let geometry = new THREE.ConeGeometry(.8, 2.6, 5);
  let material = new THREE.MeshPhongMaterial({
    color: oColor,
    wireframe: wireFrameBool
  });

  let innerGeo = new THREE.ConeGeometry(.35, 2.1, 3);
  let innerMat = new THREE.MeshPhongMaterial({
    color: 0xffcccc,
    wireframe: false
  })

  ear1 = new THREE.Mesh(geometry, material);
  ear2 = new THREE.Mesh(geometry, material);

  inner1 = new THREE.Mesh(innerGeo, innerMat);
  inner2 = new THREE.Mesh(innerGeo, innerMat);

  ear1.position.x = 2.7;
  ear1.position.y = 7.5;
  ear1.position.z = .5;

  ear1.rotation.x = .45;
  ear1.rotation.y = .64;
  ear1.rotation.z = -.57;

  ear2.position.x = -2.7;
  ear2.position.y = 7.5;
  ear2.position.z = .5;

  ear2.rotation.x = -.45;
  ear2.rotation.y = .64;
  ear2.rotation.z = .57;

  inner1.position.x = 2.7;
  inner1.position.y = 7.3;
  inner1.position.z = .85;
  
  inner1.rotation.x = .5;
  inner1.rotation.y = 1;
  inner1.rotation.z = -.7;

  inner2.position.x = -2.6;
  inner2.position.y = 7.3;
  inner2.position.z = .85;
  
  inner2.rotation.x = .45;
  inner2.rotation.y = -1;
  inner2.rotation.z = .7;
  

  scene.add(ear1);
  scene.add(ear2);
  scene.add(inner1); 
  scene.add(inner2);
}

function createHead() {
  // Grouping all Geometries
  head = new THREE.Object3D();
  head.add( face );
  head.add( mane );
  head.add( mane2 );
  head.add( mane3 );
  head.add( mane4 );
  head.add( endMane );
  head.add( nose );
  head.add( nostril );

  head.traverse( function ( meshes ) {
    if (meshes instanceof THREE.Mesh) {
      meshes.castShadow = true;
      meshes.receiveShadow = true;
    }
  });
  
  head.position.y = 2;
  scene.add( head );
}

function animateLoop () {
  requestAnimationFrame( animateLoop );
  // head.rotation.x += .1;
  // head.rotation.y += .01;
  // head.rotation.z += .1;
  renderer.shadowMap.enabled = true;
  renderer.render( scene, camera );
}


init();
createLights();
createFloor();
// createMane();
createNose();
createFace();
createHelperGrid();
createHead();
createEars();
animateLoop();
