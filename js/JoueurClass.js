import ObjetGraphique from "./ObjetGraphique.js";

export default class Joueur extends ObjetGraphique {


    constructor(x, y, l, h, sprite, nbVies) {
        // call le constructeur de la classe m�re
        // pour initialiser les propri�t�s h�rit�es
        super(x, y, l, h, 'black');
        this.sprite = sprite;
        // initialiser les propri�t�s propres � la classe Joueur
        this.nbVies = nbVies;
        this.vx = 0;
        this.vy = 0;
        this.vysaut = 5;
        this.ay = 0.1;
        this.etat = "deplacementNormal";

        //this.video = document.querySelector('#sourcevid');

    }
    // redefine la m�thode h�rit�e draw(ctx)
    draw(ctx) {
        //if(!this.ready) return;

        // bonne pratique : si je change le contexte (position du rep�re, couleur, ombre, etc.)
        // sauvegarder le contexte avant de le modifier et
        // restaurer � la fin de la fonction
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.drawImage(this.sprite, 0, 0);
        //ctx.drawImage(this.video, 0, 0, this.l, this.h);
        /*
        ctx.fillStyle = this.couleur;
        ctx.fillRect(0, 0, this.l, this.h);
        // on dessine les yeux
        ctx.fillStyle = 'yellow';
        ctx.fillRect(5, 5, 10, 10);
        ctx.fillRect(32, 5, 10, 10);
        // bouche
        ctx.fillRect(15, 30, 20, 10);
        this.dessineCorps(ctx);
        */

        ctx.restore();
    }
    dessineCorps(ctx) {
        ctx.save();
        ctx.translate(0, 50);
        ctx.fillStyle = 'blue';
        ctx.fillRect(12, 0, 25, 30);
        ctx.restore();
    }
    move() {
        switch (this.etat) {
            case "sautEnCours":
                this.hauteurSaut += this.vysaut;
                this.y -= this.vysaut;
                this.vysaut -= this.ay;

                if (this.y > this.yAvantSaut) {
                    this.etat = 'deplacementNormal';
                    // Fin du saut on remet les valeurs initiales
                    this.y = this.yAvantSaut;
                    this.vysaut = 5;
                    this.ay = 0.1;
                }

                break;

            case "deplacementNormal":
                this.x += this.vx;
                this.y += this.vy;
                break
        }
    }

    saute() {
        if (this.etat !== 'sautEnCours') {
            this.yAvantSaut = this.y;
            this.hauteurSaut = 0;
            this.y = this.yAvantSaut;
            this.vysaut = 5;
            this.ay = 0.1;
            this.etat = 'sautEnCours';
        }
    }

    followMouse(mousePos) {
        this.x = mousePos.x - this.l / 2;
        this.y = mousePos.y - this.h / 2;
    }

    testeCollisionAvecBordsDuCanvas(largeurCanvas, hauteurCanvas) {
        if (this.x + this.l > largeurCanvas) {
            // positionner le joueur � la limite du canvas, au point de contact
            this.x = largeurCanvas - this.l;
            this.vitesse = -this.vitesse;
        }
        if (this.x < 0) {
            // positionner le joueur � la limite du canvas, au point de contact
            this.x = 0;
            this.vitesse = -this.vitesse;
        }
    }
}