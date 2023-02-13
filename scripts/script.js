import { renderCalculatorBody, calculate } from "./Calculatrice.js";
import { renderVibrationBody, vibrate, renderParamsBody,
renderTimeParams, renderDateParams, renderBatteryParams, renderNetworkParams
} from "./Params.js";
import { render as renderTicTacToe, init as initTicTacToe } from "./tictactoe.js";
import { setTheme } from "./Theme.js";
import { renderClock } from "./clock.js";

//*variables
const switchModeBtn = document.querySelector("#switch-mode-btn");
const calculatorIcon = document.querySelector("#calculator-icon");
const backgroundWindow = document.querySelector(".window");
const closeWindowButton = document.querySelector(".fa-xmark");
const reduceWindowButton = document.querySelector(".fa-minus");

const paramsIcon = document.querySelector("#params-icon");
const paramsBody = document.querySelector("#params"); //c'est pas présent dans le DOM ça
const calculatorIconSmall = document.querySelector("#calculator-icon-small");
const paramsIconSmall = document.querySelector("#params-icon-small");
const header = document.querySelector("header");
const main = document.querySelector("main");
const morpionsIconSmall = document.querySelector("#morpions-icon-small");
const operationsPannel = document.querySelector("#operations-pannel");
// const paramVibration = document.querySelector("#params-vibration");
// const calculatorWrapper = document.querySelector(".calculator-wrapper");
const windowContent = document.querySelector(".window-content");
const morpionIcon = document.querySelector("#tictactoe-icon");
const clockIcon = document.querySelector("#clock-icon");
const windowBar = document.querySelector(".window-upper-btns");


let morpionPanel = null;
let calculatorPanel = null;
let paramsPanel = null;
let clockPanel = null;
let displayedApp = "";
let openedApps = [];
let openedParams = [];

// if page fully loaded
window.addEventListener("load", () => {
    saveCheckboxState();
    function saveCheckboxState() {
        // Get all checkbox elements on the page
        let checkboxes = document.querySelectorAll("input[type=checkbox]");
        console.log(checkboxes)
        // Add an event listener for the change event to each checkbox
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener("change", function() {
                // Get the current state of the checkbox
                let isChecked = checkbox.checked;
                // Save the state to session storage using the checkbox's id as the key
                sessionStorage.setItem(checkbox.id, isChecked);
                if (checkbox.id == "mode" && isChecked == true) {
                    setTheme("dark");
                } else {
                    setTheme("light");
                }
            });
        });

        // Retrieve the saved states from session storage
        checkboxes.forEach(function(checkbox) {
        let savedState = sessionStorage.getItem(checkbox.id);
            // Update the checkbox state and set the theme accordingly if theme checkbox is checked
            if (checkbox.id == "mode") {
                checkbox.checked = savedState === "true";
                setTheme(savedState === "true" ? "dark" : "light");
            } else {
                checkbox.checked = savedState === "true";
            }
            // if (savedState === "true") {
            //     checkbox.checked = true;
            //     setTheme("dark");
            // } else {
            //     checkbox.checked = false;
            //     setTheme("light");
            // }
        });
    }
    


    //*landing page code
    const enterBtn = document.querySelector(".open_systeme_button");
    const startingPage = document.querySelector("#starting-page");
    enterBtn.addEventListener("click", function () {
        var audio = new Audio("../assets/sounds/Bling.m4a");
        audio.play();

        let animation = startingPage.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 1000,
            easing: "linear",
        });

        animation.finished.then(() => {
            //*at click on button, display the elements.
            if (header) {
                header.style.display = "block";
            }

            if (startingPage) {
                startingPage.style.display = "none";
            }
        });
    });

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
        case "params":
            windowContent.insertAdjacentHTML("beforeend", renderParamsBody());
        break;
        default:
    }
    displayedApp = content;
    openedApps.push(content);
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
                //windowContent.innerHTML = "";   //remettre le contenu de windows à rien. pas sure que ce soit la meilleure manière de faire ça.
                paramsPanel.style.display = "none";
                    switch (paramId) {
                        case "params-vibration":
                            if (openedParams !== undefined && openedParams.includes("vibration-wrapper")) {
                                document.querySelector("#vibration-wrapper").style.display = "block";
                            } else {
                                windowContent.insertAdjacentHTML("beforeend",  renderVibrationBody());
                                openedParams.push("vibration-wrapper");
                                vibrate();
                                saveCheckboxState();
                            }
                        break;
                        case "params-time":
                            if (openedParams !== undefined && openedParams.includes("time-wrapper")) {
                                document.querySelector("#time-wrapper").style.display = "block";
                            } else {
                                windowContent.insertAdjacentHTML("beforeend",  renderTimeParams());
                                openedParams.push("time-wrapper");
                                saveCheckboxState();
                            }
                        break;
                        case "params-date":
                            if (openedParams !== undefined && openedParams.includes("date-wrapper")) {
                                document.querySelector("#date-wrapper").style.display = "block";
                            } else {
                                windowContent.insertAdjacentHTML("beforeend",  renderDateParams());
                                openedParams.push("date-wrapper");
                                saveCheckboxState();
                            }
                        break;
                        case "params-battery":
                            if (openedParams !== undefined && openedParams.includes("battery-wrapper")) {
                                document.querySelector("#battery-wrapper").style.display = "block";
                            } else {
                                windowContent.insertAdjacentHTML("beforeend",  renderBatteryParams());
                                openedParams.push("battery-wrapper");
                                saveCheckboxState();
                            }
                        break;
                        case "params-network":
                            if (openedParams !== undefined && openedParams.includes("network-wrapper")) {
                                document.querySelector("#network-wrapper").style.display = "block";
                            } else {
                                windowContent.insertAdjacentHTML("beforeend",  renderNetworkParams());
                                openedParams.push("network-wrapper");
                                saveCheckboxState();
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
    if (displayedApp === "params") {
        paramsIconSmall.style.display = "none";
        displayedApp = "";
        windowContent.removeChild(paramsPanel);
        temp = openedApps.filter((app) => app !== "params");
        if (openedParams !== undefined) {
        openedParams.forEach ((param) => {
            windowContent.removeChild(document.querySelector(`#${param}`));
            temp2 = openedParams.filter((param) => param !== param);
        });
        }
        openedParams = temp2;
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
    if (displayedApp === "params") {
        paramsIconSmall.style.display = "block";
        openedParams.forEach ((param) => {
            document.querySelector(`#${param}`).style.display = "none";
        });
    }
    displayedApp = "";
    });

    //* at click on small icon of calc, display
    calculatorIconSmall.addEventListener("click", function () {
    if ((backgroundWindow.style.display === "none")) {
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
    if ((backgroundWindow.style.display === "none")) {
        backgroundWindow.style.display = "block";
        paramsPanel.style.display = "block";
    } else if (displayedApp !== "params") {
        hideDisplayedApp(displayedApp);
        paramsPanel.style.display = "block";
    }
    displayedApp = "params";
    });

    //* at click on small icon of morpion, display
    morpionsIconSmall.addEventListener("click", function () {
    if ((backgroundWindow.style.display === "none")) {
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
            case "params":
            paramsPanel.style.display = "none";
            default:
            break;
        }
    };

    //*code du drag
    const dragElement = (elmnt) => {
    let pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = elmnt.offsetTop - pos2 + "px";
        elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
    };

    if (enterBtn) {
    //enterBtn.style.display = "none"; //pourquoi ?
    }

    if (main) {
    main.style.display = "block";
    }

    dragElement(backgroundWindow);

    let isDragging = false;

    document.addEventListener("mousedown", function (event) {
    let dragElement = event.target.closest(".draggable");

    if (!dragElement) return;

    event.preventDefault();

    dragElement.ondragstart = function () {
        return false;
    };

    let coords, shiftX, shiftY;

    startDrag(dragElement, event.clientX, event.clientY);

    function onMouseUp(event) {
        finishDrag();
    }

    function onMouseMove(event) {
        moveAt(event.clientX, event.clientY);
    }

    // on drag start:
    //   remember the initial shift
    //   move the element position:fixed and a direct child of body
    function startDrag(element, clientX, clientY) {
        if (isDragging) {
            return;
        }

        isDragging = true;

        document.addEventListener("mousemove", onMouseMove);
        element.addEventListener("mouseup", onMouseUp);

        shiftX = clientX - element.getBoundingClientRect().left;
        shiftY = clientY - element.getBoundingClientRect().top;

        element.style.position = "fixed";

        moveAt(clientX, clientY);
    }

    // switch to absolute coordinates at the end, to fix the element in the document
    function finishDrag() {
        if (!isDragging) {
            return;
        }

        isDragging = false;

        dragElement.style.top =
        parseInt(dragElement.style.top) + window.pageYOffset + "px";
        dragElement.style.position = "absolute";

        document.removeEventListener("mousemove", onMouseMove);
        dragElement.removeEventListener("mouseup", onMouseUp);
    }

    function moveAt(clientX, clientY) {
        // new window-relative coordinates
        let newX = clientX - shiftX;
        let newY = clientY - shiftY;

        // check if the new coordinates are below the bottom window edge
        let newBottom = newY + dragElement.offsetHeight; // new bottom

        // below the window? let's scroll the page
        if (newBottom > document.documentElement.clientHeight) {
        // window-relative coordinate of document end
        let docBottom = document.documentElement.getBoundingClientRect().bottom;

        // scroll the document down by 10px has a problem
        // it can scroll beyond the end of the document
        // Math.min(how much left to the end, 10)
        let scrollY = Math.min(docBottom - newBottom, 10);

        // calculations are imprecise, there may be rounding errors that lead to scrolling up
        // that should be impossible, fix that here
        if (scrollY < 0) scrollY = 0;

        window.scrollBy(0, scrollY);

        // a swift mouse move make put the cursor beyond the document end
        // if that happens -
        // limit the new Y by the maximally possible (right at the bottom of the document)
        newY = Math.min(
            newY,
            document.documentElement.clientHeight - dragElement.offsetHeight
        );
        }

        // check if the new coordinates are above the top window edge (similar logic)
        if (newY < 0) {
        // scroll up
        let scrollY = Math.min(-newY, 10);
        if (scrollY < 0) scrollY = 0; // check precision errors

        window.scrollBy(0, -scrollY);
        // a swift mouse move can put the cursor beyond the document start
        newY = Math.max(newY, 0); // newY may not be below 0
        }

        // limit the new X within the window boundaries
        // there's no scroll here so it's simple
        if (newX < 0) newX = 0;
        if (
        newX >
        document.documentElement.clientWidth - dragElement.offsetWidth
        ) {
        newX = document.documentElement.clientWidth - dragElement.offsetWidth;
        }

        dragElement.style.left = newX + "px";
        dragElement.style.top = newY + "px";
    }
});
});



    
