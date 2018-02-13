import * as THREE from 'three';

let scene;
let camera;
let renderer;
let world;
let cube;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), 0.1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  // world = document.getElementById('world');
  // world = document.body.appendChild(renderer.domElement);
  // world.appendChild(renderer.domElement);
  document.body.appendChild(renderer.domElement);
}

function createCube() {
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshBasicMaterial({color: 0xD3D3D3});
  cube = new THREE.Mesh(geometry, material);
  scene.add( cube );
  camera.position.z = 5;
}

function animateLoop () {
  requestAnimationFrame( animateLoop );
  cube.rotation.x = 1;
  cube.rotation.y = 1;
  renderer.render( scene, camera );
}

init();
createCube();
animateLoop();
