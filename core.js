const canvasContainerId = 'canvas-container';
const canvasContainer = document.getElementById(canvasContainerId);

function getWindowDimensions() {
    return {
        width: document.body.clientWidth - 128 - 128,
        height: document.body.clientHeight - 32
    };
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

    strokeWeight(5);
    stroke(32, 8, 64);

    noFill();
}

/**
 * Called when window is resized
 */
function windowResized() {
    let { width, height } = getWindowDimensions();
    resizeCanvas(width, height);
}

/**
 * Called periodically according to framerate
 */
function draw() {
    background(250, 180, 200);
    frameRate(30);

    orbitControl(2, 2, 2);  // Allow use to move camera

    // Slowly rotate over time
    let angle = millis() * 0.001;
  
    // The axis of rotation will be the line
    // going through the center of the canvas
    // and the mouse
    let axis = createVector(
      0,
      0,
      100
    );
    
    ambientLight(20);
  
    pointLight(
      255, 0, 0, // color
      40, -40, 0 // position
    );
  
    directionalLight(
      0,255,0, // color
      1, 1, 0  // direction
    );
  
    // Visualize the axis
    strokeWeight(3);
    stroke('red');
    line(0, 0, 0, axis.x, axis.y, axis.z);
    stroke('blue');
    line(0, 0, 0, -axis.x, -axis.y, -axis.z);
  
    // Rotate a box about that axis
    lights();
    noStroke();
    rotate(angle, axis);
    box();
    
    push();
    translate(200,100,0);
    let moonAxis = createVector(
      0,
      0,
      10
    );
    rotate(angle, moonAxis);
    box();
    pop();
}