import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, RotateCcw, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import ModeSelector from './ModeSelector';
import GameBoard from './GameBoard';
import ScoreBoard from './ScoreBoard';
import WordSubmissionModal from './WordSubmissionModal';
import LottieHangingAnimation from './LottieHangingAnimation';

const GameManager: React.FC = () => {
  const { 
    mode, 
    status, 
    words, 
    currentWordIndex,
    resetGame, 
    switchRoles, 
    startNewRound,
    rounds,
    currentRound,
    totalRounds,
    nextRound,
    player1Name,
    player2Name,
    currentPlayer,
    hangmanTheme,
    isModalOpen,
    openModal
  } = useGameStore();

  const renderGameOverContent = () => {
    if (status === 'end') {
      if (mode === 'ai') {
        // AI mode - show player's score
        const totalCorrect = rounds[0];
        const messageBasedOnScore = totalCorrect >= Math.floor(totalRounds * 0.8) 
          ? 'Excellent job!' 
          : totalCorrect >= Math.floor(totalRounds * 0.5) 
            ? 'Well done!' 
            : 'Better luck next time!';
            
        return (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
            <p className="text-xl text-gray-300 mb-6">
              You correctly guessed {totalCorrect} out of {totalRounds} words. {messageBasedOnScore}
            </p>
            <div className="flex justify-center space-x-4">
              <motion.button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center"
                onClick={resetGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </motion.button>
            </div>
          </motion.div>
        );
      } else {
        // 1v1 mode - determine the winner
        const player1Score = rounds[0];
        const player2Score = rounds[1];
        let resultMessage;
        
        if (player1Score > player2Score) {
          resultMessage = `${player1Name} wins!`;
        } else if (player2Score > player1Score) {
          resultMessage = `${player2Name} wins!`;
        } else {
          resultMessage = "It's a tie!";
        }
        
        return (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="mb-2">
              <LottieHangingAnimation theme={hangmanTheme} width={150} height={150} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Game Over!</h2>
            <div className="bg-gray-800/80 p-6 rounded-xl mb-6 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Final Score</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-lg text-gray-300">{player1Name}:</span>
                <span className="text-xl font-bold text-indigo-400">{player1Score} points</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg text-gray-300">{player2Name}:</span>
                <span className="text-xl font-bold text-green-400">{player2Score} points</span>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-xl font-bold text-yellow-300">{resultMessage}</p>
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <motion.button
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center"
                onClick={resetGame}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Play Again
              </motion.button>
            </div>
          </motion.div>
        );
      }
    }
    
    if (status === 'result_fail' || status === 'result_success') {
      // Show the result screen with a "Next" button
      const currentWord = words[currentWordIndex] || '';
      const isSuccess = status === 'result_success';
      
      return (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Round {mode === '1v1' ? Math.ceil(currentRound/2) : currentRound} Result
          </h2>
          
          {isSuccess ? (
            <p className="text-lg text-green-400 mb-6">
              Congratulations! You guessed the word correctly!
            </p>
          ) : (
            <>
              <p className="text-lg text-red-400 mb-2">
                The word was: <span className="font-bold">{currentWord}</span>
              </p>
              
              {/* Show hanging animation for failed attempts */}
              <div className="mb-4">
                <LottieHangingAnimation theme={hangmanTheme} width={200} height={200} />
              </div>
              
              <p className="text-yellow-400 mb-4">
                {currentPlayer === 1 ? player2Name : player1Name}'s turn is next!
              </p>
            </>
          )}
          
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg flex items-center mx-auto"
            onClick={nextRound}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Next Round
          </motion.button>
        </motion.div>
      );
    }
    
    if (status === 'switch') {
      return (
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">
            Next Round!
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Time to swap roles! The guesser will now provide a word, and vice versa.
          </p>
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center mx-auto"
            onClick={switchRoles}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowRight className="w-5 h-5 mr-2" />
            Continue
          </motion.button>
        </motion.div>
      );
    }
    
    return null;
  };

  if (!mode) {
    return <ModeSelector />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <motion.button
          className="text-gray-400 hover:text-white flex items-center"
          onClick={resetGame}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Menu
        </motion.button>
        <motion.h1 
          className="text-4xl font-bold text-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Hangman
        </motion.h1>
        <div className="w-24" /> {/* Spacer for centering */}
      </div>
      
      <WordSubmissionModal />
      
      <AnimatePresence mode="wait">
        {(status === 'playing' && words.length > 0) ? (
          <motion.div
            key="gameBoard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ScoreBoard />
            <GameBoard />
          </motion.div>
        ) : (status === 'end' || status === 'switch' || status === 'result_fail' || status === 'result_success') ? (
          <motion.div
            key="gameOver"
            className="max-w-md mx-auto mt-16 bg-gray-800 p-8 rounded-xl shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {renderGameOverContent()}
          </motion.div>
        ) : words.length === 0 && mode === '1v1' ? (
          <motion.div
            key="waiting"
            className="max-w-md mx-auto mt-16 bg-gray-800 p-8 rounded-xl shadow-xl text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Waiting for Word</h2>
            <p className="text-gray-300 mb-6">
              The current player needs to submit a word for the other player to guess.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default GameManager;