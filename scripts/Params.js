let vibrationActivated = true;
const backgroundWindow = document.querySelector(".window");
const paramsBody = document.querySelector("#params");

export function renderParamsBody() {
  return `
    <div id="params" class="center">
      <h2>Paramètres</h2>
      <ul id="params-icons">
          <li id="params-time">
              <img src="assets/params_icons/clock.png" />
              <span>Paramètres d'horloge</span>
          </li>
          <li id="params-date">
              <img src="assets/params_icons/calendar.png" />
              <span>Date</span>
          </li>
          <li id="params-vibration">
              <img src="assets/params_icons/vibrate.png" />
              <span>Vibration</span>
          </li>
          <li id="params-battery">
              <img src="assets/params_icons/battery.png" />
              <span>Batterie</span>
          </li>
          <li id="params-network">
              <img src="assets/params_icons/network.png" />
              <span>Réseau</span>
          </li>
          <li>
              <img src="assets/params_icons/lock.png" />
              <span>Écran de verouillage</span>
          </li>
          <li>
              <img src="assets/params_icons/theme.png" />
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
    // backgroundWindow.append(vibrationWrapper);
    // vibrationWrapper.style.display = "block";
    // paramsBody.style.display = "none";

    //*Afficher état vibration
    const VibrationDisplayBtn = document.querySelector(
      "#vibration-display-btn"
    );
    if (VibrationDisplayBtn) {
      VibrationDisplayBtn.addEventListener("click", function () {
        displayEtatVibration(VibrationDisplayBtn);
      });
    }

    //*Activer la vibration
    const VibrationActivateBtn = document.querySelector(
      "#vibration-activate-btn"
    );
    if (VibrationActivateBtn) {
      VibrationActivateBtn.addEventListener("click", function () {
        etatVibration(VibrationActivateBtn);
      });
    }
  }
}

function displayEtatVibration(VibrationDisplayBtn) {
  const vibrationIconOn = document.querySelector("#vibration-icon-on");
  const vibrationIconOff = document.querySelector("#vibration-icon-off");

  if (vibrationIconOn && vibrationIconOff) {
    if (VibrationDisplayBtn.innerHTML == "Masquer") {
      //si masquer l'état de vibration, masquer les deux icones;
      vibrationIconOn.style.display = "none";
      vibrationIconOff.style.display = "none";
      VibrationDisplayBtn.innerHTML = "Afficher";
      VibrationDisplayBtn.style.background = "rgb(214, 133, 224, 0.7)";
    } else {
      //si afficher état de vibration, conditionner sur l'activation de vibration et afficher la bonne icone.
      //TODO Améliorer l'affichage */
      if (vibrationActivated == true) {
        console.log(vibrationActivated);
        vibrationIconOn.style.display = "block";
        vibrationIconOff.style.display = "none";
      } else {
        vibrationIconOff.style.display = "block";
        vibrationIconOn.style.display = "none";
      }
      VibrationDisplayBtn.innerHTML = "Masquer";
      VibrationDisplayBtn.style.background = "rgb(123, 155, 216)";
    }
  }
}

function etatVibration(VibrationActivateBtn) {
  //* Activer ou non le retour haptique de vibration
  if (VibrationActivateBtn) {
    VibrationActivateBtn.addEventListener("click", function () {
      if (VibrationActivateBtn.innerHTML == "Activer") {
        if (confirm("Activer le retour haptique de vibration ?")) {
          VibrationActivateBtn.innerHTML = "Désactiver";
          VibrationActivateBtn.style.background = "rgb(123, 155, 216)";
          vibrationActivated = true;
        }
      } else {
        VibrationActivateBtn.innerHTML = "Activer";
        vibrationActivated = false;
        VibrationActivateBtn.style.background = "rgb(214, 133, 224, 0.7)";
      }
      //TODO activer le retour haptique sur tout le système
      //TODO CODE vibration à chaque clique
      //TODO stocker l'état de vibration à true ou false
    });
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
      <h1>Paramètres de battery</h1>
      <div class="battery-param-display">Afficher la batterie
          <input type="checkbox" id="battery-display-check" name="params" class="param-switch">
          <label for="battery-display-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
    </div>
  `;
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
          <input type="checkbox" id="delay-network-check" name="params" class="param-switch">
          <label for="delay-network-check" class="param-label">
              <span class="param-label-background"></span>
          </label>
      </div>
    </div>
  `;
}
