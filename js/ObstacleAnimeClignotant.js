import ObstacleAnime from './ObstacleAnime.js';
export default class ObstacleAnimeClignotant extends ObstacleAnime {
    constructor(x, y, l, h, couleur, vy) {
        super(x, y, l, h, couleur, vy);
        setInterval(() => {
            if (this.couleur === 'red')
                this.couleur = 'blue';
            else
                this.couleur = 'red';
        }, 500)
    }
    draw(ctx) {
        super.draw(ctx);
    }
}
