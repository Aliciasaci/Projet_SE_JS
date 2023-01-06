document.getElementById("clock").style.display = "none" // A enlever pour afficher l'horloge : test

function openTab(event, el) {
    let i, tabContent, tabLinks;
    // clear the previous clicked content
    tabContent = document.getElementsByClassName("tab-content")
    for(i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none"
    }
    // set "active" tab
    tabLinks = document.getElementsByClassName("tab-links");
    for(i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "")
    }
    // display the clicked tab and set to active.
    document.getElementById(el).style.display = "block"
    event.currentTarget.className += " active"
}
// define default tab to be displayed
document.getElementById("default-tab").click()


// horloge 
function setClock() {
    const handHour = document.querySelector(".hand-hour")
    const handMin = document.querySelector(".hand-min")
    const handSecond = document.querySelector(".hand-second")
    
    const now = new Date()

    // analog clock
    const seconds = now.getSeconds()
    const secondsPosition = ((seconds / 60) * 360) + 90
    handSecond.style.transform = `rotate(${secondsPosition}deg)`

    const mins = now.getMinutes()
    const minsPosition = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90 
    handMin.style.transform = `rotate(${minsPosition}deg)`

    const hours = now.getHours()
    const hoursPosition = ((hours / 12) * 360) + ((mins / 60) * 30) + 90
    handHour.style.transform = `rotate(${hoursPosition}deg)`

    if(hours > 11) {
        document.getElementById("time-ref").innerHTML = 'PM'
    } else {
        document.getElementById("time-ref").innerHTML = 'AM'
    }

    // call function digital clock
    setDigitalClock(seconds, mins, hours)
    setDigitalClockMenu(seconds, mins, hours)
    
}
// digital clock
function setDigitalClock(seconds, mins, hours) {
    let digitalClock = document.getElementById("digital-clock")
    let hoursText = (hours < 10) ? "0" + hours : hours
    let minsText = (mins < 10) ? "0" + mins : mins
    let secondsText = (seconds < 10) ? "0" + seconds : seconds

    let timeText = hoursText + ":" + minsText + ":" + secondsText
    digitalClock.innerText = timeText
    digitalClock.textContent = timeText
}

function setDigitalClockMenu(seconds, mins, hours) {
    let digitalClockHour = document.getElementById("digital-clock-hour")
    let digitalClockMin = document.getElementById("digital-clock-min")
    let digitalClockSec = document.getElementById("digital-clock-sec")

    let hoursText = (hours < 10) ? "0" + hours : hours
    let minsText = (mins < 10) ? "0" + mins : mins
    let secondsText = (seconds < 10) ? "0" + seconds : seconds

    let hourText = hoursText
    let minText = minsText
    let secText = secondsText

    digitalClockHour.innerText = hourText
    digitalClockHour.textContent = hourText
    digitalClockMin.innerText = minText
    digitalClockMin.textContent = minText
    digitalClockSec.innerText = secText
    digitalClockSec.textContent = secText
}

setInterval(setClock, 1000)
setClock()