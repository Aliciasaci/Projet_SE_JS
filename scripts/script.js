import { renderCalculatorBody, calculate } from './Calculatrice.js';

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
// const paramVibration = document.querySelector('#params-vibration');
const calculatorWrapper = document.querySelector('.calculator-wrapper');
const vibrationWrapper = document.querySelector('#vibration-wrapper');
// const VibrationDisplayBtn = document.querySelector('#vibration-display-btn');
// const VibrationActivateBtn = document.querySelector('#vibration-activate-btn');
const windowContent = document.querySelector('.window-content');


// if page fully loaded
window.addEventListener('load', () => {

    //* function that turns an html string to a dom element
    function textToHtml(text) {
        if (typeof text === 'string') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, "text/html");
            if (doc.body.firstChild) {
                return doc.body.firstChild
            }
        }
    }

    //*Calculator Code
    if (calculatorIcon) {
        calculatorIcon.addEventListener('click', function () {
            backgroundWindow.style.display = "block";

            const calculatorBodyString = renderCalculatorBody();
            const calculatorBodyDomElement = textToHtml(calculatorBodyString);

            if (calculatorBodyDomElement) {
                windowContent.append(calculatorBodyDomElement);

                const keys = document.querySelectorAll(".keys input");
                if (keys) {
                    keys.forEach(key => {
                        key.addEventListener('click', function () {
                            calculate(key);
                        })
                    })
                }
            }
        });
    }


    // //* at click on params, display 
    // if (paramsIcon) {
    //     paramsIcon.addEventListener('click', function () {
    //         paramsBody.style.display = "block";
    //         backgroundWindow.style.display = "block";
    //         calculatorWrapper.style.display = "none"
    //     });
    // }


    //* close window and app at clic on x
    if (closeWindowButton) {
        closeWindowButton.addEventListener('click', function () {
            backgroundWindow.style.display = "none";
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

    
    //*THEME CODE *//
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
})































