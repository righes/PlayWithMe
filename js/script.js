import Joueur from './JoueurClasse.js';
import Obstacle from './ObstacleClass.js';
import ObstacleAnime from './ObstacleAnime.js';
import ObstacleAnimeClignotant from './ObstacleAnimeClignotant.js';
import ObstacleTexture from './ObstacleTexture.js';
import { ajouteEcouteurSouris, ajouteEcouteursClavier, inputState, mousePos } from './ecouteurs.js';
import { circRectsOverlap, rectsOverlap } from './collisions.js';
import { loadAssets } from './assets.js';
import Sortie from './Sortie.js';
import Balle from './Ball.js';
import Enemy from './Enemy.js';

import { tabNiveaux } from './levels.js';
import Timer from './Timer.js';

let canvas, ctx;
let gameState = 'menuStart';
let isPaused = false; // Pause

let timer;
let joueur, sortie, luk;
let niveau = 0;
let tableauDesObjetsGraphiques = [];
let assets;
let w, h;
let score = 0;
let vie = 3;

// Les balles
let tableauDesBalles = [];
let tableauDesObstacles = [];
// Enemis
let tableauDesEnemies = [];



var assetsToLoadURLs = {
    joueur: { url: './assets/images/isfanja.png' }, // http://www.clipartlord.com/category/weather-clip-art/winter-clip-art/
    backgroundImage: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/images/background.png' }, // http://www.clipartlord.com/category/weather-clip-art/winter-clip-art/
    plop: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/plop.mp3', buffer: false, loop: false, volume: 1.0 },
    victory: { url: './assets/audio/victory.wav', buffer: false, loop: false, volume: 1.0 },
    humbug: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/humbug.mp3', buffer: true, loop: true, volume: 0.5 },
    concertino: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/christmas_concertino.mp3', buffer: true, loop: true, volume: 1.0 },
    xmas: { url: 'https://mainline.i3s.unice.fr/mooc/SkywardBound/assets/sounds/xmas.mp3', buffer: true, loop: true, volume: 0.6 },
    backinblack: { url: './assets/audio/backinblack.m4a', buffer: true, loop: true, volume: 0.5 },
    songsong: { url: './assets/audio/PianoLoop.wav', buffer: true, loop: true, volume: 0.2 },
    dar: { url: './assets/images/house.png' }, // http://www.clipartlord.com/category/weather-clip-art/winter-clip-art/
    fish: { url: './assets/images/fish.png' },
    dutch: { url: './assets/images/dutchman.png' },
    evilaugh: { url: './assets/audio/laugh.wav', buffer: true, loop: true, volume: 0.5 },
};

// Bonne pratique : on attend que la page soit charg�e
// avant de faire quoi que ce soit
window.onload = init;

function init(event) {
    console.log("Page charg�e et les �l�ments HTML sont pr�ts � �tre manipul�s");
    canvas = document.querySelector('#myCanvas');
    //console.log(canvas);
    // pour dessiner, on utilise le contexte 2D
    ctx = canvas.getContext('2d');
    w = canvas.width;
    h = canvas.height;
    // chargement des assets (musique,  images, sons)
    loadAssets(assetsToLoadURLs, startGame);

    startGame();

    // Ajout d'un ecouteur de Pause 
    document.addEventListener('keydown', (event) => {
        console.log('touche Press�e : ${event.key}'); // out quelle touche pressed
        if (event.key === 'p' || event.key === 'P') {
            isPaused = !isPaused; // bascule entre pause et restart
            if (!isPaused) {
                console.log("Jeu en pause !");
                // on met le jeu en pause
                animationLoop(); // reprendre la boucle si elle �tait en pause 
                // gameState = 'menuPause';
                // assets.humbug.play();
            }
            // else {
            //     gameState = 'jeuEnCours';
            //     assets.humbug.stop();
            // }
        }
    });



}

function startGame(assetsLoaded) {
    assets = assetsLoaded;
    timer = new Timer("decompte");

    //backgrtoun music
    assets.songsong.play();
    // appel�e quand tous les assets sont charg�s
    console.log("StartGame : tous les assets sont charg�s");
    //assets.backinblack.play();

    // On va prendre en compte le clavier
    // Cr�er des balles

    creerDesObstaclesLevel1();

    ajouteEcouteursClavier();
    ajouteEcouteurSouris();

    demarreNiveau(niveau);

    requestAnimationFrame(animationLoop);
}

function demarreNiveau(niveau) {
    if (niveau > tabNiveaux.length - 1) {
        console.log("PLUS DE NIVEAUX !!!!!");
        niveau--;
        return;
    }
    // sinon on passe au niveau suivant
    timer.stop();
    timer.setTime(tabNiveaux[niveau].temps);
    timer.start();
    // On initialise les objets graphiques qu'on va utiliser pour le niveau
    // courant avec les objets graphiques dans tabNiveaux[niveau]   
    tableauDesObjetsGraphiques = [...tabNiveaux[niveau].objetsGraphiques];
    // On cr�e le joueur   
    joueur = new Joueur(100, 0, 80, 90, assets.joueur, 3);
    //sortie = new Sortie(x, y, r, couleur, assets.dar, 3);
    creerDesEnemies(20);
    creerDesBalles(20);
    sortie = tabNiveaux[niveau].sortie;
    //sortie = tabNiveaux[niveau].assets.dar;

    // et on l'ajoute au tableau des objets graphiques
    tableauDesObjetsGraphiques.push(joueur);

    // on d�marre la musique du niveau
    let nomMusique = tabNiveaux[niveau].musique;
    //assets[nomMusique].play();
}

function creerDesObstaclesLevel1() {
    tableauDesObjetsGraphiques.push(new Obstacle(250, 0, 30, 300, 'green'));
    tableauDesObjetsGraphiques.push(new ObstacleAnime(450, 0, 30, 300, 'green', 1));
    tableauDesObjetsGraphiques.push(new ObstacleAnimeClignotant(350, 0, 30, 300, 'red', 1));
    let url = 'https://img.freepik.com/free-vector/seamless-japanese-inspired-geometric-pattern_53876-80353.jpg';
    tableauDesObjetsGraphiques.push(new ObstacleTexture(550, 0, 30, 300, url));
}

function dessinerLesObjetsGraphiques(ctx) {
    tableauDesObjetsGraphiques.forEach(o => {
        o.draw(ctx);
    });
    /*
    for(let i = 0; i < tableauDesObstacles.length; i++) {
        tableauDesObstacles[i].draw(ctx);
    }
    */
}

var y = 0;
let ximg = 0;
function animationLoop() {

    // Si le jeu est en pause, on saute l'execution de la fonction
    if (isPaused) {
        requestAnimationFrame(animationLoop);
        return;
    }

    // On va ex�cuter cette fonction 60 fois par seconde
    // pour cr�er l'illusion d'un mouvement fluide
    // 1 - On efface le contenu du canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    switch (gameState) {
        case 'menuStart':
            afficheMenuStart(ctx);
            break;
        case 'menuPause':
            afficheMenuPause(ctx);
            break;
        case 'gameOver':
            afficheGameOver(ctx);
            break;
        case 'ecranDebutNiveau':
            afficheEcranDebutNiveau(ctx);
            break;
        case 'jeuEnCours':
            //ximg++;
            //ximg = ximg % canvas.width;
            //ctx.drawImage(assets.bgn1, 0/*ximg++*/, 0, canvas.width, canvas.height);
            //*************************************************************************************************score*************/
            afficheScore(ctx);
            afficheVie(ctx);
            // 2 - On dessine le nouveau contenu
            tableauDesObjetsGraphiques.forEach(o => {
                if (tableauDesBalles.length === 0) {
                    sortie.active = true;
                    //draw dar sur la sortie 
                    ctx.drawImage(assets.dar, sortie.x - 150, sortie.y - 315);

                    score = 0;
                }
                o.draw(ctx);
            });
            //b1.draw();
            dessinerLesBalles();
            dessinerLesEnemies();
            //dessinerLesObstacles();
            // 3) On d�place le monstre
            deplaceLesBalles();
            deplaceLesEnemies();
            // 3 - on d�place les objets
            testeEtatClavierPourJoueur();
            timer.draw(ctx, 150, 30);

            joueur.move();
            //joueur.followMouse()
            joueur.testeCollisionAvecBordsDuCanvas(canvas.width, canvas.height);
            detecteCollisionJoueurAvecObstacles();
            detecteCollisionJoueurAvecSortie();
            break;

    }

    // 4 - On rappelle la fonction d'animation
    requestAnimationFrame(animationLoop);
}

function afficheEcranDebutNiveau(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "40px Arial";
    ctx.fillText("Bienvenue au niveau " + niveau, 190, 100);
    ctx.restore();
}

function afficheMenuStart(ctx) {
    ctx.save()
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "80px Arial";
    ctx.fillText("Press space to start", 60, 60);
    ctx.strokeText("Press space to start", 60, 60);
    if (inputState.space) {
        gameState = 'jeuEnCours';
    }
    ctx.restore();
}

//game over if collision avec Enemy
function afficheGameOver(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.font = "130px Arial";
    ctx.fillText("GAME OVER", 190, 100);
    ctx.strokeText("GAME OVER", 190, 100);
    if (inputState.space) {
        gameState = 'menuStart';
        joueur.x = 0;
    }
    ctx.restore();
}
function testeEtatClavierPourJoueur() {
    if (inputState.space) {
        // on saute
        joueur.saute();
    } else {
        joueur.vx = 0;
        if (inputState.left) {
            joueur.vx = -5;
        } else {
            if (inputState.right) joueur.vx = 5;
        }
        joueur.vy = 0;
        if (inputState.up) {
            joueur.vy = -5;
        } else {
            if (inputState.down) joueur.vy = 5;
        }
    }



}


function exempleDessin() {

    ctx.lineWidth = 20
    ctx.strokeStyle = 'green';
    ctx.strokeRect(10, y, 100, 150);

    ctx.fillStyle = 'rgba(200, 0, 0, 0.5)';
    ctx.fillRect(0, 10, 50, 70);

    ctx.lineWidth = 2
    ctx.font = "130px Arial";
    ctx.fillText("Hello", 190, 100);
    ctx.strokeText("Hello", 190, 100);

    // Les rectangles avec strokeRect et fillRect sont en mode "imm�diat"
    // les cercles, lignes, courbes, sont en mode "buff�ris�" ou "chemin" (path)
    // On commence par d�finir le chemin et � la fin tout le chemin est dessin�
    // d'un coup dans le GPU
    ctx.beginPath();
    ctx.arc(200, 200, 50, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(400, 200, 50, 0, Math.PI * 2);
    ctx.stroke();

    // 3 - On d�place les objets, on regarde ce que fait le joueur avec la souris, etc.
    // On teste les collisions etc... bref, on change l'�tat des objets graphiques � dessiner
    y += 0.1;
}



function detecteCollisionJoueurAvecObstacles() {
    let collisionExist = false;
    // On va tester si le joueur est en collision avec un des obstacles
    tableauDesObjetsGraphiques.forEach(o => {
        if (o instanceof Obstacle) {
            if (rectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, o.x, o.y, o.l, o.h)) {
                collisionExist = true;
                assets.plop.play();
            }
        }
    });

    if (collisionExist) {
        joueur.couleur = 'red';
        //gameState = 'gameOver';
        joueur.x -= 10;
    } else {
        joueur.couleur = 'green';
    }
}

function detecteCollisionJoueurAvecSortie() {
    if (!sortie.active) return;
    joueur.drawBoundingBox(ctx);
    sortie.drawBoundingBox(ctx);
    if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, sortie.x, sortie.y, sortie.r)) {
        joueur.x = 10;
        joueur.y = 10;
        //gameState = 'ecranDebutNiveau';
        // ajouter une condition de toucher toutes les balles !

        niveauSuivant();
        sortie.couleur = 'lightgreen';
        assets.victory.play();
    }
}

function niveauSuivant() {

    console.log("Niveau suivant !");
    sortie.active = false;
    // on arre^te la musique du niveau courant
    let nomMusique = tabNiveaux[niveau].musique;
    //assets[nomMusique].stop();    

    niveau++;
    ctx.save();
    demarreNiveau(niveau);
}
//------------------------------------------------------------------------------------------------------------------------
// ------------------ MODELES POUR LES BALLES-----------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------
//dessinerLesBalles // removeLesBalles // deplaceLesBalles // creerDesBalles // 
//class :   draw // move 
//dessiner les ball
function dessinerLesBalles() {
    // M�thode 1
    for (var i = 0; i < tableauDesBalles.length; i++) {
        var b = tableauDesBalles[i];
        b.draw(ctx);
    }

}


//deplacer les ball
function deplaceLesBalles() {
    // M�thode 1
    let collision = false;

    tableauDesBalles.forEach((b, index) => {
        ctx.drawImage(assets.fish, b.x - b.r - 2, b.y - b.r);
        b.move();

        // tester Collisions avec les murs et avec le joueur
        if ((b.x + b.r) > w) {
            b.speedX = -b.speedX;
            b.x = w - b.r;
        }
        if ((b.x - b.r) < 0) {
            b.speedX = -b.speedX;
            b.x = b.r;
        }
        if ((b.y + b.r) > h) {
            b.speedY = -b.speedY;
            b.y = h - b.r;
        }
        if ((b.y - b.r) < 0) {
            b.speedY = -b.speedY;
            b.y = b.r;
        }
        //test collision avec joueur 
        if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, b.x, b.y, b.r)) {
            console.log("touche !");
            score++;
            console.log("score :" + score);
            tableauDesBalles.splice(index, 1);
        }

    });
}
//creer des ball
function creerDesBalles(n) {
    var tabCouleur = ["red", "orange", "green"];

    for (var i = 0; i < n; i++) {
        var x = Math.random() * w; // entre 0 et largeur du canvas
        var y = Math.random() * h; // entre 0 et heuteur du canvas
        var rayon = 10 + 10 * Math.random();
        var numCouleur = Math.round(Math.random() * tabCouleur.length);
        var couleur = tabCouleur[numCouleur];
        var speedX = Math.random() * 5;
        var speedY = Math.random() * 5;

        var b = new Balle(x, y, rayon, couleur, speedX, speedY);


        if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, b.x, b.y, b.r * 5)) {
            i--;
        } else {

            tableauDesBalles.push(b);
        }
    }
}
function afficheScore(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 10, 30);
    ctx.restore();
}
//***********************************************************************************************************************//
//*****************************************Enemy*************************************************************************//
//***********************************************************************************************************************//

function dessinerLesEnemies() {
    // M�thode 1
    for (var i = 0; i < tableauDesEnemies.length; i++) {
        var n = tableauDesEnemies[i];
        n.draw(ctx);
    }

}


//deplacer les enemies
function deplaceLesEnemies() {
    // M�thode 1
    let collision = false;

    tableauDesEnemies.forEach((n, index) => {
        ctx.drawImage(assets.dutch, n.x - 3 * n.r, n.y - 3 * n.r);
        n.move();

        // tester Collisions avec les murs et avec le joueur
        if ((n.x + n.r) > w) {
            n.speedX = -n.speedX;
            n.x = w - n.r;
        }
        if ((n.x - n.r) < 0) {
            n.speedX = -n.speedX;
            n.x = n.r;
        }
        if ((n.y + n.r) > h) {
            n.speedY = -n.speedY;
            n.y = h - n.r;
        }
        if ((n.y - n.r) < 0) {
            n.speedY = -n.speedY;
            n.y = n.r;
        }
        //test collision avec joueur 
        if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, n.x, n.y, n.r)) {
            console.log("die ! XXXXXXXXXXXXXXXXXXXXXXX");
            //gameState = 'gameOver';
            vie--;
            console.log("vie :" + vie);
            tableauDesEnemies.splice(index, 1);
        }
        if (vie === 0) {
            //assets.evilaugh.currentTime = 0;
            //assets.evilaugh.play();
            //gameState = 'gameOver';

            gameState = 'menuStart';
            niveau = 1;
            vie = 3;
            score = 0;
        }


    });
}
//creer des ball
function creerDesEnemies(n) {
    var tabCouleur = ["black", "black", "black"];

    for (var i = 0; i < n; i++) {
        var x = Math.random() * w; // entre 0 et largeur du canvas
        var y = Math.random() * h; // entre 0 et heuteur du canvas
        var rayon = 10 + 10 * Math.random();
        var numCouleur = Math.round(Math.random() * tabCouleur.length);
        var couleur = tabCouleur[numCouleur];
        var speedX = Math.random() * 5;
        var speedY = Math.random() * 5;

        var n = new Enemy(x, y, rayon, couleur, speedX, speedY);


        if (circRectsOverlap(joueur.x, joueur.y, joueur.l, joueur.h, n.x, n.y, n.r * 5)) {
            i--;
        } else {

            tableauDesEnemies.push(n);
        }
    }
}
function afficheVie(ctx) {
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.font = "30px Arial";
    ctx.fillText("Vies: " + vie, 10, 70);
    ctx.restore();
}



