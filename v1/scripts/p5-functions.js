let shape; // For predefined shapes (square, rectangle, circle)
let customPoints = []; // To store points for the custom shape
let isDrawingCustomShape = false; // Track if the user is currently drawing a custom shape
let selectedShape = ""; // Declare the selectedShape variable
let centerX = 0; // Center X for rotation
let centerY = 0; // Center Y for rotation

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('canvasContainer');
    resetCanvas();

    // Mouse interactions for custom shape
    canvas.mousePressed(startCustomShape);
    canvas.mouseReleased(endCustomShape);
}

function resetCanvas() {
    clear();
    background(240);
    customPoints = [];
    isDrawingCustomShape = false;
}

function selectShape() {
    const shapeSelect = document.getElementById("shapes");
    selectedShape = shapeSelect.value; // Update selectedShape based on user selection
    drawShape(selectedShape); // Draw the shape based on selection
    toggleTransformButtons(false); // Disable buttons until a shape is drawn
}

function startCustomShape() {
    if (selectedShape === 'custom') {
        isDrawingCustomShape = true;
        customPoints.push(createVector(mouseX, mouseY)); // Start drawing a new custom shape
    }
}

function mouseDragged() {
    if (isDrawingCustomShape && selectedShape === 'custom') {
        customPoints.push(createVector(mouseX, mouseY)); // Capture the mouse position
        resetCanvas();
        drawCustomShape(); // Draw custom shape as the user drags the mouse
    }
}

function endCustomShape() {
    if (isDrawingCustomShape) {
        isDrawingCustomShape = false; // Finish drawing the custom shape
        toggleTransformButtons(true); // Enable transformation buttons
    }
}

function drawCustomShape() {
    if (customPoints.length < 2) return; // At least two points are needed to draw
    beginShape();
    for (let pt of customPoints) {
        vertex(pt.x, pt.y); // Create a vertex for each point
    }
    endShape(CLOSE); // Close the shape
}

// Update the drawShape function to handle custom shape drawing
function drawShape(shapeType) {
    resetCanvas(); // Clear canvas before drawing new shape
    switch (shapeType) {
        case 'square':
            shape = { type: 'square', x: width / 2 - 50, y: height / 2 - 50, size: 100 };
            rect(shape.x, shape.y, shape.size, shape.size);
            break;
        case 'rectangle':
            shape = { type: 'rectangle', x: width / 2 - 75, y: height / 2 - 50, width: 150, height: 100 };
            rect(shape.x, shape.y, shape.width, shape.height);
            break;
        case 'circle':
            shape = { type: 'circle', x: width / 2, y: height / 2, size: 100 };
            ellipse(shape.x, shape.y, shape.size);
            break;
        case 'custom':
            drawCustomShape(); // Draw the custom shape if selected
            break;
    }
}

function toggleTransformButtons(enable) {
    document.getElementById('rotateBtn').disabled = !enable;
    document.getElementById('scaleBtn').disabled = !enable;
    document.getElementById('scaleDownBtn').disabled = !enable;
    document.getElementById('translateBtn').disabled = !enable;
}

function rotateShape() {
    if (selectedShape === 'custom' && customPoints.length > 0) {
        // Compute the center of the custom shape for rotation
        centerX = (customPoints[0].x + customPoints[customPoints.length - 1].x) / 2;
        centerY = (customPoints[0].y + customPoints[customPoints.length - 1].y) / 2;
        resetCanvas();
        translate(centerX, centerY); // Move origin to the center of the shape
        rotate(radians(15)); // Rotate 15 degrees
        drawCustomShape(); // Draw the rotated custom shape
    } else {
        alert('Please select a custom shape and draw it first!'); // Alert if no custom shape is drawn
    }
}

function scaleShape(factor) {
    if (selectedShape === 'custom' && customPoints.length > 0) {
        for (let pt of customPoints) {
            pt.x *= factor; // Scale X position
            pt.y *= factor; // Scale Y position
        }
        resetCanvas();
        drawCustomShape(); // Redraw the scaled shape
    } else {
        alert('Please select a custom shape and draw it first!'); // Alert if no custom shape is drawn
    }
}

function translateShape() {
    if (selectedShape === 'custom' && customPoints.length > 0) {
        const translationX = 10; // Move right by 10px
        for (let pt of customPoints) {
            pt.x += translationX; // Translate each point
        }
        resetCanvas();
        drawCustomShape(); // Redraw the translated shape
    } else {
        alert('Please select a custom shape and draw it first!'); // Alert if no custom shape is drawn
    }
}
