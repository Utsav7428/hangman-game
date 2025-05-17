import React from 'react';
import { motion } from 'framer-motion';
import { formatWordDisplay } from '../utils/wordBank';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  showAnswer?: boolean;
}

const WordDisplay: React.FC<WordDisplayProps> = ({ word, guessedLetters, showAnswer = false }) => {
  const displayWord = showAnswer ? word : formatWordDisplay(word, guessedLetters);
  
  return (
    <div className="flex justify-center my-8">
      <div className="flex flex-wrap justify-center gap-2">
        {displayWord.split('').map((char, index) => (
          <motion.div
            key={index}
            className={`
              w-10 h-12 flex items-center justify-center text-2xl font-bold
              ${char === ' ' ? 'mx-4' : char === '_' ? 'border-b-2 border-gray-300' : ''}
              ${showAnswer && !guessedLetters.includes(char.toLowerCase()) ? 'text-red-400' : ''}
            `}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            {char !== ' ' && (
              <span className={char === '_' ? 'opacity-0' : 'text-white'}>
                {char === '_' ? 'X' : char}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WordDisplay;