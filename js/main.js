//everything goes in this div so that elements appear cleaner in dev tools
//if put straight into body, everything is created after script tag
ttt_App = document.getElementById('App')
ttt_App.className='container'

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

//function to check for win

//function to display X or O for clicked column
//essentially all logic for each box
let playerOne = true
function clickBox(col) {
    if (playerOne === true && col.innerHTML === '') {
        col.innerHTML = '<h2>X</h2>';
        subHead.innerHTML = 'O\'s turn'
        col.className += ' true'
        playerOne = false;
    } else if (playerOne === false && col.innerHTML === ''){
        col.innerHTML = '<h2>O</h2>';
        subHead.innerHTML = 'X\'s turn'
        col.className += ' true'
        playerOne = true;
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
        col.addEventListener('click', function() {clickBox(col)})
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
    }
    state = 0;
}

//creating restart button. has to be after restartGame()
let restartBtn = createElement('button', ['btn', 'btn-primary'], 'restartBtn', 'Restart!')
restartBtn.onclick  = function() {restartGame()};
footDiv.appendChild(restartBtn)
