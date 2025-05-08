# Web-based Calculator

A simple web-based calculator built with HTML, CSS, and JavaScript. This project is the final requirement for the Foundations course in The Odin Project's Full Stack Web Developer curriculum.

![Calculator Screenshot](https://via.placeholder.com/400x500?text=Calculator+Screenshot)

## Features

- Basic arithmetic operations (addition, subtraction, multiplication, division)
- Clear button to reset calculations
- Responsive design with CSS Grid layout
- Attractive styling with hover and active states
- Handles consecutive operators appropriately
- Allows negative numbers after operators (e.g., 5*-3)

## Technologies Used

- HTML5
- CSS3 (Grid, Flexbox)
- JavaScript (ES6+)

## Security Implementation

This calculator uses a `safeEval()` function instead of JavaScript's native `eval()` to calculate results. This approach:

- Sanitizes input to prevent code injection attacks
- Uses `Function` constructor in a controlled context
- Implements proper error handling
- Provides a much safer alternative to direct `eval()` usage

```javascript
function safeEval(expression) {
    try {
        const sanitizedExpression = expression.replace(/[^0-9+\-*/().]/g, '');
        return new Function('return ' + sanitizedExpression)();
    } catch (error) {
        return "Syntax Error";
    }
}
```

## How to Use

1. Clone the repository
2. Open `index.html` in your browser
3. Use the calculator by clicking the buttons
4. View the result in the display area

## Live Demo

Visit the live calculator: [Web-based Calculator](https://your-live-demo-link.com)

## Future Improvements

- Add keyboard support
- Implement memory functions
- Add scientific calculator features
- Improve accessibility features

## Credits

- Created by Kurt Rumbaua
- Project requirements from [The Odin Project](https://www.theodinproject.com/)