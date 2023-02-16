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
                        <button id="start-pause-stopwatch" class="btn btn-stopwatch btn-start-stopwatch">Démarrer</button>
                        <button id="reset-stopwatch" class="btn btn-stopwatch btn-reset-stopwatch">Effacer</button>
                        <button id="lap-stopwatch" class="btn btn-stopwatch btn-lap-stopwatch">Arrêter</button>
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
                <p>Test timer</p>
            </div>
        </div>
    </div>`;
};

/**
 * * Open the tab when click on the tab button
 * @param {string} event - Action to be performed on the tab
 * @param {string} el - Element to be displayed : tab-clock, tab-stopwatch, tab-timer
 */
export function openTab(ev, el) {
    let i, tabContent, tabLinks;
    //* clear the previous clicked content
    tabContent = document.getElementsByClassName("tab-content");
    for(i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
    //* set "active" tab
    tabLinks = document.getElementsByClassName("tab-links");
    for(i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }
    //* display the clicked tab and set to active.
    document.getElementById(el).style.display = "block";
    event.currentTarget.className += " active";
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
    const secondsPosition = ((seconds / 60) * 360) + 90;
    handSecond.style.transform = `rotate(${secondsPosition}deg)`;

    const mins = now.getMinutes();
    const minsPosition = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90 ;
    handMin.style.transform = `rotate(${minsPosition}deg)`;

    const hours = now.getHours();
    const hoursPosition = ((hours / 12) * 360) + ((mins / 60) * 30) + 90;
    handHour.style.transform = `rotate(${hoursPosition}deg)`;

    if(hours > 11) {
        document.getElementById("time-ref").innerHTML = 'PM';
    } else {
        document.getElementById("time-ref").innerHTML = 'AM';
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
    let hoursText = (hours < 10) ? "0" + hours : hours;
    let minsText = (mins < 10) ? "0" + mins : mins;
    let secondsText = (seconds < 10) ? "0" + seconds : seconds;

    let timeText = hoursText + ":" + minsText + ":" + secondsText;
    digitalClock.innerText = timeText;
    digitalClock.textContent = timeText;
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

    let hoursText = (hours < 10) ? "0" + hours : hours;
    let minsText = (mins < 10) ? "0" + mins : mins;
    let secondsText = (seconds < 10) ? "0" + seconds : seconds;

    let hourText = hoursText;
    let minText = minsText;
    let secText = secondsText;

    digitalClockHour.innerText = hourText;
    digitalClockHour.textContent = hourText;
    digitalClockMin.innerText = minText;
    digitalClockMin.textContent = minText;
    digitalClockSec.innerText = secText;
    digitalClockSec.textContent = secText;
}

let startTime;
let elapsedTime = 0;
let timerInterval;

let status = "PAUSED";
let lapCount = 0;

/**
 * * Start the stopwatch
 */
function startStopWatch() {
    //* Use Date() to get the current time
    startTime = new Date().getTime();
    timerInterval = setInterval(function () {
        const elapsedTime = new Date().getTime() - startTime; //* Calculate the elapsed time in ms

        //* Convert the elapsed time to hours, mins, seconds and miliseconds
        const hours = Math.floor(elapsedTime / 3600000);
        const mins = Math.floor((elapsedTime % 3600000) / 60000);
        const seconds = Math.floor(((elapsedTime % 360000) % 60000) / 1000);
        const miliseconds = Math.floor(((elapsedTime % 360000) % 60000) % 1000 / 10);

        //* Format the minutes, seconds and miliseconds to 2 digits
        document.getElementById("stopwatch-hour").innerHTML = hours;
        document.getElementById("stopwatch-min").innerHTML = mins.toString().padStart(2, "0");
        document.getElementById("stopwatch-sec").innerHTML = seconds.toString().padStart(2, "0");
        document.getElementById("stopwatch-milisec").innerHTML = miliseconds.toString().padStart(2, "0");
    }, 10); //* Update every 10ms
}

/**
 * * Start or pause the stopwatch
 */
export function startPause() {
    if(status === "PAUSED") {
        startStopWatch();
        document.getElementById("start-pause-stopwatch").innerHTML = "Terminer";
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
    if(status === "RUNNING") {
        lapCount++;
        let lapList = document.getElementById("lap-list");
        let lapItem = document.createElement("li");
        lapItem.className = "lap-item";
        lapItem.innerHTML = `
            <div class="lap-item-number">${lapCount}</div>
            <div class="lap-item-time">${document.getElementById("stopwatch-hour").innerHTML}:${document.getElementById("stopwatch-min").innerHTML}:${document.getElementById("stopwatch-sec").innerHTML}:${document.getElementById("stopwatch-milisec").innerHTML}</div>
        `;
        lapList.appendChild(lapItem);
    }
}



