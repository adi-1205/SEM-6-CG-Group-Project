let shape;
let shapeType;
let scaleValue = 1;
let angle = 0;
let translateX = 0;
let translateY = 0;

function setup() {
    const canvas = createCanvas(400, 400);
    canvas.parent('canvasContainer');
    background(255);
}

function draw() {
    background(255);
    translate(width / 2 + translateX, height / 2 + translateY);
    rotate(angle);
    scale(scaleValue);

    if (shapeType === 'square') {
        rectMode(CENTER);
        rect(0, 0, 100, 100);
    } else if (shapeType === 'circle') {
        ellipse(0, 0, 100, 100);
    } else if (shapeType === 'rectangle') {
        rectMode(CENTER);
        rect(0, 0, 150, 100);
    }
}

document.getElementById('shapeSelector').addEventListener('change', (event) => {
    shapeType = event.target.value;
    resetTransformations();
});

document.getElementById('scalePlus').addEventListener('click', () => {
    scaleValue += 0.1;
});

document.getElementById('scaleMinus').addEventListener('click', () => {
    scaleValue = max(0, scaleValue - 0.1); // prevent negative scaling
});

document.getElementById('rotatePlus').addEventListener('click', () => {
    angle += radians(10);
});

document.getElementById('rotateMinus').addEventListener('click', () => {
    angle -= radians(10);
});

document.getElementById('translateXPlus').addEventListener('click', () => {
    translateX += 10;
});

document.getElementById('translateXMinus').addEventListener('click', () => {
    translateX -= 10;
});

document.getElementById('translateYPlus').addEventListener('click', () => {
    translateY -= 10; // up is negative on the canvas
});

document.getElementById('translateYMinus').addEventListener('click', () => {
    translateY += 10; // down is positive on the canvas
});

document.getElementById('reset').addEventListener('click', () => {
    resetTransformations();
});

function resetTransformations() {
    scaleValue = 1;
    angle = 0;
    translateX = 0;
    translateY = 0;
    document.getElementById('scalePlus').disabled = !shapeType;
    document.getElementById('scaleMinus').disabled = !shapeType;
    document.getElementById('rotatePlus').disabled = !shapeType;
    document.getElementById('rotateMinus').disabled = !shapeType;
    document.getElementById('translateXPlus').disabled = !shapeType;
    document.getElementById('translateXMinus').disabled = !shapeType;
    document.getElementById('translateYPlus').disabled = !shapeType;
    document.getElementById('translateYMinus').disabled = !shapeType;
    if (shapeType) {
        draw();
    }
}
