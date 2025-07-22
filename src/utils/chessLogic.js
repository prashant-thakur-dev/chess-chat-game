// Basic chess move validation
export const isValidMove = (board, fromRow, fromCol, toRow, toCol, currentPlayer) => {
  // Basic bounds checking
  if (toRow < 0 || toRow > 7 || toCol < 0 || toCol > 7) return false;
  
  const piece = board[fromRow][fromCol];
  if (!piece) return false;
  
  // Check if piece belongs to current player
  const isWhitePiece = piece === piece.toUpperCase();
  if ((currentPlayer === 'white' && !isWhitePiece) || (currentPlayer === 'black' && isWhitePiece)) {
    return false;
  }
  
  // Can't capture own piece
  const targetPiece = board[toRow][toCol];
  if (targetPiece) {
    const isTargetWhite = targetPiece === targetPiece.toUpperCase();
    if ((isWhitePiece && isTargetWhite) || (!isWhitePiece && !isTargetWhite)) {
      return false;
    }
  }
  
  const rowDiff = toRow - fromRow;
  const colDiff = toCol - fromCol;
  const absRowDiff = Math.abs(rowDiff);
  const absColDiff = Math.abs(colDiff);
  
  // Basic piece movement validation (simplified)
  switch (piece.toLowerCase()) {
    case 'p': // Pawn
      return validatePawnMove(board, fromRow, fromCol, toRow, toCol, isWhitePiece);
    case 'r': // Rook
      return validateRookMove(board, fromRow, fromCol, toRow, toCol);
    case 'n': // Knight
      return (absRowDiff === 2 && absColDiff === 1) || (absRowDiff === 1 && absColDiff === 2);
    case 'b': // Bishop
      return validateBishopMove(board, fromRow, fromCol, toRow, toCol);
    case 'q': // Queen
      return validateQueenMove(board, fromRow, fromCol, toRow, toCol);
    case 'k': // King
      return absRowDiff <= 1 && absColDiff <= 1;
    default:
      return false;
  }
};

const validatePawnMove = (board, fromRow, fromCol, toRow, toCol, isWhite) => {
  const direction = isWhite ? -1 : 1;
  const startRow = isWhite ? 6 : 1;
  const rowDiff = toRow - fromRow;
  const colDiff = Math.abs(toCol - fromCol);
  
  // Forward move
  if (colDiff === 0) {
    if (board[toRow][toCol]) return false; // Can't move forward to occupied square
    if (rowDiff === direction) return true; // Single step
    if (rowDiff === 2 * direction && fromRow === startRow && !board[fromRow + direction][fromCol]) {
      return true; // Double step from start
    }
  }
  
  // Diagonal capture
  if (colDiff === 1 && rowDiff === direction) {
    return board[toRow][toCol] !== null; // Must capture
  }
  
  return false;
};

const validateRookMove = (board, fromRow, fromCol, toRow, toCol) => {
  if (fromRow !== toRow && fromCol !== toCol) return false; // Must be horizontal or vertical
  
  return isPathClear(board, fromRow, fromCol, toRow, toCol);
};

const validateBishopMove = (board, fromRow, fromCol, toRow, toCol) => {
  const rowDiff = Math.abs(toRow - fromRow);
  const colDiff = Math.abs(toCol - fromCol);
  
  if (rowDiff !== colDiff) return false; // Must be diagonal
  
  return isPathClear(board, fromRow, fromCol, toRow, toCol);
};

const validateQueenMove = (board, fromRow, fromCol, toRow, toCol) => {
  return validateRookMove(board, fromRow, fromCol, toRow, toCol) || 
         validateBishopMove(board, fromRow, fromCol, toRow, toCol);
};

const isPathClear = (board, fromRow, fromCol, toRow, toCol) => {
  const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
  const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
  
  let currentRow = fromRow + rowStep;
  let currentCol = fromCol + colStep;
  
  while (currentRow !== toRow || currentCol !== toCol) {
    if (board[currentRow][currentCol]) return false;
    currentRow += rowStep;
    currentCol += colStep;
  }
  
  return true;
};

// Make a move on the board
export const makeMove = (board, fromRow, fromCol, toRow, toCol) => {
  const newBoard = board.map(row => [...row]);
  const piece = newBoard[fromRow][fromCol];
  
  newBoard[toRow][toCol] = piece;
  newBoard[fromRow][fromCol] = null;
  
  return newBoard;
};

// Check if a position is under attack
export const isSquareUnderAttack = (board, row, col, byPlayer) => {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const piece = board[r][c];
      if (!piece) continue;
      
      const isPieceWhite = piece === piece.toUpperCase();
      const isAttackingPlayer = (byPlayer === 'white' && isPieceWhite) || (byPlayer === 'black' && !isPieceWhite);
      
      if (isAttackingPlayer && isValidMove(board, r, c, row, col, byPlayer)) {
        return true;
      }
    }
  }
  return false;
};

// Find king position
export const findKing = (board, isWhite) => {
  const king = isWhite ? 'K' : 'k';
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === king) {
        return [row, col];
      }
    }
  }
  return null;
};