let gridSections = document.querySelectorAll('.grid-section');
let currentPlayer = 'X'; 
let turnDisplay = document.querySelector('.turnDisplay');

const initialiseRestartButton = () => {
    const button = document.querySelector('.restartButton');
    button.addEventListener('click', resetBoard);
    return button;
};

// Define winning conditions using a 3x3 martix of arrays
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
    alert(`Game over! Player ${currentPlayer} wins!`);
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


turnDisplay = { textContent: '' };

 gridSections = [
    { textContent: '' }, { textContent: '' }, { textContent: '' },
    { textContent: '' }, { textContent: '' }, { textContent: '' },
    { textContent: '' }, { textContent: '' }, { textContent: '' }
];

let originalGridSections;

//jest.fn is used to create mock functions
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

jest.spyOn(document, 'querySelector').mockReturnValue(buttonMock);
jest.spyOn(document, 'querySelectorAll').mockReturnValue([sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock, sectionMock]);
window.alert = alertFake;

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

    //fake
    it('should switch currentPlayer from X to O', () => {
        const fakeSwitchPlayer = () => {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
          };
        currentPlayer = 'X'; 
        fakeSwitchPlayer();
        expect(currentPlayer).toBe('O');
    });

    //fake
    it('should switch currentPlayer from O to X', () => {
        const fakeSwitchPlayer = () => {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            turnDisplay.textContent = `Player ${currentPlayer}'s Turn`;
          };
          
        currentPlayer = 'O'; 
        fakeSwitchPlayer();
        expect(currentPlayer).toBe('X');
      });
});

describe('checkGameEnd function', () => {
    const mockGridSections = [
      { textContent: '' }, { textContent: '' }, { textContent: '' },
      { textContent: '' }, { textContent: '' }, { textContent: '' },
      { textContent: '' }, { textContent: '' }, { textContent: '' }
    ];
    jest.spyOn(document, 'querySelectorAll').mockReturnValue(mockGridSections);
  
    // Mock
    it('should return false when no winning condition is met', () => {
      expect(checkGameEnd()).toBe(false);
    });

    // Mock
    it('should return true when a winning condition is met', () => {
        gridSections = [
            { textContent: 'X' }, { textContent: 'X' }, { textContent: 'X' },
            { textContent: '' }, { textContent: '' }, { textContent: '' },
            { textContent: '' }, { textContent: '' }, { textContent: '' }
          ];
      mockGridSections[0].textContent = 'X';
      mockGridSections[1].textContent = 'X';
      mockGridSections[2].textContent = 'X';
  
      expect(checkGameEnd()).toBe(true);
    });
  });
  

describe("resetBoard function", () => {
    //Stub
    it('should call resetBoard when resetGame is called', () => {
       const resetBoardSpy = jest.fn(); 
       const originalResetBoard = resetBoard; 
       resetBoard = resetBoardSpy;
       resetGame();
       expect(resetBoardSpy).toHaveBeenCalled(); 
       resetBoard = originalResetBoard;
   });
})
describe("handleSectionClick function", () => {
    // Mock
    it('should add event listener to grid sections', () => {
        let handleSectionClick = jest.fn();
        let originalHandleSectionClick = handleSectionClick;
        
        handleSectionClick = handleSectionClick;

        const mockGridSections = Array.from({ length: 9 }, () => ({
            addEventListener: jest.fn(),
        }));

        mockGridSections.forEach(section => {
            section.addEventListener('click', handleSectionClick);
        });

        expect(mockGridSections[0].addEventListener).toHaveBeenCalled(); 
            handleSectionClick = originalHandleSectionClick;
    });
})



describe('Game functionality UI tests', () => {
    //Mock
    it('should add event listener to restart button', () => {
        initialiseRestartButton();
        expect(buttonMock.addEventListener).toHaveBeenCalled();
    });

    //Fake
    it('should call an alert indicating who won when the game ends', () => {
        checkGameEnd();
        expect(alertFake).toHaveBeenCalled();
    });
    
    // Fake
    it('should display a congratulatory message when the game ends', () => {
            checkGameEnd();
            expect(window.alert).toHaveBeenCalledWith(`Game over! Player ${currentPlayer} wins!`);
            });

    // Stub
    it('should reset the board when resetGame is called', () => {
        resetGame();
        gridSections.forEach(section => {
            expect(section.textContent).toBe('');
        });
        expect(currentPlayer).toBe('X');
        expect(turnDisplay.textContent).toBe(`Player ${currentPlayer}'s Turn`);
    });
});




