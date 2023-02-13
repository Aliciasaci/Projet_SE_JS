const backgroundWindow = document.querySelector(".window");
const paramsBody = document.querySelector("#params");
const paramTime = document.querySelector('#params-time');
const timeNavWrapper = document.querySelector('#time-wrapper');
const hourParamBtn = document.querySelector('#hour-display-check');
const minParamBtn = document.querySelector('#min-display-check');
const secParamBtn = document.querySelector('#sec-display-check');
const hourNavDisplay = document.querySelector('#digital-clock-hour');
const minNavDisplay = document.querySelector('#digital-clock-min');
const secNavDisplay = document.querySelector('#digital-clock-sec');

//* ta tout déplacé ? on peut supprimer ? 
/**
 * Save checkbox state in settings to session storage
 */
let checkboxArray = [];
let checkbox = document.querySelectorAll("input[type=checkbox][name=params]");

function saveCheckboxState() {
    console.log("test page settings")
    checkbox.forEach((element, i) => { 
        checkboxArray[i] = checkbox[i].checked;
        sessionStorage.setItem("checkboxArray", JSON.stringify(checkboxArray));
    });
}

/**
 * Check if checkbox state is saved in session storage, if so, set checkbox state to saved state
 */
checkbox.forEach((element, i) => {
    if(sessionStorage.length > 0) {
        checkboxArray = JSON.parse(sessionStorage.getItem("checkboxArray"));
        checkbox[i].checked = checkboxArray[i];
    }
    checkbox[i].addEventListener("click", saveCheckboxState);
});


/**
 * time parameters to display time on nav bar
 */
if (paramTime) {
    paramTime.addEventListener("click", function() {
        paramsBody.style.display = "none";
        if (timeNavWrapper) {
            backgroundWindow.append(timeNavWrapper);
            timeNavWrapper.style.display = "block";
        }

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

    })
}

window.addEventListener('change', saveCheckboxState);