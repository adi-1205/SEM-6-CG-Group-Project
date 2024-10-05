const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.height;

$(document).ready(function() {
    $('#grid-size').on('input', function() {
        $('#grid-size-span').text($(this).val());
        drawGrid($(this).val());
    });

    
});

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