'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const setContent = function (target, message) {
  document.querySelector(target).textContent = message;
};

const guessInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');

const checkValue = function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess);

  //invalid guess
  if (!guess || guess > 20 || guess < 1) {
    setContent('.message', 'Invalid Input!');

    //decimal number
  } else if (guess % 1 !== 0) {
    setContent('.message', 'Enter a Whole Number');

    //correct guess
  } else if (guess === secretNumber) {
    setContent('.message', 'Correct Number!');
    setContent('.number', secretNumber);

    document.querySelector('.number').style.backgroundColor = '#c5dcc2';

    guessInput.disabled = true;
    checkBtn.disabled = true;

    if (score > highScore) {
      highScore = score;
      setContent('.highscore', highScore);
    }

    //wrong valid guess
  } else if (guess !== secretNumber) {
    if (score > 1) {
      setContent('.message', guess > secretNumber ? 'Too High!' : 'Too Low!');

      score--;
      setContent('.score', score);
    } else {
      setContent('.message', 'You Lost!');
      setContent('.score', 0);
      setContent('.number', secretNumber);

      document.querySelector('.number').style.backgroundColor = '#eeb6b6';

      guessInput.disabled = true;
      checkBtn.disabled = true;
    }
  }
};

//check button
document.querySelector('.check').addEventListener('click', checkValue);

//pressing enter button
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !guessInput.disabled) checkValue();
});

//again button
document.querySelector('.again').addEventListener('click', function () {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;

  setContent('.message', 'Start guessing...');
  setContent('.score', score);
  setContent('.number', '?');

  document.querySelector('.guess').value = '';

  document.querySelector('.number').style.backgroundColor = '#efede6';

  guessInput.disabled = false;
  checkBtn.disabled = false;
  guessInput.focus();
});
