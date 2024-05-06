let gridSections = document.querySelectorAll('.grid-section');
let currentPlayer = 'X'; 
let turnDisplay = document.querySelector('.turnDisplay');
let winnerTimer;
let drawTimer;
let gameCompleted = false;
const dictionary = {"O": "Knots", "X": "Cross"};

// Define winning conditions
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

// Function to switch the player
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
    alert(message);
    turnDisplay.textContent = message;
    clearInterval(winnerTimer);
}

const drawAlert = () =>{
    const message = "Game over! It's a Draw!";
    alert(message);
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

const alertFake = jest.fn();
const resetBoardStub = jest.fn();

describe('switchPlayer', () => {
    it('should switch currentPlayer from X to O', () => {
        currentPlayer = 'X'; // Ensure currentPlayer is initialized before each test
        switchPlayer();
        expect(currentPlayer).toBe('O');
    });

    it('should switch currentPlayer from O to X', () => {
        currentPlayer = 'O'; // Ensure currentPlayer is initialized before each test
        switchPlayer();
        expect(currentPlayer).toBe('X');
    });
});

describe('checkForWinner', () => {
    beforeEach(() => {
        gridSections; // Ensure gridSections is initialized before each test
    });

    it('should return false when no winning condition is met', () => {
        gridSections = [
            { textContent: '' }, { textContent: '' }, { textContent: '' },
            { textContent: '' }, { textContent: '' }, { textContent: '' },
            { textContent: '' }, { textContent: '' }, { textContent: '' }
        ];
        let emptyGridState = ['', '', '', '', '', '', '', '', ''];
        expect(checkForWinner(emptyGridState)).toBe(false);
    });

    it('should return true when a winning condition is met', () => {
        gridSections = [
            { textContent: 'X' }, { textContent: 'X' }, { textContent: 'X' },
            { textContent: '' }, { textContent: '' }, { textContent: '' },
            { textContent: '' }, { textContent: '' }, { textContent: '' }
        ];
        let winningGridState = ['X', 'X', 'X', '', '', '', '', '', ''];
        expect(checkForWinner(winningGridState)).toBe(true);
    });
});

jest.spyOn(document, 'querySelector').mockReturnValue(buttonMock);
jest.spyOn(document, 'querySelectorAll').mockReturnValue([sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock]);
window.alert = alertFake;

describe('Game functionality UI tests', () => {

    it('should add event listener to button', () => {
        initialiseRestartButton();
        expect(buttonMock.addEventListener).toHaveBeenCalled();
    });

    it('should call alert when the game ends', () => {
        winnerAlert();
        expect(alertFake).toHaveBeenCalled();
    });

    it('should call resetBoard when resetGame is called', () => {
        const resetBoardSpy = jest.fn(); // Create a mock function
        const originalResetBoard = resetBoard; // Store the original resetBoard function
        
        // Replace resetBoard with the mock function
        resetBoard = resetBoardSpy;

        resetGame();

        expect(resetBoardSpy).toHaveBeenCalled(); // Expect the resetBoard function to have been called
        
        // Restore the original resetBoard function
        resetBoard = originalResetBoard;
    });

    it('should add event listener to grid sections', () => {
        let handleCellClick = jest.fn(); // Create a mock function
        let originalHandleCellClick = handleCellClick; // Store the original handleSectionClick function
        
        // Replace handleSectionClick with the mock function
        handleCellClick = handleCellClick;

        // Create mock grid sections with addEventListener method
        const mockGridSections = Array.from({ length: 9 }, () => ({
            addEventListener: jest.fn(),
        }));

        mockGridSections.forEach(section => {
            section.addEventListener('click', handleCellClick);
        });

        expect(mockGridSections[0].addEventListener).toHaveBeenCalled(); // Expect addEventListener to have been called on at least one grid section
        handleCellClick = originalHandleCellClick;
    });
        it('should display a congratulatory message when the game ends', () => {
            winnerAlert();
            expect(window.alert).toHaveBeenCalledWith(`Game over! ${dictionary[currentPlayer]} wins!`);
        });

        it('should reset the board when resetGame is called', () => {
            resetGame();
            gridSections.forEach(section => {
                expect(section.textContent).toBe('');
            });
            expect(currentPlayer).toBe('X');
            expect(turnDisplay.textContent).toBe(`${dictionary[currentPlayer]}'s Turn`);
        });
});

