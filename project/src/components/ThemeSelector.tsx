import React from 'react';
import { motion } from 'framer-motion';
import { Skull, Check } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

interface ThemeSelectorProps {
  onClose: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onClose }) => {
  const { hangmanTheme, setHangmanTheme } = useGameStore();
  
  const themes = [
    { id: 'default', name: 'Classic', description: 'The traditional hangman look' },
    { id: 'pirate', name: 'Pirate', description: 'Arrrr! A swashbuckling theme' },
    { id: 'cowboy', name: 'Cowboy', description: 'Wild west style hangman' },
    { id: 'space', name: 'Astronaut', description: 'Space-themed hangman' }
  ];

  const handleSelectTheme = (themeId: string) => {
    setHangmanTheme(themeId);
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="bg-gray-800 rounded-xl p-6 max-w-md w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Select Theme</h2>
        <p className="text-gray-300 text-sm mb-6">Choose a theme for your hangman character</p>
        
        <div className="space-y-3 mb-6">
          {themes.map(theme => (
            <motion.div
              key={theme.id}
              className={`p-4 rounded-lg cursor-pointer flex items-center ${
                hangmanTheme === theme.id 
                  ? 'bg-indigo-600/50 border border-indigo-400' 
                  : 'bg-gray-700/50 hover:bg-gray-700 border border-gray-600'
              }`}
              onClick={() => handleSelectTheme(theme.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="mr-3">
                <Skull className={`w-8 h-8 ${hangmanTheme === theme.id ? 'text-indigo-300' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{theme.name}</h3>
                <p className="text-sm text-gray-300">{theme.description}</p>
              </div>
              {hangmanTheme === theme.id && (
                <Check className="w-5 h-5 text-indigo-300" />
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-end">
          <motion.button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Done
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ThemeSelector;