document.addEventListener("DOMContentLoaded", () => {
  // Game state variables
  let choices = ["Rock", "Paper", "Scissors"];
  let humanScore = 0;
  let computerScore = 0;
  let gameActive = true;

  // Add this at the top level of your code
  let confettiAnimationId = null;

  // Game screens
  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const endScreen = document.getElementById("endScreen");

  // Start screen elements
  const typingText = document.getElementById("typing-text");
  const startButton = document.getElementById("start-button");

  // Game screen elements
  const elhumanChoice = document.querySelector("#humanChoice");
  const elcomputerChoice = document.querySelector("#computerChoice");
  const elhumanScore = document.querySelector("#humanScore");
  const elcomputerScore = document.querySelector("#computerScore");
  const buttons = document.querySelectorAll(".choices");
  const choicesContainer = document.querySelector("#choicesContainer");

  // End screen elements
  const resultText = document.querySelector("#result-text");
  const scoreText = document.querySelector("#score-text");
  const playAgainBtn = document.querySelector("#play-again");
  const confettiCanvas = document.querySelector("#confetti-canvas");

  // Add hover sound effect
  const hoverSound = new Audio("sounds/hover.mp3");
  hoverSound.volume = 0.3; // Lower volume so it's not too intrusive

  // Add click sound effect 
  const clickSound = new Audio("sounds/click.mp3"); // Changed from mp4 to mp3
  clickSound.volume = 0.5;

  // Don't try to preload sounds
  let soundsInitialized = false;

  // Initialize a separate flag for start button sounds
  let startButtonSoundEnabled = true;

  // Function to play hover sound with special case for start button
  function playHoverSound() {
    // Special case for start button - always allow sound
    if (this === startButton && startButtonSoundEnabled) {
      const sound = hoverSound.cloneNode();
      sound.volume = 0.3;
      sound.play().catch((e) => console.error("Hover sound failed:", e));
      return;
    }

    // For all other buttons, check the flag
    if (!soundsInitialized) return;

    const sound = hoverSound.cloneNode();
    sound.volume = 0.3;
    sound.play().catch((e) => console.error("Hover sound failed:", e));
  }

  // Function to play click sound with special case for start button
  function playClickSound() {
    // Special case for start button - always allow sound
    if (this === startButton && startButtonSoundEnabled) {
      const sound = clickSound.cloneNode();
      sound.volume = 0.5;
      sound.play().catch((e) => console.error("Click sound failed:", e));
      return;
    }

    // For all other buttons, check the flag
    if (!soundsInitialized) return;

    const sound = clickSound.cloneNode();
    sound.volume = 0.5;
    sound.play().catch((e) => console.error("Click sound failed:", e));
  }

  // Apply sound effects to buttons
  function applyButtonSounds() {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => {
      button.addEventListener("mouseenter", playHoverSound);
      button.addEventListener("click", playClickSound);
    });
  }

  // Call it immediately for existing buttons
  applyButtonSounds();

  // Add special handling for start button to ensure sounds work
  startButton.addEventListener("mouseenter", function() {
    if (startButtonSoundEnabled) {
      const sound = hoverSound.cloneNode();
      sound.volume = 0.3;
      sound.play().catch(e => console.error("Start button hover sound failed:", e));
    }
  });

  startButton.addEventListener("click", function() {
    if (startButtonSoundEnabled) {
      const sound = clickSound.cloneNode();
      sound.volume = 0.5;
      sound.play().catch(e => console.error("Start button click sound failed:", e));

      // Prevent multiple sounds if clicked again
      startButtonSoundEnabled = false;
    }

    // Enable sounds for other buttons
    soundsInitialized = true;

    // Rest of your start button code
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
  });

  // Implement typing effect exactly like in start.js
  const text = "Rock. Paper. Scissors.";
  let index = 0;

  function typeText() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 100);
    }
  }

  // Start the typing animation
  typeText();

  const choiceMap = {
    Rock: 0,
    Paper: 1,
    Scissors: 2,
  };

  // Modified function to reduce ties by biasing the computer's choice
  function getComputerChoice(humanChoice) {
    // If humanChoice is undefined (initial call), make a purely random choice
    if (humanChoice === undefined) {
      return Math.floor(Math.random() * choices.length);
    }
    
    // Get a random number between 0 and 1
    const randomValue = Math.random();
    
    // 15% chance of tie (down from 33%)
    if (randomValue < 0.15) {
      // Choose the same as the human (tie)
      return humanChoice;
    } 
    // 85% chance of non-tie outcome
    else {
      // Choose either of the two remaining options with equal probability
      const otherChoices = [0, 1, 2].filter(choice => choice !== humanChoice);
      return otherChoices[Math.floor(Math.random() * otherChoices.length)];
    }
  }

  function animateChoices(finalHumanChoice, finalComputerChoice) {
    // Reset animation classes
    elhumanChoice.classList.remove("rolling", "reveal");
    elcomputerChoice.classList.remove("rolling", "reveal");

    // Clear existing content
    elhumanChoice.textContent = "";
    elcomputerChoice.textContent = "";

    // Add rolling animation
    elhumanChoice.classList.add("rolling");
    elcomputerChoice.classList.add("rolling");

    // Animation logic
    let count = 0;
    const maxCount = 10;
    const interval = setInterval(() => {
      const randomHuman = Math.floor(Math.random() * choices.length);
      const randomComputer = Math.floor(Math.random() * choices.length);

      elhumanChoice.textContent = choices[randomHuman];
      elcomputerChoice.textContent = choices[randomComputer];

      count++;

      if (count > maxCount / 2) {
        clearInterval(interval);

        const slowInterval = setInterval(() => {
          const randomHuman = Math.floor(Math.random() * choices.length);
          const randomComputer = Math.floor(Math.random() * choices.length);

          elhumanChoice.textContent = choices[randomHuman];
          elcomputerChoice.textContent = choices[randomComputer];

          count++;

          if (count >= maxCount) {
            clearInterval(slowInterval);

            setTimeout(() => {
              elhumanChoice.classList.remove("rolling");
              elcomputerChoice.classList.remove("rolling");

              elhumanChoice.classList.add("reveal");
              elcomputerChoice.classList.add("reveal");

              elhumanChoice.textContent = choices[finalHumanChoice];
              elcomputerChoice.textContent = choices[finalComputerChoice];

              setTimeout(() => {
                elhumanScore.textContent = humanScore;
                elcomputerScore.textContent = computerScore;

                choicesContainer.classList.remove("fade-out");
                document.getElementById("container").classList.remove("game-active");

                // Check if game is over (someone reached 5)
                if (humanScore >= 5) {
                  showEndScreen();
                } else if (computerScore >= 5) {
                  showEndScreen();
                }
              }, 500);
            }, 300);
          }
        }, 200);
      }
    }, 100);
  }

  // Handle button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!gameActive) return;

      choicesContainer.classList.add("fade-out");
      document.getElementById("container").classList.add("game-active");

      const buttonText = event.target.textContent;
      const humanChoice = choiceMap[buttonText];
      // Pass the human choice to bias against ties
      const computerChoice = getComputerChoice(humanChoice);

      playRound(humanChoice, computerChoice);

      setTimeout(() => {
        animateChoices(humanChoice, computerChoice);
      }, 600);
    });
  });

  // Game logic
  function playRound(humanChoice, computerChoice) {
    console.log(
      `Human choice: ${choices[humanChoice]} \nComputer choice: ${choices[computerChoice]}`
    );
    const winningConditions = {
      Rock: "Scissors",
      Paper: "Rock",
      Scissors: "Paper",
    };

    if (humanChoice === computerChoice) {
      // Tie - no score change
    } else if (
      winningConditions[choices[humanChoice]] === choices[computerChoice]
    ) {
      humanScore++;
    } else {
      computerScore++;
    }
  }

  // Add this function to play win/lose sounds
  function playSound(isWin) {
    // Create a new Audio object each time to avoid conflicts
    const audio = new Audio(isWin ? "sounds/win.mp3" : "sounds/lose.mp3");
    
    // Set maximum volume
    audio.volume = 1.0;
    
    // Play the sound
    audio.play().catch(e => console.error("Audio playback failed:", e));
  }

  // Update the setupConfetti function to store the animation ID
  function setupConfetti() {
    const ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 150;
    const gravity = 0.3;
    const colors = ["#4ade80", "#60a5fa", "#f5f5f5", "#a78bfa", "#fbbf24"];
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: confettiCanvas.width / 2,
        y: confettiCanvas.height / 2,
        size: Math.random() * 5 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: {
          x: Math.random() * 6 - 3,
          y: Math.random() * -10 - 5,
        },
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5,
      });
    }
    
    // Animation loop
    function animate() {
      confettiAnimationId = requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        
        ctx.restore();
        
        // Update position
        p.x += p.speed.x;
        p.y += p.speed.y;
        
        // Add gravity
        p.speed.y += gravity;
        
        // Add rotation
        p.rotation += p.rotationSpeed;
        
        // Reset particles that fall off screen
        if (p.y > confettiCanvas.height) {
          particles[i] = {
            x: Math.random() * confettiCanvas.width,
            y: -20,
            size: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: {
              x: Math.random() * 6 - 3,
              y: Math.random() * 2 + 2,
            },
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5,
          };
        }
      }
    }
    
    // Start the animation
    animate();
  }

  // Add a function to stop the confetti
  function stopConfetti() {
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
      
      // Clear the canvas
      const ctx = confettiCanvas.getContext("2d");
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // Update showEndScreen function to stop confetti when showing a loss
  function showEndScreen() {
    gameActive = false;
    
    // Always stop any existing confetti first
    stopConfetti();
    
    // Determine the winner
    const result = humanScore >= 5 ? "win" : "lose";
    
    // Play the appropriate sound
    playSound(result === "win");
    
    // Update end screen content
    if (result === "win") {
      resultText.textContent = "You Win!";
      resultText.classList.add("win");
      setupConfetti();
    } else {
      resultText.textContent = "You Lose";
      resultText.classList.add("lose");
      // No confetti for loss
    }
    
    scoreText.textContent = `Score: ${humanScore} - ${computerScore}`;
    
    // Transition from game to end screen
    gameScreen.style.opacity = "0";
    gameScreen.style.pointerEvents = "none";
    
    setTimeout(() => {
      // Hide game screen, show end screen
      gameScreen.style.display = "none";
      endScreen.style.display = "flex";
    
      // Make absolutely sure the Play Again button is initialized as hidden
      playAgainBtn.style.display = "none";
    
      // Show the button after delay
      setTimeout(() => {
        // First ensure it's in the DOM but invisible (don't set any styles yet)
        playAgainBtn.style.display = "block";
    
        // Force a reflow to ensure animation starts fresh
        void playAgainBtn.offsetWidth;
    
        // Remove any classes that might interfere with the animation
        playAgainBtn.className = "";
    
        // The CSS animation will take care of making it visible
        console.log("Play Again button animation should be playing now");
        
        // Add sound to Play Again button when it appears
        playAgainBtn.addEventListener("mouseenter", playHoverSound);
        playAgainBtn.addEventListener("click", playClickSound);
      }, 2000);
    }, 800);
  }

  // Play again button handler
  playAgainBtn.addEventListener("click", () => {
    console.log("Play Again clicked!");
    playClickSound(); // Already handled by the general click listener, but added for redundancy
    
    // Stop any confetti
    stopConfetti();
    
    // Immediately hide the button with direct styling
    playAgainBtn.style.display = "none";
    
    // Reset game state
    humanScore = 0;
    computerScore = 0;
    gameActive = true;
    
    // Reset UI
    elhumanScore.textContent = "0";
    elcomputerScore.textContent = "0";
    elhumanChoice.textContent = "";
    elcomputerChoice.textContent = "";
    
    // Remove animation classes
    elhumanChoice.classList.remove("rolling", "reveal");
    elcomputerChoice.classList.remove("rolling", "reveal");
    
    // Remove result classes
    resultText.classList.remove("win", "lose");
    
    // Hide end screen
    endScreen.style.display = "none";
    
    // Reset game screen
    gameScreen.style.display = "flex";
    gameScreen.style.opacity = "1";
    gameScreen.style.pointerEvents = "auto";
    
    // Reset game UI
    choicesContainer.classList.remove("fade-out");
    document.getElementById("container").classList.remove("game-active");
    
    // Make sure all game buttons have sound effects after reset
    setTimeout(() => {
      applyButtonSounds();
    }, 100);
  });

  // Handle window resize for confetti
  window.addEventListener("resize", () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });
});
