import { generateLogo } from "../src";

const options1 = {
  text: "TS",
  size: 100,
  textColor: "#ffffff",
  lineHeight: 0.75,
  backgroundColor: "#3178c6",
};

const options2 = {
  text: "JS",
  size: 150,
  textColor: "#000000",
  backgroundColor: "#f7df1e",
};

// Gradient Background
const options3 = {
  text: "GR",
  size: 120,
  textColor: "#ffffff",
  backgroundColor: ["#ff0000", "#0000ff"],
};

// Gradient Text
const options4 = {
  text: "TX",
  size: 120,
  textColor: ["#ff0000", "#ffff00"],
  backgroundColor: "#000000",
};

// Both Gradients
const options5 = {
  text: "BG",
  size: 120,
  textColor: ["#00ffff", "#ff00ff"],
  backgroundColor: ["#222222", "#444444"],
};

// Custom Font
const options6 = {
  text: "CF",
  size: 120,
  textColor: "#ffffff",
  backgroundColor: "#000000",
  fontSource:
    "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100..900&display=swap",
  fontFamily: "'Noto Sans JP', sans-serif",
  fontWeight: 100,
};

const divContainer = document.querySelector(".div-container");
if (divContainer) {
  divContainer.appendChild(generateLogo(options1));
  divContainer.appendChild(generateLogo(options2));
  divContainer.appendChild(generateLogo(options3));
  divContainer.appendChild(generateLogo(options4));
  divContainer.appendChild(generateLogo(options5));
  divContainer.appendChild(generateLogo(options6));
}
