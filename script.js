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
//plays a round of the game
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

    //if the human wins open a modal and reset scores
    if(humanScore.textContent === "5"){
        openModal("You won! Close this to play again.")
        restartGame();
    }
    //if the computer wins open a modal and reset scores
    if(computerScore.textContent === "5"){
        openModal("You lost to the computer, better luck next time!");
        restartGame();
    }
}
//Plays a round of the game if one of the buttons are clicked 
function clickedButton(e){
    //starts game with text of button as option picked
    game(this.textContent);
    //adds animation
    this.classList.add("optionAnimation");
}

//removes the animation from round result
function removeAnimation(e) {
    this.classList.remove("lose");
    this.classList.remove("win");
    this.classList.remove("tie");
}

function removeOptionAnimation(e) {
    this.classList.remove("optionAnimation");
}
//closes modal and removes the animation for it's opening (redundant)
function closeModal(e) {
    if(e.target == modal){
        modal.style.display = "none";
        modalContent.classList.remove("modalAnimation");
    }
    if(e.target == modalCloseButton){
        modal.style.display = "none";
        modalContent.classList.remove("modalAnimation");
    }
}

//opens a modal with the given text and starts the opening animation aswell
function openModal(textInModal) {
    modalText.textContent = textInModal;
    modal.style.display = "block";
    modalContent.classList.add("modalAnimation");
}

function restartGame(){
    computerScore.textContent  = "0";
    humanScore.textContent = "0";
    resultText.textContent = "A new game has started. Good luck!"
}
//Opens settings
function openSettings(){
    settingsModelContent.classList.add("modalAnimation");
    settingsModal.style.display = "block";
}

function closeSettings() {
    settingsModelContent.classList.remove("modalAnimation");
    settingsModal.style.display = "none";

}


//get all the elements we will need.
const resultText = document.querySelector(".result");
const humanScore = document.querySelector(".humanDisplayScore");
const computerScore = document.querySelector(".computerDisplayScore");
const options = document.querySelectorAll(".option");

//Modal variables
const modalText = document.querySelector(".modalText");
const modalContent = document.querySelector(".modalContent");
const modal = document.getElementById("myModal");
const modalCloseButton = document.getElementsByClassName("close")[0];

//Settings menu variables
const settingsModal = document.querySelector(".settingsModal");
const settingsCloseButton = document.querySelector(".closeSettings");
const settingsModelContent = document.querySelector(".settingsModalContent");
const settingsHumanVsComputer = document.querySelector(".humanVsComputerSetting");
const settingsHumanVsHuman = document.querySelector(".humanVsHumanSetting");

//Defines restartButton
const restartButton = document.querySelector(".restart");
//Restarts game if restartbutton is clicked
restartButton.addEventListener("click", restartGame);

//Defines settingsButton
const settingsButton = document.querySelector(".settings");
//Registers click on settings button and opens settings menu
settingsButton.addEventListener("click",openSettings);
//Close events for settings modal
settingsCloseButton.addEventListener("click", closeSettings);
settingsModal.addEventListener("click", closeSettings);

//Closes the modal if close button or outside of modal is clicked
modalCloseButton.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);

//Listens for animation endings and removes the animation classes
resultText.addEventListener("animationend", removeAnimation);
modalContent.addEventListener("animationend",() => modalContent.classList.remove("modalAnimation"));
options.forEach(option => option.addEventListener("animationend", removeOptionAnimation));

//Registers click on one of the options - has to be last
options.forEach(option => option.addEventListener("click",clickedButton));


