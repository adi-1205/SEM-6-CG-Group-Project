// line algorithms setup
$(document).ready(function () {
    const canvas = $('#canvas')[0];
    const ctx = canvas.getContext('2d');
    canvas.width = 600;
    canvas.height = 600;
    let gridSize = $('#grid-size').val();
    let gridSlider = $('#grid-size');
    let gridValue = $('#grid-size-value');
    let points = [];

    drawGrid(gridSize);

    gridSlider.on('input', function () {
        gridSize = gridSlider.val();
        gridValue.text(`${gridSize}x${gridSize}`);
        drawGrid(gridSize);
    });

    $(canvas).on('click', function (e) {
        if (points.length < 2) {
            const rect = canvas.getBoundingClientRect();
            const x = Math.floor((e.clientX - rect.left) / (canvas.width / gridSize));
            const y = Math.floor((e.clientY - rect.top) / (canvas.height / gridSize));
            points.push({ x, y });

            ctx.fillStyle = 'red';
            ctx.fillRect(x * (canvas.width / gridSize), y * (canvas.height / gridSize), (canvas.width / gridSize), (canvas.height / gridSize));

            if (points.length === 2) {
                ddaBtn.disabled = false;
                bresenhamBtn.disabled = false;
                gridSlider.disabled = true;
            }
        }
    });

    $('#resetBtn').on('click', function () {
        points = [];
        $('#ddaBtn').prop('disabled', true);
        $('#bresenhamBtn').prop('disabled', true);
        $('#antiAliasingBtn').prop('disabled', true);
        $(this).prop('disabled', true);
        $('#grid-size').prop('disabled', false);
        $('#show-grid-lines').prop('checked', true);
        drawGrid(gridSize);
    });

    $('#ddaBtn').on('click', function () {
        drawDDA(points[0], points[1], ctx, gridSize);
        $(this).prop('disabled', true);
        $('#bresenhamBtn').prop('disabled', true);
        $('#antiAliasingBtn').prop('disabled', false);
        $('#resetBtn').prop('disabled', false);
    });

    $('#bresenhamBtn').on('click', function () {
        drawBresenham(points[0], points[1], ctx, gridSize);
        $(this).prop('disabled', true);
        $('#ddaBtn').prop('disabled', true);
        $('#antiAliasingBtn').prop('disabled', false);
        $('#resetBtn').prop('disabled', false);
    });

    $('#antiAliasingBtn').on('click', function () {
        applyAntiAliasing(points[0], points[1], ctx, gridSize);
        $(this).prop('disabled', true);
    });

    $('button[data-bs-toggle="tab"]').on('click', function () {
        const tabId = $(this).attr('id');
        $('.settings').addClass('d-none');
        $(`#${tabId}-settings`).removeClass('d-none');
        switch (tabId) {
            case 'line-tab':
                initLineTab();
                break;
            case 'shape-tab':
                initShapeTab();
                break;
            case 'shape-3d-tab':
                initShape3dTab();
                break;
        }
    });

    $('#show-grid-lines').change(function () {
        if ($(this).is(':checked')) {
            drawGrid(gridSize);
        } else {
            clearCanvas();
        }
        for (let point of points) {
            ctx.fillStyle = 'red';
            ctx.fillRect(point.x * (canvas.width / gridSize), point.y * (canvas.height / gridSize), (canvas.width / gridSize), (canvas.height / gridSize));
        }
    });

    function drawGrid(size) {
        const cellSize = canvas.width / size;
        clearCanvas();

        if (!$('#show-grid-lines').is(':checked'))
            return;

        for (let i = 0; i <= size; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(canvas.width, i * cellSize);
            ctx.stroke();
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function initLineTab() {
        drawGrid(gridSize);
    }

    function initShapeTab() {
        clearCanvas();
    }

    function initShape3dTab() {
        clearCanvas();
    }
})

// 2d shape and transformations setup
const sketch = (p) => {
    let shapeType;
    let scaleValue = 1;
    let angle = 0;
    let translateX = 0;
    let translateY = 0;

    p.setup = () => {
        const canvas2d = p.createCanvas(600, 600);
        canvas2d.parent('canvas-2d');
        p.background(255);
    };

    p.draw = () => {
        p.background(255);
        p.translate(p.width / 2 + translateX, p.height / 2 + translateY);
        p.rotate(angle);
        p.scale(scaleValue);

        if (shapeType === 'square') {
            p.rectMode(p.CENTER);
            p.rect(0, 0, 100, 100);
        } else if (shapeType === 'circle') {
            p.ellipse(0, 0, 100, 100);
        } else if (shapeType === 'rectangle') {
            p.rectMode(p.CENTER);
            p.rect(0, 0, 150, 100);
        }
    };

    p.resetTransformations = () => {
        scaleValue = 1;
        angle = 0;
        translateX = 0;
        translateY = 0;

        const isShapeSelected = shapeType !== undefined;

        $('#scalePlus').prop('disabled', !isShapeSelected);
        $('#scaleMinus').prop('disabled', !isShapeSelected);
        $('#rotatePlus').prop('disabled', !isShapeSelected);
        $('#rotateMinus').prop('disabled', !isShapeSelected);
        $('#translateXPlus').prop('disabled', !isShapeSelected);
        $('#translateXMinus').prop('disabled', !isShapeSelected);
        $('#translateYPlus').prop('disabled', !isShapeSelected);
        $('#translateYMinus').prop('disabled', !isShapeSelected);

        if (isShapeSelected) {
            p.draw();
        }
    };

    $(document).ready(function () {
        $('#shapeSelector').change(function () {
            shapeType = $(this).val();
            p.resetTransformations();
        });

        $('#scalePlus').click(function () {
            scaleValue += 0.1;
        });

        $('#scaleMinus').click(function () {
            scaleValue = Math.max(0, scaleValue - 0.1); // prevent negative scaling
        });

        $('#rotatePlus').click(function () {
            angle += p.radians(10);
        });

        $('#rotateMinus').click(function () {
            angle -= p.radians(10);
        });

        $('#translateXPlus').click(function () {
            translateX += 10;
        });

        $('#translateXMinus').click(function () {
            translateX -= 10;
        });

        $('#translateYPlus').click(function () {
            translateY -= 10; // up is negative on the canvas
        });

        $('#translateYMinus').click(function () {
            translateY += 10; // down is positive on the canvas
        });

        $('#reset').click(function () {
            p.resetTransformations();
        });
    });
};

// 3d shape and transformations setup
const sketch3d = (p) => {
    let shapeType;
    let scaleValue = 1;
    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    let translateX = 0;
    let translateY = 0;
    let translateZ = 0;

    p.setup = () => {
        const canvas = p.createCanvas(600, 600, p.WEBGL);
        canvas.parent('canvas-3d');
        p.background(200);
    };

    p.draw = () => {
        p.background(200);
        p.translate(translateX, translateY, translateZ);
        p.rotateX(angleX);
        p.rotateY(angleY);
        p.rotateZ(angleZ);
        p.scale(scaleValue);

        if (shapeType === 'box') {
            p.box(100);
        } else if (shapeType === 'sphere') {
            p.sphere(50);
        } else if (shapeType === 'cylinder') {
            p.cylinder(50, 100);
        }
    };

    $(document).ready(function() {
        $('#shapeSelector3d').on('change', (event) => {
            shapeType = event.target.value;
            resetTransformations();
        });

        $('#scalePlus3d').on('click', () => {
            scaleValue += 0.1;
        });

        $('#scaleMinus3d').on('click', () => {
            scaleValue = Math.max(0, scaleValue - 0.1);
        });

        $('#rotateXPlus3d').on('click', () => {
            angleX += p.radians(10);
        });

        $('#rotateXMinus3d').on('click', () => {
            angleX -= p.radians(10);
        });

        $('#rotateYPlus3d').on('click', () => {
            angleY += p.radians(10);
        });

        $('#rotateYMinus3d').on('click', () => {
            angleY -= p.radians(10);
        });

        $('#rotateZPlus3d').on('click', () => {
            angleZ += p.radians(10);
        });

        $('#rotateZMinus3d').on('click', () => {
            angleZ -= p.radians(10);
        });

        $('#translateXPlus3d').on('click', () => {
            translateX += 10;
        });

        $('#translateXMinus3d').on('click', () => {
            translateX -= 10;
        });

        $('#translateYPlus3d').on('click', () => {
            translateY -= 10; 
        });

        $('#translateYMinus3d').on('click', () => {
            translateY += 10; 
        });

        $('#translateZPlus3d').on('click', () => {
            translateZ += 10;
        });

        $('#translateZMinus3d').on('click', () => {
            translateZ -= 10;
        });

        $('#reset3d').on('click', () => {
            resetTransformations();
        });
    });

    function resetTransformations() {
        scaleValue = 1;
        angleX = 0;
        angleY = 0;
        angleZ = 0;
        translateX = 0;
        translateY = 0;
        translateZ = 0;

        const isShapeSelected = !!shapeType;
        $('#scalePlus3d').prop('disabled', !isShapeSelected);
        $('#scaleMinus3d').prop('disabled', !isShapeSelected);
        $('#rotateXPlus3d').prop('disabled', !isShapeSelected);
        $('#rotateXMinus3d').prop('disabled', !isShapeSelected);
        $('#rotateYPlus3d').prop('disabled', !isShapeSelected);
        $('#rotateYMinus3d').prop('disabled', !isShapeSelected);
        $('#rotateZPlus3d').prop('disabled', !isShapeSelected);
        $('#rotateZMinus3d').prop('disabled', !isShapeSelected);
        $('#translateXPlus3d').prop('disabled', !isShapeSelected);
        $('#translateXMinus3d').prop('disabled', !isShapeSelected);
        $('#translateYPlus3d').prop('disabled', !isShapeSelected);
        $('#translateYMinus3d').prop('disabled', !isShapeSelected);
        $('#translateZPlus3d').prop('disabled', !isShapeSelected);
        $('#translateZMinus3d').prop('disabled', !isShapeSelected);

        if (isShapeSelected) {
            p.draw();
        }
    }
};

new p5(sketch3d);
new p5(sketch);