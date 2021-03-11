let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let body = document.getElementById("body");
let cssCode = document.querySelector(".gradient-code");
let addColor = document.querySelector(".plus");
let allDirections = document.querySelectorAll(".arrow, .radial")
let colorPickers = document.getElementById("color-pickers");

//  Paint background and print CSS code
function paintBackground(direction = "bottom") {
  if (direction === "radial") {
    body.style.background = "radial-gradient(" + readColorPicker() + ")";
  } else {
    body.style.background = `linear-gradient(to ${direction}, ` + readColorPicker() + ")";
    }
    cssCode.textContent = body.style.background + ";"
}

// Read colorPickers and return to paintBackground
function readColorPicker() {
  let colors = "";
  for (let n = 0; n < colorPickers.childElementCount; n++) {
    colors += colorPickers.children[n].value + ", ";
  }
  return colors.substring(0, colors.length - 2);
}

// Adds colorpicker when user clicks plus
function addColorPicker() {
  let lastColorPicker = colorPickers.lastElementChild.cloneNode(true);
  colorPickers.appendChild(lastColorPicker);
  lastColorPicker.addEventListener("input", paintBackground);
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
  