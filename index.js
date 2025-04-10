const style = getComputedStyle(document.documentElement);
let gridSize = parseInt(style.getPropertyValue("--grid-size"));
let drawingMode = "black";
let isDrawing = false; 

//element selectors
const container = document.querySelector("#grid-container");
const inputSize = document.querySelector("#grid-size");
const resetBtn = document.querySelector("#reset-grid");
const drawingModeContainer = document.querySelector("#grid-settings-container");
const themeToggle = document.querySelector('#theme-toggle');
const gridSizeSlider = document.querySelector('#grid-size');
const sliderValue = document.querySelector('.slider-value');

const savedTheme = localStorage.getItem('theme');

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
  grid.addEventListener("mouseover", (event) => {
    if (!isDrawing) return; 
    
    switch (drawingMode) {
      case "black":
        grid.style.backgroundColor = "rgb(0, 0, 0)";
        break;
      case "shade":
        if (grid.hoverCount === undefined) {
          grid.hoverCount = 0;
        }
        grid.hoverCount++;

        const hoverLimit = 10;
        const darknessLevel = Math.min(grid.hoverCount, hoverLimit);
        const shade = Math.max(245 - darknessLevel * 25, 0);

        grid.style.backgroundColor = `rgb(${shade}, ${shade}, ${shade})`;
        break;
      case "rainbow":
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);

        grid.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
        break;
      case "erase":
        grid.style.backgroundColor = "";
        grid.hoverCount = 0;
        break;
    }
  });
}

function main() {
  document.addEventListener('mousedown', () => isDrawing = true);
  document.addEventListener('mouseup', () => isDrawing = false);
  document.addEventListener('mouseleave', () => isDrawing = false); 
  
  generateGrid();

  resetBtn.addEventListener("click", () => {
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
      cell.style.backgroundColor = ""
      cell.hoverCount = 0;
    });
  });

  drawingModeContainer.addEventListener("click", (event) => {
    if (event.target.matches(".drawing-mode-btn")) {
      const buttonText = event.target.innerText;
      switch (buttonText) {
        case "Black":
          drawingMode = "black";
          break;
        case "Shade":
          drawingMode = "shade";
          break;
        case "Rainbow":
          drawingMode = "rainbow";
          break;
        case "Erase":
          drawingMode = "erase";
          break;
      }
    }
  });

  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
  
  themeToggle.addEventListener('click', () => {
    if (document.documentElement.hasAttribute('data-theme')) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });

  gridSizeSlider.addEventListener('input', () => {
    const newSize = parseInt(gridSizeSlider.value);
    sliderValue.textContent = newSize;

    document.documentElement.style.setProperty("--grid-size", newSize);
    gridSize = newSize;
    
    container.replaceChildren();
    generateGrid();
  })
}

main();
