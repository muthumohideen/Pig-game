//Challenge 1:
function exactAge(){
    const birthYear = prompt("Year at which you born");
    const age = 2022-birthYear;
    let h1 = document.createElement('h1');
    let textAnswer = document.createTextNode('Your age is ' + age);
    h1.setAttribute('id', 'age');
    h1.appendChild(textAnswer);
    document.getElementById('flex-box-result').appendChild(h1);
}
function reset(){
    document.getElementById("age").remove();
}

// Challenge 2:
function catGenerator (){
    let image = document.createElement('img');
    let div = document.getElementById('generator');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif";
    div.appendChild(image);
}

//Challenge3:

function rpsGame(yourChoice) {
    // bot choice --> random number --> mapping random number to choice
    let humanScore;
    let botChoiceInt = Math.floor(Math.random()*3);
    let option = ['rock','paper','scissor'];
    let botChoice = option[botChoiceInt];
    let humanChoice = yourChoice.id;
    humanScore = score(humanChoice, botChoice);
    var result = finalMessage(humanScore);
    rpsFrontend(humanChoice, botChoice, result);
}

function score (humanChoice, botChoice){
    let rpsDatabase = {
        'rock': {'rock': 0.5, 'paper': 0, 'scissor': 1},
        'paper': {'rock': 1, 'paper': 0.5, 'scissor': 0},
        'scissor': {'rock': 0, 'paper': 1, 'scissor': 0.5}
    };
    humanScore = rpsDatabase[humanChoice][botChoice];
    return humanScore
}
function finalMessage(humanScore) {
if (humanScore === 1) {
    return {'message': 'You Won', 'color': 'green'};
} else if (humanScore === 0.5) {
    return {'message': 'Tie', 'color': 'Yellow'};
} else{
    return {'message': 'You Lost', 'color': 'red'};
}
}

function rpsFrontend(humanChoice, botChoice, result){
    let imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    humanDiv.innerHTML = "<img src='" + imageDatabase[humanChoice] + "' height = 150 width = 150 style= 'box-shadow: 0px 10px 50px rgba(37,50,233,1)'>";
    botDiv.innerHTML = "<img src='" + imageDatabase[botChoice] + "' height = 150 width = 150 style= 'box-shadow: 0px 10px 50px rgb(233, 37, 37)'>";
    messageDiv.innerHTML = "<h1 style = 'color: " + result['color'] + "; font-size: 60px; padding: 30px; '>" + result['message'] + "</h1>";
    document.getElementById('flex-box-rps').appendChild(humanDiv);
    document.getElementById('flex-box-rps').appendChild(botDiv);
    document.getElementById('flex-box-rps').appendChild(messageDiv);
}

//Challenge 4
let allButtons = document.getElementsByTagName('button');
let copyAllButtons = [];
for (let i=0; i<allButtons.length; i++){
    copyAllButtons.push(allButtons[i].classList[1]);
}
function buttonColorChange(color){
    clear();
    if (color.value === 'red'){
        redColr();
        // allButtons[i].classList.add('btn-danger');
    } else if (color.value === 'green'){
        greenColr();
    } else if (color.value === 'reset'){
        resetColr();
    } else {
        randomColr();
    }
}
function clear() {
    for (let i=0; i<allButtons.length; i++){
        allButtons[i].classList.remove(allButtons[i].classList[1]);
    }
}
function redColr() {
    for (let i=0; i<allButtons.length; i++){
        allButtons[i].classList.add('btn-danger');
    }
}
function greenColr() {
    for (let i=0; i<allButtons.length; i++){
        allButtons[i].classList.add('btn-success');
    }
}
function resetColr() {
    for (let i=0; i<allButtons.length; i++){
        allButtons[i].classList.add(copyAllButtons[i]);
    }
}
function randomColr() {
    for (let i=0; i<allButtons.length; i++){
        let choice = ['btn-success', 'btn-primary', 'btn-danger', 'btn-warning'];
        allButtons[i].classList.add(choice[Math.floor(Math.random()*4)]);
    }
}

// Challenge 5
const hitSound = new Audio('sounds/swish.m4a');
let blackJackGame = {
    'you': { 'spanId': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': { 'spanId': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0},
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': {'2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'K':10, 'Q':10, 'J': 10, 'A': [1, 11]},
}
const YOU = blackJackGame['you'];
const DEALER = blackJackGame['dealer'];

document.querySelector('#blackjack-hit-button').addEventListener('click', blackJackHit);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackJackDeal);


function blackJackHit() {
    let card = randomCard();
    // console.log(card);
    hitSound.play();
    showCard(card, YOU);
    updateScore(card, YOU);
    console.log(YOU['score']);
    showScore(YOU);
}

function randomCard() {
    let randomCardIndex = Math.floor(Math.random()*13);
    return blackJackGame['cards'][randomCardIndex];
}

    function showCard(card, activePlayer){
        let cardImage = document.createElement('img');
        cardImage.src = `images/${card}.png`;
        document.querySelector(activePlayer['div']).appendChild(cardImage);
    }

    function updateScore(card, activePlayer){
        activePlayer['score'] += blackJackGame['cardsMap'][card];
    }
    
    function showScore(activePlayer){
        document.querySelector(activePlayer['spanId']).textContent = activePlayer['score'];
    }


function blackJackDeal() {
    removeCard(YOU);
    resetScore(YOU);
}
    
    function removeCard(activePlayer){
        let allImages = document.querySelector(activePlayer['div']).querySelectorAll('img');
        for(i=0; i<allImages.length; i++){
        allImages[i].remove();
        }
    }

function resetScore(activePlayer){
    activePlayer['score'] = 0;
    document.querySelector(activePlayer['spanId']).textContent = activePlayer['score'];
    }
