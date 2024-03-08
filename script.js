// SELECTIONS
const header = document.querySelector("header");
const options = document.querySelector("#options");

const arrow_next_puzzle_option = document.querySelector("#arrow_next_puzzle_option");
const arrow_back_title = document.querySelector("#arrow_back_title");
const arrow_next_puzzle_pieces = document.querySelector("#arrow_next_puzzle_pieces");
const arrow_back_option = document.querySelector("#arrow_back_option");

const btn_random_picture = document.querySelector("#btn_random_picture");
const loading_indicator = document.querySelector("#loading_indicator");

const how_many_pieces = document.querySelector("#how_many_pieces");
const number_of_pieces = document.querySelector("#number_of_pieces");
const puzzle_array = document.querySelector("#puzzle_array");

const puzzle_pieces = document.querySelector("#puzzle_pieces");

const background = document.querySelector("body");

let colors;
let cached_image;
let imageCounter = 0;

// EVENEMENTS

document.addEventListener("DOMContentLoaded", function () {
    animateGradient();
});

arrow_next_puzzle_option.addEventListener("click", () => {
    slide_div_next(header, options, "54px")
})

arrow_back_title.addEventListener("click", () => {
    slide_div_back(options, header, "54px")
})

arrow_back_option.addEventListener("click", () => {
    slide_div_back(puzzle_pieces, options, "54px")
})

arrow_next_puzzle_pieces.addEventListener("click", () => {
    slide_div_next(options, puzzle_pieces, "686px")
    generate_puzzle_pieces()
});

btn_random_picture.addEventListener("click", generate_random_picture)

number_of_pieces.addEventListener("change", () => {
    arrow_next_puzzle_pieces.classList.remove("hidden");
})

document.addEventListener("mousemove", (event) => {
    mv_elem_move(event);
    shadow_dynamique(event);
});

// FONCTIONS

// Animation du background
function animateGradient() {
    let angle = 45; // Angle initial du dégradé

    function updateAngle() {
        angle += 0.1; // Vitesse du mouvement
        background.style.background = `linear-gradient(${angle}deg, ${colors.join(",")})`;

        requestAnimationFrame(updateAngle);
    }

    function updateGradient() {
        colors = [
            "rgba(129,255,252,1)",       // Couleur 3
            "rgba(173, 216, 230, 0.8)",  // Couleur 1
            "rgba(240, 255, 255, 0.8)",  // Couleur 2
            "rgba(197,153,255,1)",       // Couleur 4
        ];
    
        let gradient = "linear-gradient(45deg, ";
    
        for (const color of colors) {
            gradient += color + ",";
        }
    
        gradient = gradient.slice(0, -1) + ")";
        background.style.background = gradient;
    
        setTimeout(updateGradient, 10000);
    }

    updateGradient();
    updateAngle();
}

// Animation glisser vers l'avant
function slide_div_next(div_back, div_next, arrow_pos) {
    div_back.classList.add("slide-out-left");
    setTimeout(() => {
        div_back.classList.add("hidden");
        div_next.classList.remove("hidden")
        div_next.classList.add("slide-in-right")
        adjust_arrow_position(arrow_pos)
        setTimeout(() => {
            div_next.classList.remove("slide-in-right")
            div_back.classList.remove("slide-out-left");
        }, 500);
    }, 500);
}

// Animation glisser vers l'arrière
function slide_div_back(div_back, div_next, arrow_pos) {
    div_back.classList.add("slide-out-right");
    setTimeout(() => {
        div_back.classList.add("hidden")
        div_next.classList.remove("hidden");
        div_next.classList.add("slide-in-left")
        adjust_arrow_position(arrow_pos)
        setTimeout(() => {
            div_next.classList.remove("slide-in-left")
            div_back.classList.remove("slide-out-right");
        }, 500);
    }, 500);
}

function adjust_arrow_position(params) {
    const arrow = document.querySelectorAll(".arrow");
    for (let i = 0; i < arrow.length; i++) {
        const element = arrow[i];
        element.style.bottom = params;
    }
}

function generate_random_picture() {
    // Afficher l'indicateur de chargement
    loading_indicator.style.display = "block";

    // Récupérer la balise div avec l'id "random_image"
    let randomImageContainer = document.getElementById("random_image");

    // Supprimer la balise div complète s'il y en a une
    if (randomImageContainer.firstChild) {
        randomImageContainer.removeChild(randomImageContainer.firstChild);
    }

    // Créer un nouvel objet d'image
    let image = new Image();

    // Définir l'URL de l'image
    imageCounter++;
    image.src = `https://source.unsplash.com/random/300x300/?${imageCounter}`;

    // Attendre le chargement de l'image avant de l'afficher
    image.onload = function () {
        // Cacher l'indicateur de chargement
        loading_indicator.style.display = "none";
        how_many_pieces.classList.remove("hidden");

        // Ajouter l'image créée à la balise div avec l'id "random_image"
        randomImageContainer.appendChild(image);

        // Stocker l'image téléchargée dans la variable cached_image
        cached_image = new Image();
        cached_image.src = image.src;
    };
}


function generate_puzzle_pieces() {
    if (cached_image) {
        // Efface le contenu précédent
        pieces_array.innerHTML = "";

        // Nombre de pièces
        const number_of_pieces_val = document.querySelector("#number_of_pieces").value;

        // Dimensions des pièces (300 / (racine carrée de "number_of_pieces_val"))
        const piece_size = 300 / Math.sqrt(number_of_pieces_val);

        // Créer un tableau d'indices dans l'ordre initial
        let indices = [];

        for (let index = 1; index <= number_of_pieces_val; index++) {
            indices.push(index);
        }

        // Mélanger les indices
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        for (let i = 0; i < Math.sqrt(number_of_pieces_val); i++) {
            for (let j = 0; j < Math.sqrt(number_of_pieces_val); j++) {
                // Récupérer l'indice mélangé
                let index = indices.pop();

                let piece = document.createElement("div");
                piece.className = "puzzle_piece";
                piece.style.width = piece_size + "px";
                piece.style.height = piece_size + "px";
                piece.style.backgroundImage = "url(" + cached_image.src + ")";
                piece.style.backgroundSize = "300px 300px";

                // Calculer la position basée sur l'indice mélangé
                let row = Math.floor((index - 1) / Math.sqrt(number_of_pieces_val));
                let col = (index - 1) % Math.sqrt(number_of_pieces_val);

                piece.style.backgroundPosition = -col * piece_size + "px " + -row * piece_size + "px";

                // Ajout de l'attribut data-id pour identifier chaque pièce
                piece.setAttribute("data-id", index);

                pieces_array.appendChild(piece);
            }
        }

        // Paramétrage de la hauteur minimal de la div #pieces_array
        pieces_array.style.minHeight = piece_size * 3 + "px";

        // Sélection des pièces du puzzle nouvellement créées
        const puzzle_piece = document.querySelectorAll(".puzzle_piece");
        for (let i = 0; i < puzzle_piece.length; i++) {
            const piece = puzzle_piece[i];
            // Pour les curseurs (pc, mac)
            piece.addEventListener("mousedown", mv_elem_start_move);
            piece.addEventListener("mouseup", mv_elem_release);

            // Pour les écrans tactiles
            piece.addEventListener("touchstart", mv_elem_start_move);
            piece.addEventListener("touchend", mv_elem_release);
        }

        // Création des cases du puzzle
        generate_puzzle_grid(number_of_pieces_val, piece_size);
    }
}

function generate_puzzle_grid(number, piece_size) {
    // Efface le contenu précédent
    puzzle_array.innerHTML = "";
    // Nombre de cases au carré
    let puzzle_size = Math.sqrt(number);

    puzzle_array.style.gridTemplateColumns = `repeat(${puzzle_size}, ${piece_size}px)`;
    puzzle_array.style.gridTemplateRows = `repeat(${puzzle_size}, ${piece_size}px)`;

    for (let i = 0; i < puzzle_size; i++) {
        for (let j = 0; j < puzzle_size; j++) {
            let cell = document.createElement("div");
            cell.className = "puzzle_cell";

            // Ajout de la largeur et de la hauteur aux div puzzle-cell
            cell.style.width = piece_size + "px";
            cell.style.height = piece_size + "px";

            // Ajout de l'attribut data-id pour identifier chaque cellule
            cell.setAttribute("data-id", i * puzzle_size + j + 1);

            puzzle_array.appendChild(cell);
        }
    }
}

let my_mv_elem;
function mv_elem_start_move(event) {
    // Stocker l'élément actuellement déplacé
    my_mv_elem = event.target;

    // Ajout de la classe "mv_elem_on" pour activer le déplacement
    my_mv_elem.classList.add("mv_elem_on");
}



function mv_elem_move(event) {
    if (my_mv_elem != undefined) {
        // On récupère la position verticale et horizontale du curseur
        let mouse_x_pos = event.x;
        let mouse_y_pos = event.y;

        // On applique la position du curseur sur my_mv_elem
        // On retire 35 px verticale et horizontale pour positionner le curseur
        let cursor_y_pos = 30;
        let cursor_x_pos = 30;

        my_mv_elem.style.position = "absolute";
        my_mv_elem.style.top = mouse_y_pos - cursor_y_pos + window.scrollY + "px";
        my_mv_elem.style.left = mouse_x_pos - cursor_x_pos + "px";
    }
}

function mv_elem_release(event) {
    if (my_mv_elem != undefined) {
        // Récupérer la position du curseur lors du relâchement
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        // Vérifier si la pièce est relâchée dans la div "pieces_array"
        let pieces_array_rect = pieces_array.getBoundingClientRect();
        if (
            mouseX >= pieces_array_rect.left &&
            mouseX <= pieces_array_rect.right &&
            mouseY >= pieces_array_rect.top &&
            mouseY <= pieces_array_rect.bottom
        ) {
            // Remettre la pièce dans la div "pieces_array"
            pieces_array.appendChild(my_mv_elem);
            my_mv_elem.style.position = "static";

        } else {
            // Placer la pièce dans la grille magnétique du puzzle
            place_piece_in_puzzle(my_mv_elem);
        }

        my_mv_elem.classList.remove("mv_elem_on");
        my_mv_elem = undefined;
    }
}

function place_piece_in_puzzle(piece) {
    // Récupérer la position de la pièce relâchée
    let piece_rect = piece.getBoundingClientRect();
    let piece_center_x = piece_rect.left + piece_rect.width / 2;
    let piece_center_y = piece_rect.top + piece_rect.height / 2;

    // Trouver la cellule du puzzle la plus proche
    let puzzle_cells = document.querySelectorAll(".puzzle_cell");
    let closest_cell = null;
    let closest_distance = Infinity;

    puzzle_cells.forEach(cell => {
        // Vérifier si la cellule est vide
        if (cell.children.length === 0) {

            // Calcule du centre de la cellule
            let cell_rect = cell.getBoundingClientRect();
            let cell_center_x = cell_rect.left + cell_rect.width / 2;
            let cell_center_y = cell_rect.top + cell_rect.height / 2;

            // Calculer la distance entre le centre de la pièce et le centre de la cellule
            let distance = Math.sqrt(
                Math.pow(piece_center_x - cell_center_x, 2) + Math.pow(piece_center_y - cell_center_y, 2)
            );

            // Mettre à jour la cellule la plus proche si la distance est plus petite
            if (distance < closest_distance) {
                closest_cell = cell;
                closest_distance = distance;
            }
        }
    });

    // Déplacer la pièce vers la cellule la plus proche
    if (closest_cell) {
        closest_cell.appendChild(piece);

        // Réinitialiser la position absolue
        piece.style.position = "static";

        // Vérifier si le puzzle est résolu après chaque déplacement de pièce
        check_puzzle_completion();
    }
}

function check_puzzle_completion() {
    // Sélectionner toutes les pièces du puzzle et les cellules du puzzle
    const puzzle_piece = document.querySelectorAll(".puzzle_piece");

    // Vérifier si chaque pièce est dans la cellule correspondante
    let is_puzzle_complete = true;
    puzzle_piece.forEach(piece => {
        let piece_id = piece.getAttribute("data-id");
        let corresponding_cell = document.querySelector(`.puzzle_cell[data-id="${piece_id}"]`);

        // Si la pièce n'est pas dans la cellule correspondante, le puzzle n'est pas complet
        if (!corresponding_cell.contains(piece)) {
            is_puzzle_complete = false;
        }
    });

    // Si le puzzle est complet, afficher un message de félicitations
    if (is_puzzle_complete) {
        setTimeout(() => {
            alert("Félicitations ! Vous avez résolu le puzzle !");
            slide_div_back(puzzle_pieces, options, "54px");
        }, 100);
    }
}

function shadow_dynamique(event) {

    // Mesure la hauteur de la fenêtre du navigateur.
    let window_height = window.innerHeight
    // console.log('window hauteur = ' + window_height + 'px')

    // Mesure la largeur de la fenêtre du navigateur.
    let window_width = window.innerWidth
    // console.log('window largeur = ' + window_width + 'px')

    // Appelle de la classe "myShadow"
    let myShadow = document.getElementsByClassName('border')

    // Couleur des l'ombres
    const shadow_color = '#000000'

    // Taille des ombres
    const shadow_size = '12px'

    // Flou des ombres
    const shadow_blur = '2px'

    // Position en pixel
    // console.log(`position curseur: ${event.x}:${event.y}`);

    // conversion des positions en %
    let x_shadow = event.x / window_width * 100;
    let y_shadow = event.y / window_height * 100;

    // Conversion en nombre entier
    // Réglage de la taille des ombres de -10% a 10%
    x_shadow = parseInt(x_shadow / 5) - 10;
    y_shadow = parseInt(y_shadow / 5) - 10;


    // Applique la fonction sur tous les éléments.
    let i = 0
    while (i < myShadow.length) {
        myShadow[i].style.boxShadow = x_shadow + 'px ' + y_shadow + 'px ' + shadow_size + ' ' + shadow_blur + ' ' + shadow_color;
        i++;
    }
};
