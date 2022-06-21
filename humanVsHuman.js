function playRound(computerSelection, humanSelection){
    humanSelection = humanSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if(computerSelection === "rock") {
        return (humanSelection == "rock" ? "Tie" : humanSelection == "paper" ? "You Win! Paper beats rock." : "You Lose... Rock beats scissors.");
    }
    if(computerSelection === "paper") {
        return (humanSelection == "paper" ? "Tie" : humanSelection == "scissors" ? "You Win! Scissors beats paper." : "You Lose... Paper beats rock.");
    }
    if(computerSelection === "scissors") {
        return (humanSelection == "scissors" ? "Tie" : humanSelection == "rock" ? "You Win! Rock beats scissors." : "You Lose... Scissors beats paper.");
    }
    return "Error!";

}
//plays a round of the game
function game(player1Choice, player2Choice){
    //gets result from playRound function
    console.log(player1Choice);
    console.log(player2Choice);
    let rawStringResult = playRound(player2Choice,player1Choice,);
    console.log(rawStringResult);
    //checks result by checking if return from playRound includes win or not.
    if(rawStringResult.includes("Win")){
        player1Score.textContent = parseInt(player1Score.textContent)+1;
        resultText.textContent = "Player 1 wins";
        resultText.classList.add("win");
    }
    if(rawStringResult.includes("Lose")){
        player2Score.textContent = parseInt(player2Score.textContent)+1;
        resultText.textContent = "Player 2 wins";
        resultText.classList.add("win");
    }
    if(rawStringResult.includes("Tie")){
        resultText.textContent = rawStringResult+". You both picked " + player2Choice.toLowerCase()+".";
        resultText.classList.add("tie");
    }

    //if the human wins open a modal and reset scores
    if(player1Score.textContent === "5"){
        openModal("Player 1 wins. Close this to start over.")
        restartGame();
    }
    //if the computer wins open a modal and reset scores
    if(player2Score.textContent === "5"){
        openModal("Player 2 wins. Close this to start over.");
        restartGame();
    }
}
//Plays a round of the game if one of the buttons are clicked 
function clickedButton(e){
    if(playerTurn.textContent == "Player 1") {
        player1Choice = this.textContent;
        playerTurn.textContent = "Player 2";
        console.log("player 1 set!");
        this.classList.add("optionAnimation");
        return;
    };
    if(playerTurn.textContent == "Player 2"){
        player2Choice = this.textContent;
        this.classList.add("optionAnimation");
        console.log("playing game!");
        playerTurn.textContent = "Player 1";
        game(player1Choice, player2Choice);
    }
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
    player1Score.textContent  = "0";
    player2Score.textContent = "0";
    resultText.textContent = null;
    playerTurn = "Player 1";
}
//Opens settings
function openSettings(){
    settingsModelContent.classList.add("modalAnimation");
    settingsModal.style.display = "block";
}
//closes settings if close button is hit or it's clicked outside of modal
function closeSettings(e) {
    if(e.target == settingsModal){
        settingsModelContent.classList.remove("modalAnimation");
        settingsModal.style.display = "none";
    }
    if(e.target == settingsCloseButton){
        settingsModelContent.classList.remove("modalAnimation");
        settingsModal.style.display = "none";
    }
    if(e == "modeClose"){
        settingsModelContent.classList.remove("modalAnimation");
        settingsModal.style.display = "none";
    }
}

function switchMode(e){
    if(e.target.id == currentMode) closeSettings("modeClose");
    /* MAKE THIS A NEW WEBSITE
    if(e.target.id == "humanVsHuman"){
        //Switch to humanVsHuman
        closeSettings("modeClose");
        currentMode = "humanVsHuman";
    }*/
}

let currentMode = "humanVsHuman";

//currentSelection variables
let player1Choice = null;
let player2Choice = null;

//get all the elements we will need.
const resultText = document.querySelector(".result");
const options = document.querySelectorAll(".option");

//Modal variables
const modalText = document.querySelector(".modalText");
const modalContent = document.querySelector(".modalContent");
const modal = document.getElementById("myModal");
const modalCloseButton = document.getElementsByClassName("close")[0];

//PlayerTurn variable for humanVshuman mode
const playerTurn = document.querySelector(".playerTurn");

//scoreBox variables
const player1Score = document.querySelector(".humanDisplayScore");
const humanScoreText = document.querySelector(".humanScoreText");
const player2Score = document.querySelector(".computerDisplayScore");
const computerScoreText = document.querySelector(".computerScoreText");

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
const settingsButton = document.querySelector(".settingsButton");
//Registers click on settings button and opens settings menu
settingsButton.addEventListener("click",openSettings);
//Close events for settings modal
settingsCloseButton.addEventListener("click", closeSettings);
settingsModal.addEventListener("click", closeSettings);
//clicks on options
settingsHumanVsComputer.addEventListener("click", switchMode); 
settingsHumanVsHuman.addEventListener("click", switchMode);

//Closes the modal if close button or outside of modal is clicked
modalCloseButton.addEventListener("click", closeModal);
modal.addEventListener("click", closeModal);

//Listens for animation endings and removes the animation classes
resultText.addEventListener("animationend", removeAnimation);
modalContent.addEventListener("animationend",() => modalContent.classList.remove("modalAnimation"));
options.forEach(option => option.addEventListener("animationend", removeOptionAnimation));

//Registers click on one of the options - has to be last
options.forEach(option => option.addEventListener("click",clickedButton));


