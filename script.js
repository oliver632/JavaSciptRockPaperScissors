function computerPlay() {
    let options = ["rock", "paper", "scissors"];
    return options[(Math.floor(Math.random()*3))];
}

function playRound(computerSelection, humanSelection){
    humanSelection = humanSelection.toLowerCase();
    if(computerSelection === "rock") {
        return (humanSelection == "rock" ? "Tie" : humanSelection == "paper" ? "You Win! Paper beats rock." : "You Lose... Rock beats scissors.");
    }
    if(computerSelection === "paper") {
        return (humanSelection == "paper" ? "Tie" : humanSelection == "scissors" ? "You Win! Scissors beats paper." : "You Lose... Paper beats rock.");
    }
    if(computerSelection === "scissors") {
        return (humanSelection == "scissors" ? "Tie" : humanSelection == "rock" ? "You Win! Rock beats scissors." : "You Lose... Scissors beats paper.");
    }
    while(humanSelection !== "rock" || humanSelection !== "scissors" ||humanSelection !== "paper") {
        return `Invalid input. Choose Rock, Paper og Scissors please.`; 
    }

}

function game(humanSelection){

    //gets result from playRound function
    let rawStringResult = playRound(computerPlay(),humanSelection);
    console.log(rawStringResult);
    //checks result by checking if return from playRound includes win or not.
    if(rawStringResult.includes("Win")){
        humanScore.textContent = parseInt(humanScore.textContent)+1;
        resultText.textContent = rawStringResult;
        resultText.classList.add("win");
    }
    if(rawStringResult.includes("Lose")){
        computerScore.textContent = parseInt(humanScore.textContent)+1;
        resultText.textContent = rawStringResult;
        resultText.classList.add("lose");
    }
    if(rawStringResult.includes("Tie")){
        resultText.textContent = rawStringResult+". You both picked " + humanSelection.toLowerCase()+".";
        resultText.classList.add("tie");
    }
    if(humanScore.textContent === "5"){
        //Pop-up with congrats on winning and then reset scores
        computerScore.textContent  = "0";
        humanScore.textContent = "0";
    }
    if(computerScore.textContent === "5"){
        //Pop-up 
        computerScore.textContent  = "0";
        humanScore.textContent = "0";
    }
}

function clicked(e){
    game(this.textContent);
}

function removeAnimation(e) {
    this.classList.remove("lose");
    this.classList.remove("win");
    this.classList.remove("tie");
}

const resultText = document.querySelector(".result");
const humanScore = document.querySelector(".humanDisplayScore");
const computerScore = document.querySelector(".computerDisplayScore");
const options = document.querySelectorAll(".option");

resultText.addEventListener("animationend", removeAnimation);



options.forEach(option => option.addEventListener("click",clicked));


