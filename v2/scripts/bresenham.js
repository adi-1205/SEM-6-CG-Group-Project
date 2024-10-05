function drawBresenham(p1, p2, ctx, gridSize) {
    let x1 = p1.x, y1 = p1.y;
    let x2 = p2.x, y2 = p2.y;
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = (x1 < x2) ? 1 : -1;
    const sy = (y1 < y2) ? 1 : -1;
    let err = dx - dy;

    while (true) {
        ctx.fillStyle = 'green';
        ctx.fillRect(x1 * (canvas.width / gridSize), y1 * (canvas.height / gridSize), (canvas.width / gridSize), (canvas.height / gridSize));

        if (x1 === x2 && y1 === y2) break;
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
    }
}
