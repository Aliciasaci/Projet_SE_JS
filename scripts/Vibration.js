
let vibrationActivated = true;

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