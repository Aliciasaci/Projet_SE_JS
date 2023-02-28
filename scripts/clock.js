/**
 * * Render the clock windown when click on the clock app icon
 * @returns {string} HTML code for the clock
 */
export function renderClock() {
  return `
    <div id="clock" class="wrapper">
        <div class="card">
            <div class="tab">
                <button class="tab-links" id="clock-tab-btn">Horloge</button>
                <button class="tab-links" id="stopwatch-tab-btn">Chronomètre</button>
                <button class="tab-links" id="timer-tab-btn">Minuteur</button>  
            </div>
            <div id="tab-clock" class="tab-content">
                <div class="analog-clock">
                    <div class="line">
                        <div class="sub sub-one"></div>
                        <div class="sub sub-two"></div>
                        <div class="sub sub-three"></div>
                        <div class="sub sub-four"></div>
                        <div class="circle">
                            <div class="hand hand-hour"></div>
                            <div class="hand hand-min"></div>
                            <div class="hand hand-second"></div>
                            <div id="time-ref" class="time-ref-display"></div>
                        </div>
                    </div>
                </div>
                <div id="digital-clock" class="digital-clock-display">          
                </div>
            </div>
            <div id="tab-stopwatch" class="tab-content">
                <div class="stopwatch-wrapper">
                    <div class="time-display">
                        <span id="stopwatch-hour">00</span> :
                        <span id="stopwatch-min">00</span> :
                        <span id="stopwatch-sec">00</span> ,
                        <span id="stopwatch-milisec">00</span> 
                    </div>
                    <div class="stopwatch-btn">
                        <button id="start-pause-stopwatch" class="btn btn-clock btn-start-stopwatch">Démarrer</button>
                        <button id="reset-stopwatch" class="btn btn-clock btn-reset-stopwatch">Effacer</button>
                        <button id="lap-stopwatch" class="btn btn-clock btn-lap-stopwatch">Arrêter (lap)</button>
                    </div>
                    <div class="stopwatch-lap">
                        <div id="lap-list" class="lap-list">
                            <div class="lap-item">
                                <span class="lap-item-number"></span>
                                <span class="lap-item-time"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="tab-timer" class="tab-content">
                <div class="timer-wrapper">
                    <div class="time-inputs">
                        <input type="text" id="timer-hour">
                        <input type="text" id="timer-min">
                        <input type="text" id="timer-sec">
                    </div>
                    <div class="timer-btn">
                        <button id="start-pause-timer" class="btn btn-clock btn-timer btn-start-timer">Démarrer</button>
                        <button id="reset-timer" class="btn btn-clock btn-timer btn-reset-timer">Annuler</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

/**
 * * Open the tab when click on the tab button
 * @param {string} e - Event to be performed on the tab
 * @param {string} el - Element to be displayed : tab-clock, tab-stopwatch, tab-timer
 */
export function openTab(e, el) {
  let i, tabContent, tabLinks;
  //* clear the previous clicked content
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  //* set "active" tab
  tabLinks = document.getElementsByClassName("tab-links");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }
  //* display the clicked tab and set to active.
  document.getElementById(el).style.display = "block";
  e.currentTarget.className += " active";
}

/**
 * * Set the clock to be displayed in the tab clock
 */
export function setClock() {
  const handHour = document.querySelector(".hand-hour");
  const handMin = document.querySelector(".hand-min");
  const handSecond = document.querySelector(".hand-second");

  const now = new Date();

  //* analog clock
  const seconds = now.getSeconds();
  const secondsPosition = (seconds / 60) * 360 + 90;
  if (handSecond){
    handSecond.style.transform = `rotate(${secondsPosition}deg)`;
  }

  const mins = now.getMinutes();
  const minsPosition = (mins / 60) * 360 + (seconds / 60) * 6 + 90;
  if (handMin) {
    handMin.style.transform = `rotate(${minsPosition}deg)`;
  }

  const hours = now.getHours();
  const hoursPosition = (hours / 12) * 360 + (mins / 60) * 30 + 90;
  if (handHour) {
    handHour.style.transform = `rotate(${hoursPosition}deg)`;
  }
  
  if (document.getElementById("time-ref")){
  if (hours > 11) {
    document.getElementById("time-ref").innerHTML = "PM";
  } else {
    document.getElementById("time-ref").innerHTML = "AM";
  }
}

  //* call function digital clock
  setDigitalClock(seconds, mins, hours);
}

/**
 * * Set the digital clock to be displayed in the tab clock
 * @param {string} seconds - seconds
 * @param {string} mins - minutes
 * @param {string} hours - hours
 */
function setDigitalClock(seconds, mins, hours) {
  let digitalClock = document.getElementById("digital-clock");
  let hoursText = hours < 10 ? "0" + hours : hours;
  let minsText = mins < 10 ? "0" + mins : mins;
  let secondsText = seconds < 10 ? "0" + seconds : seconds;

  let timeText = hoursText + ":" + minsText + ":" + secondsText;
  if (digitalClock) {
  digitalClock.innerText = timeText;
  digitalClock.textContent = timeText;
  }
}

/**
 * * Set the digital clock to be displayed in the top bar
 */
export function setDigitalClockTopBar() {
  const now = new Date();
  const seconds = now.getSeconds();
  const mins = now.getMinutes();
  const hours = now.getHours();

  let digitalClockHour = document.getElementById("digital-clock-hour");
  let digitalClockMin = document.getElementById("digital-clock-min");
  let digitalClockSec = document.getElementById("digital-clock-sec");

  let hoursText = hours < 10 ? "0" + hours : hours;
  let minsText = mins < 10 ? "0" + mins : mins;
  let secondsText = seconds < 10 ? "0" + seconds : seconds;

  let hourText = hoursText;
  let minText = minsText;
  let secText = secondsText;

  if (digitalClockHour && digitalClockMin && digitalClockSec) {
  digitalClockHour.innerText = hourText;
  digitalClockHour.textContent = hourText;
  digitalClockMin.innerText = minText;
  digitalClockMin.textContent = minText;
  digitalClockSec.innerText = secText;
  digitalClockSec.textContent = secText;
  }
}

let startTime;
let elapsedTime = 0;
let timerInterval;
let status = "PAUSED";
let lapCount = 0;
let duration = 0;
let alarm = new Audio("../assets/sounds/alarm.mp3");

/**
 * * Start the stopwatch
 */
function updateStopWatch() {
  //* Use Date() to get the current time
  startTime = new Date().getTime();
  timerInterval = setInterval(function () {
    elapsedTime = new Date().getTime() - startTime; //* Calculate the elapsed time in ms

    //* Convert the elapsed time to hours, mins, seconds and miliseconds
    const hours = Math.floor(elapsedTime / 3600000);
    const mins = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor(((elapsedTime % 360000) % 60000) / 1000);
    const miliseconds = Math.floor(
      (((elapsedTime % 360000) % 60000) % 1000) / 10
    );

    //* Format the hours, minutes, seconds and miliseconds to 2 digits
    document.getElementById("stopwatch-hour").innerHTML = hours
      .toString()
      .padStart(2, "0");
    document.getElementById("stopwatch-min").innerHTML = mins
      .toString()
      .padStart(2, "0");
    document.getElementById("stopwatch-sec").innerHTML = seconds
      .toString()
      .padStart(2, "0");
    document.getElementById("stopwatch-milisec").innerHTML = miliseconds
      .toString()
      .padStart(2, "0");
  }, 10); //* Update every 10ms
}

/**
 * * Start or pause the stopwatch
 */
export function startPauseStopWatch() {
  if (status === "PAUSED") {
    updateStopWatch();
    document.getElementById("start-pause-stopwatch").innerHTML = "Annuler";
    status = "RUNNING";
  } else {
    window.clearInterval(timerInterval);
    document.getElementById("start-pause-stopwatch").innerHTML = "Démarrer";
    status = "PAUSED";
  }
}

/**
 * * Reset the stopwatch to 00:00:00:00
 */
export function reset() {
  window.clearInterval(timerInterval);
  elapsedTime = 0;
  document.getElementById("stopwatch-hour").innerHTML = "00";
  document.getElementById("stopwatch-min").innerHTML = "00";
  document.getElementById("stopwatch-sec").innerHTML = "00";
  document.getElementById("stopwatch-milisec").innerHTML = "00";
  document.getElementById("start-pause-stopwatch").innerHTML = "Démarrer";
  status = "PAUSED";

  //* reset the lap list
  let lapList = document.getElementById("lap-list");
  lapList.innerHTML = "";
  lapCount = 0;
}

/**
 * * Add a lap to the lap list
 */
export function lap() {
  if (status === "RUNNING") {
    lapCount++;
    let lapList = document.getElementById("lap-list");
    let lapItem = document.createElement("li");
    lapItem.className = "lap-item";
    lapItem.innerHTML = `
            <div class="lap-item-number">${lapCount}</div>
            <div class="lap-item-time">${
              document.getElementById("stopwatch-hour").innerHTML
            }:${document.getElementById("stopwatch-min").innerHTML}:${
      document.getElementById("stopwatch-sec").innerHTML
    }:${document.getElementById("stopwatch-milisec").innerHTML}</div>
        `;
    lapList.appendChild(lapItem);
  }
}

/**
 * * Start the timer
 */
function updateTimer(duration) {
  startTime = new Date().getTime();
  timerInterval = setInterval(function () {
    //* Calculate the elapsed time in ms and convert it to seconds
    elapsedTime = new Date().getTime() - startTime;
    const remainingTime = duration - elapsedTime;
    if (remainingTime <= 0) {
      window.clearInterval(timerInterval);
      //* Play the alarm sound when the time is over
      alarm.play();
      if (localStorage.getItem("vibration-clock-check") === "true") {
        window.navigator.vibrate(1000);
      }
      //* Display a notification when the time is over
      if (!("Notification" in window)) {
        alert("Ce navigateur ne prend pas en charge la notification de bureau");
      }
      // Vérifions si les autorisations de notification ont déjà été accordées
      else if (Notification.permission === "granted") {
        // Si tout va bien, créons une notification
        const notification = new Notification("Le temps s'est écoulé !");
      }
      // Sinon, nous devons demander la permission à l'utilisateur
      else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          // Si l'utilisateur accepte, créons une notification
          if (permission === "granted") {
            const notification = new Notification("Le temps s'est écoulé !");
          }
        });
      }
      document.getElementById("start-pause-timer").innerHTML = "Démarrer";
      status = "PAUSED";
    }

    if (remainingTime > 0) {
      //* Convert the remaining time to hours, mins, seconds and miliseconds
      const hours = Math.floor(remainingTime / 3600000);
      const mins = Math.floor((remainingTime % 3600000) / 60000);
      const seconds = Math.floor(((remainingTime % 360000) % 60000) / 1000);
      //* Format the hours, minutes, seconds and miliseconds to 2 digits
      document.getElementById("timer-hour").value = hours
        .toString()
        .padStart(2, "0");
      document.getElementById("timer-min").value = mins
        .toString()
        .padStart(2, "0");
      document.getElementById("timer-sec").value = seconds
        .toString()
        .padStart(2, "0");
    }
  }, 10); //* Update every 10ms
}

/**
 * * Start or pause the timer
 * @param {string} hourValue - The hour value of the timer
 * @param {string} minValue - The minute value of the timer
 * @param {string} secValue - The second value of the timer
 */
export function startPauseTimer(hourValue, minValue, secValue) {
  if (status === "PAUSED") {
    //* Convert the hour, minute and second values to ms and add them to get the total duration
    duration = hourValue * 3600000 + minValue * 60000 + secValue * 1000;
    //* Start the timer
    updateTimer(duration);
    document.getElementById("start-pause-timer").innerHTML = "Arrêter";
    status = "RUNNING";
  } else {
    //* Pause the timer
    window.clearInterval(timerInterval);
    document.getElementById("start-pause-timer").innerHTML = "Démarrer";
    status = "PAUSED";
  }
}

/**
 * * Reset the timer to 00:00:00
 */
export function resetTimer() {
  window.clearInterval(timerInterval);
  elapsedTime = 0;
  document.getElementById("timer-hour").innerHTML = "00";
  document.getElementById("timer-min").innerHTML = "00";
  document.getElementById("timer-sec").innerHTML = "00";
  document.getElementById("start-pause-timer").innerHTML = "Démarrer";
  status = "PAUSED";
  alarm.pause();
}
