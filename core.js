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

    push();
    box();
    pop();

    // // Rotate rings in a half circle to create a sphere of cubes
    // for (let zAngle = 0; zAngle < 180; zAngle += 30) {
    //   // Rotate cubes in a full circle to create a ring of cubes
    //   for (let xAngle = 0; xAngle < 360; xAngle += 30) {
    //     push();

    //     // Rotate from center of sphere
    //     rotateZ(zAngle);
    //     rotateX(xAngle);

    //     // Then translate down 400 units
    //     translate(0, 400, 0);
    //     box();
    //     pop();
    //   }
    // }
}