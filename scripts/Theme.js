//* set the theme
export function setTheme(theme) {
  let window = document.querySelector(".window");
  let windowUpperBar = document.querySelector(".window-upper-btns");
  let startingPage = document.querySelector("#starting-page");
  let windowReduceBtn = document.querySelector(".fa-minus");

  if (theme == "dark") {
    //*dark mode
    window.removeAttribute("class");
    window.setAttribute("class", "window center darkglass");

    if (windowUpperBar) {
      windowUpperBar.style.backgroundColor = "rgba(14, 14, 14, 0.7)";
    }
    if (startingPage) {
      startingPage.style.backgroundColor = "#1d1d1d";
    }
    if (windowReduceBtn) {
      windowReduceBtn.style.color = "#FFF";
    }

    document.body.style.backgroundImage = "url('assets/bg_9.jpg')";
  } else if (theme == "light") {
    //*light mode
    window.removeAttribute("class");
    window.setAttribute("class", "window center glass");

    if (windowUpperBar) {
      windowUpperBar.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    }

    document.body.style.backgroundImage = "url('assets/bg_6.jpg')";
  }
  setAppsToDarkTheme(theme);
}

export function setAppsToDarkTheme(theme) {
  setCalcToDarkTheme(theme);
  setClockToDarkTheme(theme);
  setTicTacToDarkTheme(theme);
  setParamToDarkTheme(theme);
}

export function setCalcToDarkTheme(theme) {
  if (theme == "dark") {
    let keysInputs = document.querySelectorAll("input");
    let operationsPannel = document.querySelector("#operations-pannel");
    let resultInput = document.querySelector("#result-input");

    if (keysInputs && operationsPannel) {
      keysInputs.forEach((key) => {
        key.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
        key.style.color = "#FFF";
      });
      operationsPannel.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
      resultInput.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
    }
  }
}

export function setClockToDarkTheme(theme) {
  if (theme == "dark") {
    let card = document.querySelector(".card");
    let digitalClockText = document.querySelector("#digital-clock");

    if (card && digitalClockText) {
      card.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
      digitalClockText.style.color = "#FFF";
    }
  }
}

export function setTicTacToDarkTheme(theme) {
  let tictacbuttons = document.querySelectorAll(".button-option");
  let tictacOperations = document.querySelectorAll(".op");
  if (theme === "dark") {
    if (tictacbuttons && tictacOperations) {
      tictacbuttons.forEach((button) => {
        button.classList.add("darkglass");
      });
      tictacOperations.forEach((op) => {
        op.classList.add("darkbtn");
      });
    }
  } else {
    if (tictacbuttons && tictacOperations) {
      tictacbuttons.forEach((button) => {
        button.classList.remove("darkglass");
      });
      tictacOperations.forEach((op) => {
        op.classList.remove("darkbtn");
      });
    }
  }
}

export function setParamToDarkTheme(theme) {
  let paramWrappers = document.querySelectorAll(".param-wrap");
  let windowText = document.querySelector("#params-icons");
  let paramTitle = document.querySelector(".param-title");

  if (theme == "dark") {
    if (windowText && paramTitle) {
      windowText.classList.add("darkcontent");
      paramTitle.classList.add("darkcontent");
      console.log("darkcontent");
    }
    paramWrappers.forEach((wrapper) => {
      wrapper.classList.add("darkparams");
    });
  } else {
    if (windowText && paramTitle) {
      windowText.classList.remove("darkcontent");
      paramTitle.classList.remove("darkcontent");
    }
    paramWrappers.forEach((wrapper) => {
      wrapper.classList.remove("darkparams");
    });
  }
}
