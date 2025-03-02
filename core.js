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
      "orbitalPeriod": 180,
      "rotationalPeriod": 3,
      "radius": 3.3895e3,
    },
  ],
}

function scientificNotation(num, mantissa = 0) {
  if (num == 0) {
    return { num: 0, mantissa: 0 };
  } else if (num < 1) {
    return scientificNotation(num * 10, mantissa - 1);
  } else if (num >= 10) {
    return scientificNotation(num / 10, mantissa + 1);
  } else {
    return { num: num, mantissa: mantissa };
  }
}

function initData(planet, level=0) {
  planet.rotationalAngle = planet.orbitalAngle = 0;

  planet.radius = scaleDisplayDistance(planet.radius) / 5;
  planet.orbitalDistance = scaleDisplayDistance(planet.orbitalDistance);
  console.log(planet.name, planet.radius, planet.orbitalDistance)

  planet.orbitalPeriod *= TIME_SCALER;
  planet.rotationalPeriod *= TIME_SCALER;

  if (planet.children) {
    planet.children.forEach((child) => {
      initData(child, level + 1);
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
    planet.rotationalAngle += deltaTime / planet.rotationalPeriod * 2 * Math.PI;
  }

  if (planet.orbitalPeriod == 0) {
    planet.orbitalAngle = 0;  // Avoid divide by zero error
  } else {
    planet.orbitalAngle += deltaTime / planet.orbitalPeriod * 2 * Math.PI;
  }

  planet.x = planet.orbitalDistance * Math.cos(planet.orbitalAngle);
  planet.y = planet.orbitalDistance * Math.sin(planet.orbitalAngle);
  planet.z = 0;

  planet.children.forEach((child) => {
    incrementPositions(child, deltaTime);
  });
}

function scaleDisplayDistance(distance) {
  let { num, mantissa } = scientificNotation(distance);
  console.log(num);
  return (distance == 0) ? 0 : (Math.log(distance) / Math.log(1.1));
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
    255, 0, 0, // color
    0, 0, 0 // position
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
  // console.log(
  //   [
  //     planet.name,
  //     planet.x,
  //     planet.y,
  //     planet.z,
  //     planet.orbitalDistance,
  //     planet.radius,
  //   ].map(((s) => (isNaN(s)) ? s : scaleDistance(s)))
  // );
  translate(planet.x, planet.y, planet.z);
  push();
  rotateZ(planet.rotationalAngle);
  box(planet.radius);
  pop();

  planet.children.forEach((moon) => {
    drawPlanets(moon);
  });

  pop();
}