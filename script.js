let playerWinCount = 0;     // Player win counter
let computerWinCount = 0;   // Computer win counter
let roundNumber = 0;        // Round number counter

// Remembers the counter for the previous images displayed.
let prevRockNum = 0;
let prevPaperNum = 0;
let prevScissorsNum = 0;


// Stores the links of all images.
rockImages = ["images/rock-Images/Rock1.jpg",
              "images/rock-Images/Rock2.jpg",
              "images/rock-Images/Rock3.jpg",
              "images/rock-Images/Rock4.jpg",
              "images/rock-Images/Rock5.jpg"];

paperImages = ["images/paper-Images/Paper1.jpg",
               "images/paper-Images/Paper2.jpg",
               "images/paper-Images/Paper3.jpg",
               "images/paper-Images/Paper4.jpg",
               "images/paper-Images/Paper5.jpg"];

scissorsImages = ["images/scissor-Images/Scissors1.jpg",
                  "images/scissor-Images/Scissors2.jpg",
                  "images/scissor-Images/Scissors3.jpg",
                  "images/scissor-Images/Scissors4.jpg",
                  "images/scissor-Images/Scissors5.jpg"];


randomizeImages();


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



// Plays a round of rock, paper, scissors. Increments appropriate win counter.
function playRound(event /* playerSelection , computerSelection */) {
    // Removes previous player/computer selection icon.
    const selections = document.querySelectorAll("#choice-container p");
    selections.forEach(selection => selection.style.display = "none");

    // Gets the value of the button from the alt of the element of the event.
    // Was unable to get "value" from element so used "alt" instead.
    const playerSelection = event.target.alt;

    // This was variable when I used buttons instead of input images.
    // const playerSelection = event.explicitOriginalTarget.value;


    const computerSelection = computerPlay();


    // Displays an icon above player's choice and below computer's choice.
    const playerIcon = "player-" + playerSelection + "-sel";
    const compIcon = "computer-" + computerSelection + "-sel";
    document.getElementById(playerIcon).style.display = "block";
    document.getElementById(compIcon).style.display = "block";

    roundNumber++;

    determineRoundWinner(playerSelection, computerSelection);
    
    printFinalResults(playerWinCount, computerWinCount);

    randomizeImages();
}


// Determines the winner and stores results to be printed for a single round.
function determineRoundWinner(playerSelection, computerSelection) {
    let results;
    if (playerSelection == computerSelection) {
        results = "It's a tie. You both picked " + playerSelection + ".";

        updatePlayerScores("tie");
        
        // console.log(results); // Debug
    }
    else if ((playerSelection == "rock" && computerSelection == "scissors") ||
             (playerSelection == "paper" && computerSelection == "rock") ||
             (playerSelection == "scissors" && computerSelection == "paper")) {
                results = "You win this round! Your " + playerSelection + " beats " + computerSelection + ".";
                
                // console.log(results); // Debug

                playerWinCount++;
                updatePlayerScores("player");
    }
    else {
        results = "You lose this round! Your " + playerSelection + " lost to " + computerSelection +".";

        // console.log(results); // Debug

        computerWinCount++;
        updatePlayerScores("computer");
    }

    printSingleRoundResult(results);
}


// Prints the result for a single round.
function printSingleRoundResult(results) {
    const resultDisplay = document.querySelector("#round-results");
    const roundResults = document.createElement("p");

    const children = document.querySelectorAll("#round-results p");
    children.forEach(child => child.style.fontWeight = "normal");


    roundResults.textContent += "Round " + roundNumber + ": ";
    roundResults.textContent += results;
    roundResults.style.fontWeight = "bold";

    resultDisplay.appendChild(roundResults);
}

// Updates score counts after each round.
// Updates round counter.
function updatePlayerScores(winner) {
    const roundCount = document.querySelector("#round-counter-container");
    roundCount.textContent = "Round #" + roundNumber;

    if (winner == "player"){
        const playerScore = document.querySelector("#player-score-container");
        // const score = document.createElement("p");
        
        playerScore.textContent = "Player Score: " + playerWinCount;
    }
    else if (winner == "computer") {
        const computerScore = document.querySelector("#computer-score-container");
        // const score = document.createElement("p");
        
        computerScore.textContent = "Computer Score: " + computerWinCount;
    }
    
}

// Prints final results.
function printFinalResults(playerWinCount, computerWinCount) {
    const finalResults = document.querySelector("#game-winner");
    const resultsContainer = document.createElement("div");

    const res1 = document.createElement("p");
    const res2 = document.createElement("p");
    const res3 = document.createElement("p");
    const res4 = document.createElement("p");
    const res5 = document.createElement("p");


    // If player won.
    if (playerWinCount >= 5) {
        res1.textContent = "You Win!";
        resultsContainer.appendChild(res1);

        res2.textContent = "Round " + roundNumber + " results:";
        resultsContainer.appendChild(res2);

        res3.textContent = "Player won: " + playerWinCount;
        resultsContainer.appendChild(res3);

        res4.textContent = "Computer won: " + computerWinCount;
        resultsContainer.appendChild(res4);

        res5.textContent = "---------------------------"
        resultsContainer.appendChild(res5);
        
        finalResults.appendChild(resultsContainer);


        // Removes the event listener from the choices
        const buttons = document.querySelectorAll(".button");
        buttons.forEach(button => button.removeEventListener("click", playRound));


        // Displays the reset button
        const resetButton = document.getElementById("reset-button");
        resetButton.style.display = "block";
    }
    // If computer won.
    if (computerWinCount >= 5) {
        res1.textContent = "Computer Win!";
        resultsContainer.appendChild(res1);

        res2.textContent = "Round " + roundNumber + " results:";
        resultsContainer.appendChild(res2);

        res3.textContent = "Player won: " + playerWinCount;
        resultsContainer.appendChild(res3);

        res4.textContent = "Computer won: " + computerWinCount;
        resultsContainer.appendChild(res4);

        res5.textContent = "---------------------------"
        resultsContainer.appendChild(res5);
        
        finalResults.appendChild(resultsContainer);


        // Removes the event listener from the choices
        const buttons = document.querySelectorAll(".button");
        console.log(buttons); // Debug
        // buttons[0].removeEventListener("click", playRound);
        buttons.forEach(button => button.removeEventListener("click", playRound));


        // Displays the reset button
        const resetButton = document.getElementById("reset-button");
        resetButton.style.display = "block";
    }
}


// Ran when start button is pressed.
function startGame() {
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => button.addEventListener("click", playRound));


    // Hides start game button.
    const startButton = document.getElementById("start-game");
    startButton.style.display = "none";

    // Shows reset button.
    const resetButton = document.getElementById("reset-button");
    resetButton.style.display = "block";
}

// Removes all scores and results.
// Resets counters to 0.
// Adds event listeners again to the choices.
function resetGame() {
    // Removes all scores and results.
    const finalResults = document.querySelector("#game-winner");
    finalResults.textContent = "";

    const roundResults = document.querySelector("#round-results");
    roundResults.textContent = "";

    // Reseting counters.
    playerWinCount = 0;     // Player win counter
    computerWinCount = 0;   // Computer win counter
    roundNumber = 0;        // Round number counter

    // Resetting player and computer scores.
    const playerScore = document.querySelector("#player-score-container");   
    playerScore.textContent = "Player Score: " + playerWinCount;

    const computerScore = document.querySelector("#computer-score-container");        
    computerScore.textContent = "Computer Score: " + computerWinCount;


    // Adds event listeners.
    const buttons = document.querySelectorAll(".button");
    buttons.forEach(button => button.addEventListener("click", playRound));
}

// Randomizes images
function randomizeImages() {
    const rockImage = document.getElementById("rock-choice");
    const paperImage = document.getElementById("paper-choice");
    const scissorsImage = document.getElementById("scissors-choice");


    // Picks a new image for each rock, paper, scissors.
    let rockNum = Math.floor(Math.random() * 5);
    let paperNum = Math.floor(Math.random() * 5);
    let scissorsNum = Math.floor(Math.random() * 5);

    // Makes sure the image is new.
    while(rockNum == prevRockNum) {
        rockNum = Math.floor(Math.random() * 5);
    }
    while(paperNum == prevPaperNum) {
        paperNum = Math.floor(Math.random() * 5);
    }
    while(scissorsNum == prevScissorsNum) {
        scissorsNum = Math.floor(Math.random() * 5);
    }

    // Remembers the current image.
    prevRockNum = rockNum;
    prevPaperNum = paperNum;
    prevScissorsNum = scissorsNum;

    // Assigns new image as a string.
    let newRockImage =  rockImages[rockNum];
    let newPaperImage = paperImages[paperNum];
    let newScissorsImage = scissorsImages[scissorsNum];

    // Loads new images.
    rockImage.src = newRockImage;
    paperImage.src = newPaperImage;
    scissorsImage.src = newScissorsImage;
}
