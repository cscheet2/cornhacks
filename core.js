/**
 * Represents a celestial object.
 * @typedef {Object} CelestialBody
 * @property {string} name The name of the body.
 * @property {number} orbitalDistance The distance at with the body orbits its
 * parent (kilometers).
 * @property {number} orbitalPeriod The period over which the body completes an
 * orbit around its parent (earth days).
 * @property {number} orbitalAngle The current angle the body is at in its orbit
 * about its parent (radians).
 * @property {number} rotationalPeriod The period over which the body completes
 * one rotation about its own axis (earth days).
 * @property {number} rotationalAngle The current angle the body is at in its orbit
 * about its own axis (radians).
 * @property {number} radius The radius of the celestial body (kilometers).
 * @property {string?} imgName The name of the body's texture, if any.  Includes
 * the file extension.
 * @property {p5.Image?} img The p5 Image object containing the body's texture,
 * if any.
 * @property {string?} layerImgName The name of the body's cloud-layer texture,
 * if any.  Includes the file extension.
 * @property {p5.Image?} layerImg The p5 Image object containing the body's
 * cloud-layer texture, if any.
 * @property {[CelestialBody]} children The body's children, e.g. moons.
 */

/**
 * The filepath of the JSON file containing data about celestial bodies.
 * @type {string}
 */
const dataPath = './data/celestial-bodies.json';

/**
 * The directory containg all textures.
 * @type {string}
 */
const textureDirectory = './images/textures/';

/**
 * The name of the texture used as the background.
 * @type {string}
 */
const panoramaImgName = 'milky_way.jpg';

/**
 * The texture used as the background.
 * @type {p5.Image}
 */
var panoramaImg;

/**
 * The limiting framerate for p5.js.
 * @type {number}
 */
const FRAME_RATE = 60;

/**
 * The width of strokes drawn by p5.js.
 * @type {number}
 */
const STROKE_WIDTH = 0.6;

/**
 * The constant that all time periods are multiplied by.  A larger scaler means
 * a larger period and slower rotation.
 * @type {number}
 */
const TIME_SCALER = 500;

/**
 * The root celestial body of the solar system, i.e. the Sun.  Initialized in
 * the p5's preload method.
 * @type {CelestialBody}
 */
var root = null;

/**
 * Multiplier applied to all rotational velocities.
 * @type {number}
 */
var timeMultiplier = 1

/**
 * The id of the element that should contain the p5.js canvas.
 * @type {string}
 */
const canvasContainerId = 'canvas-container';

/**
 * Updates the time multipler.
 * @param {Event} event The event that triggered the change.
 */
function updateTimeMultiplier(event) {
  timeMultiplier = event.target.value;
}

/**
 * Loads the JSON file containing all celestial data.
 * @returns {CelestialBody} The root celestial body of the system.
 */
function loadData() {
  var responseRoot;

  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType('application/json');  // Request a JSON file
  xhr.open('GET', dataPath, false);  // async is false for p5.js compatability

  xhr.onload = function () {
    if (this.status == 200) {
      responseRoot = JSON.parse(this.responseText).root;
    } else {
      responseRoot = {}
      console.error('failed to query data');
    }
  }

  xhr.send();
  return responseRoot;
}

/**
 * Fills all default values for the given celestial body (and its children), such as the starting
 * angles and p5 Image textures.  Also performs operations on the default system
 * scale, such as speading up time and shrinking the distance between planets.
 * @param {CelestialBody} cBody The celestial body.
 * @param {number} level The level of the body; 0 for the Sun, 1 for planets, 2
 * for moons. Set and incremented automatically.
 */
function initDefaultValues(cBody, level = 0) {
  if (cBody.imgName) {
    cBody.img = loadImage(textureDirectory + cBody.imgName);
  }

  if (cBody.layerImgName) {
    cBody.layerImg = loadImage(textureDirectory + cBody.layerImgName);
  }

  cBody.rotationalAngle = cBody.orbitalAngle = 0;

  switch (level) {  // Manipulate scale based on the body's level in the celestial tree.
    case 0:  // Star
      cBody.radius /= 1e4;
      break;
    case 1:  // Planets
      cBody.radius /= 3e2;
      cBody.orbitalDistance /= 6e5;
      break;
    case 2:  // Moons
      cBody.radius /= 3e2;
      cBody.orbitalDistance /= 1e4;
      break;
  }

  cBody.orbitalPeriod *= TIME_SCALER;
  cBody.rotationalPeriod *= TIME_SCALER;

  if (cBody.children) {
    cBody.children.forEach((child) => {
      initDefaultValues(child, level + 1);
    })
  } else {
    cBody.children = [];
  }
}

/**
 * Increments the position of the given celestial body and its children based
 * on the time ellapsed since it was last called.
 * @param {CelestialBody} cBody The celestial body.
 * @param {number} deltaTime The change in time.
 */
function incrementPositions(cBody, deltaTime) {
  if (cBody.rotationalPeriod == 0) {
    cBody.rotationalAngle = 0;  // Avoid divide by zero error
  } else {
    cBody.rotationalAngle += deltaTime / cBody.rotationalPeriod * 2 * Math.PI * timeMultiplier;
  }

  if (cBody.orbitalPeriod == 0) {
    cBody.orbitalAngle = 0;  // Avoid divide by zero error
  } else {
    cBody.orbitalAngle += deltaTime / cBody.orbitalPeriod * 2 * Math.PI * timeMultiplier;
  }

  cBody.x = cBody.orbitalDistance * Math.cos(cBody.orbitalAngle);
  cBody.y = cBody.orbitalDistance * Math.sin(cBody.orbitalAngle);
  cBody.z = 0;

  cBody.children.forEach((child) => {
    incrementPositions(child, deltaTime);
  });
}

/**
 * Gets the current ideal window dimensions.
 * @returns {{ width: number, height: number }} The ideal width and height of
 * the p5 canvas.
 */
function getWindowDimensions() {
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight
  };
}

/**
 * Built-in p5 function.  Called before calling setup, mostly used to load images
 * and other data.
 */
function preload() {
  root = loadData();
  panoramaImg = loadImage(textureDirectory + panoramaImgName);
  initDefaultValues(root);
}

/**
 * Built-in p5 function.  Called once on start-up, used to initialize the p5
 * canvas and settings.
 */
function setup() {
  const settingsForm = document.getElementById('settings-form');
  settingsForm.addEventListener('change', (event) => updateTimeMultiplier(event));

  const defaultRadio = document.getElementById('time-multiplier-normal');
  defaultRadio.checked = true;

  let { width, height } = getWindowDimensions();
  let canvas = createCanvas(width, height, WEBGL);
  canvas.parent(canvasContainerId);

  angleMode(RADIANS);

  strokeWeight(STROKE_WIDTH);
  stroke(255, 255, 255);
}

/**
 * Built-in p5 function.  Called when the window is resized.
 */
function windowResized() {
  let { width, height } = getWindowDimensions();
  resizeCanvas(width, height);
}

/**
 * Used to calculate the time difference between function calls.
 * @type {number}
 */
var previousTime = Date.now();

/**
 * Built-in p5 function.  Used to draw on and update the canvas.  Called periodically
 * according to the set framerate.
 */
function draw() {
  // Increment the solar system's positions
  let changeInTime = Date.now() - previousTime;
  previousTime = Date.now();
  incrementPositions(root, changeInTime);

  // p5 settings
  frameRate(FRAME_RATE);
  orbitControl(2, 2, 2);  // Allows the user to move the camera with the given x/y/z sensitivities
  panorama(panoramaImg);  // Background image
  noStroke();  // Don't draw lines

  // Light source at the origin (inside the Sun)
  pointLight(
    255, 255, 0, // color
    0, 0, 0      // position
  );
  lights();

  // Render all bodies
  drawCBodies(root);
}

/**
 * Draws the given celestial body, its orbit, and its children.
 * @param {CelestialBody} cBody The celestial body.
 */
function drawCBodies(cBody) {
  drawOrbit(cBody);

  push();
  translate(cBody.x, cBody.y, cBody.z);

  push();
  rotateZ(cBody.rotationalAngle);
  rotateX(-90);  // Rotate image the right way up

  if (cBody.img) {
    texture(cBody.img);
  }

  sphere(cBody.radius);

  if (cBody.layerImg) {
    push();
    texture(cBody.layerImg);
    tint(255, 128);  // 50% transparency on the cloud-layer texture
    sphere(cBody.radius * 1.05)  // Radius slightly larger than that of the body
    pop();
  }

  pop();

  cBody.children.forEach((moon) => {
    drawCBodies(moon);
  });
  pop();
}

/**
 * Draws the path of the celestial body's orbit.
 * @param {CelestialBody} cBody The celestial body.
 */
function drawOrbit(cBody) {
  push();
  fill(255, 255, 255, 50);
  torus(cBody.orbitalDistance, STROKE_WIDTH, deltaY = 120);
  pop();
}
