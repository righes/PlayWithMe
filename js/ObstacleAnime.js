import Obstacle from './ObstacleClass.js';

// bonne pratique : une seule classe export�e par fichier et on l'exporte par 
// defaut
export default class ObstacleAnime extends Obstacle {
    constructor(x, y, l, h, couleur, vy) {
        // appeller le constructeur de la classe m�re
        super(x, y, l, h, couleur);
        this.vy = -vy;
    }
    // h�riter de la m�thode draw(ctx)
    draw(ctx) {
        this.y += this.vy;
        // collision en bas
        if (this.y + this.h > ctx.canvas.height) {
            // Obstacle au point de contact
            this.y = ctx.canvas.height - this.h;
            // Inverser la vitesse
            this.vy = -this.vy;
        }
        // Collision en haut
        if (this.y < 0) {
            // Obstacle au point de contact
            this.y = 0;
            // inverser la vitesse
            this.vy = -this.vy;
        }

        // Appeller la m�thode draw de la classe m�re
        super.draw(ctx);
    }

}
