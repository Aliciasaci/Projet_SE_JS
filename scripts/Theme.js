//* set the theme
export function setTheme(theme) {
  if (theme == "dark") {
    //dark mode
    let window = document.querySelector(".window");
    let windowUpperBar = document.querySelector(".window-upper-btns");
    let startingPage = document.querySelector("#starting-page");
    let paramTitle = document.querySelector(".param-title");
    let windowReduceBtn = document.querySelector(".fa-minus");

    window.removeAttribute("class");
    window.setAttribute("class", "window center darkglass");

    if (windowUpperBar) {
      windowUpperBar.style.backgroundColor = "rgba(14, 14, 14, 0.7)";
    }
    if (paramTitle) {
      paramTitle.style.color = "#f7f7f7"
    }
    if (startingPage) {
      startingPage.style.backgroundColor = "#1d1d1d";
    }
    if (windowReduceBtn) {
      windowReduceBtn.style.color = "#FFF";
    }

    document.body.style.backgroundImage = "url('assets/bg_9.jpg')";
  } else if (theme == "light") {
    //light mode
    document.body.style.backgroundImage = "url('assets/bg_6.jpg')";
  }
}
