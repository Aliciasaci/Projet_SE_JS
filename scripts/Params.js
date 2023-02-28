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
      <div class="import-export">
          <button id="import-btn">Importer vos paramètres</button>
          <button id="export-btn">Exporter vos paramètres</button>
      </div>
    </div>`;
}

export function exportAllLocalStorageToJsonFile() {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(localStorage));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${day}${date.getMonth() + 1}${year}_params.json`);
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

export function importAllLocalStorageFromJsonFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = (event) => {
      const file = event.target.files[0];
      parseJsonFileToLocalStorage(file);
    };
    input.click();
}

function parseJsonFileToLocalStorage(file) {
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = (readerEvent) => {
    const content = readerEvent.target.result;
    const parsedParams = JSON.parse(content);
    if (typeof parsedParams !== "object") {
      alert("Le fichier n'est pas valide 🤭");
      return;
    } else if (('mode' in parsedParams) === false) {
      alert("Le fichier n'est pas valide 🤭");
      return;
    }
    localStorage.clear();
    for (let key in parsedParams) {
      localStorage.setItem(key, parsedParams[key]);
    }
    location.reload();
  };
}

//*******CODE VIBRATION */
export function renderVibrationBody() {
  return `
    <div id="vibration-wrapper" class="param-wrap">
    <button class="retour-btn-vibration">Retour</button>
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
      <div class="vibration-param-display">Retours haptique de vibration pour l'application calculatrice
          <input type="checkbox" id="vibration-calc-check" name="params" class="param-switch">
          <label for="vibration-calc-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="vibration-param-display">Retours haptique de vibration pour l'application horloge
          <input type="checkbox" id="vibration-clock-check" name="params" class="param-switch">
          <label for="vibration-clock-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="vibration-param-display">Retours haptique de vibration pour l'application morpion
          <input type="checkbox" id="vibration-tictac-check" name="params" class="param-switch">
          <label for="vibration-tictac-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
      <div class="vibration-param-display">Retours haptique de vibration pour l'application paramètres
          <input type="checkbox" id="vibration-param-check" name="params" class="param-switch">
          <label for="vibration-param-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
    </div>
  `;
}

export function vibrate() {
  const vibrationWrapper = document.querySelector("#vibration-wrapper");
  const window = document.querySelector(".window");
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
          let stateGlobalChecked = VibrationActivateCheck.checked;
          localStorage.setItem(
            "vibration-activate-check",
            VibrationActivateCheck.checked
          );
          tictactoeVibration(stateGlobalChecked);
          calculatorVibration(stateGlobalChecked);
          displayEtatVibration(stateGlobalChecked);
          clockVibration(stateGlobalChecked);
          paramVibration(stateGlobalChecked);
        });
      }
    }
  }
}

export function startVibrate() {
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

export function tictactoeVibration(stateGlobalChecked) {
  const vibrationWrapper = document.querySelector("#vibration-wrapper");
  if (vibrationWrapper) {
    const vibrationTictacCheck = document.querySelector("#vibration-tictac-check");

    vibrationTictacCheck.checked = stateGlobalChecked;
    localStorage.setItem("vibration-tictac-check", vibrationTictacCheck.checked);
    
    vibrationTictacCheck.addEventListener("change", function () {
      localStorage.setItem("vibration-tictac-check", vibrationTictacCheck.checked);
    });
  }
}


export function calculatorVibration(stateGlobalChecked) {
  const vibrationWrapper = document.querySelector("#vibration-wrapper");
  if (vibrationWrapper) {
    const vibrationCalcCheck = document.querySelector("#vibration-calc-check");
   
    vibrationCalcCheck.checked = stateGlobalChecked;
    localStorage.setItem("vibration-calc-check", vibrationCalcCheck.checked);
   
    vibrationCalcCheck.addEventListener("change", function () {
      localStorage.setItem("vibration-calc-check", vibrationCalcCheck.checked);
    });
  }
}

export function clockVibration(stateGlobalChecked) {
  const vibrationWrapper = document.querySelector("#vibration-wrapper");
  if (vibrationWrapper) {
    const vibrationClockCheck = document.querySelector("#vibration-clock-check");

    vibrationClockCheck.checked = stateGlobalChecked;
    localStorage.setItem("vibration-clock-check", vibrationClockCheck.checked);
   
    vibrationClockCheck.addEventListener("change", function () {
      localStorage.setItem("vibration-clock-check", vibrationClockCheck.checked);
    });
  }
}

export function paramVibration(stateGlobalChecked) {
  const vibrationWrapper = document.querySelector("#vibration-wrapper");
  if (vibrationWrapper) {
    const vibrationParamCheck = document.querySelector("#vibration-param-check");

    vibrationParamCheck.checked = stateGlobalChecked;
    localStorage.setItem("vibration-param-check", vibrationParamCheck.checked);
   
    vibrationParamCheck.addEventListener("change", function () {
      localStorage.setItem("vibration-param-check", vibrationParamCheck.checked);
    });
  }
}


//*******CODE TIME */

export function renderTimeParams() {
  return `
    <div id="time-wrapper" class="param-wrap">
      <button class="retour-btn-time">Retour</button>
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

export function saveCheckboxTimeState(checkboxHour, checkboxMin, checkboxSec, hourNavDisplay, minNavDisplay, secNavDisplay) {
  checkboxHour.addEventListener("change", function () {
    localStorage.setItem("hour-display-check", checkboxHour.checked);
    if (checkboxHour.checked == true) {
      hourNavDisplay.style.display = "block";
      hourNavDisplay.nextElementSibling.style.display = "block";
    } else {
      hourNavDisplay.style.display = "none";
      hourNavDisplay.nextElementSibling.style.display = "none";
    }
  });

  checkboxMin.addEventListener("change", function () {
    localStorage.setItem("min-display-check", checkboxMin.checked);
    if (checkboxMin.checked == true) {
      minNavDisplay.style.display = "block";
      minNavDisplay.nextElementSibling.style.display = "block";
    } else {
      minNavDisplay.style.display = "none";
      minNavDisplay.nextElementSibling.style.display = "none";
    }
  });

  checkboxSec.addEventListener("change", function () {
    localStorage.setItem("sec-display-check", checkboxSec.checked);
    if (checkboxSec.checked == true) {
      secNavDisplay.style.display = "block";
    } else {
      secNavDisplay.style.display = "none";
    }
  });
}

export function retrieveCheckBoxTimeState(hourNavDisplay, minNavDisplay, secNavDisplay, checkboxHour, checkboxMin, checkboxSec) {
  let savedStateHour = localStorage.getItem("hour-display-check");
  let savedStateMin = localStorage.getItem("min-display-check");
  let savedStateSec = localStorage.getItem("sec-display-check");

  if (savedStateHour == null) {
    localStorage.setItem("hour-display-check", "true");
  }

  if (localStorage.getItem("hour-display-check") == "true") {
    if (checkboxHour) {
      checkboxHour.checked = true;
    }
    hourNavDisplay.style.display = "block";
    hourNavDisplay.nextElementSibling.style.display = "block";
  } else {
    if (checkboxHour) {
      checkboxHour.checked = false;
    }
    hourNavDisplay.style.display = "none";
    hourNavDisplay.nextElementSibling.style.display = "none";
  }

  if (savedStateMin == null) {
    localStorage.setItem("min-display-check", "true");
  }

  if (localStorage.getItem("min-display-check") == "true") {
    if (checkboxMin) {
      checkboxMin.checked = true;
    }
    minNavDisplay.style.display = "block";
    minNavDisplay.nextElementSibling.style.display = "block";
  } else {
    if (checkboxMin) {
      checkboxMin.checked = false;
    }
    minNavDisplay.style.display = "none";
    minNavDisplay.nextElementSibling.style.display = "none";
  }

  if (savedStateSec == null) {
    localStorage.setItem("sec-display-check", "true");
  }

  if (localStorage.getItem("sec-display-check") == "true") {
    if (checkboxSec) {
      checkboxSec.checked = true;
    }
    secNavDisplay.style.display = "block";
  } else {
    if (checkboxSec) {
      checkboxSec.checked = false;
    }
    secNavDisplay.style.display = "none";
  }

}

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

export function displayDate() {
  let dayLetter = getFrenchDay(new Date().getDay());
  let a = `${dayLetter} ${day}`;
  let b = `${month}`;
  let c = `${year}`;

  let dayNavDisplay = document.getElementById("date-day");
  let monthNavDisplay = document.getElementById("date-month");
  let yearNavDisplay = document.getElementById("date-year");

  dayNavDisplay.innerHTML = a;
  monthNavDisplay.innerHTML = b;
  yearNavDisplay.innerHTML = c;
}

export function saveCheckBoxDateState(checkboxDate, checkboxDay, checkboxMonth, checkboxYear, dateNavDisplay, dayNavDisplay, monthNavDisplay, yearNavDisplay) {
  checkboxDate.addEventListener("change", function () {
    localStorage.setItem("date-display-check", checkboxDate.checked);
    if (checkboxDate.checked == true) {
      dateNavDisplay.style.display = "flex";
    } else {
      dateNavDisplay.style.display = "none";
    }
  });

  checkboxDay.addEventListener("change", function () {
    localStorage.setItem("day-display-check", checkboxDay.checked);
    if (checkboxDay.checked == true) {
      dayNavDisplay.style.display = "block";
    } else {
      dayNavDisplay.style.display = "none";
    }
  });

  checkboxMonth.addEventListener("change", function () {
    localStorage.setItem("month-display-check", checkboxMonth.checked);
    if (checkboxMonth.checked == true) {
      monthNavDisplay.style.display = "block";
    } else {
      monthNavDisplay.style.display = "none";
    }
  });

  checkboxYear.addEventListener("change", function () {
    localStorage.setItem("year-display-check", checkboxYear.checked);
    if (checkboxYear.checked == true) {
      yearNavDisplay.style.display = "block";
    } else {
      yearNavDisplay.style.display = "none";
    }
  });
}

export function retrieveCheckBoxDateState(dateNavDisplay, dayNavDisplay, monthNavDisplay, yearNavDisplay, checkboxDate, checkboxDay, checkboxMonth, checkboxYear) {
  let savedStateDate = localStorage.getItem("date-display-check");
  let savedStateDay = localStorage.getItem("day-display-check");
  let savedStateMonth = localStorage.getItem("month-display-check");
  let savedStateYear = localStorage.getItem("year-display-check");

  if (savedStateDate == null) {
    localStorage.setItem("date-display-check", "true");
  }

  if (localStorage.getItem("date-display-check") == "true") {
    if (checkboxDate) {
      checkboxDate.checked = true;
    }
    dateNavDisplay.style.display = "flex";
  } else {
    if (checkboxDate) {
      checkboxDate.checked = false;
    }
    dateNavDisplay.style.display = "none";
  }

  if (savedStateDay == null) {
    localStorage.setItem("day-display-check", "true");
  }

  if (localStorage.getItem("day-display-check") == "true") {
    if (checkboxDay) {
      checkboxDay.checked = true;
    }
    dayNavDisplay.style.display = "block";
  } else {
    if (checkboxDay) {
      checkboxDay.checked = false;
    }
    dayNavDisplay.style.display = "none";
  }

  if (savedStateMonth == null) {
    localStorage.setItem("month-display-check", "true");
  }

  if (localStorage.getItem("month-display-check") == "true") {
    if (checkboxMonth) {
      checkboxMonth.checked = true;
    }
    monthNavDisplay.style.display = "block";
  } else {
    if (checkboxMonth) {
      checkboxMonth.checked = false;
    }
    monthNavDisplay.style.display = "none";
  }

  if (savedStateYear == null) {
    localStorage.setItem("year-display-check", "true");
  }

  if (localStorage.getItem("year-display-check") == "true") {
    if (checkboxYear) {
      checkboxYear.checked = true;
    }
    yearNavDisplay.style.display = "block";
  } else {
    if (checkboxYear) {
      checkboxYear.checked = false;
    }
    yearNavDisplay.style.display = "none";
  }
}

  

    

// export function dateCheckListeners() {
//   const dayCheck = document.querySelector("#day-display-check");
//   const monthCheck = document.querySelector("#month-display-check");
//   const yearCheck = document.querySelector("#year-display-check");

//   let dayDisplay = localStorage.getItem("day-display-check");
//   let monthDisplay = localStorage.getItem("month-display-check");
//   let yearDisplay = localStorage.getItem("year-display-check");

//   if (dayCheck) {
//     dayCheck.addEventListener("change", function () {
//       dayDisplay === "true" ? (dayDisplay = "false") : (dayDisplay = "true");
//       displayDate(dayDisplay, monthDisplay, yearDisplay);
//     });
//   }
//   if (monthCheck) {
//     monthCheck.addEventListener("change", function () {
//       monthDisplay === "true"
//         ? (monthDisplay = "false")
//         : (monthDisplay = "true");
//       displayDate(dayDisplay, monthDisplay, yearDisplay);
//     });
//   }
//   if (yearCheck) {
//     yearCheck.addEventListener("change", function () {
//       yearDisplay === "true" ? (yearDisplay = "false") : (yearDisplay = "true");
//       displayDate(dayDisplay, monthDisplay, yearDisplay);
//     });
//   }

//   const dateCheck = document.querySelector("#date-display-check");
//   const dateField = document.querySelector(".dateTime");

//   if (dateCheck) {
//     dateCheck.addEventListener("change", function () {
//       if (dateDisplay === "false" || dateDisplay === null) {
//         dateDisplay === "true"
//           ? (dateDisplay = "false")
//           : (dateDisplay = "true");
//         displayDate(dayDisplay, monthDisplay, yearDisplay);
//       } else {
//         dateField.innerHTML = "";
//         dateDisplay === "true"
//           ? (dateDisplay = "false")
//           : (dateDisplay = "true");
//       }
//     });
//   }
// }

// function displayDate(dayCheck, monthCheck, yearCheck) {
//   const dateField = document.querySelector(".dateTime");
//   let dateDisplay = localStorage.getItem("date-display-check");
//   if (dateDisplay === null) {
//     dateField.innerHTML = displayCheckedValues("true", "true", "true");
//   } else if (dateDisplay === "true")
//     dateField.innerHTML = displayCheckedValues(dayCheck, monthCheck, yearCheck);
// }

export function renderDateParams() {
  return `
    <div id="date-wrapper" class="param-wrap">
    <button class="retour-btn-date">Retour</button>
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
    <button class="retour-btn-battery">Retour</button>
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

export function displayBatteryLevel(battery) {
  let level = battery.level * 100;
  localStorage.setItem("battery-level", level);
  document.getElementById("battery-level").innerHTML = `${level}%`;
}

export function displayBatteryChargingState(battery) {
  // create icon state
  let iconCharge = document.createElement("i");
  // remove previous icon state when charging state change from true to false or vice versa
  let icon = document.getElementById("battery-charging-state");
  icon.innerHTML = "";

  // get charging state
  let chargingState = battery.charging;
  // if true display charging icon
  if (chargingState === true) {
    let classList = "fa-bolt";
    iconCharge.classList.add("fas", classList);
    document.getElementById("battery-charging-state").appendChild(iconCharge);
  } else if (chargingState === false) { // if false display battery level icon
    let batteryLevel = localStorage.getItem("battery-level");
    if (batteryLevel == 100) {
      let classList = "fa-battery-full";
      iconCharge.classList.add("fas", classList);
      document.getElementById("battery-charging-state").appendChild(iconCharge);
    } else if (batteryLevel >= 50) {
      let classList = "fa-battery-half";
      iconCharge.classList.add("fas", classList);
      document.getElementById("battery-charging-state").appendChild(iconCharge);
    } else if (batteryLevel <= 20) {
      let classList = "fa-battery-quarter";
      iconCharge.classList.add("fas", classList);
      document.getElementById("battery-charging-state").appendChild(iconCharge);
    }
  }
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
  if (savedState == null) {
    localStorage.setItem("checkbox-battery", "true");
  }
  if (localStorage.getItem("checkbox-battery") == "true") {
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
    <button class="retour-btn-network">Retour</button>
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
  if (networkStateChecked == "true") {
    document.querySelector("#network-latency").innerHTML =
      localStorage.getItem("latency") + "ms";
  } else {
    document.querySelector("#network-latency").innerHTML = "";
  }
}

export function latency() {
  let select = document.querySelector(".refresh-time-select");
  let options = document.querySelectorAll(".refresh-time-select option");
  if(select && options){
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

  if(localStorage.getItem("interval-network-id"))
  {
    let interval = parseInt(localStorage.getItem("interval-network-id"));
    clearInterval(interval);
  }

  let interval = setInterval(() => {
    getNetworkLatency();
  }, parseInt(localStorage.getItem("refresh-time")) * 1000);
  localStorage.setItem("interval-network-id", interval);

  const refreshTimeSelect = document.querySelector(".refresh-time-select");
  if(refreshTimeSelect){
    refreshTimeSelect.addEventListener("change", () => {
      clearInterval(parseInt(localStorage.getItem("interval-network-id")));
      localStorage.setItem("refresh-time", refreshTimeSelect.value);
      interval = setInterval(() => {
        getNetworkLatency();
      }, parseInt(localStorage.getItem("refresh-time")) * 1000);
      localStorage.setItem("interval-network-id", interval);
    }); 
  }


  let networkCheck = document.querySelector("#network-display-check");

  if(networkCheck)
  {
    networkCheck.addEventListener("change", () => {
      localStorage.setItem("network-display-check", networkCheck.checked)
      let networkStateChecked = localStorage.getItem("network-display-check");
      displayLatency(networkStateChecked);
    }); 
  }

  let domaineConfigCheck = document.querySelector("#domain-config-check");
  if(domaineConfigCheck)
  {
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
        localStorage.setItem("domaine-ping", " ");
      });

    displayLatency();
  }
}

//************************CODE LOCKSCREEN */
export function renderLockscreenParams() {
  return `
    <div id="lockscreen-wrapper" class="param-wrap">
    <button class="retour-btn-lockscreen">Retour</button>
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
    <button class="retour-btn-theme">Retour</button>
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
