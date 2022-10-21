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
document.getElementById("defaultTab").click()

function setClock() {
    const handHour = document.querySelector(".hand-hour")
    const handMin = document.querySelector(".hand-min")
    const handSecond = document.querySelector(".hand-second")
    let timeRef = document.getElementById("digitalClock")

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
        document.getElementById("timeRef").innerHTML = 'PM'
    } else {
        document.getElementById("timeRef").innerHTML = 'AM'
    }

    // digital clock
    let hoursText = (hours < 10) ? "0" + hours : hours;
    let minsText = (mins < 10) ? "0" + mins : mins;
    let secondsText = (seconds < 10) ? "0" + seconds : seconds;

    let timeText = hoursText + ":" + minsText + ":" + secondsText
    timeRef.innerText = timeText
    timeRef.textContent = timeText
}

setInterval(setClock, 1000)
setClock()