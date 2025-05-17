import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

const ScoreBoard: React.FC = () => {
  const { rounds, currentPlayer, mode, currentRound, totalRounds, player1Name, player2Name } = useGameStore();
  
  return (
    <motion.div
      className="max-w-md mx-auto my-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-center text-white font-bold text-xl">
            Score
          </h2>
          <div className="text-gray-300 text-sm bg-gray-700 px-3 py-1 rounded-full">
            Round {mode === '1v1' ? Math.ceil(currentRound/2) : currentRound}/{totalRounds}
          </div>
        </div>
        
        <div className="flex justify-around">
          <div className={`text-center p-3 rounded-lg ${currentPlayer === 1 ? 'bg-indigo-900 bg-opacity-50' : ''}`}>
            <div className="text-xl font-bold text-white mb-1">{player1Name}</div>
            <div className="flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-2xl font-bold text-white">{rounds[0]}</span>
            </div>
            {mode === '1v1' && (
              <div className="text-gray-400 text-sm mt-1">
                {currentPlayer === 1 ? 'Currently playing' : 'Waiting turn'}
              </div>
            )}
          </div>
          
          {mode === '1v1' && (
            <div className={`text-center p-3 rounded-lg ${currentPlayer === 2 ? 'bg-indigo-900 bg-opacity-50' : ''}`}>
              <div className="text-xl font-bold text-white mb-1">{player2Name}</div>
              <div className="flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-2xl font-bold text-white">{rounds[1]}</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">
                {currentPlayer === 2 ? 'Currently playing' : 'Waiting turn'}
              </div>
            </div>
          )}
          
          {mode === 'ai' && (
            <div className="text-center p-3 rounded-lg">
              <div className="text-xl font-bold text-white mb-1">AI</div>
              <div className="flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-2xl font-bold text-white">-</span>
              </div>
              <div className="text-gray-400 text-sm mt-1">
                Word provider
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ScoreBoard;