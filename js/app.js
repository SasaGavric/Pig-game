/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, gamePlaying;

newGame();

//add click event listener on dice roll with anonymous function
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //display DOM object
        document.querySelector('.dice').style.display = 'block';

        //1.get  random number (integer)
        var dice = Math.floor(Math.random() * 6) + 1;

        //2.display result
        //change css property for element
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'images/dice-' + dice + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }
});

//event listner for button hold
document.querySelector('.btn-hold').addEventListener('click', function () {

    if (gamePlaying) {

        //1.Add CURRENT score to global score
        scores[activePlayer] += roundScore;

        //2.Update the UI (User Interface)
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //3.Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';

            //hide DOM object
            document.querySelector('.dice').style.display = 'none';

            //remove HTML classes
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            //add HTML classes
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            //end game
            gamePlaying = false;

        } else {
            nextPlayer();
        }
    }

});

//when user click on new game button cal newGame function
document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer() {
    //ternary operator
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    roundScore = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    //toggle (add class if it's not there, and if it's there remove )
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

//reset game
function newGame() {
    //reset game data
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    //hide DOM object
    document.querySelector('.dice').style.display = 'none';

    //get DOM object by id and change text content (Set game data on 0)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //reset player names to Player 1 and Player 2
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    //remove winner HTML class
    document.querySelector('.player-' + 0 + '-panel').classList.remove('winner');
    document.querySelector('.player-' + 1 + '-panel').classList.remove('winner');

    //set active player to Player 1
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}