'use strict';

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const player1El = document.querySelector('.player--0');
const player2El = document.querySelector('.player--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

const contentReturn = {
  curPlayerScore: index => document.getElementById(`current--${index}`),
  holdScore: index => document.getElementById(`score--${index}`),
  player: index => document.querySelector(`.player--${index}`),
};

const newGame = function () {
  const resetPlayer1 = contentReturn.player(0);
  const resetPlayer2 = contentReturn.player(1);

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  contentReturn.holdScore(0).textContent = 0;
  contentReturn.holdScore(0).textContent = 0;
  diceEl.classList.add('hidden');
  resetPlayer1.classList.remove(...resetPlayer1.classList);
  resetPlayer1.classList.add('player', 'player--0', 'player--active');
  resetPlayer2.classList.remove(...resetPlayer2.classList);
  resetPlayer2.classList.add('player', 'player--1');
  scores.fill(0);
  currentScore = 0;
  for (let i = 0; i < scores.length; i++) {
    contentReturn.curPlayerScore(i).textContent = currentScore;
    contentReturn.holdScore(i).textContent = currentScore;
  }
};

newGame();

const switchPlayer = function () {
  currentScore = 0;
  contentReturn.curPlayerScore(activePlayer).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  contentReturn.player(0).classList.toggle('player--active');
  contentReturn.player(1).classList.toggle('player--active');
};

const updateScore = function (dice) {
  if (dice !== 1) {
    currentScore += dice;
    contentReturn.curPlayerScore(activePlayer).textContent = currentScore;
  } else {
    switchPlayer();
  }
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6 + 1);
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    updateScore(dice);
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    contentReturn.holdScore(activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      contentReturn.player(activePlayer).classList.add('player--winner');
      contentReturn.player(activePlayer).classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', newGame);
