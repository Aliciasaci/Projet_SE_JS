import {
  setAppsToDarkTheme,
  setCalcToDarkTheme,
  setClockToDarkTheme,
  setParamToDarkTheme,
  setTicTacToDarkTheme,
} from "./Theme.js";
let vibrationActivated = true;
const backgroundWindow = document.querySelector(".window");
const paramsBody = document.querySelector("#params");
let dateDisplay = localStorage.getItem("date-display-check");
const date = new Date();
let day = date.getDate();
let month = date.toLocaleString("fr", { month: "short" });
let year = date.getFullYear();

export function renderParamsBody() {
  return `
    <div id="params" class="center">
      <h2 class="param-title">Paramètres</h2>
      <ul id="params-icons">
          <li id="params-time">
              <img src="assets/params_icons/clock_3.png" />
              <span>Horloge</span>
          </li>
          <li id="params-date">
              <img src="assets/params_icons/calendar_3.png" />
              <span>Date</span>
          </li>
          <li id="params-vibration">
              <img src="assets/params_icons/vibration_3.png" />
              <span>Vibration</span>
          </li>
          <li id="params-battery">
              <img src="assets/params_icons/battery_3.png" />
              <span>Batterie</span>
          </li>
          <li id="params-network">
              <img src="assets/params_icons/signal_3.png" />
              <span>Réseau</span>
          </li>
          <li id="params-lockscreen">
              <img src="assets/params_icons/lock_3.png" />
              <span>Verouillage</span>
          </li>
          <li id="params-theme">
              <img src="assets/params_icons/dark-mode_3.png" />
              <span>Thèmes</span>
          </li>
      </ul>
    </div>`;
}

//*******CODE VIBRATION */
export function renderVibrationBody() {
  return `
    <div id="vibration-wrapper" class="param-wrap">
    <button class="retour-btn">Retour</button>
      <h1>Paramètres de vibrations</h1>
      <div class="vibration-param-display">Afficher l'état de vibration
          <input type="checkbox" id="vibration-display-check" name="params" class="param-switch">
          <label for="vibration-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="vibration-param-display">Retours haptique de vibration dans tout le système
          <input type="checkbox" id="vibration-activate-check" name="params" class="param-switch">
          <label for="vibration-activate-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
    </div>
  `;
}

export function vibrate() {
  const vibrationWrapper = document.querySelector("#vibration-wrapper");
  const allDom = document.querySelector("*");

  if (vibrationWrapper) {
    //*Afficher état vibration
    const VibrationDisplayBtn = document.querySelector(
      "#vibration-display-check"
    );
    const VibrationActivateCheck = document.querySelector(
      "#vibration-activate-check"
    );
    if (VibrationDisplayBtn) {
      VibrationDisplayBtn.addEventListener("change", function () {
        localStorage.setItem(
          "vibration-display-check",
          VibrationDisplayBtn.checked
        );
        displayEtatVibration();
      });

      //*Activer la vibration
      if (VibrationActivateCheck) {
        VibrationActivateCheck.addEventListener("change", function () {
          localStorage.setItem(
            "vibration-activate-check",
            VibrationActivateCheck.checked
          );
          displayEtatVibration();
        });
      }
    }
  }
}

export function startVibrate() {
  console.log("Vibration");
  navigator.vibrate(200);
  window.navigator.vibrate(200);
}

export function displayEtatVibration() {
  let VibrationDisplayBtn = localStorage.getItem("vibration-display-check");
  let VibrationActivateCheck = localStorage.getItem("vibration-activate-check");
  const vibrationIconOn = document.querySelector("#vibration-icon-on");
  const vibrationIconOff = document.querySelector("#vibration-icon-off");

  if (vibrationIconOn && vibrationIconOff) {
    if (VibrationDisplayBtn == "false") {
      //si masquer l'état de vibration, masquer les deux icones;
      vibrationIconOn.style.display = "none";
      vibrationIconOff.style.display = "none";
    } else {
      //si afficher état de vibration, conditionner sur l'activation de vibration et afficher la bonne icone.
      if (VibrationActivateCheck == "true") {
        vibrationIconOn.style.display = "block";
        vibrationIconOff.style.display = "none";
      } else {
        vibrationIconOff.style.display = "block";
        vibrationIconOn.style.display = "none";
      }
    }
  }
}

//*******CODE TIME */

export function renderTimeParams() {
  return `
    <div id="time-wrapper" class="param-wrap">
      <button class="retour-btn">Retour</button>
      <h1>Paramètres d'horloge</h1>
      <div class="time-param-display">Afficher l'heure
          <input type="checkbox" id="hour-display-check" name="params" class="param-switch">
          <label for="hour-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="time-param-display">Afficher la minute
          <input type="checkbox" id="min-display-check" name="params" class="param-switch">
          <label for="min-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>    
      </div>
      <div class="time-param-display">Afficher la seconde
          <input type="checkbox" id="sec-display-check" name="params" class="param-switch">
          <label for="sec-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
    </div>
  `;
}

export function displayTimeTopBar(hourDisplay, minDisplay, secDisplay) {
  const hourNavDisplay = document.querySelector("#digital-clock-hour");
  const minNavDisplay = document.querySelector("#digital-clock-min");
  const secNavDisplay = document.querySelector("#digital-clock-sec");

  if (hourDisplay == "true") {
    hourNavDisplay.style.display = "block";
    hourNavDisplay.nextElementSibling.style.display = "block";
  } else {
    hourNavDisplay.style.display = "none";
    hourNavDisplay.nextElementSibling.style.display = "none";
  }

  if (minDisplay == "true") {
    minNavDisplay.style.display = "block";
    minNavDisplay.nextElementSibling.style.display = "block";
  } else {
    minNavDisplay.style.display = "none";
    minNavDisplay.nextElementSibling.style.display = "none";
  }

  if (secDisplay == "true") {
    secNavDisplay.style.display = "block";
  } else {
    secNavDisplay.style.display = "none";
  }
}

export function timeCheckListenners() {
  const hourParamCheck = document.querySelector("#hour-display-check");
  const minParamCheck = document.querySelector("#min-display-check");
  const secParamCheck = document.querySelector("#sec-display-check");

  let hourDisplay = localStorage.getItem("hour-display-check");
  let minDisplay = localStorage.getItem("min-display-check");
  let secDisplay = localStorage.getItem("sec-display-check");

  if (hourParamCheck) {
    hourParamCheck.addEventListener("change", function () {
      console.log("test");
      hourDisplay === "true" ? (hourDisplay = "false") : (hourDisplay = "true");
      displayTimeTopBar(hourDisplay, minDisplay, secDisplay);
    });
  }

  if (minParamCheck) {
    minParamCheck.addEventListener("change", function () {
      minDisplay === "true" ? (minDisplay = "false") : (minDisplay = "true");
      displayTimeTopBar(hourDisplay, minDisplay, secDisplay);
    });
  }

  if (secParamCheck) {
    secParamCheck.addEventListener("change", function () {
      secDisplay === "true" ? (secDisplay = "false") : (secDisplay = "true");
      displayTimeTopBar(hourDisplay, minDisplay, secDisplay);
    });
  }
}

// hourParamBtn.addEventListener("change", function () {
//   localStorage.setItem("hour-display-check", hourParamBtn.checked);
//   if (hourParamBtn.checked == true) {
//     hourNavDisplay.style.display = "block";
//     hourNavDisplay.nextElementSibling.style.display = "block";
//   } else {
//     hourNavDisplay.style.display = "none";
//     hourNavDisplay.nextElementSibling.style.display = "none";
//   }
// });
// minParamBtn.addEventListener("change", function () {
//   localStorage.setItem("min-display-check", minParamBtn.checked);
//   if (minParamBtn.checked == true) {
//     minNavDisplay.style.display = "block";
//     minNavDisplay.nextElementSibling.style.display = "block";
//   } else {
//     minNavDisplay.style.display = "none";
//     minNavDisplay.nextElementSibling.style.display = "none";
//   }
// });
// secParamBtn.addEventListener("change", function () {
//   localStorage.setItem("sec-display-check", secParamBtn.checked);
//   if (secParamBtn.checked == true) {
//     secNavDisplay.style.display = "block";
//   } else {
//     secNavDisplay.style.display = "none";
//   }
// });
// hourParamBtn.addEventListener("click", function () {
//   if (hourParamBtn.checked == true) {
//     hourNavDisplay.style.display = "block";
//     hourNavDisplay.nextElementSibling.style.display = "block";
//   } else {
//     hourNavDisplay.style.display = "none";
//     hourNavDisplay.nextElementSibling.style.display = "none";
//   }
// });
// minParamBtn.addEventListener("click", function () {
//   if (minParamBtn.checked == true) {
//     minNavDisplay.style.display = "block";
//     minNavDisplay.nextElementSibling.style.display = "block";
//   } else {
//     minNavDisplay.style.display = "none";
//     minNavDisplay.nextElementSibling.style.display = "none";
//   }
// });
// secParamBtn.addEventListener("click", function () {
//   if (secParamBtn.checked == true) {
//     secNavDisplay.style.display = "block";
//   } else {
//     secNavDisplay.style.display = "none";
//   }
// });

//*******CODE DATE */

function getFrenchDay(day) {
  switch (day) {
    case 0:
      return "Dim.";
    case 1:
      return "Lun.";
    case 2:
      return "Mar.";
    case 3:
      return "Mer.";
    case 4:
      return "Jeu.";
    case 5:
      return "Ven.";
    case 6:
      return "Sam.";
  }
}

export function displayCheckedValues(dateCheck, monthCheck, yearCheck) {
  let dayLetter = getFrenchDay(new Date().getDay());
  let a = `${dayLetter} ${day} `;
  if (dateCheck === null || dateCheck === "false") a = "";
  let b = `${month} `;
  if (monthCheck === null || monthCheck === "false") b = "";
  let c = `${year}`;
  if (yearCheck === null || yearCheck === "false") c = "";
  return `${a}${b}${c}`;
}

export function dateCheckListeners() {
  const dayCheck = document.querySelector("#day-display-check");
  const monthCheck = document.querySelector("#month-display-check");
  const yearCheck = document.querySelector("#year-display-check");

  let dayDisplay = localStorage.getItem("day-display-check");
  let monthDisplay = localStorage.getItem("month-display-check");
  let yearDisplay = localStorage.getItem("year-display-check");

  if (dayCheck) {
    dayCheck.addEventListener("change", function () {
      dayDisplay === "true" ? (dayDisplay = "false") : (dayDisplay = "true");
      displayDate(dayDisplay, monthDisplay, yearDisplay);
    });
  }
  if (monthCheck) {
    monthCheck.addEventListener("change", function () {
      monthDisplay === "true"
        ? (monthDisplay = "false")
        : (monthDisplay = "true");
      displayDate(dayDisplay, monthDisplay, yearDisplay);
    });
  }
  if (yearCheck) {
    yearCheck.addEventListener("change", function () {
      yearDisplay === "true" ? (yearDisplay = "false") : (yearDisplay = "true");
      displayDate(dayDisplay, monthDisplay, yearDisplay);
    });
  }

  const dateCheck = document.querySelector("#date-display-check");
  const dateField = document.querySelector(".dateTime");

  if (dateCheck) {
    dateCheck.addEventListener("change", function () {
      if (dateDisplay === "false" || dateDisplay === null) {
        dateDisplay === "true"
          ? (dateDisplay = "false")
          : (dateDisplay = "true");
        displayDate(dayDisplay, monthDisplay, yearDisplay);
      } else {
        dateField.innerHTML = "";
        dateDisplay === "true"
          ? (dateDisplay = "false")
          : (dateDisplay = "true");
      }
    });
  }
}

function displayDate(dayCheck, monthCheck, yearCheck) {
  const dateField = document.querySelector(".dateTime");
  if (dateDisplay === "true")
    dateField.innerHTML = displayCheckedValues(dayCheck, monthCheck, yearCheck);
}

export function renderDateParams() {
  return `
    <div id="date-wrapper" class="param-wrap">
    <button class="retour-btn">Retour</button>
      <h1>Paramètres de date</h1>
      <div class="date-param-display">Afficher la date
          <input type="checkbox" id="date-display-check" name="params" class="param-switch">
          <label for="date-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="date-param-display">Afficher l'année
          <input type="checkbox" id="year-display-check" name="params" class="param-switch">
          <label for="year-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>    
      </div>
      <div class="date-param-display">Afficher le mois
          <input type="checkbox" id="month-display-check" name="params" class="param-switch">
          <label for="month-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="date-param-display">Afficher le jour
          <input type="checkbox" id="day-display-check" name="params" class="param-switch">
          <label for="day-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
    </div>
  `;
}

//*******CODE BATTERY */

export function renderBatteryParams() {
  return `
    <div id="battery-wrapper" class="param-wrap">
    <button class="retour-btn">Retour</button>
      <h1>Paramètres de batterie</h1>
      <div class="battery-param-display">Afficher la batterie
          <input type="checkbox" id="battery-display-check" name="params" class="param-switch">
          <label for="battery-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
    </div>
  `;
}

/**
 * * Save the state of the checkbox for battery settings in the local storage
 * @param {boolean} checkbox
 * @param {string} batteryNavDisplay
 */
export function saveCheckboxBatteryState(checkbox, batteryNavDisplay) {
  checkbox.addEventListener("change", function () {
    let isChecked = checkbox.checked;
    localStorage.setItem("checkbox-battery", isChecked);
    if (checkbox.id == "battery-display-check" && isChecked == true) {
      batteryNavDisplay.style.display = "block";
    } else {
      batteryNavDisplay.style.display = "none";
    }
  });
}

/**
 * * Retrieve the state of the checkbox for battery settings in the local storage
 * @param {string} batteryNavDisplay
 * @param {boolean} checkbox
 */
export function retrieveCheckboxBatteryState(batteryNavDisplay, checkbox) {
  let savedState = localStorage.getItem("checkbox-battery");
  if (savedState == "true") {
    if (checkbox) {
      checkbox.checked = true;
    }
    batteryNavDisplay.style.display = "block";
  } else {
    if (checkbox) {
      checkbox.checked = false;
    }
    batteryNavDisplay.style.display = "none";
  }
}

/**
 * * Save the state of the checkbox for battery settings in the local storage
 * @param {boolean} checkbox
 * @param {string} batteryNavDisplay
 */

//************************CODE LATENCY */
export function renderNetworkParams() {
  return `
    <div id="network-wrapper" class="param-wrap">
    <button class="retour-btn">Retour</button>
      <h1>Paramètres de latence réseau</h1>
      <div class="network-param-display">Afficher la latence réseau
        <input type="checkbox" id="network-display-check" name="params" class="param-switch">
        <label for="network-display-check" class="param-label">
          <span class="param-label-background"></span>
        </label>
      </div>
      <div class="network-param-display">Configurer le nom de domaine du serveur de ping
        <input type="checkbox" id="domain-config-check" name="params" class="param-switch">
        <label for="domain-config-check" class="param-label">
          <span class="param-label-background"></span>
        </label>
      </div>
      <div class="network-param-display">Configurer le délai de rafraichissement en secondes
        <select class="refresh-time-select">
          <option selected value="1">1</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  `;
}

export function displayLatency() {
  let displayActivated = localStorage.getItem("network-display-check");
  if (displayActivated == "true") {
    document.querySelector("#network-latency").innerHTML =
      localStorage.getItem("latency") + "ms";
  } else {
    document.querySelector("#network-latency").innerHTML = "";
  }
}

export function latency() {
  let select = document.querySelector(".refresh-time-select");
  let options = document.querySelectorAll(".refresh-time-select option");
  if (select && options) {
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
  }
  localStorage.setItem("refresh-time", 1);

  let interval = setInterval(() => {
    getNetworkLatency();
  }, parseInt(localStorage.getItem("refresh-time")) * 1000);

  const refreshTimeSelect = document.querySelector(".refresh-time-select");
  if (refreshTimeSelect) {
    console.log(refreshTimeSelect);
    refreshTimeSelect.addEventListener("change", () => {
      clearInterval(interval);
      localStorage.setItem("refresh-time", refreshTimeSelect.value);
      interval = setInterval(() => {
        getNetworkLatency();
      }, parseInt(localStorage.getItem("refresh-time")) * 1000);
    });
  }

  let networkCheck = document.querySelector("#network-display-check");

  if (networkCheck) {
    networkCheck.addEventListener("change", () => {
      localStorage.setItem("network-display-check", networkCheck.checked);
      displayLatency();
    });
  }

  let domaineConfigCheck = document.querySelector("#domain-config-check");
  if (domaineConfigCheck) {
    domaineConfigCheck.addEventListener("change", () => {
      if (domaineConfigCheck.checked) {
        document.querySelector("#server-ping-modal").style.display = "flex";

        const pingValidateBtn = document.querySelector("#ping-validate-btn");
        if (pingValidateBtn) {
          pingValidateBtn.addEventListener("click", () => {
            let domaineToPing = document.querySelector("#ping-domaine").value;
            if (domaineToPing != null) {
              localStorage.setItem("domaine-ping", domaineToPing);
              alert("Nouveau domaine à ping : " + domaineToPing);
              console.log(domaineToPing);
            }
          });
        }
      } else {
        document.querySelector("#server-ping-modal").style.display = "none";
      }
    });
  }
}

/**
 * * Get the network latency and configure with the refresh time
 * @param {integer} refreshTime
 */
export function getNetworkLatency() {
  const startTime = window.performance.now(); //* Get accurate start time of network latency since page load
  //* Make request to server

  let domaineToPing = window.location.href;
  let storedDomaineToPing = localStorage.getItem("domaine-ping");
  if (storedDomaineToPing) {
    domaineToPing = storedDomaineToPing;
  }

  if (domaineToPing != null) {
    fetch(domaineToPing)
      .then((response) => response.text())
      .then(() => {
        const endTime = window.performance.now(); //* Get the time at which the response from the server was received
        const latency = Math.round(endTime - startTime); //* Calculate the latency to get the time it took for the response to be received
        localStorage.setItem("latency", latency);
      })
      .catch((error) => {
        alert(
          "Une erreur est parvenue :( 1. Assuez-vous que votre nom de domaine est bien correcte 2. Des problèmes de permissions peuvent être à l'origin du problème "
        );
        localStorage.setItem("domaine-ping", " ");
        console.error(error);
      });

    displayLatency();
  }
}

//************************CODE LOCKSCREEN */
export function renderLockscreenParams() {
  return `
    <div id="lockscreen-wrapper" class="param-wrap">
    <button class="retour-btn">Retour</button>
      <h1>Verouillage de l'appareil</h1>
      <div class="lockscreen-param-activate">Activer le verouillage de l'appareil
          <input type="checkbox" id="lockscreen-display-check" name="params" class="param-switch">
          <label for="lockscreen-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div><button id="lockscreen-password">Saisir mot de passe</button></div>
    </div>  `;
}

export function lockscreen() {
  const lockscreenDisplayCheck = document.querySelector(
    "#lockscreen-display-check"
  );
  lockscreenDisplayCheck.addEventListener("change", function () {
    if (lockscreenDisplayCheck.checked) {
      if (localStorage.getItem("lockscreen-password")) {
        localStorage.setItem("lockscreen", "activated");
        alert("L'écran de verouillage est activé");
      } else {
        setLockscreenPassword();
        localStorage.setItem("lockscreen", "activated");
      }
    } else {
      alert("L'écran de verouillage est désactivé");
      localStorage.setItem("lockscreen", "deactivated");
    }
  });
}

export function setLockscreenPassword() {
  const passwordValidateBtn = document.querySelector("#password-validate-btn");
  const passwordPannel = document.querySelector("#password-choice-pannel");
  const passwordValue = document.querySelector("#password");
  passwordValue.value = "";
  passwordPannel.style.display = "flex";
  if (passwordValidateBtn) {
    passwordValidateBtn.addEventListener("click", function () {
      if (!passwordValue.value) {
        alert("Hey !! faudra saisir un mot de passe ;)");
      } else {
        localStorage.setItem("lockscreen-password", passwordValue.value);
        alert(
          "Whouhoo ! Vous venez de définir un nouveau mot de passe d'écran de verouillage qui est le suivant : " +
            passwordValue.value
        );
        passwordPannel.style.display = "none";
      }
    });
  }
}

export function renderThemeParams() {
  return `
    <div id="theme-wrapper" class="param-wrap">
    <button class="retour-btn">Retour</button>
      <h1>Thème des applications</h1>
      <div class="theme-params-display">Activer le thème sombre de l'application calculatrice
          <input type="checkbox" id="theme-calculatrice-display-check" name="params" class="param-switch">
          <label for="theme-calculatrice-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="theme-params-display">Activer le thème sombre de l'application horloge
          <input type="checkbox" id="theme-clock-display-check" name="params" class="param-switch">
          <label for="theme-clock-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="theme-params-display">Activer le thème sombre de l'application morpion
          <input type="checkbox" id="theme-tictactoe-display-check" name="params" class="param-switch">
          <label for="theme-tictactoe-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="theme-params-display">Activer le thème sombre de l'application paramètres
          <input type="checkbox" id="theme-params-display-check" name="params" class="param-switch">
          <label for="theme-params-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
    </div>  `;
}

export function themeCheckListeners() {
  const themeCalculatriceDisplayCheck = document.querySelector(
    "#theme-calculatrice-display-check"
  );
  const themeClockDisplayCheck = document.querySelector(
    "#theme-clock-display-check"
  );
  const themeTictactoeDisplayCheck = document.querySelector(
    "#theme-tictactoe-display-check"
  );
  const themeParamsDisplayCheck = document.querySelector(
    "#theme-params-display-check"
  );

  if (localStorage.getItem("mode") === "true") {
  }

  const generalTheme = document.querySelector("#mode");

  generalTheme.addEventListener("change", function () {
    if (generalTheme.checked) {
      themeCalculatriceDisplayCheck.checked = true;
      themeClockDisplayCheck.checked = true;
      themeTictactoeDisplayCheck.checked = true;
      themeParamsDisplayCheck.checked = true;
      setCalcToDarkTheme("dark");
      setClockToDarkTheme("dark");
      setTicTacToDarkTheme("dark");
      setParamToDarkTheme("dark");
    } else {
      themeCalculatriceDisplayCheck.checked = false;
      themeClockDisplayCheck.checked = false;
      themeTictactoeDisplayCheck.checked = false;
      themeParamsDisplayCheck.checked = false;

      setCalcToDarkTheme("light");
      setClockToDarkTheme("light");
      setTicTacToDarkTheme("light");
      setParamToDarkTheme("light");
    }
  });

  checkAppTheme();

  themeCalculatriceDisplayCheck.addEventListener("change", function () {
    if (themeCalculatriceDisplayCheck.checked) {
      setCalcToDarkTheme("dark");
    } else {
      setCalcToDarkTheme("light");
    }
  });

  themeClockDisplayCheck.addEventListener("change", function () {
    if (themeClockDisplayCheck.checked) {
      setClockToDarkTheme("dark");
    } else {
      setClockToDarkTheme("light");
    }
  });

  themeTictactoeDisplayCheck.addEventListener("change", function () {
    if (themeTictactoeDisplayCheck.checked) {
      setTicTacToDarkTheme("dark");
    } else {
      setTicTacToDarkTheme("light");
    }
  });

  themeParamsDisplayCheck.addEventListener("change", function () {
    if (themeParamsDisplayCheck.checked) {
      setParamToDarkTheme("dark");
    } else {
      setParamToDarkTheme("light");
    }
  });
}

export function checkAppTheme() {
  let calcTheme = localStorage.getItem("theme-calculatrice-display-check");
  let clockTheme = localStorage.getItem("theme-clock-display-check");
  let tictactoeTheme = localStorage.getItem("theme-tictactoe-display-check");
  let paramsTheme = localStorage.getItem("theme-params-display-check");

  if (calcTheme === "true") {
    setCalcToDarkTheme("dark");
  } else {
    setCalcToDarkTheme("light");
  }
  if (clockTheme === "true") {
    setClockToDarkTheme("dark");
  } else {
    setClockToDarkTheme("light");
  }
  if (tictactoeTheme === "true") {
    setTicTacToDarkTheme("dark");
  } else {
    setTicTacToDarkTheme("light");
  }
  if (paramsTheme === "true") {
    setParamToDarkTheme("dark");
  } else {
    setParamToDarkTheme("light");
  }
}
