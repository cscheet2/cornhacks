const canvasContainerId = 'canvas-container';
const canvasContainer = document.getElementById(canvasContainerId);

const FRAME_RATE = 60;
const TIME_SCALER = 250;

var root = {
  "name": "The Sun",
  "orbitalDistance": 0,
  "orbitalPeriod": 0,
  "rotationalPeriod": 27, 
  "radius": 6.96e5,
  "children": [
    {
      "name": "Mercury",
      "orbitalDistance": 5.79e7,
      "orbitalPeriod": 88,
      "rotationalPeriod": 58.646,  
      "radius": 2.4397e3,
      "children": []
    },
    {
      "name": "Venus",
      "orbitalDistance": 1.082e8,
      "orbitalPeriod": 224,
      "rotationalPeriod": -243.025, 
      "radius": 6.0518e3,
      "children": []
    },
    {
      "name": "Earth",
      "orbitalDistance": 1.496e8,
      "orbitalPeriod": 365.256,
      "rotationalPeriod": 0.997,  
      "radius": 6.371e3,
      "children": [
        {
          "name": "The Moon",
          "orbitalDistance": 3.844e5,
          "orbitalPeriod": 27.322,
          "rotationalPeriod": 27.322,  
          "radius": 1.7374e3
        }
      ]
    },
    {
      "name": "Mars",
      "orbitalDistance": 2.279e8,
      "orbitalPeriod": 686.971,
      "rotationalPeriod": 1.026, 
      "radius": 3.3895e3,
      "children": [
        {
          "name": "Phobos",
          "orbitalDistance": 9.377e3,
          "orbitalPeriod": 0.3189,
          "rotationalPeriod": 0.3189,
          "radius": 11.267
        },
        {
          "name": "Deimos",
          "orbitalDistance": 2.3459e4,
          "orbitalPeriod": 1.2624,
          "rotationalPeriod": 1.2624,
          "radius": 6.2
        }
      ]
    },
    {
      "name": "Jupiter",
      "orbitalDistance": 7.785e8,
      "orbitalPeriod": 4332.82,
      "rotationalPeriod": 0.414,  
      "radius": 6.9911e4,
      "children": [
        {"name": "Io", "orbitalDistance": 4.217e5, "orbitalPeriod": 1.769, "rotationalPeriod": 1.769, "radius": 1.8216e3},
        {"name": "Europa", "orbitalDistance": 6.711e5, "orbitalPeriod": 3.551, "rotationalPeriod": 3.551, "radius": 1.5608e3},
        {"name": "Ganymede", "orbitalDistance": 1.0704e6, "orbitalPeriod": 7.155, "rotationalPeriod": 7.155, "radius": 2.6341e3},
        {"name": "Callisto", "orbitalDistance": 1.883e6, "orbitalPeriod": 16.689, "rotationalPeriod": 16.689, "radius": 2.4103e3},
      ]
    },
    {
      "name": "Saturn",
      "orbitalDistance": 1.429e9,
      "orbitalPeriod": 10759.22,
      "rotationalPeriod": 0.444,
      "radius": 5.8232e4,
      "children": [
        {"name": "Mimas", "orbitalDistance": 1.8554e5, "orbitalPeriod": 0.942, "rotationalPeriod": 0.942, "radius": 198.3},
        {"name": "Enceladus", "orbitalDistance": 2.3802e5, "orbitalPeriod": 1.370, "rotationalPeriod": 1.370, "radius": 252.1},
        {"name": "Tethys", "orbitalDistance": 2.9466e5, "orbitalPeriod": 1.888, "rotationalPeriod": 1.888, "radius": 533},
        {"name": "Dione", "orbitalDistance": 3.7742e5, "orbitalPeriod": 2.737, "rotationalPeriod": 2.737, "radius": 561.4},
        {"name": "Rhea", "orbitalDistance": 5.2704e5, "orbitalPeriod": 4.518, "rotationalPeriod": 4.518, "radius": 763.8},
        {"name": "Titan", "orbitalDistance": 1.2218e6, "orbitalPeriod": 15.945, "rotationalPeriod": 15.945, "radius": 2.5747e3},
        {"name": "Iapetus", "orbitalDistance": 3.5608e6, "orbitalPeriod": 79.33, "rotationalPeriod": 79.33, "radius": 734.5}
      ]
    },
    {
      "name": "Uranus",
      "orbitalDistance": 2.871e9,
      "orbitalPeriod": 30687.15,
      "rotationalPeriod": -0.718, 
      "radius": 2.5362e4,
      "children": [
        {"name": "Miranda", "orbitalDistance": 1.299e5, "orbitalPeriod": 1.413, "rotationalPeriod": 1.413, "radius": 235.8},
        {"name": "Ariel", "orbitalDistance": 1.909e5, "orbitalPeriod": 2.520, "rotationalPeriod": 2.520, "radius": 578.9},
        {"name": "Umbriel", "orbitalDistance": 2.66e5, "orbitalPeriod": 4.144, "rotationalPeriod": 4.144, "radius": 584.7},
        {"name": "Titania", "orbitalDistance": 4.363e5, "orbitalPeriod": 8.706, "rotationalPeriod": 8.706, "radius": 788.9},
        {"name": "Oberon", "orbitalDistance": 5.835e5, "orbitalPeriod": 13.46, "rotationalPeriod": 13.46, "radius": 761.4}
      ]
    },
    {
      "name": "Neptune",
      "orbitalDistance": 4.498e9,
      "orbitalPeriod": 60190.03,
      "rotationalPeriod": 0.671, 
      "radius": 2.4622e4,
      "children": [
        {"name": "Triton", "orbitalDistance": 3.5476e5, "orbitalPeriod": 5.877, "rotationalPeriod": 5.877, "radius": 1.3534e3},
        {"name": "Proteus", "orbitalDistance": 1.176e5, "orbitalPeriod": 1.122, "rotationalPeriod": 1.122, "radius": 210}
      ]
    },
    {
      "name": "Pluto",
      "orbitalDistance": 5.906e9,
      "orbitalPeriod": 90553,  
      "rotationalPeriod": -6.387,  
      "radius": 1.1883e3,
      "children": [
        {"name": "Charon", "orbitalDistance": 1.96e4, "orbitalPeriod": 6.387, "rotationalPeriod": 6.387, "radius": 606},
        {"name": "Styx", "orbitalDistance": 4.26e4, "orbitalPeriod": 20.16, "rotationalPeriod": 20.16, "radius": 16},
        {"name": "Nix", "orbitalDistance": 4.86e4, "orbitalPeriod": 24.85, "rotationalPeriod": 24.85, "radius": 49.8},
        {"name": "Kerberos", "orbitalDistance": 5.8e4, "orbitalPeriod": 32.17, "rotationalPeriod": 32.17, "radius": 19},
        {"name": "Hydra", "orbitalDistance": 6.46e4, "orbitalPeriod": 38.20, "rotationalPeriod": 38.20, "radius": 40.7}
      ]
    }
  ]
};

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