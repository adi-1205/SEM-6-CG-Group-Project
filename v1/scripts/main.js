const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 600;  // Set canvas width
canvas.height = 600;  // Set canvas height
let gridSize = document.getElementById('gridSize').value;
let gridSlider = document.getElementById('gridSize');
let ddaBtn = document.getElementById('ddaBtn');
let bresenhamBtn = document.getElementById('bresenhamBtn');
let antiAliasingBtn = document.getElementById('antiAliasingBtn');
let resetBtn = document.getElementById('resetBtn');
let gridValue = document.getElementById('gridValue');

let points = [];
let isDrawing = false;

// Draw grid based on grid size
function drawGrid(size) {
    const cellSize = canvas.width / size;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

// Update grid size on slider change
gridSlider.addEventListener('input', () => {
    gridSize = gridSlider.value;
    gridValue.textContent = `${gridSize}x${gridSize}`;
    drawGrid(gridSize);
});

// Allow users to select two points on the grid
canvas.addEventListener('click', (e) => {
    if (points.length < 2) {
        const rect = canvas.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / (canvas.width / gridSize));
        const y = Math.floor((e.clientY - rect.top) / (canvas.height / gridSize));
        points.push({ x, y });

        // Mark selected points
        ctx.fillStyle = 'red';
        ctx.fillRect(x * (canvas.width / gridSize), y * (canvas.height / gridSize), (canvas.width / gridSize), (canvas.height / gridSize));

        // Enable buttons after two points are selected
        if (points.length === 2) {
            ddaBtn.disabled = false;
            bresenhamBtn.disabled = false;
            gridSlider.disabled = true;  // Disable grid slider
        }
    }
});

// Reset the grid
resetBtn.addEventListener('click', () => {
    points = [];
    drawGrid(gridSize);
    ddaBtn.disabled = true;
    bresenhamBtn.disabled = true;
    antiAliasingBtn.disabled = true;
    resetBtn.disabled = true;
    gridSlider.disabled = false;
});

// Event listeners for algorithm buttons
ddaBtn.addEventListener('click', () => {
    drawDDA(points[0], points[1], ctx, gridSize);
    ddaBtn.disabled = true;
    bresenhamBtn.disabled = true;
    antiAliasingBtn.disabled = false;
    resetBtn.disabled = false;
});

bresenhamBtn.addEventListener('click', () => {
    drawBresenham(points[0], points[1], ctx, gridSize);
    bresenhamBtn.disabled = true;
    ddaBtn.disabled = true;
    antiAliasingBtn.disabled = false;
    resetBtn.disabled = false;
});

antiAliasingBtn.addEventListener('click', () => {
    applyAntiAliasing(points[0], points[1], ctx, gridSize);
    antiAliasingBtn.disabled = true;
});
