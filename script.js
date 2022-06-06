console.log('Script attached to html');
('use strict');
//Buttons
const buttonCheck = document.getElementById('btnCheck');
const buttonReset = document.getElementById('btnReset');

//Functions
const randomNumber = () => Math.floor(Math.random() * 50) + 1;

const displayMessage = message => (getMessage.textContent = message);

const displaySecretNumber = secret => (secretNumber.textContent = secret);

const addBodyBackground = winOrLose => document.body.classList.add(winOrLose);

const removeBodyBackground = winOrLose => {
    document.body.classList.remove(winOrLose);
};

const emptyInputValue = () => (getInput.value = '');

const displayScore = score => (getScore.textContent = score);

const showSecretNumber = winnerNumber => {
    secretNumber.classList.contains('winner-number')
        ? secretNumber.classList.remove(winnerNumber)
        : secretNumber.classList.add('winner-number');
};

const biggerBoxNumber = winnerBox =>
    getSecretBox.classList.contains('winner-box')
        ? getSecretBox.classList.remove(winnerBox)
        : getSecretBox.classList.add('winner-box');

const guessingTheNumber = () => {
    let guess = Number(getInput.value);
    console.log('guess', guess);

    //Check if there is nothing inside the input field
    if (!guess) {
        displayMessage('No number');
        //Check if there is the correct answer
    } else if (guess === secret) {
        displayMessage('Correct Number!');
        displaySecretNumber(secret);
        addBodyBackground('win');
        emptyInputValue();
        showSecretNumber('winner-number');
        biggerBoxNumber('winner-box');
        if (score > highscore) {
            highscore = score;
            getHighscore.textContent = score;
        }
    } else if (guess !== secret) {
        if (score > 1) {
            displayMessage(guess > secret ? 'Too high!' : 'Too low');
            score--;
            displayScore(score);
        } else {
            displayMessage('You lose :´(');
            addBodyBackground('lose');
            displayScore(0);
            emptyInputValue();
        }
    }
};

//Message
const getMessage = document.getElementById('changeMessage');
const getSecretBox = document.querySelector('.box-number');
const getHighscore = document.getElementById('highscore');
const getInput = document.querySelector('.guess');
const getScore = document.getElementById('score');
const secretNumber = document.getElementById('number');

let secret = randomNumber();
let score = 50;
let highscore = 0;

console.log('secret', secret);

buttonCheck.addEventListener('click', guessingTheNumber);

buttonReset.addEventListener('click', () => {
    score = 50;
    secret = randomNumber();
    console.log('secret2', secret);

    displayMessage('Start guessing...');
    emptyInputValue();
    displaySecretNumber('?');
    displayScore(score);
    removeBodyBackground('win');
    removeBodyBackground('lose');
    showSecretNumber('winner-number');
    biggerBoxNumber('winner-box');
});

document.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        guessingTheNumber();
    }
});
