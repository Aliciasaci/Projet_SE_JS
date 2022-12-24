import { DivisionError } from './ExceptionsClasses.js';

//*variables
const switchModeBtn = document.querySelector("#switch-mode-btn");
const keys = document.querySelectorAll(".keys input");
const resultInput = document.querySelector("#result-input");
const refreshBtn = document.querySelector("#btn-refresh");
const calculatorIcon = document.querySelector("#calculator-icon");
const calculatorBody = document.querySelector("#calculator");
const backgroundWindow = document.querySelector(".window");
const closeWindowButton = document.querySelector(".fa-xmark");
const reduceWindowButton = document.querySelector(".fa-minus");
const paramsIcon = document.querySelector("#params-icon");
const paramsBody = document.querySelector("#params");
const calculatorIconSmall = document.querySelector("#calculator-icon-small");
const paramsIconSmall = document.querySelector("#params-icon-small");
const operationsPannel = document.querySelector('#operations-pannel');
const paramVibration = document.querySelector('#params-vibration');
const calculatorWrapper = document.querySelector('.calculator-wrapper');
const vibrationWrapper = document.querySelector('#vibration-wrapper');
const VibrationDisplayBtn = document.querySelector('#vibration-display-btn');
const VibrationActivateBtn = document.querySelector('#vibration-activate-btn');
let errorMessage = "";
let vibrationActivated = true;

function devide(partOne, partTwo) {
    if (partTwo == 0)
        throw new DivisionError('Erreur de division par zéro');

    return parseFloat(partOne) / parseFloat(partTwo);
}

function add(partOne, partTwo) {
    if (partOne && partTwo)
        return parseFloat(partOne) + parseFloat(partTwo);
}

function substract(partOne, partTwo) {
    if (partOne && partTwo)
        return parseFloat(partOne) - parseFloat(partTwo);
}

function multiply(partOne, partTwo) {
    if (partOne && partTwo)
        return parseFloat(partOne) * parseFloat(partTwo);
}

//Fonction qui inverse le signe d'un chiffre/résultat
function invertSignNumber(number) {
    if (number)
        return -number
}

const operationsKeys = ["+", '-', "/", '*', "=", "+/-"];
const numbersKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
let operationPartOne = 0;
let operationPartTwo = 0;
let output = 0;
let operator = undefined;
let nbOperators = 0;
let nbPoint = 0;
let resultOfOperation = 0;
let resetOutput = 0;
resultInput.value = 0;

// if page fully loaded
window.addEventListener('load', () => {

    document.querySelectorAll('*')
  .forEach(element => element.addEventListener('click', e => {
    console.log('clicked: ', e.target);
    if(window.navigator.vibrate(200)){
        console.log("vibrating....");
    }
  }))

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

    //* calculator code
    //*at click on element
    if (keys) {
        keys.forEach(key => {
            key.addEventListener('click', function () {
                const keyValue = key.value;
                if (numbersKeys.includes(keyValue)) {//si chiffre 
                    if (resetOutput == 1) {
                        output = 0;
                        resetOutput = 0;
                    }
                    if (keyValue == ".") {
                        if (nbPoint == 0) {
                            if (nbOperators == 0) {               //si toujours pas d'operateur, on continue de remplir
                                operationPartOne += keyValue;
                            }
                            else {
                                operationPartTwo += keyValue;
                            }
                            output += keyValue;
                            nbPoint++;
                        }
                    }
                    else {
                        if (output == 0) {
                            output = keyValue;
                            operationPartOne = keyValue;     //construire la partie 1 de l'opération
                        } else {
                            if (nbOperators == 0) {               //si toujours pas d'operateur, on continue de remplir
                                output += keyValue;
                                operationPartOne += keyValue;
                            }
                            else {                               //le cas ou on a déjà un operateur
                                if (operationPartTwo == 0) {
                                    const outputLength = output.length;
                                    if (output.charAt(outputLength - 1) == 0) {
                                        operationPartTwo = keyValue;
                                        output[outputLength - 1] = keyValue;

                                    } else {
                                        operationPartTwo += keyValue;
                                        output += keyValue;
                                    }
                                } else {
                                    operationPartTwo += keyValue;
                                    output += keyValue;
                                }
                            }
                        }
                    }
                } else if (operationsKeys.includes(keyValue)) {
                    if (nbOperators == 0) {             //si aucun opérateur auparavant
                        if (keyValue != "=" && keyValue != "+/-") {          //vérifier que le premier opérateur saisi n'est pas un =
                            operator = keyValue;
                            nbOperators++;
                            output += operator;
                        }
                        else if (keyValue == "+/-") {
                            operationPartOne = invertSignNumber(operationPartOne);
                            output = operationPartOne;
                        }
                        nbPoint = 0;
                        resetOutput = 0;
                    } else {                    //dès qu'un operateur existe, vérifier lequel c'est, et faire l'operétation
                        const outputLength = output.length;
                        if (!operationsKeys.includes(output[outputLength - 1])) {
                            if (keyValue != "+/-") {
                                switch (operator) {
                                    case '+':
                                        resultOfOperation = add(operationPartOne, operationPartTwo);
                                        break;
                                    case '-':
                                        resultOfOperation = substract(operationPartOne, operationPartTwo);
                                        break;
                                    case '/':
                                        try {
                                            resultOfOperation = devide(operationPartOne, operationPartTwo)
                                        } catch (error) {
                                            if (error instanceof DivisionError) {
                                                errorMessage = "Error";
                                            } else {
                                                console.log(error.message);
                                            }
                                        }
                                        break;
                                    case '*':
                                        resultOfOperation = multiply(operationPartOne, operationPartTwo);
                                        break;
                                }
                                let listElement = document.createElement('li');   //créer une ligne dans le pannel d'affichage
                                listElement.innerHTML += output;
                                operationPartOne = resultOfOperation;
                                operationPartTwo = 0;
                                if (keyValue == "=") {
                                    output = operationPartOne;
                                    nbOperators = 0;
                                    listElement.innerHTML += "=";
                                    listElement.innerHTML += resultOfOperation;

                                    if (errorMessage == 'Error') {
                                        listElement.innerHTML = errorMessage;
                                    }

                                    operationsPannel.append(listElement);
                                    errorMessage = "";
                                    resetOutput = 1;

                                } else {
                                    operator = keyValue;
                                    output = operationPartOne + keyValue;
                                    resetOutput = 0;
                                }
                                nbPoint = 0;
                            } else {
                                operationPartTwo = invertSignNumber(operationPartTwo);
                                output = operationPartOne + operator + operationPartTwo
                            }
                        }
                    }
                }
                resultInput.value = output;
            })
        })
    }

    //*at click on calculator, display modal
    if (calculatorIcon) {
        calculatorIcon.addEventListener('click', function () {
            operationsPannel.style.display = "block";
            calculatorBody.style.display = "block";
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
    //* refresh button
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function () {
            operationPartOne = 0;
            operationPartTwo = 0;
            output = 0;
            operator = undefined;
            nbOperators = 0;
            resultOfOperation = 0;
            resultInput.value = 0;
            operationsPannel.innerHTML = 0;
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
})































