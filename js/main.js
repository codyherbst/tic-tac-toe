//everything goes in this div so that elements appear cleaner in dev tools
//if put straight into body, everything is created after script tag
ttt_App = document.getElementById('App')
ttt_App.className = 'container'

//function to create an element
function createElement(elementType, tagClass, id, textContent) {
    let name = document.createElement(elementType);
    name.id = id;
    name.className = tagClass.join(' ');
    name.innerHTML = textContent;
    // console.log(name);
    return name;
}

/* ---------------------------------------------Start of head div--------------------------------------------- */

//create div for header
let headDiv = createElement('div', ['container', 'text-center'], 'headDiv', '<h1>Tic-Tac-Toe</h1>');
ttt_App.appendChild(headDiv);

let subHead = createElement('h4', [], 'subHead', 'X \'s turn')
headDiv.appendChild(subHead)

/* ---------------------------------------------Start of game div---------------------------------------------*/

//create div for game
let gameDiv = createElement('div', ['container'], 'gameDiv', '');
ttt_App.appendChild(gameDiv)



//this array is to be used later in the following function. these are all of the win coniditions
let winConditions = [
    ['boardCol1', 'boardCol2', 'boardCol3'],
    ['boardCol1', 'boardCol5', 'boardCol9'],
    ['boardCol1', 'boardCol4', 'boardCol7'],
    ['boardCol2', 'boardCol5', 'boardCol8'],
    ['boardCol3', 'boardCol5', 'boardCol7'],
    ['boardCol3', 'boardCol6', 'boardCol9'],
    ['boardCol4', 'boardCol5', 'boardCol6'],
    ['boardCol7', 'boardCol8', 'boardCol9']
]

//using above array check through and see if there's a win condition
let roundCount = 0;
function checkWin() {
    for (let i = 0; i < winConditions.length; i++) {
        let firstPosition = document.getElementById(winConditions[i][0]);
        let secondPosition = document.getElementById(winConditions[i][1]);
        let thirdPosition = document.getElementById(winConditions[i][2]);

        if (firstPosition.innerHTML === secondPosition.innerHTML && 
            secondPosition.innerHTML === thirdPosition.innerHTML && 
            thirdPosition.innerHTML === '<h2>X</h2>') {
                subHead.innerHTML = '<h4>X Wins!</h4>';
                gameOn = false;
        } else if (firstPosition.innerHTML === secondPosition.innerHTML && 
            secondPosition.innerHTML === thirdPosition.innerHTML && 
            thirdPosition.innerHTML === '<h2>O</h2>') {
                subHead.innerHTML = '<h4>O Wins!</h4>';
                gameOn = false;
        }
    }

    roundCount++
    if (roundCount >= 9 && gameOn === true) {
        subHead.innerHTML = '<h4>It\'s a draw!</h4>'
        gameOn = false;
    }
}    

//function to display X or O for clicked column
//essentially all logic for each box is contained here
let gameOn = true;
let playerOne = true;
function clickBox(col) {
    if (playerOne === true && col.innerHTML === '' && gameOn) {
        col.innerHTML = '<h2>X</h2>';
        subHead.innerHTML = 'O\'s turn';
        col.className += ' true';
        playerOne = false;
        checkWin();
    } else if (playerOne === false && col.innerHTML === '' && gameOn) {
        col.innerHTML = '<h2>O</h2>';
        subHead.innerHTML = 'X\'s turn';
        col.className += ' true';
        playerOne = true;
        checkWin();
    }
}

//building columns last after required functions
let j = 1;
for (let i = 0; i < 3; i++) {
    let row = createElement('div', ['row'], '', '')
    gameDiv.appendChild(row)
    for (let i = 0; i < 3; i++) {
        let col = createElement('div', ['col-4', 'text-center', 'border', 'p-5'], 'boardCol' + j, '')
        j++
        col.addEventListener('click', function () { clickBox(col) })
        row.appendChild(col)
    }
}

//

/* ---------------------------------------------Start of button Div----------------------------------------------- */

//create div for button
let footDiv = createElement('div', ['container'], 'footDiv', '')
ttt_App.appendChild(footDiv);

//function to restart game by looping over each column and setting to empty string
function restartGame() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById('boardCol' + i).innerHTML = ''
        gameOn = true;
        roundCount = 0;
    }
    playerOne = true;
}

//creating restart button. has to be after restartGame()
let restartBtn = createElement('button', ['btn', 'btn-primary'], 'restartBtn', 'Restart!')
restartBtn.onclick = function () { restartGame() };
footDiv.appendChild(restartBtn)