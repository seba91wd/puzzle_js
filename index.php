<?php

if (isset($_POST["language"])) {
    $selected_language = $_POST["language"];
} else {
    $selected_language = "en";
}

// Inclure le fichier de langue
include("./assets/language/lang_" . $selected_language . ".php");

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Ce mini projet génère un puzzle à partir d’une image aléatoire trouvée sur le web.">
    <link rel="stylesheet" href="style.css">
    <title>Puzzle JS</title>
</head>

<body>
    <div id="container">

        <header class="border">
            <h1>Puzzle JS</h1>
            <h2><?php echo $lang["welcome"] ?></h2>
            <div>
                <form method="post">
                    <button type="submit" name="language" value="en">
                        <img src="./assets/img/en.png" alt="english_flag" title="English">
                    </button>
                    <button type="submit" name="language" value="fr">
                        <img src="./assets/img/fr.png" alt="french_flag" title="France">
                    </button>
                </form>
            </div>
            <p>© Puzzle JS 2023</p>
            <div class="arrow">
                <img id="arrow_next_puzzle_option" class="next_arrow" src="./assets/img/next_arrow.png" alt="previous">
            </div>
        </header>

        <main>
            <div id="options" class="border hidden">

                <div>
                    <p class="bold"><?php echo $lang["puzzle_option"] ?></p>
                    <button id="btn_random_picture" class="btn"><?php echo $lang["gener_img"] ?></button>
                    <img id="loading_indicator" src="./assets/img/loading.png" alt="loading">
                    <div id="random_image"></div>
                </div>

                <div id="how_many_pieces" class="hidden">
                    <p class="bold"><?php echo $lang["nb_piece"] ?></p>
                    <select name="number_of_pieces" id="number_of_pieces">
                        <option disabled selected><?php echo $lang["select"] ?></option>
                        <option value="25">25 <?php echo $lang["piece"] ?></option>
                        <option value="16">16 <?php echo $lang["piece"] ?></option>
                        <option value="9">9 <?php echo $lang["piece"] ?></option>
                    </select>
                    <button id="btn_submit_nb_pieces" class="btn hidden"><?php echo $lang["submit"] ?></button>
                </div>
                
                <div class="arrow">
                    <img id="arrow_back_title" class="back_arrow" src="./assets/img/back_arrow.png" alt="previous">
                    <img id="arrow_next_puzzle_pieces" class="next_arrow hidden" src="./assets/img/next_arrow.png" alt="previous">
                </div>

            </div>

            <div id="puzzle_pieces" class="border hidden">
                <p class="bold"><?php echo $lang["puzzle_pieces"] ?></p>
                <div id="pieces_array"></div>

                <div class="separation"></div>

                <div id="puzzle_array"></div>
                <div class="arrow">
                    <img id="arrow_back_option" class="back_arrow" src="./assets/img/back_arrow.png" alt="previous">
                </div>
            </div>
        </main>

    </div>
    <script src="./script.js"></script>
</body>

</html>