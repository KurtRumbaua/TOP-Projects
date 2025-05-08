document.addEventListener("DOMContentLoaded", () => {
  let choices = ["Rock", "Paper", "Scissors"];
  let humanScore = 0;
  let computerScore = 0;
  let gameActive = true;
  let confettiAnimationId = null;

  const startScreen = document.getElementById("startScreen");
  const gameScreen = document.getElementById("gameScreen");
  const endScreen = document.getElementById("endScreen");

  const typingText = document.getElementById("typing-text");
  const startButton = document.getElementById("start-button");

  const elhumanChoice = document.querySelector("#humanChoice");
  const elcomputerChoice = document.querySelector("#computerChoice");
  const elhumanScore = document.querySelector("#humanScore");
  const elcomputerScore = document.querySelector("#computerScore");
  const buttons = document.querySelectorAll(".choices");
  const choicesContainer = document.querySelector("#choicesContainer");

  const resultText = document.querySelector("#result-text");
  const scoreText = document.querySelector("#score-text");
  const playAgainBtn = document.querySelector("#play-again");
  const confettiCanvas = document.querySelector("#confetti-canvas");

  const hoverSound = new Audio("sounds/hover.mp3");
  hoverSound.volume = 0.3;

  const clickSound = new Audio("sounds/click.mp3"); 
  clickSound.volume = 0.5;

  let soundsInitialized = false;

  let startButtonSoundEnabled = true;

  function playHoverSound() {
    if (this === startButton && startButtonSoundEnabled) {
      const sound = hoverSound.cloneNode();
      sound.volume = 0.3;
      sound.play().catch((e) => console.error("Hover sound failed:", e));
      return;
    }

    if (!soundsInitialized) return;

    const sound = hoverSound.cloneNode();
    sound.volume = 0.3;
    sound.play().catch((e) => console.error("Hover sound failed:", e));
  }

  function playClickSound() {
    if (this === startButton && startButtonSoundEnabled) {
      const sound = clickSound.cloneNode();
      sound.volume = 0.5;
      sound.play().catch((e) => console.error("Click sound failed:", e));
      return;
    }

    if (!soundsInitialized) return;

    const sound = clickSound.cloneNode();
    sound.volume = 0.5;
    sound.play().catch((e) => console.error("Click sound failed:", e));
  }

  function applyButtonSounds() {
    const allButtons = document.querySelectorAll("button");
    allButtons.forEach((button) => {
      button.addEventListener("mouseenter", playHoverSound);
      button.addEventListener("click", playClickSound);
    });
  }

  applyButtonSounds();

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

      startButtonSoundEnabled = false;
    }

    soundsInitialized = true;

    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
  });

  const text = "Rock. Paper. Scissors.";
  let index = 0;

  function typeText() {
    if (index < text.length) {
      typingText.textContent += text.charAt(index);
      index++;
      setTimeout(typeText, 100);
    }
  }

  typeText();

  const choiceMap = {
    Rock: 0,
    Paper: 1,
    Scissors: 2,
  };

  function getComputerChoice(humanChoice) {
    if (humanChoice === undefined) {
      return Math.floor(Math.random() * choices.length);
    }
    
    const randomValue = Math.random();
    
    if (randomValue < 0.15) {
      return humanChoice;
    } 
    else {
      const otherChoices = [0, 1, 2].filter(choice => choice !== humanChoice);
      return otherChoices[Math.floor(Math.random() * otherChoices.length)];
    }
  }

  function animateChoices(finalHumanChoice, finalComputerChoice) {
    elhumanChoice.classList.remove("rolling", "reveal");
    elcomputerChoice.classList.remove("rolling", "reveal");

    elhumanChoice.textContent = "";
    elcomputerChoice.textContent = "";

    elhumanChoice.classList.add("rolling");
    elcomputerChoice.classList.add("rolling");

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

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!gameActive) return;

      choicesContainer.classList.add("fade-out");
      document.getElementById("container").classList.add("game-active");

      const buttonText = event.target.textContent;
      const humanChoice = choiceMap[buttonText];
      const computerChoice = getComputerChoice(humanChoice);

      playRound(humanChoice, computerChoice);

      setTimeout(() => {
        animateChoices(humanChoice, computerChoice);
      }, 600);
    });
  });

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
    } else if (
      winningConditions[choices[humanChoice]] === choices[computerChoice]
    ) {
      humanScore++;
    } else {
      computerScore++;
    }
  }

  function playSound(isWin) {
    const audio = new Audio(isWin ? "sounds/win.mp3" : "sounds/lose.mp3");
    
    audio.volume = 1.0;
    
    audio.play().catch(e => console.error("Audio playback failed:", e));
  }

  function setupConfetti() {
    const ctx = confettiCanvas.getContext("2d");
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 150;
    const gravity = 0.3;
    const colors = ["#4ade80", "#60a5fa", "#f5f5f5", "#a78bfa", "#fbbf24"];
    
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
        
        p.x += p.speed.x;
        p.y += p.speed.y;
        
        p.speed.y += gravity;
        
        p.rotation += p.rotationSpeed;
        
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
    
    animate();
  }

  function stopConfetti() {
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
      
      const ctx = confettiCanvas.getContext("2d");
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  function showEndScreen() {
    gameActive = false;
    
    stopConfetti();
    
    const result = humanScore >= 5 ? "win" : "lose";
    
    playSound(result === "win");
    
    if (result === "win") {
      resultText.textContent = "You Win!";
      resultText.classList.add("win");
      setupConfetti();
    } else {
      resultText.textContent = "You Lose";
      resultText.classList.add("lose");
    }
    
    scoreText.textContent = `Score: ${humanScore} - ${computerScore}`;
    
    gameScreen.style.opacity = "0";
    gameScreen.style.pointerEvents = "none";
    
    setTimeout(() => {
      gameScreen.style.display = "none";
      endScreen.style.display = "flex";
    
      playAgainBtn.style.display = "none";
    
      setTimeout(() => {
        playAgainBtn.style.display = "block";
    
        void playAgainBtn.offsetWidth;
    
        playAgainBtn.className = "";
    
        console.log("Play Again button animation should be playing now");
        
        playAgainBtn.addEventListener("mouseenter", playHoverSound);
        playAgainBtn.addEventListener("click", playClickSound);
      }, 2000);
    }, 800);
  }

  playAgainBtn.addEventListener("click", () => {
    console.log("Play Again clicked!");
    stopConfetti();
    
    playAgainBtn.style.display = "none";
    
    humanScore = 0;
    computerScore = 0;
    gameActive = true;
    
    elhumanScore.textContent = "0";
    elcomputerScore.textContent = "0";
    elhumanChoice.textContent = "";
    elcomputerChoice.textContent = "";
    
    elhumanChoice.classList.remove("rolling", "reveal");
    elcomputerChoice.classList.remove("rolling", "reveal");
    
    resultText.classList.remove("win", "lose");
    
    endScreen.style.display = "none";
    
    gameScreen.style.display = "flex";
    gameScreen.style.opacity = "1";
    gameScreen.style.pointerEvents = "auto";
    
    choicesContainer.classList.remove("fade-out");
    document.getElementById("container").classList.remove("game-active");
    
    setTimeout(() => {
      applyButtonSounds();
    }, 100);
  });

  window.addEventListener("resize", () => {
    if (confettiCanvas) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  });
});
