export const render = () => {
  return `    
  <div id="tictac">      
      <div class="wrapper">
          <div class="score-wrapper">
              <div class="score" id="scoreX"></div>
              <div class="score" id="scoreTie"></div>
              <div class="score" id="scoreO"></div>
              
          </div>
          <div class="container">
              <button class="button-option glass" id="0"></button>
              <button class="button-option glass" id="1"></button>
              <button class="button-option glass" id="2"></button>
              <button class="button-option glass" id="3"></button>
              <button class="button-option glass" id="4"></button>
              <button class="button-option glass" id="5"></button>
              <button class="button-option glass" id="6"></button>
              <button class="button-option glass" id="7"></button>
              <button class="button-option glass" id="8"></button>
          </div>
          <div class="btn-wrapper">
              <div class="gamebtn">
                  <button class="button op" id="validate">Confirmer</button>
                  <button class="button op" id="cancel">Annuler</button>
              </div>
              <button class="button op" id="reset">Recommencer</button>
          </div>
          
      </div>

      <div class="popup hide">
          <p id="message"></p>
          <button class="button" id="play-again">Jouer</button>
      </div>

  </div>
    `;
};

let scoreboard = {
  player: 0,
  computer: 0,
  tie: 0,
};

export const init = () => {
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
let wrapperRef = document.querySelector(".wrapper");
let menuRef = document.querySelector(".menu-btn");

//player is either X (true) or O (false)
let player = null;
let computer = null;
let playerTurn = true;

//array to keep track of player moves
let moves = [];



//array to keep track of winning combinations
let winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let emptySquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];

let winner = null;

//display X or O on the board when a player clicks on a square and save the move
function play(e) {
  if (playerTurn) {
    let move = player ? "X" : "O";
    if (moves.length >= 1) {
      if (e.target.innerHTML === "" && moves[moves.length - 1][0] !== move) {
        let square = e.target;
        let id = square.id;
        moves.push([move, id]);
        square.innerHTML = move;
        //remove the matching id from the emptySquares array
        //emptySquares = emptySquares.filter(square => square != id);
      }
    } else {
      let square = e.target;
      let id = square.id;
      moves.push([move, id]);
      square.innerHTML = move;
      //remove the matching id from the emptySquares array
      //emptySquares = emptySquares.filter(square => square != id);
    }
  }
}

const cancelMove = () => {
  if (moves.length > 0) {
    let XorO = player ? "X" : "O";
    let lastMove = moves[moves.length - 1][0];
    if (playerTurn && lastMove === XorO) {
      let lastMove = moves.pop();
      let lastMoveIndex = lastMove[1];
      let square = document.getElementById(lastMoveIndex);
      square.innerHTML = "";
    }
  }
};

function togglePlayCancel(e) {
  if (e.target.innerHTML === "") {
    play(e);
  } else {
    cancelMove();
  }
}

//validate move
const validateMove = () => {
  playerTurn = !playerTurn;
  if (!playerTurn) {
    computerPlay();
  }
};

//automatically play for the computer
const computerPlay = () => {
  if (!playerTurn) {
    let move = computer ? "X" : "O";
    let random = Math.floor(Math.random() * 9);
    let square = document.getElementById(random);
    if (square.innerHTML === "") {
      square.innerHTML = move;
      moves.push([move, random]);
      //remove the matching id from the emptySquares array
      //emptySquares = emptySquares.filter(square => square != random);
      validateMove();
    } else {
      computerPlay();
    }
  }
};

//check if there is a winner
const checkWinner = (player, winningCombos) => {
  for (let i = 0; i < winningCombos.length; i++) {
    let combo = winningCombos[i];
    let square1 = document.getElementById(combo[0]);
    let square2 = document.getElementById(combo[1]);
    let square3 = document.getElementById(combo[2]);
    if (
      square1.innerHTML === player &&
      square2.innerHTML === player &&
      square3.innerHTML === player
    ) {
      return true;
    }
  }
  return false;
};

const showPopup = () => {
  popupRef.classList.remove("hide");
  popupRef.background = "filter: blur(5px)";
  wrapperRef.style = "display: none";
  newGameButton.innerText = "Rejouer";
  newGameButton.style.display = "block";
};

const winFunc = (letter) => {
  showPopup();
  if (letter === "X") {
    msgRef.innerHTML = "&#x1F3C6; <br> 'X' gagne !";
  } else {
    msgRef.innerHTML = "&#x1F3C6; <br> 'O' gagne !";
  }
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
};

const tieFunc = () => {
  showPopup();
  msgRef.innerHTML = "&#x1F975; <br> Match nul !";
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
};

const winChecker = () => {
  for (let i of winningCombos) {
    let [el1, el2, el3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    if (el1 === el2 && el2 === el3 && el1 !== "") {
      //phone vibration
      window.navigator.vibrate(1000);
      if (el1 === "X") {
        scoreboard.player++;
        winner = "X";
      } else if (el1 === "O") {
        scoreboard.computer++;
        winner = "O";
      }
      winFunc(el1);
    }
  }
};

//if all square are filled and doesn't match any winning combo, return true else return false
const lastWinningMove = () => {
  for (let i of winningCombos) {
    let [el1, el2, el3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];

    if (el1 === el2 && el2 === el3 && el1 !== "") {
      return true;
    }
  }
};

const hidePopup = () => {
  btnRef.forEach((btn) => {
    btn.innerText = "";
  });
  popupRef.classList.add("hide");
  wrapperRef.style = "display: block";
};

//add event listener to each square
btnRef.forEach(function (btn) {
  let clickOrNot = "click";

  btn.addEventListener("click", () => {
    clickOrNot = "click";
  });

  btn.addEventListener("DOMSubtreeModified", () => {
    clickOrNot = "DOMSubtreeModified";
    /*if (moves.length === 9 && !lastWinningMove()) {
                scoreboard.tie++;
                winner = "tie";
                tieFunc();
            } else {
                winChecker();
            }*/
  });

  btn.addEventListener(clickOrNot, (event) => {
    togglePlayCancel(event);
    if (moves.length === 9 && !lastWinningMove()) {
      scoreboard.tie++;
      winner = "tie";
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

  newGameButton.style = "display: none;";

  let choiceX = document.getElementById("choiceX");
  let choiceO = document.getElementById("choiceO");

  choiceX.addEventListener("click", () => {
    player = true;
    computer = false;
    hidePopup();
  });

  choiceO.addEventListener("click", () => {
    player = false;
    computer = true;
    hidePopup();
  });
  let score = JSON.parse(localStorage.getItem("scoreboard"));
  if (score) {
    scoreboard = score;
  }
};

generateChoice();

};