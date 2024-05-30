let allRectsArray = [];
let rotating = false; // Variable to track if rotation is active
let targetAngle = 0; // Target rotation angle
let easing = 0.01; // Easing factor for smooth animation

class rectangleManager {
  constructor(x, y, w, h, colour) {
    // Store initial properties
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.colour = colour;

    // Store initial state for resetting later
    this.initialX = x;
    this.initialY = y;
    this.initialW = w;
    this.initialH = h;
    this.initialColour = colour;
    
    this.rotateAngle = 0; // Initial rotation angle
  }

  display() {
    push();
    fill(this.colour);
    // Translate to the rectangle center and apply rotation
    translate(this.drawX + this.drawWidth / 2, this.drawY + this.drawHeight / 2);
    rotate(this.rotateAngle);
    // Draw the rectangle centered on the translation point
    rect(-this.drawWidth / 2, -this.drawHeight / 2, this.drawWidth, this.drawHeight);
    pop();
  }

  updateColour(colour) {
    this.colour = colour; // Update the rectangle's color
  }

  calculateDrawSize(widthScale, heightScale) {
    // Calculate the size and position of the rectangle based on the canvas size
    this.drawX = this.x * widthScale;
    this.drawY = this.y * heightScale;
    this.drawWidth = this.w * widthScale;
    this.drawHeight = this.h * heightScale;
  }

  rotate(angle) {
    this.rotateAngle += (angle - this.rotateAngle) * easing; // Apply easing to rotation
  }

  reset() {
    // Reset the rectangle to its initial properties
    this.x = this.initialX;
    this.y = this.initialY;
    this.w = this.initialW;
    this.h = this.initialH;
    this.colour = this.initialColour;
    this.rotateAngle = 0; // Reset rotation angle
    this.calculateDrawSize(windowWidth, windowHeight); // Recalculate size and position
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that fits the window
  angleMode(DEGREES); // Use degrees for rotation

  // Create rectangle objects based on the initial coordinates
  for (let i = 0; i < allRectsCoords.length; i++) {
    let newRect = new rectangleManager(allRectsCoords[i].x, allRectsCoords[i].y, allRectsCoords[i].w, allRectsCoords[i].h, allRectsCoords[i].colour);
    allRectsArray.push(newRect);
  }

  resizedRectangles(); // Initial size and position calculation
}

function draw() {
  background(30, 47, 97); // Clear the canvas with a background color
  noStroke(); // Disable stroke for shapes

  if (rotating) {
    targetAngle += 3; // Increment the target angle by 3 degrees per frame
  }

  for (let i = 0; i < allRectsArray.length; i++) {
    allRectsArray[i].rotate(targetAngle); // Apply easing rotation to each rectangle
  }

  // Display all rectangles
  for (let i = 0; i < allRectsArray.length; i++) {
    allRectsArray[i].display();
  }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Adjust canvas size
  resizedRectangles(); // Recalculate size and position for all rectangles
}

function resizedRectangles() {
  for (let i = 0; i < allRectsArray.length; i++) {
    allRectsArray[i].calculateDrawSize(windowWidth, windowHeight); // Adjust size and position for current canvas size
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    // Reset all rectangles if 'r' key is pressed
    for (let i = 0; i < allRectsArray.length; i++) {
      allRectsArray[i].reset();
    }
    targetAngle = 0; // Reset target angle
  }
}

function mousePressed() {
  rotating = true; // Start rotating when the mouse is pressed
}

function mouseReleased() {
  rotating = false; // Stop rotating when the mouse is released
}