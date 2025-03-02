const canvasContainerId = 'canvas-container';
const canvasContainer = document.getElementById(canvasContainerId);

const FRAME_RATE = 60;
const TIME_SCALER = 0.3;

var root = {
  "name": "The Sun",
  "orbitalDistance": 0,
  "orbitalPeriod": 0,
  "rotationalPeriod": 2700,
  "diameter": 5,
  "children": [
    {
      "name": "Earth",
      "orbitalDistance": 30,
      "orbitalPeriod": 30000,
      "rotationalPeriod": 2700,
      "diameter": 2,
      "children": [
        {
          "name": "The Moon",
          "orbitalDistance": 10,
          "orbitalPeriod": 10000,
          "rotationalPeriod": 2700,
          "diameter": 1,
        }
      ],
    },
    {
      "name": "Mars",
      "orbitalDistance": 50,
      "orbitalPeriod": 60000,
      "rotationalPeriod": 2700,
      "diameter": 3,
    },
  ],
}

function initData(planet) {
  planet.rotationalAngle = planet.orbitalAngle = 0;

  if (planet.children) {
    planet.children.forEach((child) => {
      initData(child);
    })
  } else {
    planet.children = [];
  }
}

function getWindowDimensions() {
  return {
    width: document.body.clientWidth - 256 - 32 - 8,  // Offset from css
    height: document.body.clientHeight - 32
  };
}

function incrementPositions(planet, deltaTime) {
  if (planet.rotationalPeriod == 0) {
    planet.rotationalAngle = 0;  // Avoid divide by zero error
  } else {
    planet.rotationalAngle += deltaTime / planet.rotationalPeriod * 2 * Math.PI * TIME_SCALER;
  }

  if (planet.orbitalPeriod == 0) {
    planet.orbitalAngle = 0;  // Avoid divide by zero error
  } else {
    planet.orbitalAngle += deltaTime / planet.orbitalPeriod * 2 * Math.PI * TIME_SCALER;
  }

  planet.x = planet.orbitalDistance * Math.cos(planet.orbitalAngle);
  planet.y = planet.orbitalDistance * Math.sin(planet.orbitalAngle);
  planet.z = 0;

  planet.children.forEach((child) => {
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

  ambientLight(20);

  pointLight(
    255, 0, 0, // color
    40, -40, 0 // position
  );

  directionalLight(
    0, 255, 0, // color
    1, 1, 0  // direction
  );

  lights();
  noStroke();

  drawPlanets(root);
}

function drawOrbit(cBody) {
  push();
  fill(100, 100, 100, 100);
  torus(cBody.orbitalDistance, 0.2, deltaY = 60);
  pop();
}

function drawPlanets(planet) {
  drawOrbit(planet);
  push();
  rotateZ(planet.rotationalAngle);
  translate(planet.x, planet.y, planet.z);
  box(planet.diameter);

  planet.children.forEach((moon) => {
    drawPlanets(moon);
  });

  pop();
}