## Kobe - A Homage to my best buddy
...my doge

### Overview

Meet Kobe.

Kobe is a 3D animated and interactive graphic that will be named and modeled after my dog. This application will be completed within a 5-day deadline and will feature Vanilla JavaScript. Kobe is a Mini white american eskimo.

  * This application will be interactive in a sense that Kobe will be able to track the user's cursor as if following their movements.


### Technologies

This application will focus on and mainly utilize Vanilla `JavaScript` and feature the capabilities of the technology. In addition:

  * `three.js` for 3D Graphics.
  * `HTML5 Canvas` for DOM manipulation/Rendering.
  * `Webpack` for bundling.


### Code

Kobe is being rendered utilizing the three.js library with geometries, materials, and joining them as a Mesh. These meshes are being grouped as `THREE.Object3D();`.

Note: These geometries were not exported as a whole grouping, instead created originally.

To initialize these renderings, a `scene`, `camera`, and `renderer` are required and must be calibrated according to your geometries to create the whole scene.

```javascript
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(100, (WIDTH / HEIGHT), .1, 2000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
```

I've also rendered a floor and various lights so that shadows may be reflected and seen and the `PlaneGeometry`;

```javascript
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
  backLighting.position.set(-120, 150, 100);
  backLighting.castShadow = true;
  shadowLighting = new THREE.DirectionalLight(0xffffff, .5);
  shadowLighting.position.set(120, 150, 100);
  shadowLighting.castShadow = true;

  scene.add(hemLight);
  scene.add(backLighting);
  scene.add(shadowLighting);
};
```

All of Kobe's geometries and properties are defined in ES6 class syntax, with everything being added to the grouping within the constructor method.

```javascript
class Kobe {
  constructor() {
    this.head = new THREE.Object3D();
...
```

Lastly, all geometries are continuously being rendered in an `animationLoop()`

```javascript
const animateLoop = () => {
  let xPos = (mousePosition.x - halfWindowX);
  let yPos = (mousePosition.y - halfWindowY);
  kobe.track(xPos, yPos);
  requestAnimationFrame(animateLoop);
  renderer.shadowMap.enabled = true;
  renderer.render(scene, camera);
};
```