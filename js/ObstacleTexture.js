import Obstacle from "./ObstacleClass.js";
// bonne pratique : une seule classe export�e par fichier et on l'exporte par 
// defaut
export default class ObstacleTexture extends Obstacle {
    constructor(x, y, l, h, url_texture) {
        // constructeur de la classe m�re
        super(x, y, l, h, 'black');

        // creer une texture et on l'affecte � la couleur
        this.image = new Image();
        this.image.onload = () => {
            this.ready = true;
        }

        this.image.src = url_texture;
    }

    draw(ctx) {
        if (this.ready) {
            // appeller la m�thode draw de la classe m�re
            this.texture = ctx.createPattern(this.image, 'repeat');
            this.couleur = this.texture;
            super.draw(ctx);
        }
    }
}