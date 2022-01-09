'use strict';
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');


let currentScore, activePlayer, scores, playing;

const init = function () {
  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');

  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');

  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generate random dice roll
    const diceNum = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    dice.classList.remove('hidden');
    dice.src = `dice-${diceNum}.png`;
    // 3. Check for rolled 1: if true

    if (diceNum !== 1) {
      currentScore += diceNum;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players score;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if players score is >= 100;
    // if true: Finish game
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    // 3. Switch to next player;
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
