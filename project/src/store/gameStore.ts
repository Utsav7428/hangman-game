import { create } from 'zustand';
import { GameState, GameActions, GameMode, GameStatus, PlayerRole } from '../types';
import { getRandomWords } from '../utils/wordBank';

const MAX_LIVES = 6;
const DEFAULT_ROUNDS_PER_GAME = 5;

const initialState: GameState = {
  mode: null,
  status: 'setup',
  currentPlayer: 1,
  player1Role: 'wordProvider',
  player2Role: 'guesser',
  player1Name: 'Player 1',
  player2Name: 'Player 2',
  currentWordIndex: 0,
  words: [],
  guessedLetters: [],
  incorrectGuesses: 0,
  lives: MAX_LIVES,
  rounds: [0, 0],
  currentRound: 1,
  totalRounds: DEFAULT_ROUNDS_PER_GAME,
  isModalOpen: false,
  hangmanTheme: 'default',
};

export const useGameStore = create<GameState & GameActions>((set, get) => ({
  ...initialState,

  setMode: (mode: GameMode) => {
    set({ mode });
    if (mode === 'ai') {
      const randomWord = getRandomWords(1);
      set({ status: 'playing', words: randomWord });
    } else {
      set({ isModalOpen: true });
    }
  },

  setStatus: (status: GameStatus) => set({ status }),
  
  setTotalRounds: (rounds: number) => set({ totalRounds: rounds }),
  
  setPlayerNames: (player1Name: string, player2Name: string) => set({ player1Name, player2Name }),
  
  setHangmanTheme: (theme: string) => set({ hangmanTheme: theme }),

  submitWords: (words: string[]) => {
    set({ 
      words,
      status: 'playing',
      isModalOpen: false
    });
  },

  guessLetter: (letter: string) => {
    const { 
      words, 
      currentWordIndex, 
      guessedLetters, 
      lives,
      rounds,
      currentPlayer,
      mode
    } = get();

    const currentWord = words[currentWordIndex];
    const playerIndex = currentPlayer - 1;
    
    // Special case for the "Next" button functionality
    if (letter === '_next_' || letter === '_next_correct_') {
      const effectiveTotalRounds = mode === '1v1' ? get().totalRounds * 2 : get().totalRounds;
      
      // If the word was guessed correctly, update the score
      if (letter === '_next_correct_') {
        const newRounds = [...rounds];
        newRounds[playerIndex] += 1;
        set({ rounds: newRounds });
      }
      
      if (get().currentRound < effectiveTotalRounds) {
        // If not the last round, get a new word
        const nextWord = getRandomWords(1);
        set({
          words: nextWord,
          guessedLetters: [],
          incorrectGuesses: 0,
          lives: MAX_LIVES,
          currentRound: get().currentRound + 1
        });
      } else {
        // If it's the last round, end the game with current scores
        const newRounds = [...rounds];
        set({ status: 'end', rounds: newRounds });
      }
      return;
    }
    
    const newGuessedLetters = [...guessedLetters, letter];
    
    const isCorrectGuess = currentWord.toLowerCase().includes(letter.toLowerCase());
    const newIncorrectGuesses = isCorrectGuess 
      ? get().incorrectGuesses 
      : get().incorrectGuesses + 1;
    
    const newLives = isCorrectGuess ? lives : lives - 1;

    const isWordGuessed = [...currentWord.toLowerCase()].every(
      letter => newGuessedLetters.includes(letter.toLowerCase()) || letter === ' '
    );

    set({ guessedLetters: newGuessedLetters, incorrectGuesses: newIncorrectGuesses, lives: newLives });

    if (isWordGuessed) {
      const newRounds = [...rounds];
      newRounds[playerIndex] += 1;
      
      const effectiveTotalRounds = mode === '1v1' ? get().totalRounds * 2 : get().totalRounds;
      
      if (mode === '1v1') {
        // In 1v1 mode, when a player guesses correctly, show the result screen
        set({
          status: 'result_success',
          rounds: newRounds
        });
      } else if (mode === 'ai') {
        // For AI mode, we'll wait for the user to click the "Next" button
        // The button will trigger the _next_correct_ action
      }
      
      if (get().currentRound >= effectiveTotalRounds) {
        set({ status: 'end', rounds: newRounds });
      }
    } else if (newLives <= 0) {
      const effectiveTotalRounds = mode === '1v1' ? get().totalRounds * 2 : get().totalRounds;
      
      if (mode === '1v1') {
        // In 1v1 mode, when a player loses, we don't award points to the other player
        // We just show the result and wait for the user to click "Next"
        
        // Set a special status to show the result and next button
        set({ status: 'result_fail' });
      }
      // For AI mode, we'll wait for the user to click the "Next" button
    }
  },

  startNewRound: () => {
    set({
      currentWordIndex: 0,
      guessedLetters: [],
      incorrectGuesses: 0,
      lives: MAX_LIVES,
      status: 'playing',
      currentRound: 1
    });
  },
  
  nextRound: () => {
    const { mode, currentRound, totalRounds } = get();
    const effectiveTotalRounds = mode === '1v1' ? totalRounds * 2 : totalRounds;
    
    if (currentRound < effectiveTotalRounds) {
      // If not the last round, prepare for the next round
      if (mode === '1v1') {
        // For 1v1 mode, switch to the other player
        set({
          status: 'switch',
          guessedLetters: [],
          incorrectGuesses: 0,
          lives: MAX_LIVES
        });
      } else {
        // For AI mode, get a new word
        const nextWord = getRandomWords(1);
        set({
          words: nextWord,
          guessedLetters: [],
          incorrectGuesses: 0,
          lives: MAX_LIVES,
          currentRound: get().currentRound + 1
        });
      }
    } else {
      // If it's the last round, end the game
      set({ status: 'end' });
    }
  },

  resetGame: () => {
    set({
      ...initialState
    });
  },

  switchRoles: () => {
    const { player1Role, player2Role, currentPlayer, currentRound } = get();
    
    set({
      player1Role: player1Role === 'wordProvider' ? 'guesser' : 'wordProvider',
      player2Role: player2Role === 'wordProvider' ? 'guesser' : 'wordProvider',
      currentPlayer: currentPlayer === 1 ? 2 : 1,
      isModalOpen: true,
      words: [],
      currentWordIndex: 0,
      guessedLetters: [],
      incorrectGuesses: 0,
      lives: MAX_LIVES,
      currentRound: currentRound + 1
    });
  },

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false })
}));