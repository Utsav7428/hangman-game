export type GameMode = 'ai' | '1v1';
export type GameStatus = 'setup' | 'playing' | 'won' | 'lost' | 'switch' | 'end' | 'result_fail' | 'result_success';
export type PlayerRole = 'wordProvider' | 'guesser';

export interface GameState {
  mode: GameMode | null;
  status: GameStatus;
  currentPlayer: 1 | 2;
  player1Role: PlayerRole;
  player2Role: PlayerRole;
  player1Name: string;
  player2Name: string;
  currentWordIndex: number;
  words: string[];
  guessedLetters: string[];
  incorrectGuesses: number;
  lives: number;
  rounds: number[];
  currentRound: number;
  totalRounds: number;
  isModalOpen: boolean;
  hangmanTheme: string;
}

export interface GameActions {
  setMode: (mode: GameMode) => void;
  setStatus: (status: GameStatus) => void;
  setTotalRounds: (rounds: number) => void;
  setPlayerNames: (player1Name: string, player2Name: string) => void;
  setHangmanTheme: (theme: string) => void;
  submitWords: (words: string[]) => void;
  guessLetter: (letter: string) => void;
  startNewRound: () => void;
  nextRound: () => void;
  resetGame: () => void;
  switchRoles: () => void;
  openModal: () => void;
  closeModal: () => void;
}