let inputState = {}
let mousePos = { x: 0, y: 0 }

function ajouteEcouteurSouris() {
    window.onmousemove = (event) => {
        // récupèrer la positon de la souris et 
        // la stocke dans une variable globale mousePos
        // adjuster mouse position relative to the canvas
        var rect = event.target.getBoundingClientRect()
        mousePos.x = event.clientX - rect.left;
        mousePos.y = event.clientY - rect.top;
        //console.log(mousePos);
    }
}

function ajouteEcouteursClavier() {
    // écouter les événements clavier
    // et modifier la vitesse du joueur
    // en fonction de la touche pressée
    window.onkeydown = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowLeft':
                inputState.left = true;
                break;
            case 'ArrowRight':
                inputState.right = true;
                break;
            case 'ArrowUp':
                inputState.up = true;
                break;
            case 'ArrowDown':
                inputState.down = true;
                break;
            case ' ':
                inputState.space = true;
                break;
            case 'keyP': // Pause
                inputState.p = true;
                console.log(" Pause Pressed");
                break;
        }
    }

    window.onkeyup = (event) => {
        console.log(event.key);
        switch (event.key) {
            case 'ArrowLeft':
                inputState.left = false;
                break;
            case 'ArrowRight':
                inputState.right = false;
                break;
            case 'ArrowUp':
                inputState.up = false;
                break;
            case 'ArrowDown':
                inputState.down = false;
                break;
            case ' ':
                inputState.space = false;
                break;
        }
    }

}

export { ajouteEcouteurSouris, ajouteEcouteursClavier, inputState, mousePos }