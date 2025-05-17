import React from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface KeyboardProps {
  guessedLetters: string[];
  currentWord: string;
  disabled: boolean;
}

const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, currentWord, disabled }) => {
  const guessLetter = useGameStore(state => state.guessLetter);
  
  // Define the keyboard layout
  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  const handleKeyClick = (letter: string) => {
    if (disabled || guessedLetters.includes(letter.toLowerCase())) return;
    guessLetter(letter.toLowerCase());
  };

  // Determine if a letter is in the current word
  const isLetterInWord = (letter: string): boolean => {
    return currentWord.toLowerCase().includes(letter.toLowerCase());
  };

  // Get the status of a key
  const getKeyStatus = (letter: string): 'correct' | 'incorrect' | 'unused' => {
    const lowerLetter = letter.toLowerCase();
    if (guessedLetters.includes(lowerLetter)) {
      return isLetterInWord(lowerLetter) ? 'correct' : 'incorrect';
    }
    return 'unused';
  };

  // Get CSS classes based on key status
  const getKeyClasses = (letter: string): string => {
    const status = getKeyStatus(letter);
    
    if (status === 'correct') {
      return 'bg-green-600 text-white';
    } else if (status === 'incorrect') {
      return 'bg-red-500 text-white opacity-70';
    }
    
    return 'bg-gray-700 text-white hover:bg-gray-600';
  };

  return (
    <div className="mt-6 px-2 pb-8">
      {keyboardRows.map((row, rowIndex) => (
        <div 
          key={rowIndex} 
          className={`flex justify-center mb-2 ${rowIndex === 1 ? 'ml-4' : rowIndex === 2 ? 'ml-12' : ''}`}
        >
          {row.map(letter => {
            const isUsed = guessedLetters.includes(letter.toLowerCase());
            
            return (
              <motion.button
                key={letter}
                onClick={() => handleKeyClick(letter)}
                disabled={isUsed || disabled}
                className={`
                  w-9 h-11 m-1 rounded font-medium transition-colors
                  ${getKeyClasses(letter)}
                  ${disabled ? 'cursor-not-allowed opacity-70' : ''}
                `}
                whileHover={!isUsed && !disabled ? { scale: 1.1 } : {}}
                whileTap={!isUsed && !disabled ? { scale: 0.95 } : {}}
              >
                {letter}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;