export default class ObjectGraphique {
    constructor(x, y, l, h, couleur) {
        this.x = x;
        this.y = y;
        this.l = l;
        this.h = h;
        this.couleur = couleur;
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.l, this.h);
        ctx.restore();
    }
    drawBoundingBox(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.strokeRect(0, 0, this.l, this.h);
        ctx.restore();
    }
}