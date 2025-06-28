import ObjetGraphique from "./ObjetGraphique.js";

// bonne pratique : une seule classe export�e par fichier et on l'exporte par 
// defaut
export default class Obstacle extends ObjetGraphique {
    constructor(x, y, l, h, couleur) {
        // Constructeur de la classe m�re
        super(x, y, l, h, couleur);
    }
}