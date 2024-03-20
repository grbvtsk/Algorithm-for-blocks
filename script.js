import { optimizeContainer } from "./fullnessCalc.js";

function drawBlocks(container, blockCoordinates) {
  blockCoordinates.forEach((block) => {
    const blockElement = document.createElement("div");
    blockElement.className = "block";
    blockElement.style.width = block.right - block.left + "px";
    blockElement.style.height = block.bottom - block.top + "px";
    blockElement.style.top = block.top + "px";
    blockElement.style.left = block.left + "px";
    blockElement.style.backgroundColor = getRandomColor();

    const orderLabel = document.createElement("span");
    orderLabel.textContent = block.initialOrder;

    blockElement.appendChild(orderLabel);
    container.appendChild(blockElement);
  });
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const blocks = [
  { width: 50, height: 150 },
  { width: 250, height: 100 },
  { width: 50, height: 20 },
  { width: 30, height: 100 },
  { width: 300, height: 100 },
  { width: 300, height: 100 },
  { width: 50, height: 20 },
  { width: 50, height: 20 },
  { width: 50, height: 20 },
  { width: 200, height: 10 },

  //ВХІДНІ БЛОКИ
];
//ВХІДНИЙ РОЗМІР КОНТЕЙНЕРУ
const containerSize = { width: "400", height: 300 };

const result = optimizeContainer(blocks, containerSize);
if (result === "ERROR") {
  const errElement = document.createElement("div");
  errElement.textContent = "Invalid entered vallues!";
  document.body.appendChild(errElement);
}
alert(JSON.stringify(result));
const containerElement = document.getElementById("container");
drawBlocks(containerElement, result.blockCoordinates);

const fullnessElement = document.createElement("div");
fullnessElement.textContent = "Fullness: " + result.fullness.toFixed(2);
document.body.appendChild(fullnessElement);
containerElement.style.width = containerSize.width + "px";
containerElement.style.height = containerSize.height + "px";
