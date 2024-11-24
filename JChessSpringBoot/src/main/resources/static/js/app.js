let selectedSquare = null; // To track the selected square
let board = []; // Chessboard state
let currentPlayer = 'white'; // Track the current player: 'white' or 'black'

// Positions of both kings for check detection
let whiteKingPosition = [7, 4]; // White king's position (initial position: 7, 4)
let blackKingPosition = [0, 4]; // Black king's position (initial position: 0, 4)

// Initialize the chessboard state
function initializeBoard() {
    board = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], // Black's back row
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // Black's pawns
        ['', '', '', '', '', '', '', ''],         // Empty rows
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // White's pawns
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'], // White's back row
    ];
}

// Render the chessboard with interactive functionality
function renderChessboardWithInteraction() {
    const chessboard = document.getElementById('chessboard');
    chessboard.innerHTML = ''; // Clear any existing content

    board.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const square = document.createElement('div');
            square.className = `square ${(rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark'}`;
            square.dataset.row = rowIndex; // Store row index
            square.dataset.col = colIndex; // Store column index

            if (cell !== '') {
                const pieceImage = document.createElement('img');
                pieceImage.src = `images/${getPieceImage(cell)}`;
                pieceImage.alt = cell; // Accessibility
                square.appendChild(pieceImage);
            }

            // Add click event listener for movement
            square.addEventListener('click', () => handleSquareClick(rowIndex, colIndex));

            chessboard.appendChild(square);
        });
    });

    // Display current player
    const playerTurnDisplay = document.getElementById('player-turn');
    playerTurnDisplay.textContent = `Current Turn: ${currentPlayer === 'white' ? 'White' : 'Black'}`;

    // Check for check and display message
    const checkMessage = document.getElementById('check-message');
    if (isCheck(currentPlayer === 'white' ? 'white' : 'black')) {
        checkMessage.textContent = `${currentPlayer === 'white' ? 'White' : 'Black'} King is in Check!`;
    } else {
        checkMessage.textContent = '';
    }
}

// Handle square clicks for movement
function handleSquareClick(row, col) {
    const clickedPiece = board[row][col];

    if (selectedSquare) {
        const [selectedRow, selectedCol] = selectedSquare;
        const selectedPiece = board[selectedRow][selectedCol];

        if (isValidMove(selectedPiece, selectedRow, selectedCol, row, col)) {
            // Ensure the correct player is moving their piece
            if (currentPlayer === 'white' && selectedPiece === selectedPiece.toUpperCase() ||
                currentPlayer === 'black' && selectedPiece === selectedPiece.toLowerCase()) {
                // Move the piece
                board[row][col] = selectedPiece;
                board[selectedRow][selectedCol] = '';
                selectedSquare = null; // Reset selection

                // Switch turns
                currentPlayer = currentPlayer === 'white' ? 'black' : 'white';

                renderChessboardWithInteraction(); // Re-render the board
            } else {
                alert(`It's ${currentPlayer}'s turn!`);
                selectedSquare = null; // Reset selection if move is invalid
            }
        } else {
            selectedSquare = null; // Reset selection if move is invalid
        }
    } else if (clickedPiece !== '') {
        // Select the square if it's not empty and belongs to the current player
        if (currentPlayer === 'white' && clickedPiece === clickedPiece.toUpperCase() ||
            currentPlayer === 'black' && clickedPiece === clickedPiece.toLowerCase()) {
            selectedSquare = [row, col];
        } else {
            alert(`It's ${currentPlayer}'s turn!`);
        }
    }
}

// Check if the move is valid
function isValidMove(piece, fromRow, fromCol, toRow, toCol) {
    const targetSquare = board[toRow][toCol];

    // Check if the target square contains a piece of the same color
    if (
        (piece === piece.toUpperCase() && targetSquare === targetSquare.toUpperCase() && targetSquare !== '') || // White capturing white
        (piece === piece.toLowerCase() && targetSquare === targetSquare.toLowerCase() && targetSquare !== '')    // Black capturing black
    ) {
        return false; // Cannot capture same-color pieces
    }

    const isOpponentPiece = targetSquare !== '' && targetSquare.toLowerCase() !== piece.toLowerCase();
    const isPathClear = (fromRow, fromCol, toRow, toCol) => checkPathClear(fromRow, fromCol, toRow, toCol);

    switch (piece.toLowerCase()) {
        case 'p': // Pawn
            const direction = piece === 'P' ? -1 : 1; // White moves up (-1), Black moves down (+1)
            const startRow = piece === 'P' ? 6 : 1;

            // Regular movement (forward one square)
            if (toCol === fromCol && targetSquare === '') {
                if (toRow === fromRow + direction) return true; // Single step
                if (fromRow === startRow && toRow === fromRow + 2 * direction && board[fromRow + direction][toCol] === '') {
                    return true; // Double step
                }
            }

            // Capturing diagonally (including pawns)
            if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + direction) {
                const targetSquare = board[toRow][toCol];
                const isOpponentPiece = (piece === 'P' && targetSquare === 'p') || (piece === 'p' && targetSquare === 'P');

                if (isOpponentPiece) {
                    return true; // Capture diagonally
                }
            }
            return false;

        case 'r': // Rook
            return (fromRow === toRow || fromCol === toCol) && isPathClear(fromRow, fromCol, toRow, toCol);

        case 'n': // Knight
            return Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1 ||
                Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2;

        case 'b': // Bishop
            return Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol) && isPathClear(fromRow, fromCol, toRow, toCol);

        case 'q': // Queen
            return (fromRow === toRow || fromCol === toCol ||
                    Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) &&
                isPathClear(fromRow, fromCol, toRow, toCol);

        case 'k': // King
            return Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1;

        default:
            return false;
    }
}

// Check if the path between two squares is clear (for rook, bishop, and queen)
function checkPathClear(fromRow, fromCol, toRow, toCol) {
    const rowStep = Math.sign(toRow - fromRow);
    const colStep = Math.sign(toCol - fromCol);

    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;

    while (currentRow !== toRow || currentCol !== toCol) {
        if (board[currentRow][currentCol] !== '') {
            return false; // Path is blocked by another piece
        }
        currentRow += rowStep;
        currentCol += colStep;
    }

    return true;
}

// Check if the king of the specified color is in check
function isCheck(color) {
    const kingPosition = color === 'white' ? whiteKingPosition : blackKingPosition;
    const opponentColor = color === 'white' ? 'black' : 'white';

    // Check if any opponent's piece can attack the king
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const piece = board[row][col];
            if (piece !== '' && (piece === piece.toLowerCase() && opponentColor === 'white') ||
                (piece === piece.toUpperCase() && opponentColor === 'black')) {
                if (isValidMoveForCheck(piece, row, col, kingPosition[0], kingPosition[1])) {
                    return true; // King is in check
                }
            }
        }
    }

    return false; // King is not in check
}

// Check if a move results in a check on the king
function isValidMoveForCheck(piece, fromRow, fromCol, toRow, toCol) {
    const targetSquare = board[toRow][toCol];
    if (
        (piece === 'p' || piece === 'P') && Math.abs(fromCol - toCol) === 1 && Math.abs(fromRow - toRow) === 1
    ) {
        return targetSquare === '' || (targetSquare.toLowerCase() !== piece.toLowerCase());
    }

    if (piece === 'r' || piece === 'R') {
        return (fromRow === toRow || fromCol === toCol);
    }

    if (piece === 'b' || piece === 'B') {
        return Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol);
    }

    if (piece === 'q' || piece === 'Q') {
        return (fromRow === toRow || fromCol === toCol || Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol));
    }

    if (piece === 'n' || piece === 'N') {
        return Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1 || Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2;
    }

    if (piece === 'k' || piece === 'K') {
        return Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1;
    }

    return false;
}

// Map chess piece codes to image file names
function getPieceImage(piece) {
    const pieceMap = {
        'K': 'white_king.png',
        'Q': 'white_queen.png',
        'R': 'white_rook.png',
        'B': 'white_bishop.png',
        'N': 'white_knight.png',
        'P': 'white_pawn.png',
        'k': 'black_king.png',
        'q': 'black_queen.png',
        'r': 'black_rook.png',
        'b': 'black_bishop.png',
        'n': 'black_knight.png',
        'p': 'black_pawn.png',
    };

    return pieceMap[piece] || '';
}

// HTML to display the chessboard and the check message
document.addEventListener('DOMContentLoaded', () => {
    initializeBoard(); // Set up the initial board state
    renderChessboardWithInteraction(); // Display the board
});
