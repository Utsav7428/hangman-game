import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { isValidWord } from '../utils/wordBank';

const WordSubmissionModal: React.FC = () => {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');
  const { isModalOpen, closeModal, submitWords, currentPlayer } = useGameStore();

  const handleChangeWord = (value: string) => {
    setWord(value);
    if (value && isValidWord(value)) {
      setError('');
    }
  };

  const handleSubmit = () => {
    if (!word) {
      setError('Word is required');
      return;
    }
    if (!isValidWord(word)) {
      setError('Only letters and spaces allowed');
      return;
    }

    submitWords([word.toLowerCase()]);
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-800 rounded-xl shadow-xl max-w-md w-full"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 30 }}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  Player {currentPlayer}: Submit Your Word
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-gray-300 mb-4">
                Enter a word for your opponent to guess. Make it challenging but fair!
              </p>

              <div className="space-y-4 mb-6">
                <div>
                  <input
                    type="text"
                    value={word}
                    onChange={(e) => handleChangeWord(e.target.value)}
                    placeholder="Enter word"
                    className="w-full bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  />
                  {error && (
                    <div className="mt-1 flex items-center text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {error}
                    </div>
                  )}
                </div>
              </div>

              <motion.button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center"
                onClick={handleSubmit}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Check className="w-5 h-5 mr-2" />
                Submit Word
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WordSubmissionModal;