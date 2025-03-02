const canvasContainerId = 'canvas-container';

const FRAME_RATE = 60;
const TIME_SCALER = 500;
const STROKE_WIDTH = 0.6;

var root = null;  // Initialized in setup

function loadData() {
  var xhr = new XMLHttpRequest();
  var responseRoot;

  xhr.overrideMimeType('application/json');
  xhr.open('GET', './data/celestial-bodies.json', false);

  xhr.onload = function() {
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

function initDefaultValues(cBody, level=0) {
  if (cBody.imgName) {
    cBody.img = loadImage(`./images/celestial-bodies/${cBody.imgName}`);
  }

  if (cBody.layerImgName) {
    cBody.layerImg = loadImage(`./images/celestial-bodies/${cBody.layerImgName}`);
  }

  cBody.rotationalAngle = cBody.orbitalAngle = 0;

  switch (level) {
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

function getWindowDimensions() {
  return {
    width: document.body.clientWidth - 256 - 32 - 8,  // Offset from css
    height: document.body.clientHeight - 32
  };
}

function incrementPositions(cBody, deltaTime) {
  if (cBody.rotationalPeriod == 0) {
    cBody.rotationalAngle = 0;  // Avoid divide by zero error
  } else {
    cBody.rotationalAngle += deltaTime / cBody.rotationalPeriod * 2 * Math.PI;
  }

  if (cBody.orbitalPeriod == 0) {
    cBody.orbitalAngle = 0;  // Avoid divide by zero error
  } else {
    cBody.orbitalAngle += deltaTime / cBody.orbitalPeriod * 2 * Math.PI;
  }

  cBody.x = cBody.orbitalDistance * Math.cos(cBody.orbitalAngle);
  cBody.y = cBody.orbitalDistance * Math.sin(cBody.orbitalAngle);
  cBody.z = 0;

  cBody.children.forEach((child) => {
    incrementPositions(child, deltaTime);
  });
}

/* * * * * * * * * * * * * * * *
 * p5.js built-in functions
 * * * * * * * * * * * * * * * */

function preload() {
  root = loadData();
  initDefaultValues(root);
}

/**
 * Called once on start-up
 */
function setup() {
  let { width, height } = getWindowDimensions();
  let canvas = createCanvas(width, height, WEBGL);
  canvas.parent(canvasContainerId);

  angleMode(RADIANS);

  strokeWeight(STROKE_WIDTH);
  stroke(255, 255, 255);
}

/**
 * Called when window is resized
 */
function windowResized() {
  let { width, height } = getWindowDimensions();
  resizeCanvas(width, height);
}

var previousTime = Date.now();  // Used to find changeInTime

/**
 * Called orbitalPeriodically according to framerate
 */
function draw() {
  let changeInTime = Date.now() - previousTime;
  previousTime = Date.now();

  incrementPositions(root, changeInTime);

  background(0, 0, 0);
  frameRate(FRAME_RATE);
  fill(200);

  orbitControl(2, 2, 2);  // Allow use to move camera  

  pointLight(
    255, 255, 0, // color
    0, 0, 0 // position
  );

  lights();
  noStroke();

  drawCBodies(root);
}

function drawOrbit(cBody) {
  push();
  fill(255, 255, 255, 50);
  torus(cBody.orbitalDistance, STROKE_WIDTH, deltaY = 120);
  pop();
}

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
    tint(255, 128);
    sphere(cBody.radius * 1.05)
    pop();
  }

  pop();

  cBody.children.forEach((moon) => {
    drawCBodies(moon);
  });
  pop();
}