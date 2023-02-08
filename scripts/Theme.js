
const switchModeBtn = document.querySelector("#switch-mode-btn");
const backgroundWindow = document.querySelector(".window");

//* set the theme
export function setTheme(theme) {
  if (theme == "dark") {
    //dark mode
    document.body.style.backgroundImage = "url('assets/bg_9.jpg')";
    switchModeBtn.style.filter = "invert(100%)";

    setCookie("theme", "dark", 30);
  } else if (theme == "light") {
    //light mode
    document.body.style.backgroundImage = "url('assets/bg_6.jpg')";
    switchModeBtn.style.filter = "invert(0%)";
    setCookie("theme", "light", 30);
  }
}

//* function to create and set cookies
//! le store du theme ne marche pas sur opera
export function setCookie(cookiName, cookieValue, expireDate) {
  const d = new Date();
  d.setTime(d.getTime() + expireDate * 24 * 60 * 60 * 1000);
  let expiresAt = "expires=" + d.toUTCString();
  document.cookie = cookiName + "=" + cookieValue + ";" + expiresAt + ";path=/";
}

//* function that returns a cookie and it value
export function getCookie(cookiName) {
  let cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim().split("=");
    if (cookiName == cookie[0]) {
      return cookie;
    }
  }
}
