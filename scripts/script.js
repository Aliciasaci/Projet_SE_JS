import { renderCalculatorBody, calculate } from "./Calculatrice.js";
import {
  renderVibrationBody,
  vibrate,
  renderParamsBody,
  renderTimeParams,
  renderDateParams,
  renderBatteryParams,
  setLockscreenPassword,
  renderNetworkParams,
  displayEtatVibration,
  saveCheckboxBatteryState,
  retrieveCheckboxBatteryState,
  displayDate,
  renderLockscreenParams,
  lockscreen,
  latency,
  startVibrate,
  renderThemeParams,
  themeCheckListeners,
  checkAppTheme,
  displayBatteryLevel,
  displayBatteryChargingState,
  exportAllLocalStorageToJsonFile,
  importAllLocalStorageFromJsonFile,
  saveCheckboxTimeState,
  retrieveCheckBoxTimeState,
  saveCheckBoxDateState,
  retrieveCheckBoxDateState,
} from "./Params.js";
import {
  render as renderTicTacToe,
  init as initTicTacToe,
} from "./tictactoe.js";
import { setTheme, setAppsToDarkTheme } from "./Theme.js";
import {
  renderClock,
  openTab,
  setClock,
  setDigitalClockTopBar,
  startPauseStopWatch,
  reset,
  lap,
  startPauseTimer,
  resetTimer,
} from "./clock.js";
import { lockscreenAtStart, notification } from "./Options.js";

//*variables
const calculatorIcon = document.querySelector("#calculator-icon");
const backgroundWindow = document.querySelector(".window");
const closeWindowButton = document.querySelector(".fa-xmark");
const reduceWindowButton = document.querySelector(".fa-minus");
const paramsIcon = document.querySelector("#params-icon");
const calculatorIconSmall = document.querySelector("#calculator-icon-small");
const paramsIconSmall = document.querySelector("#params-icon-small");
const clockIconSmall = document.querySelector("#clock-icon-small");
const main = document.querySelector("main");
const morpionsIconSmall = document.querySelector("#morpions-icon-small");
const windowContent = document.querySelector(".window-content");
const morpionIcon = document.querySelector("#tictactoe-icon");
const clockIcon = document.querySelector("#clock-icon");
const passwordValue = document.querySelector("#password");
let batteryNavDisplay = document.querySelector("#battery-nav");
const navDate = document.querySelector(".dateTime");
let hourNavDisplay = document.querySelector("#digital-clock-hour");
let minNavDisplay = document.querySelector("#digital-clock-min");
let secNavDisplay = document.querySelector("#digital-clock-sec");
let dateNavDisplay = document.querySelector("#date-nav");
let dayNavDisplay = document.querySelector("#date-day");
let monthNavDisplay = document.querySelector("#date-month");
let yearNavDisplay = document.querySelector("#date-year");

let morpionPanel = null;
let calculatorPanel = null;
let paramsPanel = null;
let clockPanel = null;
let displayedApp = "";
let openedApps = [];
let openedParams = [];
passwordValue.value = null;
let currentThemeChoice = null;

// if page fully loaded
window.addEventListener("load", () => {
  //*Starting animation
  const enterBtn = document.querySelector(".open_systeme_button");

  enterBtn.addEventListener("click", function () {
    //*if lockscreen activated
    lockscreenAtStart();
    if (main) {
      main.style.display = "block";
    }
  });
  
  //*network refresh time
  localStorage.setItem("refresh-time", 30);

  //* Display saved settings of the system
  //* saved theme display
  saveCheckboxThemeState();
  retrieveCheckboxThemeState();
  //* saved battery display
  retrieveCheckboxBatteryState(batteryNavDisplay);
  retrieveCheckBoxTimeState(hourNavDisplay, minNavDisplay, secNavDisplay);
  retrieveCheckBoxDateState(dateNavDisplay, dayNavDisplay, monthNavDisplay, yearNavDisplay);

  //* Setup vibration
  const allDom = document.querySelector("*");
  allDom.addEventListener("click", () => {
    if (localStorage.getItem("vibration-activate-check") == "true") {
      startVibrate();
    }
    displayEtatVibration();
  });

//* settings elements to be displayed in top bar
//* battery level and charging state
if (navigator.getBattery) {
    navigator.getBattery().then(function (battery) {
        displayBatteryLevel(battery);
        let batteryLevel = localStorage.getItem("battery-level");
        if (batteryLevel < 20) {
            document.getElementById("battery-level").style.color = "yellow";
            notification("Battérie failbe ! Veuillez recharger votre appareil");
        } else {
            document.getElementById("battery-level").style.color = "white";
        }
        displayBatteryChargingState(battery);

        battery.addEventListener("levelchange", function () {
            displayBatteryLevel(battery);
        });

        battery.addEventListener("chargingchange", function () {
            displayBatteryChargingState(battery);
        });
    });
}


  /**
   * * Retrieve the state of the theme checkbox from local storage
   */
  function retrieveCheckboxThemeState() {
    //* retrieve the saved states from session storage
    let checkbox = document.querySelector("#mode");
    let savedState = localStorage.getItem(checkbox.id);
    //* update the checkbox state and set the theme accordingly if theme checkbox is checked
    if (checkbox.id == "mode") {
      checkbox.checked = savedState === "true";
      setTheme(savedState === "true" ? "dark" : "light");
      if (savedState === "true") {
        currentThemeChoice = "dark";
      } else {
        currentThemeChoice = "light";
      }
      setAppsToDarkTheme(currentThemeChoice);
    } else {
      checkbox.checked = savedState === "true";
    }
  }
  /**
   * * Save the state of the theme checkbox to local storage
   */
  function saveCheckboxThemeState() {
    //* get all checkbox elements on the page
    let checkbox = document.querySelector("#mode");
    //* add an event listener for the change event to each checkbox
    checkbox.addEventListener("change", function () {
      //* get the current state of the checkbox
      let isChecked = checkbox.checked;
      //* save the state to session storage using the checkbox's id as the key
      localStorage.setItem(checkbox.id, isChecked);
      //* set the theme if theme checkbox is checked
      if (checkbox.id == "mode" && isChecked == true) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });
  }

  function saveCheckboxState() {
    //* get all checkbox elements on the page
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    //* add an event listener for the change event to each checkbox
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener("change", function () {
        let isChecked = checkbox.checked;
        localStorage.setItem(checkbox.id, isChecked);
      });
    });

    //* retrieve the saved states from local storage
    checkboxes.forEach(function (checkbox) {
      let savedState = localStorage.getItem(checkbox.id);
      //* update the checkbox state and set the theme accordingly if theme checkbox is checked
      if (checkbox.id == "mode") {
        checkbox.checked = savedState === "true";
      } else {
        checkbox.checked = savedState === "true";
      }
    });
  }
  saveCheckboxState();

  /**
   * * Elements to be displayed in top bar
   */
  //* Display or not date
  displayDate();

  
  //* Display or not time
  setDigitalClockTopBar();
  setInterval(setDigitalClockTopBar, 1000);

  //* Display or not vibration state
  displayEtatVibration();

  //* Display or not latency
  latency();

  //*render content of window
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
        break;

      case "clock":
        windowContent.insertAdjacentHTML("beforeend", renderClock());
        // define tab buttons
        let tabClock = document.querySelector("#clock-tab-btn");
        let tabStopWatch = document.querySelector("#stopwatch-tab-btn");
        let tabTimer = document.querySelector("#timer-tab-btn");
        tabClock.addEventListener("click", function (e) {
          openTab(e, "tab-clock");
          // define clock
          setClock();
          setInterval(setClock, 1000);
        });
        tabStopWatch.addEventListener("click", function (e) {
          openTab(e, "tab-stopwatch");
          let startPauseBtn = document.querySelector("#start-pause-stopwatch");
          startPauseBtn.addEventListener("click", function () {
            startPauseStopWatch();
          });
          let resetBtn = document.querySelector("#reset-stopwatch");
          resetBtn.addEventListener("click", function () {
            reset();
          });
          let lapBtn = document.querySelector("#lap-stopwatch");
          lapBtn.addEventListener("click", function () {
            lap();
          });
        });
        tabTimer.addEventListener("click", function (e) {
          openTab(e, "tab-timer");
          let idHour = document.querySelector("#timer-hour");
          idHour.defaultValue = "00";
          let idMin = document.querySelector("#timer-min");
          idMin.defaultValue = "00";
          let idSec = document.querySelector("#timer-sec");
          idSec.defaultValue = "00";
          idHour.onclick = function () {
            idHour.focus();
            idHour.value = "";
          };
          idMin.onclick = function () {
            idMin.focus();
            idMin.value = "";
          };
          idSec.onclick = function () {
            idSec.focus();
            idSec.value = "";
          };

          let startPauseBtn = document.querySelector("#start-pause-timer");
          startPauseBtn.addEventListener("click", function () {
            let hourValue = idHour.value;
            let minValue = idMin.value;
            let secValue = idSec.value;
            startPauseTimer(hourValue, minValue, secValue);
          });
          let resetBtn = document.querySelector("#reset-timer");
          resetBtn.addEventListener("click", function () {
            resetTimer();
          });
        });
        // define default tab to be displayed
        document.getElementById("clock-tab-btn").click();
        break;

      case "params":
        windowContent.insertAdjacentHTML("beforeend", renderParamsBody());
        break;
      default:
    }
    displayedApp = content;
    openedApps.push(content);
    if (currentThemeChoice) {
      setAppsToDarkTheme(currentThemeChoice);
    }
  };

  let drag = false;
  //*at click on calculator, display modal
  if (calculatorIcon) {
    calculatorIcon.addEventListener("mousedown", () => (drag = false));
    calculatorIcon.addEventListener("mousemove", () => (drag = true));

    calculatorIcon.addEventListener("mouseup", function () {
      if (drag) {
        return;
      } else {
        if (displayedApp == "calculator") {
          backgroundWindow.style.display = "block";
          calculatorPanel.style.display = "flex";
        } else if (openedApps.includes("calculator")) {
          showIconSmall(displayedApp);
          hideDisplayedApp(displayedApp);
          backgroundWindow.style.display = "block";
          calculatorPanel.style.display = "flex";
          displayedApp = "calculator";
        } else {
          showIconSmall(displayedApp);
          hideDisplayedApp(displayedApp);
          renderWindowContent("calculator");
          checkAppTheme();
          calculatorPanel = document.querySelector(".calculator-wrapper");
          backgroundWindow.style.display = "block";
        }
      }
    });
  }
  //*at click on morpion, display modal
  if (morpionIcon) {
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
          showIconSmall(displayedApp);
          hideDisplayedApp(displayedApp);
          backgroundWindow.style.display = "block";
          morpionPanel.style.display = "block";
          displayedApp = "tictactoe";
        } else {
          showIconSmall(displayedApp);
          hideDisplayedApp(displayedApp);
          renderWindowContent("tictactoe");
          checkAppTheme();
          morpionPanel = document.querySelector("#tictac");
          backgroundWindow.style.display = "block";
        }
      }
    });
  }

  //*at click on clock, display modal
  if (clockIcon) {
    clockIcon.addEventListener("mousedown", () => (drag = false));
    clockIcon.addEventListener("mousemove", () => (drag = true));

    clockIcon.addEventListener("mouseup", function () {
      if (drag) {
        return;
      } else {
        if (displayedApp == "clock") {
          backgroundWindow.style.display = "block";
          clockPanel.style.display = "block";
        } else if (openedApps.includes("clock")) {
          showIconSmall(displayedApp);
          hideDisplayedApp(displayedApp);
          backgroundWindow.style.display = "block";
          clockPanel.style.display = "block";
          displayedApp = "clock";
        } else {
          showIconSmall(displayedApp);
          hideDisplayedApp(displayedApp);
          renderWindowContent("clock");
          checkAppTheme();
          clockPanel = document.querySelector("#clock");
          backgroundWindow.style.display = "block";
        }
      }
    });
  }

  //*at click on params, display modal
  if (paramsIcon) {
    paramsIcon.addEventListener("mousedown", () => (drag = false));
    paramsIcon.addEventListener("mousemove", () => (drag = true));
    paramsIcon.addEventListener("mouseup", function () {
      if (drag) {
        return;
      } else {
        if (displayedApp == "params") {
          backgroundWindow.style.display = "block";
          paramsPanel.style.display = "block";
        } else if (openedApps.includes("params")) {
          showIconSmall(displayedApp);
          hideDisplayedApp(displayedApp);
          backgroundWindow.style.display = "block";
          paramsPanel.style.display = "block";
          displayedApp = "params";
        } else {
          showIconSmall(displayedApp);
          hideDisplayedApp(displayedApp);
          renderWindowContent("params");
          checkAppTheme();
          let mode = localStorage.getItem("mode");
          if (mode === "false") {
            setTheme("light");
          } else {
            setTheme("dark");
          }
          paramsPanel = document.querySelector("#params");
          backgroundWindow.style.display = "block";
          paramsPanel.style.display = "block";
        }
      }

      //* display param options
      const paramOptions = document.getElementById("params-icons").children;
      for (const param of paramOptions) {
        param.addEventListener("click", function () {
          let paramId = param.getAttribute("id");
          paramsPanel.style.display = "none";
          switch (paramId) {
            case "params-vibration":
              if (
                openedParams !== undefined &&
                openedParams.includes("vibration-wrapper")
              ) {
                document.querySelector("#vibration-wrapper").style.display =
                  "block";
              } else {
                windowContent.insertAdjacentHTML(
                  "beforeend",
                  renderVibrationBody()
                );
                openedParams.push("vibration-wrapper");
                saveCheckboxState();
                checkAppTheme();
                vibrate();
                const retourBtn = document.querySelector(".retour-btn-vibration")
                retourBtn.addEventListener("click", function () {
                  document.querySelector("#vibration-wrapper").style.display =
                                "none";
                  document.querySelector("#params").style.display = "block";
                })
              }
              break;
            case "params-time":
              if (
                openedParams !== undefined &&
                openedParams.includes("time-wrapper")
              ) {
                document.querySelector("#time-wrapper").style.display = "block";
              } else {
                windowContent.insertAdjacentHTML(
                  "beforeend",
                  renderTimeParams()
                );
                saveCheckboxState();
                checkAppTheme();
                openedParams.push("time-wrapper");
                let checkboxHour = document.querySelector("#hour-display-check");
                let checkboxMin = document.querySelector("#min-display-check");
                let checkboxSec = document.querySelector("#sec-display-check");

                let hourNavDisplay = document.querySelector("#digital-clock-hour");
                let minNavDisplay = document.querySelector("#digital-clock-min");
                let secNavDisplay = document.querySelector("#digital-clock-sec");

                saveCheckboxTimeState(checkboxHour, checkboxMin, checkboxSec, hourNavDisplay, minNavDisplay, secNavDisplay);
                retrieveCheckBoxTimeState(hourNavDisplay, minNavDisplay, secNavDisplay, checkboxHour, checkboxMin, checkboxSec);


                //**Bouton retour */
                const retourBtn = document.querySelector(".retour-btn-time");
                retourBtn.addEventListener("click", function () {
                  document.querySelector("#time-wrapper").style.display =
                    "none";
                  document.querySelector("#params").style.display = "block";
                });
              }
              break;
            case "params-date":
              if (
                openedParams !== undefined &&
                openedParams.includes("date-wrapper")
              ) {
                document.querySelector("#date-wrapper").style.display = "block";
              } else {
                windowContent.insertAdjacentHTML(
                  "beforeend",
                  renderDateParams()
                );
                saveCheckboxState();
                checkAppTheme();
                openedParams.push("date-wrapper");
                const retourBtn = document.querySelector(".retour-btn-date");
                retourBtn.addEventListener("click", function () {
                  document.querySelector("#date-wrapper").style.display =
                    "none";
                  document.querySelector("#params").style.display = "block";
                });

                let checkboxDate = document.querySelector("#date-display-check");
                let checkboxDay = document.querySelector("#day-display-check");
                let checkboxMonth = document.querySelector("#month-display-check");
                let checkboxYear = document.querySelector("#year-display-check");

                let dateNavDisplay = document.querySelector("#date-nav");
                let dayNavDisplay = document.querySelector("#date-day");
                let monthNavDisplay = document.querySelector("#date-month");
                let yearNavDisplay = document.querySelector("#date-year");

                saveCheckBoxDateState(checkboxDate, checkboxDay, checkboxMonth, checkboxYear, dateNavDisplay, dayNavDisplay, monthNavDisplay, yearNavDisplay);
                retrieveCheckBoxDateState(dateNavDisplay, dayNavDisplay, monthNavDisplay, yearNavDisplay, checkboxDate, checkboxDay, checkboxMonth, checkboxYear);
              }
              break;
            case "params-battery":
              if (
                openedParams !== undefined &&
                openedParams.includes("battery-wrapper")
              ) {
                document.querySelector("#battery-wrapper").style.display =
                  "block";
              } else {
                windowContent.insertAdjacentHTML(
                  "beforeend",
                  renderBatteryParams()
                );
                checkAppTheme();
                openedParams.push("battery-wrapper");
                let checkbox = document.querySelector("#battery-display-check");
                let batteryNavDisplay = document.querySelector("#battery-nav");
                saveCheckboxBatteryState(checkbox, batteryNavDisplay);
                retrieveCheckboxBatteryState(batteryNavDisplay, checkbox);
                //**Button de retour */
                const retourBtn = document.querySelector(".retour-btn-battery");
                retourBtn.addEventListener("click", function () {
                  document.querySelector("#battery-wrapper").style.display =
                    "none";
                  document.querySelector("#params").style.display = "block";
                });
              }
              break;
            case "params-network":
              if (
                openedParams !== undefined &&
                openedParams.includes("network-wrapper")
              ) {
                document.querySelector("#network-wrapper").style.display =
                  "block";
              } else {
                windowContent.insertAdjacentHTML(
                  "beforeend",
                  renderNetworkParams()
                );
                latency();
                saveCheckboxState();
                checkAppTheme();
                openedParams.push("network-wrapper");
                //**Button de retour */
                const retourBtn = document.querySelector(".retour-btn-network");
                retourBtn.addEventListener("click", function () {
                  document.querySelector("#network-wrapper").style.display =
                    "none";
                  document.querySelector("#params").style.display = "block";
                });                
              }
              setAppsToDarkTheme(currentThemeChoice);
              break;
            case "params-lockscreen":
              if (
                openedParams != undefined &&
                openedParams.includes("lockscreen-wrapper")
              ) {
                document.querySelector("#lockscreen-wrapper").style.display =
                  "block";
              } else {
                windowContent.insertAdjacentHTML(
                  "beforeend",
                  renderLockscreenParams()
                );
                checkAppTheme();
                if (localStorage.getItem("lockscreen") == "activated") {
                  document.querySelector(
                    "#lockscreen-display-check"
                  ).checked = true;
                }
                document
                  .querySelector("#lockscreen-display-check")
                  .addEventListener("click", function () {
                    lockscreen();
                  });
                document
                  .querySelector("#lockscreen-password")
                  .addEventListener("click", function () {
                    setLockscreenPassword();
                  });

                openedParams.push("lockscreen-wrapper");
                //**Button de retour */
                const retourBtn = document.querySelector(".retour-btn-lockscreen");
                retourBtn.addEventListener("click", function () {
                  document.querySelector("#lockscreen-wrapper").style.display =
                    "none";
                  document.querySelector("#params").style.display = "block";
                });                
              }
              break;
            case "params-theme":
              if (
                openedParams !== undefined &&
                openedParams.includes("theme-wrapper")
              ) {
                document.querySelector("#theme-wrapper").style.display =
                  "block";
              } else {
                windowContent.insertAdjacentHTML(
                  "beforeend",
                  renderThemeParams()
                );
                saveCheckboxState();
                themeCheckListeners();
                openedParams.push("theme-wrapper");
                //**Button de retour */
                const retourBtn = document.querySelector(".retour-btn-theme");
                retourBtn.addEventListener("click", function () {
                  document.querySelector("#theme-wrapper").style.display =
                    "none";
                  document.querySelector("#params").style.display = "block";
                });
              }
              break;
          }
        });
      }
      const importbtn = document.querySelector("#import-btn");
      importbtn.addEventListener("click", function () {
        importAllLocalStorageFromJsonFile();
      });
      const exportbtn = document.querySelector("#export-btn");
      exportbtn.addEventListener("click", function () {
        exportAllLocalStorageToJsonFile();
      });
    });
  }

  //* close window and app at clic on x
  closeWindowButton.addEventListener("click", function () {
    backgroundWindow.style.display = "none";
    let temp;
    let temp2;
    if (displayedApp === "tictactoe") {
      morpionsIconSmall.style.display = "none";
      displayedApp = "";
      windowContent.removeChild(morpionPanel);
      temp = openedApps.filter((app) => app !== "tictactoe");
    }
    if (displayedApp === "calculator") {
      calculatorIconSmall.style.display = "none";
      displayedApp = "";
      windowContent.removeChild(calculatorPanel);
      temp = openedApps.filter((app) => app !== "calculator");
    }
    if (displayedApp === "clock") {
      clockIconSmall.style.display = "none";
      displayedApp = "";
      windowContent.removeChild(clockPanel);
      temp = openedApps.filter((app) => app !== "clock");
    }
    if (displayedApp === "params") {
      //close choice password pannel
      let PasswordChoicePannel = document.querySelector(
        "#password-choice-pannel"
      );
      if (PasswordChoicePannel) {
        PasswordChoicePannel.style.display = "none";
      }

      //close domaine ping pannel
      let domaineToPingPannel = document.querySelector("#server-ping-modal");
      if (domaineToPingPannel) {
        domaineToPingPannel.style.display = "none";
      }

      paramsIconSmall.style.display = "none";
      displayedApp = "";
      windowContent.removeChild(paramsPanel);
      temp = openedApps.filter((app) => app !== "params");
      if (openedParams !== undefined) {
        openedParams.forEach((param) => {
          windowContent.removeChild(document.querySelector(`#${param}`));
          temp2 = openedParams.filter((param) => param !== param);
          openedParams = temp2;
        });
      }
    }
    openedApps = temp;
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
    if (displayedApp === "clock") {
      clockIconSmall.style.display = "block";
    }
    if (displayedApp === "params") {
      paramsIconSmall.style.display = "block";
      openedParams.forEach((param) => {
        document.querySelector(`#${param}`).style.display = "none";
      });

      let PasswordChoicePannel = document.querySelector(
        "#password-choice-pannel"
      );
      if (PasswordChoicePannel) {
        PasswordChoicePannel.style.display = "none";
      }
    }
    displayedApp = "";
  });

  function showIconSmall(displayedApp) {
    if (displayedApp === "calculator") {
      calculatorIconSmall.style.display = "block";
    }
    if (displayedApp === "tictactoe") {
      morpionsIconSmall.style.display = "block";
    }
    if (displayedApp === "clock") {
      clockIconSmall.style.display = "block";
    }
    if (displayedApp === "params") {
      paramsIconSmall.style.display = "block";
    }
  }

  //* at click on small icon of calc, display
  calculatorIconSmall.addEventListener("click", function () {
    if (backgroundWindow.style.display === "none") {
      backgroundWindow.style.display = "block";
      calculatorPanel.style.display = "flex";
    } else if (displayedApp !== "calculator") {
      hideDisplayedApp(displayedApp);
      calculatorPanel.style.display = "flex";
    }
    displayedApp = "calculator";
  });

  //* at click on small icon of params, display
  paramsIconSmall.addEventListener("click", function () {
    if (backgroundWindow.style.display === "none") {
      backgroundWindow.style.display = "block";
      paramsPanel.style.display = "block";
    } else if (displayedApp !== "params") {
      hideDisplayedApp(displayedApp);
      paramsPanel.style.display = "block";
    }
    displayedApp = "params";
  });

  //* at click on small icon of clock, display
  clockIconSmall.addEventListener("click", function () {
    if (backgroundWindow.style.display === "none") {
      backgroundWindow.style.display = "block";
      clockPanel.style.display = "block";
    } else if (displayedApp !== "clock") {
      hideDisplayedApp(displayedApp);
      clockPanel.style.display = "block";
    }
    displayedApp = "clock";
  });

  //* at click on small icon of morpion, display
  morpionsIconSmall.addEventListener("click", function () {
    if (backgroundWindow.style.display === "none") {
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
      case "clock":
        clockPanel.style.display = "none";
        break;
      case "params":
        paramsPanel.style.display = "none";
      default:
        break;
    }
  };
});

window.addEventListener("beforeunload", () => {
  function saveCheckboxState() {
    //* get all checkbox elements on the page
    let checkboxes = document.querySelectorAll("input[type=checkbox]");
    //* add an event listener for the change event to each checkbox
    checkboxes.forEach(function (checkbox) {
      let isChecked = checkbox.checked;
      localStorage.setItem(checkbox.id, isChecked);
    });
  }
  saveCheckboxState();
});
