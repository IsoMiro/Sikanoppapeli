'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl1 = document.getElementById('dice1');
const diceEl2 = document.getElementById('dice2');
const diceContainer = document.querySelector('.dice-container');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const selectDiceCount = document.getElementById('dice-count');

let scores, currentScore, activePlayer, playing, diceCount;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // Roll the dice based on the selected dice count
        const rolledDice = [];
        for (let i = 0; i < diceCount; i++) {
            const dice = Math.trunc(Math.random() * 6) + 1;
            rolledDice.push(dice);
        }

        // Display dice
        diceEl1.classList.remove('hidden');
        diceEl1.src = `dicepics/dice-${rolledDice[0]}.png`;
        if (diceCount === 2) {
            diceEl2.classList.remove('hidden');
            diceEl2.src = `dicepics/dice-${rolledDice[1]}.png`;
        }

        // Check for rolled 1
        if (!rolledDice.includes(1)) {
            // Add dice values to current score
            const sum = rolledDice.reduce((acc, curr) => acc + curr, 0);
            currentScore += sum;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

btnHold.addEventListener('click', function () {
    if (playing) {
        // Add current score to active player's score
        scores[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // Check if player's score is >= 100
        if (scores[activePlayer] >= 100) {
            // Finish the game
            playing = false;
            diceContainer.classList.add('hidden');

            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            alert(activePlayer + " on voittanut pelin")
            location.reload();
        } else {
            // Switch to the next player
            switchPlayer();
        }
    }
});

// Starting conditions
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    diceCount = parseInt(selectDiceCount.value);
    /*diceContainer.classList.add('hidden');*/
   
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
   
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
};
init();

// Event listener for the dice count select
selectDiceCount.addEventListener('change', function () {
    diceCount = parseInt(this.value);
    diceContainer.classList.add('hidden');
});
