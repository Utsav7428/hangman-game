import React from 'react';
import { motion } from 'framer-motion';

interface HangingAnimationProps {
  theme: string;
}

const HangingAnimation: React.FC<HangingAnimationProps> = ({ theme }) => {
  // Different themes have different character styles
  const getCharacterStyle = () => {
    switch (theme) {
      case 'pirate':
        return {
          body: 'bg-gray-800',
          head: 'bg-gray-700',
          hat: 'border-t-4 border-red-500',
          eyePatch: true
        };
      case 'cowboy':
        return {
          body: 'bg-brown-800',
          head: 'bg-amber-700',
          hat: 'border-t-4 border-amber-900',
          eyePatch: false
        };
      case 'space':
        return {
          body: 'bg-gray-300',
          head: 'bg-white border-2 border-blue-500',
          hat: 'border-t-0',
          eyePatch: false,
          helmet: true
        };
      default:
        return {
          body: 'bg-gray-700',
          head: 'bg-gray-600',
          hat: '',
          eyePatch: false
        };
    }
  };

  const characterStyle = getCharacterStyle();

  return (
    <div className="relative h-60 w-full mb-6">
      {/* Gallows */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-8 bg-amber-900"></div>
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2 h-12 bg-amber-800"></div>
      
      {/* Rope */}
      <motion.div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-1 bg-yellow-700"
        initial={{ height: 0 }}
        animate={{ height: 30 }}
        transition={{ duration: 1, delay: 0.5 }}
      ></motion.div>
      
      {/* Character */}
      <motion.div
        className="absolute left-1/2 transform -translate-x-1/2"
        initial={{ top: -50, rotate: 0 }}
        animate={{ top: 38, rotate: [0, 10, -10, 5, -5, 0] }}
        transition={{ 
          top: { duration: 1, delay: 0.5 },
          rotate: { duration: 2, delay: 1.5, repeat: 2, repeatType: "reverse" }
        }}
      >
        {/* Head */}
        <div className={`relative w-12 h-12 rounded-full ${characterStyle.head} ${characterStyle.hat}`}>
          {/* Eyes */}
          {characterStyle.eyePatch ? (
            <>
              <div className="absolute top-4 left-3 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-3 right-3 w-4 h-4 bg-black rounded-full"></div>
            </>
          ) : (
            <>
              <div className="absolute top-4 left-3 w-2 h-2 bg-white rounded-full"></div>
              <div className="absolute top-4 right-3 w-2 h-2 bg-white rounded-full"></div>
            </>
          )}
          
          {/* Mouth - sad expression */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-6 h-2 border-b-2 border-gray-400 rounded-b-full"></div>
          
          {/* Space helmet if applicable */}
          {characterStyle.helmet && (
            <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-full border-4 border-blue-400 bg-transparent"></div>
          )}
        </div>
        
        {/* Body */}
        <div className={`w-8 h-16 ${characterStyle.body} mx-auto mt-1 rounded-b-lg`}></div>
        
        {/* Arms */}
        <div className="absolute top-14 left-0 w-6 h-2 bg-gray-600 rounded-full transform -rotate-45"></div>
        <div className="absolute top-14 right-0 w-6 h-2 bg-gray-600 rounded-full transform rotate-45"></div>
        
        {/* Legs */}
        <div className="absolute bottom-0 left-2 w-2 h-8 bg-gray-600 rounded-full transform rotate-12"></div>
        <div className="absolute bottom-0 right-2 w-2 h-8 bg-gray-600 rounded-full transform -rotate-12"></div>
      </motion.div>
    </div>
  );
};

export default HangingAnimation;