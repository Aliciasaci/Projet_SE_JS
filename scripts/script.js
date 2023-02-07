
import { renderCalculatorBody, calculate } from "./Calculatrice.js";
import { renderVibrationBody, vibrate } from "./Params.js";
import { DivisionError } from "./ExceptionsClasses.js";
import {
  render as renderTicTacToe,
  init as initTicTacToe,
} from "./tictactoe.js";

//*variables
const switchModeBtn = document.querySelector("#switch-mode-btn");
const calculatorIcon = document.querySelector("#calculator-icon");
const backgroundWindow = document.querySelector(".window");
const closeWindowButton = document.querySelector(".fa-xmark");
const reduceWindowButton = document.querySelector(".fa-minus");

const paramsIcon = document.querySelector("#params-icon");
const paramsBody = document.querySelector("#params"); //c'est pas présent dans le DOM ça
const calculatorIconSmall = document.querySelector("#calculator-icon-small");
const paramsIconSmall = document.querySelector("#params-icon-small");
const header = document.querySelector("header");
const main = document.querySelector("main");
const morpionsIconSmall = document.querySelector("#morpions-icon-small");
const operationsPannel = document.querySelector("#operations-pannel");
const paramVibration = document.querySelector("#params-vibration");
const calculatorWrapper = document.querySelector(".calculator-wrapper");
const windowContent = document.querySelector(".window-content");
const morpionIcon = document.querySelector("#tictactoe-icon");
const clockIcon = document.querySelector("#clock-icon");
const windowBar = document.querySelector(".window-upper-btns");
let morpionPanel = null;
let calculatorPanel = null;
let errorMessage = "";
let displayedApp = "";
let openedApps = [];

// if page fully loaded
window.addEventListener("load", () => {

  //* set the theme
  function setTheme(theme) {
    if (theme == "dark") {
      //dark mode
      document.body.style.backgroundImage = "url('assets/bg_9.jpg')";
      switchModeBtn.style.filter = "invert(100%)";
      setCookie("theme", "dark", 30);
    } else if (theme == "light") {
      //light mode
      document.body.style.backgroundImage =
        "url('assets/bg_6.jpg')";
      switchModeBtn.style.filter = "invert(0%)";
      setCookie("theme", "light", 30);
    }
  }

const enterBtn = document.querySelector(".open_systeme_button");
const startingPage = document.querySelector("#starting-page");

enterBtn.addEventListener("click", function () {
  var audio = new Audio("../assets/sounds/Bling.m4a");
  audio.play();

  let animation = startingPage.animate([{ opacity: 1 }, { opacity: 0 }], {
    duration: 1000,
    easing: "linear",
  });

  animation.finished.then(() => {
    //*at click on button, display the elements.
    if (header) {
      header.style.display = "block";
    }

    if (startingPage) {
      startingPage.style.display = "none";
    }
    });
});

  const renderWindowContent = (content) => {
    switch (content) {
      case "tictactoe":
        windowContent.insertAdjacentHTML("beforeend", renderTicTacToe());
        initTicTacToe();
        break;
      case "calculator":
        windowContent.insertAdjacentHTML("beforeend", renderCalculatorBody());
        const keys = document.querySelectorAll(".keys input");

        if (keys) {
          keys.forEach((key) => {
            key.addEventListener("click", function () {
              calculate(key);
            });
          });
        }
      default:
        break;
    }
    displayedApp = content;
    openedApps.push(content);
  };

  let drag = false;

  calculatorIcon.addEventListener("mousedown", () => (drag = false));
  calculatorIcon.addEventListener("mousemove", () => (drag = true));

  //*at click on calculator, display modal
  if (calculatorIcon) {
    calculatorIcon.addEventListener("mouseup", function () {
      if (drag) {
        return;
      } else {
        if (displayedApp == "calculator") {
          backgroundWindow.style.display = "block";
          calculatorPanel.style.display = "flex";
        } else if (openedApps.includes("calculator")) {
          backgroundWindow.style.display = "block";
          calculatorPanel.style.display = "flex";
          displayedApp = "calculator";
        } else {
          renderWindowContent("calculator");
          calculatorPanel = document.querySelector(".calculator-wrapper");
          backgroundWindow.style.display = "block";
        }
      }
    });
  }

 
  morpionIcon.addEventListener("mousedown", () => (drag = false));
  morpionIcon.addEventListener("mousemove", () => (drag = true));

  morpionIcon.addEventListener("mouseup", function () {
    if (drag) {
      return;
    } else {
      if (displayedApp == "tictactoe") {
        backgroundWindow.style.display = "block";
        morpionPanel.style.display = "block";
      } else if (openedApps.includes("tictactoe")) {
        backgroundWindow.style.display = "block";
        morpionPanel.style.display = "block";
        displayedApp = "tictactoe";
      } else {
        renderWindowContent("tictactoe");
        morpionPanel = document.querySelector("#tictac");
        backgroundWindow.style.display = "block";
      }
    }
  });

  paramsIcon.addEventListener("mousedown", () => (drag = false));
  paramsIcon.addEventListener("mousemove", () => (drag = true));

  //* at click on params, display tout les paramètres
    paramsIcon.addEventListener("mouseup", function () { // comme le paramsBody n'est pas présent dans le DOM, il faut changer cette fonction
      if (drag) {
        return;
      } else {
        backgroundWindow.style.display = "block";
        paramsBody.style.display = "block";

        const paramOptions = document.getElementById("params-icons").children;

        for (const param of paramOptions) {
          param.addEventListener("click", function () {
          let paramId = param.getAttribute("id");
            switch (paramId) {
              case "params-vibration":
                const vibrationBodyString = renderVibrationBody();
                windowContent.innerHTML = vibrationBodyString;
                vibrate();
              break;
            }
          });
        }
      }
    });


  //* function to create and set cookies
  //! le store du theme ne marche pas sur opera
  function setCookie(cookiName, cookieValue, expireDate) {
    const d = new Date();
    d.setTime(d.getTime() + expireDate * 24 * 60 * 60 * 1000);
    let expiresAt = "expires=" + d.toUTCString();
    document.cookie =
      cookiName + "=" + cookieValue + ";" + expiresAt + ";path=/";
  }

  //* function that returns a cookie and it value
  function getCookie(cookiName) {
    let cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i].trim().split("=");
      if (cookiName == cookie[0]) {
        return cookie;
      }
    }
  }

  //* at load, check the cookie variable to set the theme
  if (getCookie("theme")) {
    const themeCookie = getCookie("theme");
    if (themeCookie[1] == undefined || themeCookie == "light") {
      setTheme("light"); //par défaut, c'est à light
    } else if (themeCookie[1] == "dark") {
      setTheme("dark");
    }
  }

  //* switch theme btn
  if (switchModeBtn) {
    let nbClickMode = 0;
    switchModeBtn.addEventListener("click", function () {
      if (nbClickMode % 2 == 0) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
      nbClickMode++;
    });
  }

  //* close window and app at clic on x
    closeWindowButton.addEventListener("click", function () {
      backgroundWindow.style.display = "none";
      if (displayedApp === "tictactoe") {
        morpionsIconSmall.style.display = "none";
        displayedApp = "";
        windowContent.removeChild(morpionPanel);
        if (openedApps.length === 1) {
          openedApps = [];
        } else {
          openedApps.filter(app => app !== 'tictactoe');
        }
      }
      if (displayedApp === "calculator") {
        calculatorIconSmall.style.display = "none";
        displayedApp = "";
        windowContent.removeChild(calculatorPanel);
        if (openedApps.length === 1) {
          openedApps = [];
        } else {
          openedApps.filter(app => app !== 'calculator');
        }
      }
    });

  //* reduce window and app at clic on -
    reduceWindowButton.addEventListener("click", function () {
      backgroundWindow.style.display = "none";
      hideDisplayedApp(displayedApp);
      if (displayedApp === "calculator") {
        calculatorIconSmall.style.display = "block";
      }
      if (displayedApp === "tictactoe") {
        morpionsIconSmall.style.display = "block";
      }
      displayedApp = "";
    });

  //* at click on small icon of calc, display
  calculatorIconSmall.addEventListener("click", function () {
    if ((backgroundWindow.style.display = "none")) {
      backgroundWindow.style.display = "block";
      calculatorPanel.style.display = "flex";
    } else if (displayedApp !== "calculator") {
      hideDisplayedApp(displayedApp);
      calculatorPanel.style.display = "flex";
    }
    displayedApp = "calculator";
  });

  //* at click on small icon of calc, display
  paramsIconSmall.addEventListener("click", function () { //la meme ici (paramsBody pas dans le DOM)
    if (paramsBody.style.display == "none") {
      backgroundWindow.style.display = "block";
      paramsBody.style.display = "block";
    }
  });

  morpionsIconSmall.addEventListener("click", function () {
    if ((backgroundWindow.style.display = "none")) {
      backgroundWindow.style.display = "block";
      morpionPanel.style.display = "block";
    } else if (displayedApp !== "tictactoe") {
      hideDisplayedApp(displayedApp);
      morpionPanel.style.display = "block";
    }
    displayedApp = "tictactoe";
  });

  const hideDisplayedApp = (displayedApp) => {
    switch (displayedApp) {
      case "tictactoe":
        morpionPanel.style.display = "none";
        break;
      case "calculator":
        calculatorPanel.style.display = "none";
        break;
      default:
        break;
    }
  };

  const dragElement = (elmnt) => {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  };


    if (enterBtn) {
      enterBtn.style.display = "none";
    }

    if (main) {
      main.style.display = "block";
    }
      
  dragElement(backgroundWindow);

  let isDragging = false;

  document.addEventListener("mousedown", function (event) {
    let dragElement = event.target.closest(".draggable");

    if (!dragElement) return;

    event.preventDefault();

    dragElement.ondragstart = function () {
      return false;
    };

    let coords, shiftX, shiftY;

    startDrag(dragElement, event.clientX, event.clientY);

    function onMouseUp(event) {
      finishDrag();
    }

    function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
    }

    // on drag start:
    //   remember the initial shift
    //   move the element position:fixed and a direct child of body
    function startDrag(element, clientX, clientY) {
      if (isDragging) {
        return;
      }

      isDragging = true;

      document.addEventListener("mousemove", onMouseMove);
      element.addEventListener("mouseup", onMouseUp);

      shiftX = clientX - element.getBoundingClientRect().left;
      shiftY = clientY - element.getBoundingClientRect().top;

      element.style.position = "fixed";

      moveAt(clientX, clientY);
    }

    // switch to absolute coordinates at the end, to fix the element in the document
    function finishDrag() {
      if (!isDragging) {
        return;
      }

      isDragging = false;

      dragElement.style.top =
        parseInt(dragElement.style.top) + window.pageYOffset + "px";
      dragElement.style.position = "absolute";

      document.removeEventListener("mousemove", onMouseMove);
      dragElement.removeEventListener("mouseup", onMouseUp);
    }

    function moveAt(clientX, clientY) {
      // new window-relative coordinates
      let newX = clientX - shiftX;
      let newY = clientY - shiftY;

      // check if the new coordinates are below the bottom window edge
      let newBottom = newY + dragElement.offsetHeight; // new bottom

      // below the window? let's scroll the page
      if (newBottom > document.documentElement.clientHeight) {
        // window-relative coordinate of document end
        let docBottom = document.documentElement.getBoundingClientRect().bottom;

        // scroll the document down by 10px has a problem
        // it can scroll beyond the end of the document
        // Math.min(how much left to the end, 10)
        let scrollY = Math.min(docBottom - newBottom, 10);

        // calculations are imprecise, there may be rounding errors that lead to scrolling up
        // that should be impossible, fix that here
        if (scrollY < 0) scrollY = 0;

        window.scrollBy(0, scrollY);

        // a swift mouse move make put the cursor beyond the document end
        // if that happens -
        // limit the new Y by the maximally possible (right at the bottom of the document)
        newY = Math.min(
          newY,
          document.documentElement.clientHeight - dragElement.offsetHeight
        );
      }

      // check if the new coordinates are above the top window edge (similar logic)
      if (newY < 0) {
        // scroll up
        let scrollY = Math.min(-newY, 10);
        if (scrollY < 0) scrollY = 0; // check precision errors

        window.scrollBy(0, -scrollY);
        // a swift mouse move can put the cursor beyond the document start
        newY = Math.max(newY, 0); // newY may not be below 0
      }

      // limit the new X within the window boundaries
      // there's no scroll here so it's simple
      if (newX < 0) newX = 0;
      if (
        newX >
        document.documentElement.clientWidth - dragElement.offsetWidth
      ) {
        newX = document.documentElement.clientWidth - dragElement.offsetWidth;
      }

      dragElement.style.left = newX + "px";
      dragElement.style.top = newY + "px";
    }
  });
});
