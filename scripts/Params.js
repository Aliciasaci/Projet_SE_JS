import { DivisionError } from './ExceptionsClasses.js';


let vibrationActivated = true;
const backgroundWindow = document.querySelector(".window");
const paramsBody = document.querySelector("#params");

export function renderVibrationBody() {
    return `
    <div id="vibration-wrapper">
    <h1>Paramètres de vibrations</h1>
    <div><b>État de vibration</b><button id="vibration-display-btn">Afficher</button></div>
    <div><b>Retours haptique de vibration dans tout le système</b><button id="vibration-activate-btn">Activer</button></div>
    </div>
    `;
}

export function vibrate() {

    const vibrationWrapper = document.querySelector('#vibration-wrapper');

    if (vibrationWrapper) {
        backgroundWindow.append(vibrationWrapper);
        vibrationWrapper.style.display = "block";
        paramsBody.style.display = "none";

        //*Afficher état vibration
        const VibrationDisplayBtn = document.querySelector('#vibration-display-btn');
        if (VibrationDisplayBtn) {
            VibrationDisplayBtn.addEventListener('click', function () {

                displayEtatVibration(VibrationDisplayBtn);
            })
        }

        //*Activer la vibration
        const VibrationActivateBtn = document.querySelector('#vibration-activate-btn');
        if (VibrationActivateBtn) {
            VibrationActivateBtn.addEventListener('click', function () {
                etatVibration(VibrationActivateBtn);
            })
        }
    }
}

function displayEtatVibration(VibrationDisplayBtn) {

    const vibrationIconOn = document.querySelector("#vibration-icon-on");
    const vibrationIconOff = document.querySelector("#vibration-icon-off");

    if (vibrationIconOn && vibrationIconOff) {
        if (VibrationDisplayBtn.innerHTML == "Masquer") {
            //si masquer l'état de vibration, masquer les deux icones;
            vibrationIconOn.style.display = "none"
            vibrationIconOff.style.display = "none"
            VibrationDisplayBtn.innerHTML = "Afficher";
            VibrationDisplayBtn.style.background = 'rgb(214, 133, 224, 0.7)';
        } else {
            //si afficher état de vibration, conditionner sur l'activation de vibration et afficher la bonne icone.
            //TODO Améliorer l'affichage */
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
}

function etatVibration(VibrationActivateBtn) {

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
            //TODO activer le retour haptique sur tout le système
            //TODO CODE vibration à chaque clique
            //TODO stocker l'état de vibration à true ou false
        })
    }
}
