﻿## PlayWithMe
# SB2025/
# ├─ .vscode/                         ← configurations VS Code (linter, debugger…)
# ├─ assets/                          ← ressources
# │   ├─ images/                      ← sprites, backgrounds…
# │   └─ audio/                       ← musiques, effets sonores
# ├─ css/
# │   └─ style.css                    ← styles globaux (layout, couleurs, polices…)
# ├─ js/                              ← logique du jeu, découpée par responsabilité
# │   ├─ assets.js                    ← préchargement et gestion des ressources
# │   ├─ ball.js                      ← classe / logique de la balle
# │   ├─ collisions.js                ← détection et gestion des collisions
# │   ├─ ecouteurs.js                 ← event listeners (clavier, souris…)
# │   ├─ enemy.js                     ← classe / logique des ennemis
# │   ├─ joueurclass.js               ← classe / logique du joueur
# │   ├─ levels.js                    ← définition des niveaux et de leur enchaînement
# │   ├─ objetgraphique.js            ← objets dessinés à l’écran (sprites, formes…)
# │   ├─ obstacleclass.js             ← classe de base pour obstacles statiques
# │   ├─ obstacletexture.js           ← application de textures / images aux obstacles
# │   ├─ obstacleanime.js             ← animation générique des obstacles
# │   ├─ obstacleanimeclignotant.js   ← animation spécifique (clignotement)
# │   ├─ sortie.js                    ← gestion de la sortie / des transitions de scène
# │   ├─ timer.js                     ← minuterie, chronomètre du jeu
# │   └─ script.js                    ← point d’entrée (initialisation, game loop…)
# ├─ index.html                       ← structure HTML, inclusion des `<script>` et `<link>`
# └─ README.md                        ← présentation du projet, instructions d’installation

# -----------------------------------------------------------------------------------------------------------------------------------------------
# Aspect                  --            Ancien Style                        --              Current Code 
# -----------------------------------------------------------------------------------------------------------------------------------

# Structure               --  Un seul script.js ou quelques gros fichiers   --  Dossier js/ finement découpé en dizaines de modules métiers 
# Variables globales      --  Nombreux var foo; et collisions de noms       --  Passage aux let/const dans des scopes fermés ou modules ES
# Chargement              --  <script src="..."></script> dans l’ordre      --  Possibilité d’ES Modules ou bundler (Webpack, Rollup…)
# Gestion des dépendances --  Aucune, ou utilisation de jQuery global       --  Import/Export de modules, ou future migration vers npm + bundler
# Animations              --  Callback setInterval ou plugins jQuery        --  RequestAnimationFrame, classes dédiées, code OOP
# Asset loading           --  Préchargement manuel sporadique               --  assets.js centralise la promesse de chargement avant le démarrage
# Maintenance             --  Code spaghetti, difficile à refactorer        --  Chaque responsabilité isolée → plus facile à tester et étendre
# Outils                  --  Pas d’IDE spécifique, devtools basiques       --  Config VS Code, linter, éventuellement CI/CD avec GitHub Actions

# ----------------------------------------------------------------------------------------------------------------------------------


