// -------------------------
// WORKFLOW STEP 1: BASIC MATH OPERATIONS
// -------------------------
// Start by implementing simple functions for each basic operation:
// - Addition function
function add(a, b) {
  return a + b;
}

// - Subtraction function
function subtract(a, b) {
  return a - b;
}
// - Multiplication function
function multiply(a, b) {
  return a * b;
}
// - Division function (remember to handle division by zero)
function divide(a, b) {
  if (b === 0) return;
  return a / b;
}
// Test these functions in your browser console before proceeding

// -------------------------
// WORKFLOW STEP 2: OPERATION HANDLER
// -------------------------
// Create a function that takes an operator and 2 numbers
function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
  }
}
// This function should call the appropriate math function based on the operator
// Test this in your browser console as well

// -------------------------
// WORKFLOW STEP 3: SET UP TRACKING VARIABLES
// -------------------------
// You'll need variables to track:
// - First operand
let firstOperand = null;
// - Operator
let operator = null;
// - Second operand
let secondOperand = null;
// - State flags (like "waiting for second number" or "clear on next input")
let waitSecondOperand = false;
// - References to DOM elements
const btnContainer = document.querySelector("#btn-container");
const display = document.querySelector("input");

// -------------------------
// WORKFLOW STEP 4: CALCULATOR DISPLAY FUNCTIONS
// -------------------------
// Create functions to:
// - Update the display with a value
function updateDisplay(value) {
  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
}
// - Clear the display
// Consider how these will interact with your state variables
function clearDisplay() {
  firstOperand = null;
  secondOperand = null;
  operator = null;
  waitSecondOperand = false;
  display.value = "0";
}

// -------------------------
// WORKFLOW STEP 5: BUTTON HANDLERS
// -------------------------
// Create separate handlers for:
// - Number buttons
// - Operator buttons
// - Equals button
// - Clear button
// - Additional features (decimal, backspace, etc.)
btnContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    buttonText = event.target.textContent;

    if ("1234567890".includes(buttonText)) {
      if (firstOperand !== null && operator === null) {
        display.value = buttonText;
        firstOperand = null;
      } else if (waitSecondOperand) {
        updateDisplay(buttonText);
        waitSecondOperand = false;
      } else {
        updateDisplay(buttonText);
      }
    } else if (["+", "-", "*", "/"].includes(buttonText)) {
      firstOperand = Number(display.value);
      operator = buttonText;
      waitSecondOperand = true;
      updateDisplay(buttonText);
    } else if (buttonText === "=") {
      if (firstOperand !== null && operator !== null) {
        const displayText = display.value;
        const operatorIndex = displayText.lastIndexOf(operator);
        const secondOperand = Number(displayText.substring(operatorIndex + 1));

        const result = operate(operator, firstOperand, secondOperand);

        display.value = result;

        firstOperand = result;
        operator = null;
      }
    } else if (buttonText === "C") {
      clearDisplay();
    }
  }
});

// -------------------------
// WORKFLOW STEP 6: EVENT DELEGATION
// -------------------------
// Set up a single event listener on the button container
// Use event.target to determine which button was clicked
// Call the appropriate handler based on button type

// -------------------------
// WORKFLOW STEP 7: INITIALIZATION
// -------------------------
// Set up initial state and hook up event listeners when page loads

// -------------------------
// WORKFLOW STEP 8: TESTING AND BUGFIXING
// -------------------------
// Test various calculator usage patterns:
// - Basic operations with integers
// - Operations with decimals
// - Chained operations (e.g., 12 + 7 - 5 * 3 = ?)
// - Edge cases (division by zero, pressing equals multiple times)
