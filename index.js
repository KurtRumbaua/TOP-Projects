// row, col value
const style = getComputedStyle(document.documentElement);
let gridSize = parseInt(style.getPropertyValue("--grid-size"));

//element selectors
const container = document.querySelector("#grid-container");
const inputSize = document.querySelector("#grid-size");
const updateBtn = document.querySelector("#update-grid");

function generateGrid() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const grid = document.createElement("div");
      grid.classList.add("grid-cell");
      container.appendChild(grid);
      colorGrid(grid);
    }
  }
}

function colorGrid(grid) {
  grid.hoverCount = 0;

  grid.addEventListener("mouseover", (event) => {
    grid.hoverCount++;
    console.log('i am called');
    const hoverLimit = 10;
    const darknessLevel = Math.min(grid.hoverCount, hoverLimit);
    const shade = Math.max(245 - darknessLevel * 25, 0);

    grid.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
  });
}

function setupGridSizeControl() {
  updateBtn.addEventListener("click", (event) => {
    const size = parseInt(inputSize.value);

    document.documentElement.style.setProperty("--grid-size", size);

    gridSize = size;

    container.replaceChildren();
    generateGrid();
  });
}

function main() {
  generateGrid();
  setupGridSizeControl();
}

main();
