import ObjectGraphique from "./ObjectGraphique.js";
export default class Enemy extends ObjectGraphique {
    constructor(x, y, rayon, couleur, speedX, speedY) {
        super(x, y, 2 * rayon, 2 * rayon, couleur)
        // les propriétés

        this.r = rayon;

        this.speedX = speedX;
        this.speedY = speedY;
    }
    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.y, this.r, 0, 2 * Math.PI);
        ctx.fillStyle = this.couleur;
        ctx.fill();
        ctx.restore();
    };
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    };
}