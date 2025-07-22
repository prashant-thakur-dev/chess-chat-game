// Chess piece symbols
export const PIECE_SYMBOLS = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

// Initial chess board setup
export const INITIAL_BOARD = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

// Piece values for basic evaluation
export const PIECE_VALUES = {
  'p': 1, 'P': 1,
  'n': 3, 'N': 3,
  'b': 3, 'B': 3,
  'r': 5, 'R': 5,
  'q': 9, 'Q': 9,
  'k': 0, 'K': 0
};

// Game states
export const GAME_STATES = {
  PLAYING: 'playing',
  CHECK: 'check',
  CHECKMATE: 'checkmate',
  STALEMATE: 'stalemate',
  DRAW: 'draw',
  WHITE_WINS: 'white-wins',
  BLACK_WINS: 'black-wins',
  TIMEOUT_WHITE: 'timeout-white-wins',
  TIMEOUT_BLACK: 'timeout-black-wins'
};

// Responsive breakpoints
export const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
  DESKTOP: 1280
};