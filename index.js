let choices = ["Rock", "Paper", "Scissors"];

// function to generate a random number which to be inserted in the choices array
function getComputerChoice() {
  return Math.floor(Math.random() * choices.length);
}

// function to get a prompt from the user which inputs a number then converted to an integer
function getHumanChoice() {
  let userChoice = prompt(
    "Welcome to Rock, Paper, Scissors Game!\n\nEnter the number you want to choose:\n[1] Rock\n[2]Paper\n[3]Scissors"
  );
  return parseInt(userChoice) - 1;
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    let ties = 0;

    // function that plays a single round, gets both human choice and computer choice and then compares it to the look up table.
    function playRound(humanChoice, computerChoice){
        console.log(`Human choice:  ${choices[humanChoice]} \nComputer choice:  ${choices[computerChoice]}`);
        const winningConditions = {
            "Rock": "Scissors",
            "Paper": "Rock",
            "Scissors": "Paper"
        };
    
        if (humanChoice === computerChoice) {
            ties++;
        } else if (winningConditions[choices[humanChoice]] === choices[computerChoice]) {
            humanScore++;
        } else {
            computerScore++;
        }
    }
    
    // calls the gethumanchoice and getcomputerchoice 5 times(5 rounds)
    for (let i = 0; i < 5; i++) {
        playRound(getHumanChoice(), getComputerChoice());
    }

    function displayScore(){
        console.log(`Score breakdown: \nHuman score: ${humanScore}\nComputer score: ${computerScore}\nTies: ${ties}`)
    }

    if (humanScore === computerScore){
        console.log("It's a tie!");
        displayScore();
    }
    else if (humanScore > computerScore){
        console.log("Human wins!");
        displayScore();
    } else {
        console.log("Computer wins!");
        displayScore();
    }
}

playGame();