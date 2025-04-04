# Rock-Paper-Scissors Game
![Game Demo](images/demo.gif)

A simple, interactive implementation of the classic Rock-Paper-Scissors game built with JavaScript, HTML, and CSS.

## 🎮 Project Overview

This project is part of [The Odin Project](https://www.theodinproject.com/) curriculum, which provides a free, open-source full-stack web development course. This implementation focuses on core JavaScript concepts and logic without any fancy UI (yet).

## 🎲 How It Works

The game is a race to 5 points against the computer:

1. Players click on either Rock, Paper, or Scissors buttons
2. The selections animate with a "rolling" effect
3. The computer's choice is slightly biased to reduce ties (15% chance of tie vs 33% in purely random)
4. The result of each round is determined using classic Rock-Paper-Scissors rules:
   - 🪨 Rock beats ✂️ Scissors
   - 📄 Paper beats 🪨 Rock
   - ✂️ Scissors beats 📄 Paper
5. The first player to reach 5 points wins, triggering a victory/defeat screen
6. The game features a confetti celebration for wins 🎉

## ✨ Key Features

- Sleek UI: Modern dark-themed interface with smooth transitions
- Animations: Engaging animations for selections and results
- Sound Effects: Console-style sounds for hover, click, win, and lose
- Confetti: Celebrate victories with a colorful confetti display
- Typing Animation: Engaging start screen with animated text
- Score Tracking: Visual feedback after each round
- Anti-Tie Bias: Reduced probability of frustrating ties

## 💻 Technologies Used
```javascript
const technologies = {
  frontend: ["HTML5", "CSS3", "JavaScript (ES6+)"],
  animations: ["CSS Transitions", "Canvas API", "JavaScript Timers"],
  audio: ["Web Audio API"],
  design: ["Responsive Design", "Dark Theme"]
};
```

## 🎯Skills Demonstrated

- Modern JavaScript (ES6+)
- Simple DOM manipulation
- Canvas animations
- CSS animations and transitions
- Audio integration
- Event handling
- Game state management
- Responsive design

## 🎮 How to Play

1. Open the game in a web browser
2. Click "Start Game" after the intro text finishes typing
3. Select Rock, Paper, or Scissors by clicking the buttons
4. First to 5 points wins!
5. Click "Play Again" to restart the game

## 🚀 Future Improvements

```markdown
[ ] Add leaderboard with localStorage
[ ] Implement Rock-Paper-Scissors-Lizard-Spock mode
[ ] Add difficulty levels with smarter computer AI
[ ] Include customizable themes
[ ] Add support for multiplayer
```
