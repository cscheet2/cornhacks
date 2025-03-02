const canvasContainerId = 'canvas-container';
const canvasContainer = document.getElementById(canvasContainerId);

const FRAME_RATE = 60;
const TIME_SCALER = 500;

var root = {
  "name": "The Sun",
  "orbitalDistance": 0,
  "orbitalPeriod": 0,
  "rotationalPeriod": 27,
  "radius": 6.96e5,
  "children": [
    {
      "name": "Mercury"
      , "orbitalDistance": 5.79e7
      , "orbitalPeriod": 88
      , "rotationalPeriod": 1
      , "radius": 2.4397e3
      , "children": [
      ],
    },
    {
      "name": "Venus"
      , "orbitalDistance": 1.082e8
      , "orbitalPeriod": 224
      , "rotationalPeriod": 1
      , "radius": 6.0518e3
      , "children": [
      ],
    },
    {
      "name": "Earth",
      "orbitalDistance": 1.496e8,
      "orbitalPeriod": 365,
      "rotationalPeriod": 1,
      "radius": 6.371e3,
      "children": [
        {
          "name": "The Moon",
          "orbitalDistance": 3.844e5,
          "orbitalPeriod": 27,
          "rotationalPeriod": 27,
          "radius": 1.7374e3,
        }
      ],
    },
    {
      "name": "Mars",
      "orbitalDistance": 2.279e8,
      "orbitalPeriod": 686,
      "rotationalPeriod": 3,
      "radius": 3.3895e3,
      "children": [
        {
          "name": "Deimos"
        , "orbitalDistance": 23460
        , "orbitalPeriod":  1.2624
        , "rotationalPeriod": 1
          , "radius":  6.2
        }
        , {
          "name": "Phobos"
          , "orbitalDistance": 9270
          , "orbitalPeriod":  0.3189
          , "rotationalPeriod": 1
          , "radius":  11.25
        }
      ],
    },
    {
      "name": "Jupiter"
      , "orbitalDistance": 7.785e8
      , "orbitalPeriod": 4332.82
      , "rotationalPeriod": 1
      , "radius": 6.9911e4
      , "children": [
        {
          "name": "Callisto"
        , "orbitalDistance":  1883000
        , "orbitalPeriod":  16.689
        , "rotationalPeriod": 1
          , "radius":  2400
        }
      ],
    },
    {
      "name": "Saturn"
      , "orbitalDistance": 1.429e9
      , "orbitalPeriod": 10755
      , "rotationalPeriod": 1
      , "radius": 5.8232e4
      , "children": [
      ],
    },
    {
      "name": "Uranus"
      , "orbitalDistance": 2.871e9
      , "orbitalPeriod": 30687
      , "rotationalPeriod": 1
      , "radius": 2.5362e4
      , "children": [
      ],
    },
    {
      "name": "Neptune"
      , "orbitalDistance": 4.498e9
      , "orbitalPeriod": 60190
      , "rotationalPeriod": 1
      , "radius": 2.4622e4
      , "children": [
      ],
    },
    {
      "name": "Pluto"
      , "orbitalDistance": 5.906e9
      , "orbitalPeriod": 247.92065 * 365
      , "rotationalPeriod": 1
      , "radius": 1.1883e3
      , "children": [
      ],
    },
  ],
}

function initData(cBody, level = 0) {
  cBody.rotationalAngle = cBody.orbitalAngle = 0;

  switch (level) {
    case 0:  // Root / Star
      cBody.radius /= 0.5e4;
      break;
    case 1:  // Planets
      cBody.radius /= 3e2;
      cBody.orbitalDistance /= 3e5;
      break;
    case 2:  // Moons
      cBody.radius /= 1e2;
      cBody.orbitalDistance /= 0.5e4;
      break;
  }

  cBody.orbitalPeriod *= TIME_SCALER;
  cBody.rotationalPeriod *= TIME_SCALER;

  if (cBody.children) {
    cBody.children.forEach((child) => {
      initData(child, level + 1);
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

/**
 * Called once on start-up
 */
function setup() {
  initData(root);

  let { width, height } = getWindowDimensions();
  let canvas = createCanvas(width, height, WEBGL);
  canvas.parent(canvasContainerId);

  angleMode(RADIANS);

  strokeWeight(1);
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
  fill(100, 100, 100, 100);
  torus(cBody.orbitalDistance, 1, deltaY = 120);
  pop();
}

function drawCBodies(cBody) {
  drawOrbit(cBody);
  push();
  translate(cBody.x, cBody.y, cBody.z);
  push();
  rotateZ(cBody.rotationalAngle);
  box(cBody.radius);
  pop();

  cBody.children.forEach((moon) => {
    drawCBodies(moon);
  });

  pop();
}