function drawDDA(p1, p2, ctx, gridSize) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const steps = Math.max(Math.abs(dx), Math.abs(dy));
    const xIncrement = dx / steps;
    const yIncrement = dy / steps;

    let x = p1.x;
    let y = p1.y;

    for (let i = 0; i <= steps; i++) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(Math.round(x) * (canvas.width / gridSize), Math.round(y) * (canvas.height / gridSize), (canvas.width / gridSize), (canvas.height / gridSize));
        x += xIncrement;
        y += yIncrement;
    }
}
