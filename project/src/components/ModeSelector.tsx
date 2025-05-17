import React from 'react';
import { motion } from 'framer-motion';
import { LampCeiling as Gaming, Bot, Users, ArrowLeft, Info, Minus, Plus, Skull, User } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { GameMode } from '../types';

const ModeSelector: React.FC = () => {
  const { setMode, setTotalRounds, setPlayerNames, setHangmanTheme } = useGameStore(state => ({ 
    setMode: state.setMode,
    setTotalRounds: state.setTotalRounds,
    setPlayerNames: state.setPlayerNames,
    setHangmanTheme: state.setHangmanTheme
  }));
  const [showInfo, setShowInfo] = React.useState(false);
  const [rounds, setRounds] = React.useState(5);
  const [player1Name, setPlayer1Name] = React.useState('Player 1');
  const [player2Name, setPlayer2Name] = React.useState('Player 2');
  const [showPlayerNames, setShowPlayerNames] = React.useState(false);
  const [selectedTheme, setSelectedTheme] = React.useState('default');

  const themes = [
    { id: 'default', name: 'Classic' },
    { id: 'pirate', name: 'Pirate' },
    { id: 'cowboy', name: 'Cowboy' },
    { id: 'space', name: 'Astronaut' }
  ];

  const handleSelectMode = (mode: GameMode) => {
    setTotalRounds(rounds);
    setPlayerNames(player1Name, player2Name);
    setHangmanTheme(selectedTheme);
    
    if (mode === '1v1' && !showPlayerNames) {
      setShowPlayerNames(true);
    } else {
      setMode(mode);
    }
  };
  
  const decreaseRounds = () => {
    if (rounds > 1) {
      setRounds(rounds - 1);
    }
  };
  
  const increaseRounds = () => {
    if (rounds < 10) {
      setRounds(rounds + 1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
      <motion.div 
        className="max-w-md w-full bg-gray-800/90 p-8 rounded-xl shadow-2xl backdrop-blur-sm border border-indigo-500/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {showPlayerNames ? (
          <>
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Player Names</h2>
              <p className="text-gray-300 text-sm mb-4">Enter names for both players</p>
              
              <div className="mb-4">
                <label className="block text-gray-300 text-sm font-medium mb-2 text-left">
                  Player 1
                </label>
                <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-indigo-600 p-2">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={player1Name}
                    onChange={(e) => setPlayer1Name(e.target.value)}
                    className="bg-gray-700 text-white p-2 w-full focus:outline-none"
                    placeholder="Player 1"
                    maxLength={15}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 text-sm font-medium mb-2 text-left">
                  Player 2
                </label>
                <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
                  <div className="bg-green-600 p-2">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <input
                    type="text"
                    value={player2Name}
                    onChange={(e) => setPlayer2Name(e.target.value)}
                    className="bg-gray-700 text-white p-2 w-full focus:outline-none"
                    placeholder="Player 2"
                    maxLength={15}
                  />
                </div>
              </div>
              
              <div className="flex space-x-3">
                <motion.button
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg flex-1"
                  onClick={() => setShowPlayerNames(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back
                </motion.button>
                <motion.button
                  className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex-1"
                  onClick={() => handleSelectMode('1v1')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Game
                </motion.button>
              </div>
            </motion.div>
          </>
        ) : (
          <>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
              >
                <Gaming className="w-20 h-20 mx-auto mb-4 text-indigo-500" />
              </motion.div>
              <motion.h1 
                className="text-5xl font-bold text-white mb-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                Hangman
              </motion.h1>
              <motion.p 
                className="text-gray-300 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                Select a game mode to begin
              </motion.p>
            </div>

            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-gray-300 mb-2 text-center">Number of Rounds:</p>
              <div className="flex items-center justify-center">
                <motion.button
                  className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-l-lg flex items-center justify-center"
                  onClick={decreaseRounds}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={rounds <= 1}
                >
                  <Minus className="w-5 h-5" />
                </motion.button>
                <div className="bg-gray-700 text-white w-12 h-10 flex items-center justify-center text-xl font-bold">
                  {rounds}
                </div>
                <motion.button
                  className="bg-gray-700 hover:bg-gray-600 text-white w-10 h-10 rounded-r-lg flex items-center justify-center"
                  onClick={increaseRounds}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={rounds >= 10}
                >
                  <Plus className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
            
            <motion.div 
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <p className="text-gray-300 mb-2 text-center">Hangman Theme:</p>
              <div className="grid grid-cols-2 gap-2">
                {themes.map(theme => (
                  <motion.button
                    key={theme.id}
                    className={`p-2 rounded-lg flex items-center justify-center ${
                      selectedTheme === theme.id 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setSelectedTheme(theme.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Skull className="w-4 h-4 mr-2" />
                    {theme.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <motion.button
                className="w-full flex items-center justify-between bg-gradient-to-r from-blue-900/70 to-blue-800/70 hover:from-blue-800 hover:to-blue-700 p-5 rounded-lg transition-all border border-blue-500/30"
                onClick={() => handleSelectMode('ai')}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <Bot className="w-10 h-10 mr-4 text-blue-400" />
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-lg">Play Against AI</h3>
                    <p className="text-gray-300 text-sm">The AI will choose {rounds} random words for you to guess</p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                className="w-full flex items-center justify-between bg-gradient-to-r from-green-900/70 to-green-800/70 hover:from-green-800 hover:to-green-700 p-5 rounded-lg transition-all border border-green-500/30"
                onClick={() => handleSelectMode('1v1')}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <Users className="w-10 h-10 mr-4 text-green-400" />
                  <div className="text-left">
                    <h3 className="text-white font-semibold text-lg">1 vs 1 Multiplayer</h3>
                    <p className="text-gray-300 text-sm">Take turns providing words and guessing ({rounds} rounds)</p>
                  </div>
                </div>
              </motion.button>
            </motion.div>

            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <button 
                onClick={() => setShowInfo(!showInfo)}
                className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center justify-center mx-auto"
              >
                <Info className="w-4 h-4 mr-1" />
                {showInfo ? "Hide Rules" : "How to Play"}
              </button>
              
              {showInfo && (
                <motion.div 
                  className="mt-4 text-sm text-gray-300 bg-gray-700/50 p-4 rounded-lg"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <p className="mb-2">1. Choose a game mode: AI or 1v1 with a friend</p>
                  <p className="mb-2">2. Guess the hidden word one letter at a time</p>
                  <p className="mb-2">3. Each wrong guess adds a part to the hangman</p>
                  <p>4. Guess the word before the hangman is complete!</p>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ModeSelector;