import { renderCalculatorBody, calculate } from "./Calculatrice.js";
import {
  renderVibrationBody,
  vibrate,
  renderParamsBody,
  renderTimeParams,
  renderDateParams,
  renderBatteryParams,
  renderNetworkParams,
  displayEtatVibration,
  displayTimeTopBar,
  saveCheckboxBatteryState,
  retrieveCheckboxBatteryState,
  displayCheckedValues,
  dateCheckListeners,
  retrieveCheckboxDisplayState,
  renderLockscreenParams, lockscreen, setLockscreenPassword 
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
import { lockscreenAtStart } from "./Options.js";

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
let vibrationIconOn = document.querySelector("#vibration-icon-on");
let vibrationIconOff = document.querySelector("#vibration-icon-off");
const windowBar = document.querySelector(".window-upper-btns");
const batteryNav = document.querySelector("#battery-nav");
const hourNav = document.querySelector("#digital-clock-hour");
const minNav = document.querySelector("#digital-clock-min");
const secNav = document.querySelector("#digital-clock-sec");
const navDate = document.querySelector(".dateTime");
let theme = localStorage.getItem("mode");

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

  //* Display saved settings of the system
  //* saved theme display
  saveCheckboxThemeState();
  retrieveCheckboxThemeState();
  //* saved battery display
  retrieveCheckboxBatteryState(batteryNavDisplay);
  //* savec vibration display
  retrieveCheckboxDisplayState(vibrationIconOn, vibrationIconOff);

  //* settings elements to be displayed in top bar
  //* battery level
  if (navigator.getBattery) {
    //* check if the browser supports the Battery Status API
    navigator.getBattery().then(function (battery) {
      let level = battery.level * 100; //* get the current battery level and multiply by 100 to get a percentage
      document.getElementById("battery-level").innerText = level + "%";
      if (level < 99) {
        document.getElementById("battery-level").style.color = "yellow";
      }
    });
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
        currentThemeChoice = "else";
      }
      setAppsToDarkTheme(currentThemeChoice);
    } else {
      checkbox.checked = savedState === "true";
      /**
       * * Display saved settings of the system
       */
      //* saved theme display
      saveCheckboxThemeState();
      retrieveCheckboxThemeState();
      //* saved battery display
      retrieveCheckboxBatteryState(batteryNavDisplay);
      //* settings elements to be displayed in top bar
      //* battery level
      if (navigator.getBattery) {
        //* check if the browser supports the Battery Status API
        navigator.getBattery().then(function (battery) {
          let level = battery.level * 100; //* get the current battery level and multiply by 100 to get a percentage
          document.getElementById("battery-level").innerText = level + "%";
          if (level < 99) {
            document.getElementById("battery-level").style.color = "yellow";
          }
        });
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
  }

  //* time to be displayed in top bar
  setDigitalClockTopBar();
  setInterval(setDigitalClockTopBar, 1000);

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
  
  //* Display or not vibration state 
  displayEtatVibration();
  
  //* time to be displayed in top bar
  setDigitalClockTopBar();
  setInterval(setDigitalClockTopBar, 1000);
  //* settings elements to be displayed in top bar
  let dayDisplayCheck = localStorage.getItem("date-display-check");
  if (dayDisplayCheck === "false" || dayDisplayCheck === null) {
    navDate.innerHTML = "";
  } else {
    navDate.innerHTML = displayCheckedValues(
      localStorage.getItem("day-display-check"),
      localStorage.getItem("month-display-check"),
      localStorage.getItem("year-display-check")
    );
  }

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
            console.log(hourValue, minValue, secValue);
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
          console.log("tictactoe already opened");
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
          console.log("clock already opened");
          backgroundWindow.style.display = "block";
          clockPanel.style.display = "block";
          displayedApp = "clock";
        } else {
          renderWindowContent("clock");
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
          console.log("params already opened");
          backgroundWindow.style.display = "block";
          paramsPanel.style.display = "block";
          displayedApp = "params";
        } else {
          renderWindowContent("params");
          paramsPanel = document.querySelector("#params");
          backgroundWindow.style.display = "block";
          paramsPanel.style.display = "block"; //*investiguer prq ça necessite 2 clique
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
                vibrate();
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
                openedParams.push("time-wrapper");
                displayTimeTopBar();
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
                dateCheckListeners();
                saveCheckboxState();
                openedParams.push("date-wrapper");
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
                openedParams.push("battery-wrapper");
                let checkbox = document.querySelector("#battery-display-check");
                let batteryNavDisplay = document.querySelector("#battery-nav");
                saveCheckboxBatteryState(checkbox, batteryNavDisplay);
                retrieveCheckboxBatteryState(batteryNavDisplay, checkbox);
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
                openedParams.push("network-wrapper");
              }
              setAppsToDarkTheme(currentThemeChoice);
              break;
            case "params-lockscreen":
              if (
                openedParams !== undefined &&
                openedParams.includes("lockscreen-wrapper")
              ) {
                document.querySelector("#lockscreen-wrapper").style.display =
                  "block";
              } else {
                windowContent.insertAdjacentHTML(
                  "beforeend",
                  renderLockscreenParams()
                );
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
              }
              break;
          }
        });
      }
    });
  }

  //* close window and app at clic on x
  closeWindowButton.addEventListener("click", function () {
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
            backgroundWindow.style.display = "block";
            clockPanel.style.display = "block";
            displayedApp = "clock";
          } else {
            renderWindowContent("clock");
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
            backgroundWindow.style.display = "block";
            paramsPanel.style.display = "block";
            displayedApp = "params";
          } else {
            renderWindowContent("params");
            paramsPanel = document.querySelector("#params");
            backgroundWindow.style.display = "block";
            paramsPanel.style.display = "block"; //*investiguer prq ça necessite 2 clique
          }
        }

        //* display param options
        const paramOptions = document.getElementById("params-icons").children;
        for (const param of paramOptions) {
          param.addEventListener("click", function () {
            let paramId = param.getAttribute("id");
            //windowContent.innerHTML = "";   //remettre le contenu de windows à rien. pas sure que ce soit la meilleure manière de faire ça.
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
                  vibrate();
                }
                break;
              case "params-time":
                if (
                  openedParams !== undefined &&
                  openedParams.includes("time-wrapper")
                ) {
                  document.querySelector("#time-wrapper").style.display =
                    "block";
                } else {
                  windowContent.insertAdjacentHTML(
                    "beforeend",
                    renderTimeParams()
                  );
                  saveCheckboxState();
                  openedParams.push("time-wrapper");
                  displayTimeTopBar();
                }
                break;
              case "params-date":
                if (
                  openedParams !== undefined &&
                  openedParams.includes("date-wrapper")
                ) {
                  document.querySelector("#date-wrapper").style.display =
                    "block";
                } else {
                  windowContent.insertAdjacentHTML(
                    "beforeend",
                    renderDateParams()
                  );
                  dateCheckListeners();
                  saveCheckboxState();
                  openedParams.push("date-wrapper");
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
                  openedParams.push("battery-wrapper");
                  let checkbox = document.querySelector(
                    "#battery-display-check"
                  );
                  let batteryNavDisplay =
                    document.querySelector("#battery-nav");
                  saveCheckboxBatteryState(checkbox, batteryNavDisplay);
                  retrieveCheckboxBatteryState(batteryNavDisplay, checkbox);
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
                  saveCheckboxState();
                  openedParams.push("network-wrapper");
                  let select = document.querySelector(".refresh-time-select");
                  let options = document.querySelectorAll(
                    ".refresh-time-select option"
                  );
                  select.addEventListener("mousedown", function (event) {
                    event.stopPropagation();
                  });
                  select.addEventListener("mouseup", function (event) {
                    event.stopPropagation();
                  });
                  options.forEach(function (option) {
                    option.addEventListener("mousedown", function (event) {
                      event.stopPropagation();
                    });
                    option.addEventListener("mouseup", function (event) {
                      event.stopPropagation();
                    });
                  });

                  const refreshTimeSelect = document.getElementById(
                    "refresh-time-select"
                  );
                  refreshTimeSelect.addEventListener("change", () => {
                    clearInterval();
                    let networkLatencyRefreshTime = refreshTimeSelect.value;
                    //* Passe updated network latency refresh time
                    clearTimeout();
                    // getNetworkLatency(networkLatencyRefreshTime);
                    setTimeout(() => {
                      getNetworkLatency(networkLatencyRefreshTime);
                    }, networkLatencyRefreshTime * 1000);
                  });
                }
                break;
            }
          });
        }
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
        paramsIconSmall.style.display = "none";
        displayedApp = "";
        windowContent.removeChild(paramsPanel);
        temp = openedApps.filter((app) => app !== "params");
        if (openedParams !== undefined) {
          openedParams.forEach((param) => {
            windowContent.removeChild(document.querySelector(`#${param}`));
            temp2 = openedParams.filter((param) => param !== param);
          });
        }
        let PasswordChoicePannel = document.querySelector(
          "#password-choice-pannel"
        );
        if (PasswordChoicePannel) {
          PasswordChoicePannel.style.display = "none";
        }
        openedParams = temp2;
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
});
window.addEventListener("beforeunload", () => {
    function saveCheckboxState() {
        //* get all checkbox elements on the page
        let checkboxes = document.querySelectorAll("input[type=checkbox]");
        //* add an event listener for the change event to each checkbox
        checkboxes.forEach(function(checkbox) {
            //checkbox.addEventListener("change", function() {
                let isChecked = checkbox.checked;
                localStorage.setItem(checkbox.id, isChecked);
                console.log("saving checkbox state");
            //});
        });
    }
    saveCheckboxState();
});
