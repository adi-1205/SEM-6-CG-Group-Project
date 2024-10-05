let shapeType;
let scaleValue = 1;
let angleX = 0;
let angleY = 0;
let angleZ = 0;
let translateX = 0;
let translateY = 0;
let translateZ = 0;

function setup() {
    const canvas = createCanvas(400, 400, WEBGL);
    canvas.parent('canvasContainer');
    background(200);
}

function draw() {
    background(200);
    translate(translateX, translateY, translateZ);
    rotateX(angleX);
    rotateY(angleY);
    rotateZ(angleZ);
    scale(scaleValue);

    if (shapeType === 'box') {
        box(100);
    } else if (shapeType === 'sphere') {
        sphere(50);
    } else if (shapeType === 'cylinder') {
        cylinder(50, 100);
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

document.getElementById('rotateXPlus').addEventListener('click', () => {
    angleX += radians(10);
});

document.getElementById('rotateXMinus').addEventListener('click', () => {
    angleX -= radians(10);
});

document.getElementById('rotateYPlus').addEventListener('click', () => {
    angleY += radians(10);
});

document.getElementById('rotateYMinus').addEventListener('click', () => {
    angleY -= radians(10);
});

document.getElementById('rotateZPlus').addEventListener('click', () => {
    angleZ += radians(10);
});

document.getElementById('rotateZMinus').addEventListener('click', () => {
    angleZ -= radians(10);
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

document.getElementById('translateZPlus').addEventListener('click', () => {
    translateZ += 10;
});

document.getElementById('translateZMinus').addEventListener('click', () => {
    translateZ -= 10;
});

document.getElementById('reset').addEventListener('click', () => {
    resetTransformations();
});

function resetTransformations() {
    scaleValue = 1;
    angleX = 0;
    angleY = 0;
    angleZ = 0;
    translateX = 0;
    translateY = 0;
    translateZ = 0;
    document.getElementById('scalePlus').disabled = !shapeType;
    document.getElementById('scaleMinus').disabled = !shapeType;
    document.getElementById('rotateXPlus').disabled = !shapeType;
    document.getElementById('rotateXMinus').disabled = !shapeType;
    document.getElementById('rotateYPlus').disabled = !shapeType;
    document.getElementById('rotateYMinus').disabled = !shapeType;
    document.getElementById('rotateZPlus').disabled = !shapeType;
    document.getElementById('rotateZMinus').disabled = !shapeType;
    document.getElementById('translateXPlus').disabled = !shapeType;
    document.getElementById('translateXMinus').disabled = !shapeType;
    document.getElementById('translateYPlus').disabled = !shapeType;
    document.getElementById('translateYMinus').disabled = !shapeType;
    document.getElementById('translateZPlus').disabled = !shapeType;
    document.getElementById('translateZMinus').disabled = !shapeType;
    
    if (shapeType) {
        draw();
    }
}
