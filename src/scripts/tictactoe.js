/*export const render = () => {
    return `
    <div class="tictactoe">
            
        <div class="wrapper">
            <div class="score-wrapper">
                <div class="score" id="scoreX"></div>
                <div class="score" id="scoreTie"></div>
                <div class="score" id="scoreO"></div>
            
            </div>
            <div class="container">
                <button class="button-option glass" id="1"></button>
                <button class="button-option glass" id="2"></button>
                <button class="button-option glass" id="3"></button>
                <button class="button-option glass" id="4"></button>
                <button class="button-option glass" id="5"></button>
                <button class="button-option glass" id="6"></button>
                <button class="button-option glass" id="7"></button>
                <button class="button-option glass" id="8"></button>
                   <button class="button-option glass" id="9"></button>
            </div>
            <div class="btn-wrapper">
                <div class="gamebtn">
                    <button class="button op" id="validate">Confirmer</button>
                    <button class="button op" id="cancel">Annuler</button>
                </div>
                <button class="button op" id="reset">Recommencer</button>
            </div>
        
        </div>

        <div class="popup">
                <p id="message"></p>
                <button class="button" id="play-again">Jouer</button>
        </div>
    </div>
    `;
}*/


    let btnRef = document.querySelectorAll(".button-option");
    let popupRef = document.querySelector(".popup");
    let newGameButton = document.getElementById("play-again");
    let restartBtn = document.getElementById("reset");
    let cancelBtn = document.getElementById("cancel");
    let msgRef = document.getElementById("message");
    let validateBtn = document.getElementById("validate");
    let scoreXRef = document.getElementById("scoreX");
    let scoreORef = document.getElementById("scoreO");
    let scoreTieRef = document.getElementById("scoreTie");

    //player is either X (true) or O (false)
    let player = null;

    //array to keep track of player moves
    let moves = [];

    let scoreboard = {
        player: 0,
        computer: 0,
        tie: 0
    };

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
        if (moves.length >= 1) {
            if (e.target.innerHTML === "" && moves[moves.length - 1][0] !== move) {
                let square = e.target;
                let id = square.id;
                moves.push([move, id]);
                square.innerHTML = move;
            }
        } else {
            let square = e.target;
            let id = square.id;
            moves.push([move, id]);
            square.innerHTML = move;
        }  
    }

    const cancelMove = () => {
        if (moves.length > 0) {
            let lastMove = moves.pop();
            let lastMoveIndex = lastMove[1];
            let square = document.getElementById(lastMoveIndex);
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

    //validate move
    const validateMove = () => {
        !player ? player = true : player = false;
    }


    //automatically play for the computer *TODO*
    const computerPlay = () => {
        let move = player ? "X" : "O";
        let id = Math.floor(Math.random() * 9) + 1;
        let square = document.getElementById(id);

        if (square.innerHTML === "") {
            moves.push([move, id]);
            square.innerHTML = move;
            validateMove();
        } else {
            computerPlay();
        }
    }

    const showPopup = () => {
        popupRef.classList.remove("hide");
        newGameButton.innerText = "Rejouer";
    };

    const winFunc = (letter) => {
        showPopup();
        if (letter === "X") {
            msgRef.innerHTML = "&#x1F3C6; <br> 'X' gagne !";
        } else {
            msgRef.innerHTML = "&#x1F3C6; <br> 'O' gagne !";
        }
    };

    const tieFunc = () => {
        showPopup();
        msgRef.innerHTML = "&#x1F975; <br> Match nul !";
    };

    const winChecker = () => {
        for (let i of winningCombos) {
            let [el1, el2, el3] = [
                btnRef[i[0]].innerText, 
                btnRef[i[1]].innerText, 
                btnRef[i[2]].innerText
            ];

            if (el1 === el2 && el2 === el3 && (el1 !== "")) {
                //phone vibration
                window.navigator.vibrate(1000);
                if (el1 === "X") {
                    scoreboard.player++;
                } else if (el1 === "O") {
                    scoreboard.computer++;
                }
                winFunc(el1);
            }
        }
    }

    const hidePopup = () => {
        btnRef.forEach(btn => {
            btn.innerText = "";
        });
        popupRef.classList.add("hide");
    };

    //add event listener to each square
    btnRef.forEach(function (btn) {
        btn.addEventListener("click", (event) => {
            togglePlayCancel(event);
            if (moves.length === 9) {
                scoreboard.tie++;
                tieFunc();
            } else {
                winChecker();
            }
        });
    });

    cancelBtn.addEventListener("click", cancelMove);

    validateBtn.addEventListener("click", validateMove);

    newGameButton.addEventListener("click", () => {
        hidePopup();
        moves = [];
        generateChoice();
        if (player === null) {
            alert("Choisissez X ou O");
        }
    });

    restartBtn.addEventListener("click", () => {
        hidePopup();
        moves = [];
    });

    //save score in local storage
    window.addEventListener("beforeunload", () => {
        localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
    });

    //get score from local storage
    window.addEventListener("load", () => {
        generateChoice();
        let score = JSON.parse(localStorage.getItem("scoreboard"));
        if (score) {
            scoreboard = score;
        }
    });

    window.setInterval(() => {
        scoreXRef.innerText = `X : ${scoreboard.player}`;
        scoreORef.innerHTML = `O : ${scoreboard.computer}`;
        scoreTieRef.innerHTML = `Tie : ${scoreboard.tie}`;
    }, 100);

    const generateChoice = () => {
        msgRef.innerHTML = `
            <p>Choisissez X ou O</p>
            <div class="choice">
                <button class="op" id="choiceX">X</button>
                <button class="op" id="choiceO">O</button>
            </div>
        `;
    
        showPopup();
    
        newGameButton.innerText = "Jouer";
    
        let choiceX = document.getElementById("choiceX");
        let choiceO = document.getElementById("choiceO");
    
        choiceX.addEventListener("click", () => {
            player = true;
            hidePopup();
        });
    
        choiceO.addEventListener("click", () => {
            player = false;
            hidePopup();
        });
    
    }  
