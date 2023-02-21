let vibrationActivated = true;
const backgroundWindow = document.querySelector(".window");
const paramsBody = document.querySelector("#params");
let dateDisplay = localStorage.getItem("date-display-check");
const date = new Date();
let day = date.getDate();
let month = date.toLocaleString("fr", { month: "long" });
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
          <li>
              <img src="assets/params_icons/lock_3.png" />
              <span>Verouillage</span>
          </li>
          <li>
              <img src="assets/params_icons/dark-mode_3.png" />
              <span>Thèmes</span>
          </li>
      </ul>
    </div>`;
}

export function renderVibrationBody() {
  return `
    <div id="vibration-wrapper">
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
  if (vibrationWrapper) {

    //*Afficher état vibration
    const VibrationDisplayBtn = document.querySelector("#vibration-display-check");
    const VibrationActivateCheck = document.querySelector("#vibration-activate-check")
    if (VibrationDisplayBtn) {
      VibrationDisplayBtn.addEventListener("change", function () {
          displayEtatVibration(VibrationDisplayBtn, VibrationActivateCheck);
      });
    }

    //*Activer la vibration
    const VibrationActivateBtn = document.querySelector(
      "#vibration-activate-btn"
    );
    if (VibrationActivateCheck) {
      VibrationActivateCheck.addEventListener("change", function () {
        displayEtatVibration(VibrationDisplayBtn, VibrationActivateCheck);
      });
    }
  }
}

export function displayEtatVibration(VibrationDisplayBtn, VibrationActivateCheck) {
  const vibrationIconOn = document.querySelector("#vibration-icon-on");
  const vibrationIconOff = document.querySelector("#vibration-icon-off");

  if (vibrationIconOn && vibrationIconOff) {
    if (!VibrationDisplayBtn.checked) {
      //si masquer l'état de vibration, masquer les deux icones;
      vibrationIconOn.style.display = "none";
      vibrationIconOff.style.display = "none";
      VibrationDisplayBtn.style.background = "rgb(214, 133, 224, 0.7)";
    } else {
      //si afficher état de vibration, conditionner sur l'activation de vibration et afficher la bonne icone.
      //TODO Améliorer l'affichage */
      if (VibrationActivateCheck.checked) {
        console.log(vibrationActivated);
        vibrationIconOn.style.display = "block";
        vibrationIconOff.style.display = "none";
      } else {
        vibrationIconOff.style.display = "block";
        vibrationIconOn.style.display = "none";
      }
      VibrationDisplayBtn.style.background = "rgb(123, 155, 216)";
    }
  }
}

export function renderTimeParams() {
  return `
    <div id="time-wrapper">
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

export function displayTimeTopBar() {
  const hourParamBtn = document.querySelector('#hour-display-check');
  const minParamBtn = document.querySelector('#min-display-check');
  const secParamBtn = document.querySelector('#sec-display-check');
  const hourNavDisplay = document.querySelector('#digital-clock-hour');
  const minNavDisplay = document.querySelector('#digital-clock-min');
  const secNavDisplay = document.querySelector('#digital-clock-sec');
  hourParamBtn.addEventListener("click", function() {
    if (hourParamBtn.checked == true) {
        // document.getElementById(clock-nav).append(`<span id="digital-clock-hour"></span><span>:</span>`);
        hourNavDisplay.style.display = "block";
        hourNavDisplay.nextElementSibling.style.display = "block";
    } else {
        // hourNavDisplay.remove();
        hourNavDisplay.style.display = "none";
        hourNavDisplay.nextElementSibling.style.display = "none";
    }
  })
  minParamBtn.addEventListener("click", function() {
    if (minParamBtn.checked == true) {

        minNavDisplay.style.display = "block";
        minNavDisplay.nextElementSibling.style.display = "block";
    } else {
        minNavDisplay.style.display = "none";
        minNavDisplay.nextElementSibling.style.display = "none";
    }
  })
  secParamBtn.addEventListener("click", function() {
    if (secParamBtn.checked == true) {
        secNavDisplay.style.display = "block";
    } else {
        secNavDisplay.style.display = "none";
    }
  })
}

export function displayCheckedValues(dateCheck, monthCheck, yearCheck) {
  let a = `${day} `;
  if ((dateCheck === null) || (dateCheck === "false")) a = "";
  let b = `${month} `;
  if ((monthCheck === null) || (monthCheck === "false")) b = "";
  let c = `${year}`;
  if ((yearCheck === null) || (yearCheck === "false")) c = "";
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
      monthDisplay === "true" ? (monthDisplay = "false") : (monthDisplay = "true");
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
        dateDisplay === "true" ? (dateDisplay = "false") : (dateDisplay = "true");
        displayDate(dayDisplay, monthDisplay, yearDisplay);
      } else {
        dateField.innerHTML = "";
        dateDisplay === "true" ? (dateDisplay = "false") : (dateDisplay = "true");
      }
    });
  }
}

function displayDate(dayCheck, monthCheck, yearCheck) {
  const dateField = document.querySelector(".dateTime");
  if (dateDisplay === "true") dateField.innerHTML = displayCheckedValues(dayCheck, monthCheck, yearCheck);

}

export function renderDateParams() {
  return `
    <div id="date-wrapper">
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

export function renderBatteryParams() {
  return `
    <div id="battery-wrapper">
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
  checkbox.addEventListener('change', function() {
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

export function renderNetworkParams() {
  return `
    <div id="network-wrapper">
      <h1>Paramètres de latence réseau</h1>
      <div class="network-param-display">Afficher la latence réseau
        <input type="checkbox" id="battery-display-check" name="params" class="param-switch">
        <label for="battery-display-check" class="param-label">
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
        <select id="refresh-time-select" class="refresh-time-select">
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
        </select>
      </div>
    </div>
  `;
}

/**
 * * Get the network latency and configure with the refresh time
 * @param {integer} refreshTime 
 */
export function getNetworkLatency(refreshTime) {
  const startTime = window.performance.now(); //* Get accurate start time of network latency since page load
  //* Make request to server
  fetch(window.location.href)
    .then(response => response.text())
    .then(text => {
      const endTime = window.performance.now(); //* Get the time at which the response from the server was received
      const latency = Math.round(endTime - startTime); //* Calculate the latency to get the time it took for the response to be received
      console.log(latency);
    })
    .catch(error => console.error(error));
  //* Call the function again after the specified refresh time changed
  // setTimeout(() => {
  //   getNetworkLatency(refreshTime);
  // }, refreshTime * 1000);
}
