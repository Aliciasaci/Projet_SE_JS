import { DivisionError } from './ExceptionsClasses.js';
import { render as renderTicTacToe, init as initTicTacToe } from './tictactoe.js';



//*variables
const switchModeBtn = document.querySelector("#switch-mode-btn");
const calculatorIcon = document.querySelector("#calculator-icon");
const calculatorBody = document.querySelector("#calculator");
const backgroundWindow = document.querySelector(".window");
const closeWindowButton = document.querySelector(".fa-xmark");
const reduceWindowButton = document.querySelector(".fa-minus");
const paramsIcon = document.querySelector("#params-icon");
const paramsBody = document.querySelector("#params");
const calculatorIconSmall = document.querySelector("#calculator-icon-small");
const paramsIconSmall = document.querySelector("#params-icon-small");
const morpionsIconSmall = document.querySelector("#morpions-icon-small");
const operationsPannel = document.querySelector('#operations-pannel');
const paramVibration = document.querySelector('#params-vibration');
const calculatorWrapper = document.querySelector('.calculator-wrapper');
const vibrationWrapper = document.querySelector('#vibration-wrapper');
const VibrationDisplayBtn = document.querySelector('#vibration-display-btn');
const VibrationActivateBtn = document.querySelector('#vibration-activate-btn');
const windowContent = document.querySelector('.window-content');
const morpion = document.querySelector('#tictactoe');
const windowBar = document.querySelector('.window-upper-btns');
let morpionPanel = null;
let errorMessage = "";
let vibrationActivated = true;
let displayedApp = "";
let openedApps = [];

// if page fully loaded
window.addEventListener('load', () => {

    document.querySelectorAll('*')
  .forEach(element => element.addEventListener('click', e => {
    console.log('clicked: ', e.target);
    if(window.navigator.vibrate(200)){
        console.log("vibrating....");
    }
  }))

    const renderWindowContent = (content) => {
        
        switch (content) {
            case "tictactoe":
                windowContent.innerHTML = renderTicTacToe();
                initTicTacToe();
                break;
            default:
                break;
        }
        displayedApp = content;
        openedApps.push(content);
    }

    morpion.addEventListener('click', function () {
        if (displayedApp == "tictactoe") {
            backgroundWindow.style.display = "block";
            morpionPanel.style.display = "block";
        } else {
            renderWindowContent("tictactoe");
            morpionPanel = document.querySelector('#tictac');
            backgroundWindow.style.display = "block";
        }
        
    });

    //* function to create and set cookies
    //! le store du theme ne marche pas sur opera
    function setCookie(cookiName, cookieValue, expireDate) {
        const d = new Date();
        d.setTime(d.getTime() + (expireDate * 24 * 60 * 60 * 1000));
        let expiresAt = "expires=" + d.toUTCString();
        document.cookie = cookiName + "=" + cookieValue + ";" + expiresAt + ";path=/";
    }

    //* function that returns a cookie and it value
    function getCookie(cookiName) {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim().split('=');
            if (cookiName == cookie[0]) {
                return cookie;
            }
        }
    }

    //* set the theme 
    function setTheme(theme) {
        if (theme == "dark") { //dark mode
            document.body.style.backgroundImage = "url('assets/dark_mode.jpg')";
            switchModeBtn.style.filter = "invert(100%)";
            setCookie("theme", "dark", 30)
        } else if (theme == "light") {        //light mode
            document.body.style.backgroundImage = "url('assets/light_background_3.jpg')";
            switchModeBtn.style.filter = "invert(0%)";
            setCookie("theme", "light", 30)
        }
    }

    //* at load, check the cookie variable to set the theme
    if (getCookie("theme")) {
        const themeCookie = getCookie("theme");
        if (themeCookie[1] == undefined || themeCookie == "light") {
            setTheme("light"); //par défaut, c'est à light
        } else if (themeCookie[1] == "dark") {
            setTheme("dark");
        }
    }

    //*at click on calculator, display modal
    if (calculatorIcon) {
        calculatorIcon.addEventListener('click', function () {
            backgroundWindow.style.display = "block";
        });
    }

    //* at click on params, display 
    if (paramsIcon) {
        paramsIcon.addEventListener('click', function () {
            paramsBody.style.display = "block";
            backgroundWindow.style.display = "block";
            calculatorWrapper.style.display = "none"
        });
    }

    //* switch theme btn
    if (switchModeBtn) {
        let nbClickMode = 0;
        switchModeBtn.addEventListener('click', function () {
            if (nbClickMode % 2 == 0) {
                setTheme("dark");
            } else {
                setTheme("light");
            }
            nbClickMode++
        });
    }

    //* close window and app at clic on x
    if (closeWindowButton) {
        closeWindowButton.addEventListener('click', function () {
            backgroundWindow.style.display = "none";
            windowContent.innerHTML = "";
            if (calculatorBody.style.display == "block") {
                if (confirm("êtes-vous sûre de vouloir fermer la fenêtre?")) {
                    calculatorIconSmall.style.display = "none";
                    calculatorBody.style.display = "none";
                    operationsPannel.style.display = "none";
                    calculatorWrapper.style.display = "none"
                }
            }

            if (paramsBody.style.display == "block") {
                paramsBody.style.display = "none";
                paramsIconSmall.style.display = "none";
                operationsPannel.style.display = "none";
            }

            if (vibrationWrapper.style.display == "block") {
                vibrationWrapper.style.display = "none";
            }
            if (displayedApp === "tictactoe") {
                morpionsIconSmall.style.display = "none";
                displayedApp = "";
            }
        });
    }

    //* reduce window and app at clic on -
    if (reduceWindowButton) {
        reduceWindowButton.addEventListener('click', function () {
            backgroundWindow.style.display = "none";
            if (calculatorBody.style.display == "block") {
                calculatorBody.style.display = "none";
                calculatorIconSmall.style.display = "block";
                operationsPannel.style.display = "none";
            }

            if (paramsBody.style.display == "block") {
                paramsBody.style.display = "none";
                paramsIconSmall.style.display = "block";
                operationsPannel.style.display = "none";
            }

            if (displayedApp === "tictactoe") {
                morpionsIconSmall.style.display = "block";
                morpionPanel.style.display = "none";
            }
        });
    }

    //* at click on small icon of calc, display
    calculatorIconSmall.addEventListener('click', function () {
        if (calculatorBody.style.display == "none") {
            backgroundWindow.style.display = "block";
            calculatorBody.style.display = "block";
        }
    })

    //* at click on small icon of calc, display
    paramsIconSmall.addEventListener('click', function () {
        if (paramsBody.style.display == "none") {
            backgroundWindow.style.display = "block";
            paramsBody.style.display = "block";
        }
    })

    morpionsIconSmall.addEventListener('click', function () {
        if (backgroundWindow.style.display = "none") {
            backgroundWindow.style.display = "block";
            morpionPanel.style.display = "block";
        } else if (backgroundWindow.style.display = "block") {
            backgroundWindow.style.display = "none";
        }
    })



    /**
     * vibration code
     */
    if (paramVibration) {
        paramVibration.addEventListener('click', function () {
            paramsBody.style.display = "none";
            if (vibrationWrapper) {
                backgroundWindow.append(vibrationWrapper);
                vibrationWrapper.style.display = "block";
            }
            //* Afficher ou non l'état de vibration (vibration activé ou désactivé)
            if (VibrationDisplayBtn) {

                const vibrationIconOn = document.querySelector("#vibration-icon-on");
                const vibrationIconOff = document.querySelector("#vibration-icon-off");

                VibrationDisplayBtn.addEventListener('click', function () {
                    if (vibrationIconOn && vibrationIconOff) {
                        if (VibrationDisplayBtn.innerHTML == "Masquer") {
                            //si masquer l'état de vibration, masquer les deux icones;
                            vibrationIconOn.style.display = "none"
                            vibrationIconOff.style.display = "none"
                            VibrationDisplayBtn.innerHTML = "Afficher";
                            VibrationDisplayBtn.style.background = 'rgb(214, 133, 224, 0.7)';
                        } else {
                            //si afficher état de vibration, conditionner sur l'activation de vibration et afficher la bonne icone.
                            //**Améliorer l'affichage */
                            if (vibrationActivated == true) {
                                console.log(vibrationActivated);
                                vibrationIconOn.style.display = "block"
                                vibrationIconOff.style.display = "none"
                            } else {
                                vibrationIconOff.style.display = "block"
                                vibrationIconOn.style.display = "none"
                            }
                            VibrationDisplayBtn.innerHTML = "Masquer";
                            VibrationDisplayBtn.style.background = 'rgb(123, 155, 216)';
                        }
                    }
                })
            }

            //* Activer ou non le retour haptique de vibration
            if (VibrationActivateBtn) {

                VibrationActivateBtn.addEventListener('click', function () {
                    if (VibrationActivateBtn.innerHTML == "Activer") {
                        if (confirm("Activer le retour haptique de vibration ?")) {
                            VibrationActivateBtn.innerHTML = "Désactiver";
                            VibrationActivateBtn.style.background = 'rgb(123, 155, 216)';
                            vibrationActivated = true;
                        }
                    } else {
                        VibrationActivateBtn.innerHTML = "Activer";
                        vibrationActivated = false;
                        VibrationActivateBtn.style.background = 'rgb(214, 133, 224, 0.7)';
                    }
                    //activer le retour haptique sur tout le système 
                    //CODE vibration à chaque clique 
                    //stocker l'état de vibration à true ou false 
                })
            }
        })
    }

    const dragElement = (elmnt) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
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
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    dragElement(morpion);
    dragElement(backgroundWindow);

})


