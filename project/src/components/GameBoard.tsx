import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Palette } from 'lucide-react';
import HangmanDrawing from './HangmanDrawing';
import WordDisplay from './WordDisplay';
import Keyboard from './Keyboard';
import ThemeSelector from './ThemeSelector';
import { useGameStore } from '../store/gameStore';

const GameBoard: React.FC = () => {
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  const { 
    words, 
    currentWordIndex, 
    guessedLetters, 
    incorrectGuesses, 
    lives,
    status,
    currentRound,
    totalRounds,
    currentPlayer,
    resetGame,
    guessLetter,
    mode,
    nextRound,
    player1Name,
    player2Name,
    hangmanTheme,
    openModal,
    isModalOpen
  } = useGameStore();

  const currentWord = words[currentWordIndex] || '';
  const isGameActive = status === 'playing';
  const hasLost = lives <= 0;
  const isResultScreen = status === 'result';
  
  // Get wrong guessed letters
  const wrongGuesses = guessedLetters.filter(letter => 
    !currentWord.toLowerCase().includes(letter.toLowerCase())
  );
  
  // Check if the word has been guessed correctly
  const isWordGuessed = currentWord && 
    [...new Set(currentWord.toLowerCase())].every(letter => 
      guessedLetters.map(l => l.toLowerCase()).includes(letter.toLowerCase())
    );

  // Function to handle next word
  const handleNextWord = () => {
    if (mode === 'ai') {
      if (isWordGuessed) {
        // For AI mode when word is guessed correctly, use a special token
        guessLetter('_next_correct_');
      } else {
        // For AI mode when player lost, use a special token
        guessLetter('_next_');
      }
    } else if (mode === '1v1') {
      // For 1v1 mode, go to the next round
      nextRound();
    }
  };

  return (
    <motion.div 
      className="max-w-2xl mx-auto mt-8 bg-gray-800/90 rounded-xl shadow-xl p-6 backdrop-blur-sm border border-indigo-500/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <motion.button
            className="mr-4 text-gray-400 hover:text-white flex items-center"
            onClick={resetGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            Back
          </motion.button>
          <div className="text-white">
            <h2 className="text-xl font-bold">Round {mode === '1v1' ? Math.ceil(currentRound/2) : currentRound}/{totalRounds}</h2>
            <p className="text-gray-400">
              Lives: {lives} remaining
            </p>
          </div>
        </div>
        
        <div className="flex items-center">
          <motion.button
            className="mr-3 text-indigo-400 hover:text-indigo-300 bg-gray-800/80 p-2 rounded-lg"
            onClick={() => setShowThemeSelector(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Change theme"
          >
            <Palette className="w-5 h-5" />
          </motion.button>
          
          <div className="bg-gray-700 px-4 py-2 rounded-lg">
            <p className="text-white font-medium">
              {currentPlayer === 1 ? player1Name : player2Name}'s turn
            </p>
          </div>
        </div>
      </div>

      <HangmanDrawing incorrectGuesses={incorrectGuesses} />
      
      {/* Wrong guesses display */}
      {wrongGuesses.length > 0 && (
        <motion.div 
          className="mb-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-gray-400 mb-1 text-sm">Wrong guesses:</p>
          <div className="flex justify-center gap-1 flex-wrap">
            {wrongGuesses.map((letter, index) => (
              <span 
                key={index} 
                className="inline-block bg-red-900/50 text-red-300 px-2 py-1 rounded text-sm"
              >
                {letter.toUpperCase()}
              </span>
            ))}
          </div>
        </motion.div>
      )}
      
      {currentWord ? (
        <>
          <WordDisplay 
            word={currentWord} 
            guessedLetters={guessedLetters}
            showAnswer={hasLost}
          />
          
          {(hasLost || isWordGuessed) && (
            <motion.div
              className="text-center mt-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {hasLost && (
                <p className="text-red-400 mb-3">
                  The word was: <span className="font-bold">{currentWord}</span>
                </p>
              )}
              
              {isWordGuessed && !hasLost && (
                <p className="text-green-400 mb-3">
                  Congratulations! You guessed the word correctly!
                </p>
              )}
              
              <motion.button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center mx-auto"
                onClick={handleNextWord}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowRight className="w-4 h-4 mr-2" />
                {currentRound < (mode === '1v1' ? totalRounds * 2 : totalRounds) ? "Next Word" : "End Game"}
              </motion.button>
            </motion.div>
          )}
          
          <Keyboard 
            guessedLetters={guessedLetters} 
            currentWord={currentWord}
            disabled={Boolean(!isGameActive || hasLost || isWordGuessed)}
          />
        </>
      ) : (
        // Show this when there's no word to guess (modal was closed without submitting)
        <motion.div 
          className="text-center py-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl text-gray-300 mb-6">
            {mode === '1v1' ? 
              `${currentPlayer === 1 ? player1Name : player2Name}, please submit a word for your opponent to guess.` :
              'Please submit a word to start the game.'
            }
          </p>
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center mx-auto"
            onClick={openModal}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Word
          </motion.button>
        </motion.div>
      )}
      
      {/* Theme selector modal */}
      <AnimatePresence>
        {showThemeSelector && (
          <ThemeSelector onClose={() => setShowThemeSelector(false)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default GameBoard;