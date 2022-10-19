const switchModeBtn = document.querySelector("#switch-mode-btn");

if (switchModeBtn) {
    let nbClickMode = 0;
    switchModeBtn.addEventListener('click', function () {
        if (nbClickMode % 2 == 0) { //dark mode
            document.body.style.backgroundImage = "url('../src/assets/dark_mode.jpg')";
            switchModeBtn.style.filter = "invert(100%)";
        } else {        //white mode
            document.body.style.backgroundImage = "url('../src/assets/light_background_3.jpg')";
            switchModeBtn.style.filter = "invert(0%)";
        }
        nbClickMode++
    });
}
