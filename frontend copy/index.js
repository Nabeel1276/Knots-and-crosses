let gridSections = document.querySelectorAll('.grid-section');
let currentPlayer = 'X'; 
let turnDisplay = document.querySelector('.turnDisplay');

const initialiseRestartButton = () => {
    const button = document.querySelector('.restartButton');
    button.addEventListener('click', resetBoard);
    return button;
};

let winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

const switchPlayer = () => {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};



const checkGameEnd = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const combination = winningConditions[i];
        const symbols = combination.map(index => gridSections[index].textContent);
        const firstSymbol = symbols[0];
        if (firstSymbol && symbols.every(symbol => symbol === firstSymbol)) {
            return true; // Winning combination found
        }
    }
    return false; // No winning combination found
};

let resetBoard = () => {
    gridSections.forEach(section => {
        section.textContent = '';
    });
    currentPlayer = 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};

let resetGame = () => {
    resetBoard();
};

const handleSectionClick = (e) => {
    const gridSection = e.target;

    if (!gridSection.textContent) {
        gridSection.textContent = currentPlayer;

        if (checkGameEnd()) {
            alert(`Game over! Player ${currentPlayer} wins!`);
            resetGame();
        } else {
            switchPlayer();
        }
    }
};

// Add event listeners to grid sections
gridSections.forEach(section => {
    section.addEventListener('click', handleSectionClick);
});

initialiseRestartButton()
resetBoard()