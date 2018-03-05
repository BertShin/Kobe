import * as THREE from 'three';
var OrbitControls = require('three-orbit-controls')(THREE);

// THREE.js Necessities
let kobeSpace;
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
let halfWindowX = WIDTH/2;
let halfWindowY = HEIGHT/2;
let wireFrameBool = false;
let mousePosition = {
  x: 0,
  y: 0
};

// Kobe
// DECIDED COLOR: 
// FOR PHONG MATERIAL: 0xd3d3d3(lighter), 0xb8b8b8(darker), 0xf5f5f5
// FOR TOON MATERIAL: 0xa9a9a9 works well.
let oColor = 0xf5f5f5;
let kobe;
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

const handleMouseMovement = (e) => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY
  };
};

const init = () => {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), .1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(window.devicePixelRatio);
  // controls = new OrbitControls(camera);
  // controls.update();
  camera.position.set(0, 1, 12);
  // camera.position.set(0, 4, 8);

  // ADD EventListeners and other domElements;
  kobeSpace = document.getElementById('kobeSpace');
  kobeSpace.appendChild(renderer.domElement);
  // document.body.appendChild(renderer.domElement);
  document.addEventListener("mousemove", handleMouseMovement, false);
};

const createHelperGrid = () => {
  size = 20;
  divisions = 20;
  gridhelper = new THREE.GridHelper(size, divisions);
  axishelper = new THREE.AxesHelper(20);
  scene.add(gridhelper);
  scene.add(axishelper);
};

const createFloor = () => {
  let plane = new THREE.PlaneBufferGeometry(1000, 500);
  let material = new THREE.MeshPhongMaterial({ color: 0xf0f0f0 });
  floor = new THREE.Mesh(plane, material);

  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -10;
  floor.receiveShadow = true;

  scene.add(floor);
};


const createLights = () => {
  hemLight = new THREE.HemisphereLight(0xffffff, 0xffffff, .4);

  backLighting = new THREE.DirectionalLight(0xffffff, .5);
  backLighting.position.set(-140, 150, 100);
  backLighting.castShadow = true;

  shadowLighting = new THREE.DirectionalLight(0xffffff, .5);
  shadowLighting.position.set(140, 150, 100);
  shadowLighting.castShadow = true;

  scene.add(hemLight);
  scene.add(backLighting);
  scene.add(shadowLighting);
};



// KOBE // 


class Kobe {
  constructor() {
    this.head = new THREE.Object3D();

    // EYES //
    //(radius, tube, radialSegments, tubularSegments, arc)
    let eyeGeometry = new THREE.TorusGeometry(.5, .2, 2, 14, Math.PI);
    let eyeMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
    });

    let rightEye = new THREE.Mesh( eyeGeometry, eyeMaterial );
    let leftEye = new THREE.Mesh( eyeGeometry, eyeMaterial );


    rightEye.position.x = 1.2;
    rightEye.position.y = 2.25;
    rightEye.position.z = 3.04;

    leftEye.position.x = -1.2;
    leftEye.position.y = 2.25;
    leftEye.position.z = 3.04;

    // Mane //
    let maneGeometry = new THREE.BoxGeometry(10, 10, 1);
    let maneMaterial = new THREE.MeshPhongMaterial({
      color: oColor, wireframe: wireFrameBool
    });
    mane = new THREE.Mesh(maneGeometry, maneMaterial);
    mane2 = new THREE.Mesh(maneGeometry, maneMaterial);
    mane3 = new THREE.Mesh(maneGeometry, maneMaterial);
    mane4 = new THREE.Mesh(maneGeometry, maneMaterial);

    mane.position.y = 1;
    mane.position.z = -1;
    mane.rotation.z = .8;

    mane2.position.y = 1;
    mane2.position.z = -1.2;
    mane2.rotation.z = 0;

    mane3.position.y = 1;
    mane3.position.z = -1.6;
    mane3.rotation.z = .35;

    mane4.position.y = 1;
    mane4.position.z = -1.8;
    mane4.rotation.z = -.35;

    // Tip of the mane //
    let endManeGeometry1 = new THREE.ConeGeometry(3, 4, 3);
    let endManeMaterial1 = new THREE.MeshPhongMaterial({
      color: oColor,
      wireframe: wireFrameBool
    });

    endMane = new THREE.Mesh(endManeGeometry1, endManeMaterial1);
    endMane.position.y = -6;
    endMane.position.z = -1;

    endMane.rotation.x = -.5;
    endMane.rotation.y = 1.05;
    endMane.rotation.z = 3.15;

    // NOSE //
    // (radiusTop, radiusBottom, height, radialSegments);
    let noseGeometry = new THREE.CylinderGeometry(1, 1.5, 3);
    let noseMaterial = new THREE.MeshPhongMaterial({
      color: oColor, wireframe: wireFrameBool
    });
    nose = new THREE.Mesh(noseGeometry, noseMaterial);
    nose.rotation.x = 1.5;
    nose.position.z = 4.1;
    nose.position.y = -.3;

    // NOSTRIL //
    let nosGeometry1 = new THREE.SphereGeometry(.8, 6, 6);
    let nosMaterial1 = new THREE.MeshPhongMaterial({
      color: 0x000000,
      wireframe: wireFrameBool
    });

    nostril = new THREE.Mesh(nosGeometry1, nosMaterial1);

    nostril.position.z = 5.6;
    nostril.position.y = -.1;

    // NOSTRIL SPOTS //

    let spotGeometry = new THREE.SphereGeometry(.1, 6, 6);
    let spotMaterial = new THREE.MeshPhongMaterial({
      color: 0x000000,
      wireframe: wireFrameBool
    });

    let spot = new THREE.Mesh( spotGeometry, spotMaterial );
    let spot2 = new THREE.Mesh( spotGeometry, spotMaterial);
    let spot3 = new THREE.Mesh( spotGeometry, spotMaterial );

    let spot4 = new THREE.Mesh( spotGeometry, spotMaterial );
    let spot5 = new THREE.Mesh( spotGeometry, spotMaterial );
    let spot6 = new THREE.Mesh( spotGeometry, spotMaterial );

      // RIGHT SIDE SPOTS //
    //bottom spot//
    spot.position.x = .94;
    spot.position.y = -.35;
    spot.position.z = 5.3;
    //top spot//
    spot2.position.x = .81;
    spot2.position.y = .2;
    spot2.position.z = 5.3;
    //Inbetween spot//
    spot3.position.x = 1;
    spot3.position.y = -.1;
    spot3.position.z = 4.9;
    
    // LEFT SIDE SPOTS //
    //bottom spot//
    spot4.position.x = -.94;
    spot4.position.y = -.35;
    spot4.position.z = 5.3;
    //top spot//
    spot5.position.x = -.81;
    spot5.position.y = .2;
    spot5.position.z = 5.3;
    //Inbetween spot//
    spot6.position.x = -1;
    spot6.position.y = -.1;
    spot6.position.z = 4.9;

    // FACE //
    let faceGeometry = new THREE.BoxGeometry(5, 6, 4);
    let faceMaterial = new THREE.MeshPhongMaterial({
      color: oColor, wireframe: wireFrameBool
    });
    face = new THREE.Mesh(faceGeometry, faceMaterial);
    face.position.x = 0;
    face.position.y = 1;
    face.position.z = 1;

    // EARS //
    // (radius, height, radialsegments, heightsegments)
    let earGeometry = new THREE.ConeGeometry(.8, 2.6, 5);
    let earMaterial = new THREE.MeshPhongMaterial({
      color: oColor,
      wireframe: wireFrameBool
    });

    let innerGeo = new THREE.ConeGeometry(.36, 1.7, 3);
    let innerMat = new THREE.MeshBasicMaterial({
      color: 0xff99cc,
      wireframe: wireFrameBool
    });

    ear1 = new THREE.Mesh(earGeometry, earMaterial);
    ear2 = new THREE.Mesh(earGeometry, earMaterial);

    inner1 = new THREE.Mesh(innerGeo, innerMat);
    inner2 = new THREE.Mesh(innerGeo, innerMat);

    ear1.position.x = 2.7;
    ear1.position.y = 5.5;
    ear1.position.z = .5;

    ear1.rotation.x = .45;
    ear1.rotation.y = .64;
    ear1.rotation.z = -.57;

    ear2.position.x = -2.7;
    ear2.position.y = 5.5;
    ear2.position.z = .5;

    ear2.rotation.x = -.45;
    ear2.rotation.y = .64;
    ear2.rotation.z = .57;

    inner1.position.x = 2.5;
    inner1.position.y = 5.3;
    inner1.position.z = .86;

    inner1.rotation.x = .45;
    inner1.rotation.y = .8;
    inner1.rotation.z = -.7;

    inner2.position.x = -2.5;
    inner2.position.y = 5.35;
    inner2.position.z = .89;

    inner2.rotation.x = .35;
    inner2.rotation.y = -.8;
    inner2.rotation.z = .7;

    // COLLAR //

    let collarGeometry = new THREE.TorusGeometry(1, 1, 1, 14, Math.PI);
    let collarMaterial = new THREE.MeshPhongMaterial({
      color: oColor,
      wireframe: wireFrameBool
    });
    let collar = new THREE.Mesh(collarGeometry, collarMaterial);
    collar.position.z = 5;
    
    scene.add(collar);

    this.head.add(face);
    this.head.add(leftEye);
    this.head.add(rightEye);
    this.head.add(mane);
    this.head.add(mane2);
    this.head.add(mane3);
    this.head.add(mane4);
    this.head.add(endMane);
    this.head.add(nose);
    this.head.add(nostril);
    this.head.add(spot);
    this.head.add(spot2);
    this.head.add(spot3);
    this.head.add(spot4);
    this.head.add(spot5);
    this.head.add(spot6);
    this.head.add(ear1);
    this.head.add(ear2);
    this.head.add(inner1);
    this.head.add(inner2);

    this.head.traverse((meshes) => {
      if (meshes instanceof THREE.Mesh) {
        meshes.castShadow = true;
        meshes.receiveShadow = true;
      }
    });

    this.head.position.y = 2;
    this.head.rotation.x = .1;
    scene.add( this.head );
    this.updateHead = this.updateHead.bind(this);
    this.track = this.track.bind(this);
    this.trackCalcNormalize = this.trackCalcNormalize.bind(this);
  }

  trackCalcNormalize(v, vmin, vmax, tmin, tmax) {
    let nv = Math.max(Math.min(v, vmax), vmin);
    let dv = vmax - vmin;
    let pc = (nv - vmin) / dv;
    let dt = tmax - tmin;
    let tv = tmin + (pc * dt);

    return tv;
  }

  updateHead(speed) {
    this.head.rotation.y += (this.head.headRotationY - this.head.rotation.y) / speed;
    this.head.rotation.x += (this.head.headRotationX - this.head.rotation.x) / speed;
  }

  track(xPos, yPos) {
    this.head.headRotationY = this.trackCalcNormalize(xPos, -100, 100, -Math.PI / 4, Math.PI / 4);
    this.head.headRotationX = this.trackCalcNormalize(yPos, -100, 100, -Math.PI / 4, Math.PI / 4);
    this.updateHead(7);
  }

}

const createKobe = () => {
  kobe = new Kobe();
};

const animateLoop = () => {
  let xPos = (mousePosition.x - halfWindowX);
  let yPos = (mousePosition.y - halfWindowY);

  // console.log(kobe);
  // kobe.track(xPos, yPos);
  requestAnimationFrame(animateLoop);
  // head.rotation.x += .1;
  // kobe.rotation.y += .01;
  // head.rotation.z += .1;
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
};


init();
createKobe();
createLights();
createFloor();
createHelperGrid();
animateLoop();