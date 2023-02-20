
//* set the theme
export function setTheme(theme) {
  if (theme == "dark") {
    //dark mode
    document.body.style.backgroundImage = "url('assets/bg_9.jpg')";
  } else if (theme == "light") {
    //light mode
    document.body.style.backgroundImage = "url('assets/bg_6.jpg')";
  }
}

