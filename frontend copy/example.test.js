// Define the gridSections, currentPlayer, turnDisplay, and winningConditions as constants
let gridSections = document.querySelectorAll('.grid-section');
let currentPlayer = 'X'; 
let turnDisplay = document.querySelector('.turnDisplay');

// Function to initialize the restart button and add event listener
const initialiseRestartButton = () => {
    const button = document.querySelector('.restartButton');
    button.addEventListener('click', resetBoard);
    return button;
};

// Define winning conditions
let winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to switch the player
const switchPlayer = () => {
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};



// Function to check if the game has ended
const checkGameEnd = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const combination = winningConditions[i];
        const symbols = combination.map(index => gridSections[index].textContent);
        const firstSymbol = symbols[0];
        if (firstSymbol && symbols.every(symbol => symbol === firstSymbol)) {
            return true; // Winning combination found
        }
    }
    alert(`Game over! Player ${currentPlayer} wins!`);
    return false; // No winning combination found
};

// Function to reset the board
let resetBoard = () => {
    gridSections.forEach(section => {
        section.textContent = '';
    });
    currentPlayer = 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
};

// Function to reset the entire game
let resetGame = () => {
    resetBoard();
};

// Function to handle a click on a grid section
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

//logic above

turnDisplay = { textContent: '' };

 gridSections = [
    { textContent: '' }, { textContent: '' }, { textContent: '' },
    { textContent: '' }, { textContent: '' }, { textContent: '' },
    { textContent: '' }, { textContent: '' }, { textContent: '' }
];

let originalGridSections;

beforeEach(() => {
    originalGridSections = gridSections;
    gridSections = gridSections;
});

afterEach(() => {
    gridSections = originalGridSections; // Restore original gridSections after each test
});

const buttonMock = {
    addEventListener: jest.fn()
};

const sectionMock = {
    addEventListener: jest.fn(),
    textContent: ''
};

// Fake
const alertFake = jest.fn();

// Stub
const resetBoardStub = jest.fn();
describe('Tic Tac Toe Game', () => {
    describe('switchPlayer function', () => {
        it('should switch currentPlayer from X to O', () => {
            currentPlayer = 'X'; 
            switchPlayer();
            expect(currentPlayer).toBe('O');
        });

        it('should switch currentPlayer from O to X', () => {
            currentPlayer = 'O'; 
            switchPlayer();
            expect(currentPlayer).toBe('X');
        });
    });

    describe('checkGameEnd function', () => {
        it('should return false when no winning condition is met', () => {
            const emptyGridState = ['', '', '', '', '', '', '', '', ''];
            expect(checkGameEnd(emptyGridState)).toBe(false);
        });
        
        it('should return true when a winning condition is met', () => {
            const winningGridState = ['X', 'X', 'X', '', '', '', '', '', ''];
            expect(checkGameEnd(winningGridState)).toBe(true);
        });
    });

    describe("resetBoard function", () => {
        it('should reset the board and current player', () => {
            currentPlayer = 'O';
            resetBoard();
            gridSections.forEach(section => {
                expect(section.textContent).toBe('');
            });
            expect(currentPlayer).toBe('X');
        });
    });

    describe("handleSectionClick function", () => {
        it('should update grid section with current player symbol and switch player', () => {
            const sectionMock = { textContent: '' };
            const e = { target: sectionMock };

            handleSectionClick(e);

            expect(sectionMock.textContent).toBe('X');
            expect(currentPlayer).toBe('O');
        });

        it('should not update grid section if already filled', () => {
            const sectionMock = { textContent: 'X' };
            const e = { target: sectionMock };
            const originalCurrentPlayer = currentPlayer;

            handleSectionClick(e);

            expect(sectionMock.textContent).toBe('X');
            expect(currentPlayer).toBe(originalCurrentPlayer);
        });
    });

    describe("Game functionality UI tests", () => {
        it('should add event listener to restart button', () => {
            initialiseRestartButton();
            expect(buttonMock.addEventListener).toHaveBeenCalled();
        });

        it('should alert when the game ends', () => {
            jest.spyOn(window, 'alert').mockImplementation(() => {}); // Mock alert function
            checkGameEnd();
            expect(window.alert).toHaveBeenCalled();
        });

        it('should reset the game when resetGame is called', () => {
            resetGame();
            gridSections.forEach(section => {
                expect(section.textContent).toBe('');
            });
            expect(currentPlayer).toBe('X');
        });
    });
});
