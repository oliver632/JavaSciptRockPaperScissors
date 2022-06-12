console.log("Hello World!");

function computerPlay() {
    let options = ["rock", "paper", "scissors"];
    return options[(Math.floor(Math.random()*3))];
}

function playRound(computerSelection, humanSelection){
    humanSelection = humanSelection.toLowerCase();
    if(computerSelection === "rock") {
        return (humanSelection == "rock" ? "tie" : humanSelection == "paper" ? "You Win! Paper beats rock!" : "You Lose... Rock beats scissors.");
    }
    if(computerSelection === "paper") {
        return (humanSelection == "paper" ? "tie" : humanSelection == "scissors" ? "You Win! Scissors beats paper!" : "You Lose... Paper beats rock.");
    }
    if(computerSelection === "scissors") {
        return (humanSelection == "scissors" ? "tie" : humanSelection == "rock" ? "You Win! Rock beats scissors!" : "You Lose... Scissors beats paper.");
    }
    while(humanSelection !== "rock" || humanSelection !== "scissors" ||humanSelection !== "paper") {
        return `Invalid input. Choose Rock, Paper og Scissors please.`; 
    }

}

function game(){
    let humanWins = 0;
    let computerWins = 0;
    console.log("Welcome to this game of Rock, Paper or Scissors!");
    console.log("Let's just start, choose your first pick:");

    for (let i = 0; i < 5; i++) {
        let humanSelection = prompt("Rock, paper or scissors?");
        let rawStringResult = playRound(computerPlay(),humanSelection);
        console.log(rawStringResult);
        if(rawStringResult.includes("Win")){
            humanWins += 1;
        }
        if(rawStringResult.includes("Lose")){
            computerWins += 1;
        }
    }
    console.log(`The computer won ${computerWins} times and you won ${humanWins} times`);
    console.log((computerWins>humanWins ? "You lose..." : computerWins<humanWins ? "You Win!" : "It's a tie."));
}