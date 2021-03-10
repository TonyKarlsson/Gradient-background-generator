let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let body = document.getElementById("body");
let cssCode = document.querySelector(".gradient-code");
let addColor = document.querySelector(".plus");
let allDirections = document.querySelectorAll(".arrow, .radial")
let colorPickers = document.getElementById("color-pickers");

function colorPicker(direction = "bottom") {
  if (direction === "radial") {
    body.style.background = "radial-gradient("
    + setColor()
    + ")";
  } else {
    body.style.background = `linear-gradient(to ${direction}, `
    + setColor()
    + ")";
    }
    cssCode.textContent = body.style.background + ";"
}

function setColor() {
  let colors = "";
  for (let n = 0; n < colorPickers.childElementCount; n++) {
    colors += colorPickers.children[n].value + ", ";
  }
  return colors.substring(0, colors.length - 2);
}

// If user clicks plus, add another colorPicker.
function addColorPicker() {
  let lastColorPicker = colorPickers.lastElementChild.cloneNode(true);
  colorPickers.appendChild(lastColorPicker);
  lastColorPicker.addEventListener("input", colorPicker);
};

allDirections.forEach((direction) => {
  direction.addEventListener("click", (event) => {
    document.querySelectorAll(".active").forEach((activeDirection) => {
      activeDirection.classList.toggle("active")
    });
  event.currentTarget.classList.toggle("active");
  colorPicker(event.currentTarget.dataset.direction);
  });
});

color1.addEventListener("input", colorPicker);
color2.addEventListener("input", colorPicker);
addColor.addEventListener("click", addColorPicker);
  