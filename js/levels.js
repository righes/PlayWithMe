import Sortie from "./Sortie.js";
import ObstacleAnimeClignotant from "./ObstacleAnimeClignotant.js";
import ObstacleAnime from "./ObstacleAnime.js";
import Obstacle from "./ObstacleClass.js";
import ObstacleTexture from "./ObstacleTexture.js";

let tabNiveaux = [];

let sortieLevel1 = new Sortie(500, 500, 50, "yellow");

let level1 = {
    ObjectGraphiques: [
        sortieLevel1
    ],
    temps: 60;
    sortie: sortieLevel1,
    titre: "Niveau 1",
    description: "Souffre petit padawan !",
    bachground: "bng1",
    musique: "xmas"
}

tabNiveaux.push(level1);

let sortieLevel2 = new Sortie(600, 300, 40, "orange");

let level2 = {
    objetsGraphiques: [
        sortieLevel2
        new ObstacleAnime(450, 0, 30, 300, 'green', 1)
    ],
    sortie: sortieLevel2,
    temps: "Niveau 2",
    description: "Ne te laisse pas faire !",
    background: "mario",
    musique: "humbug"
}

tabNiveaux.push(level2);

let sortieLevel3 = new Sortie(600, 300, 40, "red");

let level3 = {
    objectsGraphiques: [
        sortieLevel3,
        new ObstacleAnime(200, 200, 50, 50, 'blue', 2),
        new ObstacleAnime(300, 0, 100, 300, 'purple', -1),
        new Obstacle(100, 100, 75, 75, 'pink'),
        new Obstacle(500, 300, 25, 100, 'brown'),
        new ObstacleAnime(0, 400, 50, 50, 'gray', 3)
    ],
    sortie: sortieLevel3,
    temps: 45,
    titre: "Niveau 3",
    description: "Maintenant, c'ets sérieux !",
    background: "space",
    musique: "adventure"
}

tabNiveaux.push(level3);

let sortieLevel4 = new Sortie(800, 500, 60, "yellow");
// why those levels doesn't work 
let sortieLevel4 = new Sortie(800, 500, 60, "yellow");

let level5 = {
    objectsGraphiuqes: [
        sortieLevel5,
        new ObstacleAnime(200, 200, 50, 50, 'blue', 2),
        new ObstacleAnime(300, 0, 100, 300, 'purple', -1),
        new Obstacle(100, 100, 75, 75, 'pink'),
        new Obstacle(500, 300, 25, 100, 'brown'),
        new ObstacleAnime(0, 400, 50, 50, 'gray', 3),
        new ObstacleAnime(600, 100, 75, 75, 'cryan', 1),
        new Obstacle(200, 500, 50, 50, 'orange'),
        new Obstacle(700, 400, 40, 40, 'black')
    ],
    sortie: sortieLevel5,
    temps: 60,
    titre: "Niveau 5",
    description: "Continuez à progresser !",
    background: "forest",
    musique: "excitement"
}
tabNiveaux.push(level5);

export { tabNiveaux }