document.addEventListener("DOMContentLoaded", () => {
  let choices = ["Rock", "Paper", "Scissors"];
  let humanScore = 0;
  let computerScore = 0;
  let ties = 0;
  let gameActive = true;

  const elhumanChoice = document.querySelector("#humanChoice");
  const elcomputerChoice = document.querySelector("#computerChoice");
  const elhumanScore = document.querySelector("#humanScore");
  const elcomputerScore = document.querySelector("#computerScore");
  const buttons = document.querySelectorAll("#choices");

  const choiceMap = {
    Rock: 0,
    Paper: 1,
    Scissors: 2,
  };

  function getComputerChoice() {
    return Math.floor(Math.random() * choices.length);
  }

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      if (!gameActive) return;

      const buttonText = event.target.textContent;
      const humanChoice = choiceMap[buttonText];

      let computerChoice = getComputerChoice();
      playRound(humanChoice, computerChoice);
      updateUI(humanChoice, computerChoice);
    });
  });

  // function that plays a single round, gets both human choice and computer choice and then compares it to the look up table.
  function playRound(humanChoice, computerChoice) {
    console.log(
      `Human choice:  ${choices[humanChoice]} \nComputer choice:  ${choices[computerChoice]}`
    );
    const winningConditions = {
      Rock: "Scissors",
      Paper: "Rock",
      Scissors: "Paper",
    };

    if (humanChoice === computerChoice) {
      ties++;
    } else if (
      winningConditions[choices[humanChoice]] === choices[computerChoice]
    ) {
      humanScore++;
    } else {
      computerScore++;
    }
  }

  function updateUI(humanChoice, computerChoice) {
    elhumanChoice.textContent = choices[humanChoice];
    elcomputerChoice.textContent = choices[computerChoice];
    elhumanScore.textContent = humanScore;
    elcomputerScore.textContent = computerScore;

    if (humanScore === 5 || computerScore === 5) {
      retry(elhumanScore, elcomputerScore, elhumanChoice, elcomputerChoice);
    }
  }

  function retry(
    elhumanScore,
    elcomputerScore,
    elhumanChoice,
    elcomputerChoice
  ) {
    let result = document.createElement("p");
    let retryButton = document.createElement("button");
    result.textContent = "";
    retryButton.textContent = "Play Again";

    document.body.appendChild(retryButton);
    document.body.appendChild(result);
    gameActive = false;

    if (humanScore === computerScore) {
      result.textContent = "It's a tie!";
    } else if (humanScore > computerScore) {
      result.textContent = "You win!";
    } else {
      result.textContent = "Computer wins!";
    }

    retryButton.addEventListener("click", (event) => {
      humanScore = 0;
      computerScore = 0;
      ties = 0;
      gameActive = true;
      elhumanScore.textContent = "0";
      elcomputerScore.textContent = "0";
      elcomputerChoice.textContent = "";
      elhumanChoice.textContent = "";

      retryButton.remove();
      result.remove();
    });
  }
});
