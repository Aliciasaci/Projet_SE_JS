let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newGameButton = document.getElementById("play-again");
let restartBtn = document.getElementById("reset");
let cancelBtn = document.getElementById("cancel");
let msgRef = document.getElementById("message");
let validateBtn = document.getElementById("validate");

//player is either X (true) or O (false)
let player = true;

//array to keep track of player moves
let moves = [];

//winning player
let winner = null;

//array to keep track of winning combinations
let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//display X or O on the board when a player clicks on a square and save the move
function play(e) {
    let move = player ? "X" : "O";
    if (moves.length >= 1){
        if (e.target.innerHTML === "" && moves[moves.length - 1][0] !== move) {
            let square = e.target;
            let id = square.id;
            console.log({moves});
            moves.push([move, id]);
            checkWin();
            square.innerHTML = move;
        }
    } else {
        if (e.target.innerHTML === "") {
            let square = e.target;
            let id = square.id;
            console.log({moves});
            moves.push([move, id]);
            checkWin();
            square.innerHTML = move;
        }
    }

    
}

//validate move
function validateMove() {
    !player ? player = true : player = false;
}


//automatically play for the computer
function computerPlay() {
    let move = "O";
    let id = Math.floor(Math.random() * 9) + 1;
    let square = document.getElementById(id);
    if (square.innerHTML === "") {
        moves.push([move, id]);
        square.innerHTML = move;
        checkWin();
    } else {
        computerPlay();
    }
}

//check if a player has won
function checkWin() {
    let playerMoves = moves.filter(move => move[0] === "X");
    let computerMoves = moves.filter(move => move[0] === "O");
    let playerMovesIds = playerMoves.map(move => move[1]);
    let computerMovesIds = computerMoves.map(move => move[1]);
    let playerWin = winningCombos.filter(combo => {
        return combo.every(id => playerMovesIds.includes(id));
    });
    let computerWin = winningCombos.filter(combo => {
        return combo.every(id => computerMovesIds.includes(id));
    });
    if (playerWin.length > 0) {
        winner = "Player";
        displayWinner();
    } else if (computerWin.length > 0) {
        winner = "Computer";
        displayWinner();
    } else if (moves.length === 9) {
        winner = "Tie";
        displayWinner();
    }
}


//cancel one move
function cancelMove() {
    if (moves.length > 0) {
        let lastMove = moves.pop();
        let lastMoveIndex = lastMove[1];
        let square = document.getElementById(lastMoveIndex);
        console.log({lastMove});
        console.log({lastMoveIndex});
        square.innerHTML = "";
    }
}

function togglePlayCancel(e) {
    if (e.target.innerHTML === "") {
        play(e);
    } else {
        cancelMove();
    }
}


//add event listener to each square
function eventListerners() {
    btnRef.forEach(function (btn) {
        btn.addEventListener("click", togglePlayCancel);
    });

    cancelBtn.addEventListener("click", cancelMove);

    validateBtn.addEventListener("click", validateMove);

    if (player === false) {
        computerPlay();
    }
}

eventListerners();

