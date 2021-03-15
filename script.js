let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let body = document.getElementById("body");
let cssCode = document.querySelector(".gradient-code");
let addColor = document.querySelector(".plus");
let randomize = document.querySelector(".random");
let allDirections = document.querySelectorAll(".arrow, .radial")
let colorPickers = document.getElementById("color-pickers");

//  Paint background and print CSS code
const paintBackground = (direction = "bottom") => {
  if (direction === "radial") {
    body.style.background = "radial-gradient(" + readColorPicker() + ")";
  } else {
    body.style.background = `linear-gradient(to ${direction}, ` + readColorPicker() + ")";
    }
    cssCode.textContent = body.style.background + ";"
};

// Read colorPickers and return to paintBackground
const readColorPicker = () => {
  let colors = "";
  for (let n = 0; n < colorPickers.childElementCount; n++) {
    colors += colorPickers.children[n].value + ", ";
  }
  return colors.substring(0, colors.length - 2);
};

// Adds one color picker
const addColorPicker = () => {
    let lastColorPicker = colorPickers.lastElementChild.cloneNode(true);
    colorPickers.appendChild(lastColorPicker);
    lastColorPicker.addEventListener("input", paintBackground);
    };

// run the whole randomizer thing
const randomizer = () => {
  for (let n = 0; n = colorPickers.childElementCount -2; n++) {
    colorPickers.lastElementChild.remove();
  };
  randomColorPickers(Math.floor(Math.random() * 5));
  setRandomColors();
  const directions = ["radial", "left", "right", "top", "bottom"];
  let randomDirection = directions[Math.floor(Math.random() * 5)];
  document.querySelectorAll(".active").forEach((activeDirection) => {
      activeDirection.classList.toggle("active")
    });
  document.querySelector(`.${randomDirection}`).classList.toggle("active");
  paintBackground(randomDirection);
};

// Get 2-5 color pickers
const randomColorPickers = (num) => {
  for (let n = 1; n < num; n++) {
    let lastColorPicker = colorPickers.lastElementChild.cloneNode(true);
    colorPickers.appendChild(lastColorPicker);
    lastColorPicker.addEventListener("input", paintBackground);
  }
};

// assign all colorpickers with a random color
const setRandomColors = () => {
  for (let n = 0; n < colorPickers.childElementCount; n++) {
    colorPickers.children[n].value = randomColor();
  }
};

// spews out a random color
const randomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
  return color
};

// Toggle off all active arrows or radial and toggle on last clicked, returns direction to paintBackground
allDirections.forEach((direction) => {
  direction.addEventListener("click", (event) => {
    document.querySelectorAll(".active").forEach((activeDirection) => {
      activeDirection.classList.toggle("active")
    });
  event.currentTarget.classList.toggle("active");
  paintBackground(event.currentTarget.dataset.direction);
  });
});

// Eventlisteners for the initial two color pickers and plus button
color1.addEventListener("input", paintBackground);
color2.addEventListener("input", paintBackground);
addColor.addEventListener("click", addColorPicker);
randomize.addEventListener("click", randomizer);
  