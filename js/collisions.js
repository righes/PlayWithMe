// Collisions between aligned rectangles 
function rectsOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
    if ((x1 > (x2 + w2)) || ((x1 + w1) < x2))
        return false;
    if ((y1 > (y2 + h2)) || ((y1 + h1) < y2))
        return false;
    return true;
}

function circleCollide(x1, y1, x2, y2, r2) {
    var dx = x1 - x2;
    var dy = y1 - y2;
}
unction circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}
export { rectsOverlap, circleCollide, circRectsOverlap }