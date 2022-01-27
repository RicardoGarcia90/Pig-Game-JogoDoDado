'use strict';

//Selecionando elementos
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnHowToPlay = document.querySelector('.btn-howToPlay');
const opentextHowToPlay = document.querySelector('.text-HowToPlay');
const btnCloseTxt = document.querySelector('.btn-closeTxt');
const overlay = document.querySelector('.overlay');

//Condições iniciais

let scores, currentScore, activePlayer, playing;
let winText0 = document.getElementById('winnerText--0');
let winText1 = document.getElementById('winnerText--1');

const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  winText0.textContent = '';
  winText1.textContent = '';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Funcionalidades quando rolar o dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Gerando um número aleatório no dado
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Mostrando dado
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Checando se o número foi 1
    if (dice !== 1) {
      // Adicionar o numero do dado no 'current' score
      currentScore += dice; // currentScore = currentScore + dice(valor do dado)
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Troca para outro jogador
      switchPlayer();
    }
  }
});

// HOLD

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Adicionar os pontos atuais do 'current' no score.
    scores[activePlayer] += currentScore;
    //scores[1] = scores[1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Checar se a pontuação no score é >=100
    // se sim, finalizar o jogo sendo o vencedor quem chegou a 100 pontos
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document.getElementById(`winnerText--${activePlayer}`).innerHTML =
        'VENCEDOR!';

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--acttive');
    } else {
      // 3. Mudar para o próximo jogador
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);

const openTxt = function () {
  opentextHowToPlay.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnHowToPlay.addEventListener('click', openTxt);

const closeTxt = function () {
  opentextHowToPlay.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnCloseTxt.addEventListener('click', closeTxt);
overlay.addEventListener('click', closeTxt);
