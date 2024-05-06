let gridSections = document.querySelectorAll('.grid-section');
let currentPlayer = 'X'; 
let turnDisplay = document.querySelector('.turnDisplay');
let winnerTimer;
let drawTimer;
let gameCompleted = false;
const dictionary = {"O": "Knots", "X": "Cross"};

let winningConditionsList = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];
const isGameCompleted = () => {
    // check if game is completed by checking if any available cells remaining
    const emptyCells = [];
    for (let i = 0; i < gridSections.length; i++) {
        if (gridSections[i].innerHTML === "") {
            emptyCells.push(gridSections[i]);
        }
    }
    if(emptyCells.length == 0){
        gameCompleted = true;
        drawTimer = setInterval(drawAlert, 300);
    }
}

const switchPlayer = () => {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    turnDisplay.textContent = `${dictionary[currentPlayer]}'s Turn`;
};


const checkForWinner = () => {
    for (let i = 0; i < winningConditionsList.length; i++) {
        const combination = winningConditionsList[i];
        const symbols = combination.map(index => gridSections[index].textContent);
        const firstSymbol = symbols[0];
        if (firstSymbol && symbols.every(symbol => symbol === firstSymbol)) {
            // we have a winning combination
            alert(`Game over! Player ${currentPlayer} wins!`);
            return true;
        }
    }
    return false; // No winning combination found
};

const handleCellClick = (e) => {
    if(!gameCompleted) {
        const gridSection = e.target;
        if (!gridSection.textContent) {
            let a = gridSection.textContent = currentPlayer;
    
            if (checkForWinner()) {
                winnerTimer = setInterval(winnerAlert, 300);
                gameCompleted = true;
            } else {
                switchPlayer();
                isGameCompleted();
            }
        }        
    }
};

const winnerAlert = () =>{
    const message = `Game over! ${dictionary[currentPlayer]} wins!`;
    turnDisplay.textContent = message;
    clearInterval(winnerTimer);
}

const drawAlert = () =>{
    const message = "Game over! It's a Draw!";
    turnDisplay.textContent = message;
    clearInterval(drawTimer);
}

const initialiseRestartButton = () => {
    const button = document.querySelector('.restartButton');
    button.addEventListener('click', resetGame);
};

let resetBoard = () => {
    gridSections.forEach(section => {
        section.textContent = '';
    });
    currentPlayer = 'X';
    turnDisplay.textContent = `${dictionary[currentPlayer]}'s Turn`;
};

let resetGame = () => {
    gameCompleted = false;
    resetBoard();
};

const initialiseGame = () => {
    initialiseRestartButton()
    resetBoard()
}

// Add event listeners to grid sections
gridSections.forEach(section => {
    section.addEventListener('click', handleCellClick);
});

initialiseGame();

module.exports = {
    initialiseGame,
};