function applyAntiAliasing(p1, p2, ctx, gridSize) {
    function plot(x, y, c) {
        ctx.fillStyle = `rgba(255, 0, 0, ${c})`;  // Apply intensity based on anti-aliasing
        ctx.fillRect(Math.round(x) * (canvas.width / gridSize), Math.round(y) * (canvas.height / gridSize), (canvas.width / gridSize), (canvas.height / gridSize));
    }

    function fPart(x) {
        return x - Math.floor(x);
    }

    function rfPart(x) {
        return 1 - fPart(x);
    }

    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const gradient = dy / dx;

    let xEnd = Math.round(p1.x);
    let yEnd = p1.y + gradient * (xEnd - p1.x);
    let xGap = rfPart(p1.x + 0.5);
    let x = xEnd;
    let y = yEnd;

    plot(x, Math.floor(y), rfPart(y) * xGap);
    plot(x, Math.floor(y) + 1, fPart(y) * xGap);

    for (x = x + 1; x < p2.x; x++) {
        plot(x, Math.floor(y), rfPart(y));
        plot(x, Math.floor(y) + 1, fPart(y));
        y += gradient;
    }
}
