$(document).ready(function(){
    const canvas = $('#canvas')[0];
    const ctx = canvas.getContext('2d');
    canvas.width = 600;  
    canvas.height = 600;
    let gridSize = $('#grid-size').val();
    let gridSlider = $('#grid-size');
    let gridValue = $('#grid-size-value');
    let points = [];

    drawGrid(gridSize);
    
    gridSlider.on('input', function() {
        gridSize = gridSlider.val();
        gridValue.text(`${gridSize}x${gridSize}`);
        drawGrid(gridSize);
    });

    $(canvas).on('click', function(e) {
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

    $('#resetBtn').on('click', function() {
        points = [];
        drawGrid(gridSize);
        $('#ddaBtn').prop('disabled', true);
        $('#bresenhamBtn').prop('disabled', true);
        $('#antiAliasingBtn').prop('disabled', true);
        $(this).prop('disabled', true);
        $('#grid-size').prop('disabled', false);
    });

    $('#ddaBtn').on('click', function() {
        drawDDA(points[0], points[1], ctx, gridSize);
        $(this).prop('disabled', true);
        $('#bresenhamBtn').prop('disabled', true);
        $('#antiAliasingBtn').prop('disabled', false);
        $('#resetBtn').prop('disabled', false);
    });

    $('#bresenhamBtn').on('click', function() {
        drawBresenham(points[0], points[1], ctx, gridSize);
        $(this).prop('disabled', true);
        $('#ddaBtn').prop('disabled', true);
        $('#antiAliasingBtn').prop('disabled', false);
        $('#resetBtn').prop('disabled', false);
    });

    $('#antiAliasingBtn').on('click', function() {
        applyAntiAliasing(points[0], points[1], ctx, gridSize);
        $(this).prop('disabled', true);
    });

    $('button[data-bs-toggle="tab"]').on('click', function() {
        const tabId = $(this).attr('id');
        console.log(`Tab changed to: ${tabId}`);
    });

    function drawGrid(size) {
        const cellSize = canvas.width / size;
        clearCanvas();
        
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

    function clearCanvas(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
})