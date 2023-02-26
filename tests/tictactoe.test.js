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
  
  describe("checkWinner", () => {
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
  
    beforeEach(() => {
      // Set up a dummy DOM structure
      document.body.innerHTML = `
          <div id="0"></div>
          <div id="1"></div>
          <div id="2"></div>
          <div id="3"></div>
          <div id="4"></div>
          <div id="5"></div>
          <div id="6"></div>
          <div id="7"></div>
          <div id="8"></div>
        `;
    });
  
    it("returns true if player has three in a row", () => {
      // Set up the dummy DOM with winning combination
      document.getElementById("0").innerHTML = "X";
      document.getElementById("1").innerHTML = "X";
      document.getElementById("2").innerHTML = "X";
  
      expect(checkWinner("X", winningCombos)).toBe(true);
    });
  
    it("returns false if player does not have three in a row", () => {
      // Set up the dummy DOM with non-winning combination
      document.getElementById("0").innerHTML = "X";
      document.getElementById("1").innerHTML = "O";
      document.getElementById("2").innerHTML = "X";
  
      expect(checkWinner("X", winningCombos)).toBe(false);
    });
  });