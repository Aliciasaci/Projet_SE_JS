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
}

export function setAppsToDarkTheme(theme) {
  setCalcToDarkTheme(theme);
  setClockToDarkTheme(theme);
  setTicTacToDarkTheme(theme);
  setParamToDarkTheme(theme);
}

export function setCalcToDarkTheme(theme){
  if (theme == "dark") {
    let keysInputs = document.querySelectorAll("input");
    let operationsPannel = document.querySelector("#operations-pannel");
    let resultInput = document.querySelector("#result-input");

    if (keysInputs && operationsPannel) {
      keysInputs.forEach(key =>{
        key.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
        key.style.color = "#FFF";
      })
      operationsPannel.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
      resultInput.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
    }
  }
}


export function setClockToDarkTheme(theme){
  if (theme == "dark") {
    let card = document.querySelector(".card");
    let digitalClockText = document.querySelector("#digital-clock");

    if (card && digitalClockText) {
      card.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
      digitalClockText.style.color = "#FFF";
    }
  }
}

export function setTicTacToDarkTheme(theme){
  //*already good ? 
}

export function setParamToDarkTheme(theme){
   if (theme == "dark") {
    let windowText = document.querySelector(".window-content *");
    let paramTitle = document.querySelector(".param-title");

    if (windowText && paramTitle) {
      windowText.style.color = "#f7f7f7";
      paramTitle.style.color = "#f7f7f7";

      // let paramWrappers = document.querySelector("#time-wrapper");
      // paramWrappers.style.backgroundColor = "rgba(13, 13, 13, 0.45)";
    }
  }
}

