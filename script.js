let playerWinCount = 0;     // Player win counter
let computerWinCount = 0;   // Computer win counter
let roundNumber = 0;        // Round number counter

console.log("First to 5 wins.");
game();

// Picks the choice for the computer.
// Randomly returns rock, paper, or scissors.
function computerPlay() {
    let compNum = Math.floor(Math.random() * 3);    // Picks 0,1, or 2
    // console.log(compNum);   // Debug

    switch (compNum) {
        case 0:
            return "rock";
        case 1:
            return "paper";
        case 2:
            return "scissors";
    }
}


// The user types their choice between rock, paper or scissors.
// Case-insensitive.
function playerPlay() {
    let pickGood = false;

    while (!pickGood) {
        let playerPick = prompt("Pick between rock, paper or scissors.").toLowerCase();
        // console.log(playerPick);    // Debug

        if (playerPick == "rock" ||
            playerPick == "paper" ||
            playerPick == "scissors") {
                pickGood = true;
                return playerPick;
        }
    }
}

/* Plays a round of rock, paper, scissors. Increments appropriate win counter.
@Param - playerSelection: The choice picked by the player.
@Param - computerSelection: The choice picked by the computer.
*/
function playRound(playerSelection, computerSelection) {
    if (playerSelection == computerSelection) {
        console.log("It's a tie. You both picked " + playerSelection + ".");
    }
    else if ((playerSelection == "rock" && computerSelection == "scissors") ||
             (playerSelection == "paper" && computerSelection == "rock") ||
             (playerSelection == "scissors" && computerSelection == "paper")) {
                console.log("You win this round! Your " + playerSelection + " beats " + computerSelection + ".");
                playerWinCount++;
    }
    else {
        console.log("You lose this round! Your " + playerSelection + " lost to " + computerSelection +".");
        computerWinCount++;
    }
}


// Plays rounds until the player or computer reaches 5 wins.
function game() {
    while (playerWinCount < 5 && computerWinCount < 5) {
        const playerSelection = playerPlay();
        const computerSelection = computerPlay();
    
        // console.log("Player: " + playerSelection);   // Debug
        // console.log("Comp: " + computerSelection); // Debug
        roundNumber++;
        playRound(playerSelection, computerSelection);
    
        console.log("Round " + roundNumber + " results:");
        console.log("Player wins: " + playerWinCount);
        console.log("Computer wins: " + computerWinCount);
        console.log();
    }
    
    if (playerWinCount >= 5) {
        console.log("You win!");  
        console.log("Round " + roundNumber + " results:");
        console.log("Player wins: " + playerWinCount);
        console.log("Computer wins: " + computerWinCount);
    }
    if (computerWinCount >= 5) {
        console.log("Computer wins!");
        console.log("Round " + roundNumber + " results:");
        console.log("Player wins: " + playerWinCount);
        console.log("Computer wins: " + computerWinCount);
    }
}