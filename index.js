let game_active = false;
let active_player = 0;
let gameboard = [];
let player_color = [];
player_color[1] = "red";
player_color[2] = "black";

function beginGame() {
    if (game_active == true) return false;
    game_active = true;

    for (row = 0; row <= 5; row++) {
        gameboard[row] = [];
        for (col = 0; col <= 6; col++) {
            gameboard[row][col] = 0;
        }
    }

    drawBoard();
    active_player = 1;
    setUpTurn();
}

function drawBoard() {
    checkForWin(); //check to see if any player has won.
    for (col = 0; col <= 6; col++) {
        for (row = 0; row <= 5; row++) {
            document.getElementById('square_' + row + '_' + col).innerHTML = "<span class='piece player" +
                gameboard[row][col] + "'> </span>";
        }
    }
}

function checkForWin() {

    //check left-to-right
    //check for player 1 and 2
    for (i = 1; i <= 2; i++) {
        for (col = 0; col <= 3; col++) {
            for (row = 0; row <= 5; row++) {
                if (gameboard[row][col] == i) {
                    if ((gameboard[row][col + 1] == i) && (gameboard[row][col + 2] == i) && (gameboard[row][col +
                            3
                        ] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }

    //check top-to-bottom
    for (i = 1; i <= 2; i++) {
        for (col = 0; col <= 6; col++) {
            for (row = 0; row <= 2; row++) {
                if (gameboard[row][col] == i) {
                    if ((gameboard[row + 1][col] == i) && (gameboard[row + 2][col] == i) && (gameboard[row + 3]
                            [col] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }

    //check diagnol down
    for (i = 1; i <= 2; i++) {
        for (col = 0; col <= 3; col++) {
            for (row = 0; row <= 2; row++) {
                if (gameboard[row][col] == i) {
                    if ((gameboard[row + 1][col + 1] == i) && (gameboard[row + 2][col + 2] == i) && (gameboard[
                            row + 3][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }

    //check diagnol up
    for (i = 1; i <= 2; i++) {
        for (col = 0; col <= 3; col++) {
            for (row = 3; row <= 5; row++) {
                if (gameboard[row][col] == i) {
                    if ((gameboard[row - 1][col + 1] == i) && (gameboard[row - 2][col + 2] == i) && (gameboard[
                            row - 3][col + 3] == i)) {
                        endGame(i);
                        return true;
                    }
                }
            }
        }
    }
}

function endGame(winningPlayer) {
    game_active = false; //set the "game_active" to false, so that it can be started again.
    document.getElementById('game_info').innerHTML = "The winner is player: " + winningPlayer + "!";
}

function setUpTurn() {
    if (game_active) {
        //display the current player, and create a <span> with the class of the player# so that it will show the color.
        document.getElementById('game_info').innerHTML = "Current Player: Player " + active_player +
            " <span class='player" + active_player + "'>(" + player_color[active_player] + ")</span>";
    }
}

// drop will add a piece to the lowest available column
function drop(col) {
    // Look for the lowest point in this row that is open
    for (row = 5; row >= 0; row--) {
        if (gameboard[row][col] == 0) {
            gameboard[row][col] = active_player;
            drawBoard();

            if (active_player == 1) {
                active_player = 2;
            } else {
                active_player = 1;
            }
            //there is also a fancy way of doing this call a ternary assignment that looks like this: active_player = (active_player == 1) ? 2 : 1;

            setUpTurn();
            return true;
        }
    }
}