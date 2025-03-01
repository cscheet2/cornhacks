const canvasContainerId = 'canvas-container';
const canvasContainer = document.getElementById(canvasContainerId);

const FRAME_RATE = 60;
const TIME_SCALER = 2;

var data = {
  "root": {
    "name": "The Sun",
    "orbitalDistance": 0,
    "diameter": 5,
    "rotationalPeriod": 27,
    "children": [
      {
        "name": "Earth",
        "orbitalDistance": 30,
        "orbitalPeriod": 30000,
        "diameter": 2,
        "rotaionalPeriod": 27,
        "children": [
          {
            "name": "The Moon",
            "orbitalDistance": 10,
            "orbitalPeriod": 10000,
            "diameter": 1,
            "rotaionalPeriod": 27,
          }
        ],
      },
      {
        "name": "Mars",
        "orbitalDistance": 50,
        "orbitalPeriod": 60000,
        "diameter": 3,
        "rotaionalPeriod": 60,
        "children": [],
      },
    ],
  },
}

function getWindowDimensions() {
  return {
    width: document.body.clientWidth - 256 - 256 - 16,  // Offset from css
    height: document.body.clientHeight - 32
  };
}

var time = Date.now();  // Used to find changeInTime
var changeInTime = 0;

function incrementPositions(planet) {
  if (isNaN(planet.angle)) {
    planet.angle = 0;
  } else {
    planet.angle += changeInTime / planet.orbitalPeriod * 2 * Math.PI * TIME_SCALER;
  }

  if (planet.orbitalDistance == 0) {
    planet.x = planet.y = planet.z = 0;
  } else {
    planet.x = planet.orbitalDistance * Math.cos(planet.angle);
    planet.y = planet.orbitalDistance * Math.sin(planet.angle);
    planet.z = 0;  
  }

  if (planet.children) {
    planet.children.forEach(child => {
      incrementPositions(child);
    });  
  }
}

function updatePositions() {
  changeInTime = Date.now() - time;
  time = Date.now();

  incrementPositions(data.root);
}

/* * * * * * * * * * * * * * * *
 * p5.js built-in functions
 * * * * * * * * * * * * * * * */

/**
 * Called once on start-up
 */
function setup() {
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

/**
 * Called orbitalPeriodically according to framerate
 */
function draw() {
  updatePositions();

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

  drawPlanets(data.root);
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
  //rotateZ(angle);
  translate(planet.x, planet.y, planet.z);
  sphere(planet.diameter);

  if (planet.children) {
    planet.children.forEach((moon) => {
      drawPlanets(moon);
    });
  }

  pop();
}