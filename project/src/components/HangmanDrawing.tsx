import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface HangmanDrawingProps {
  incorrectGuesses: number;
}

const HangmanDrawing: React.FC<HangmanDrawingProps> = ({ incorrectGuesses }) => {
  const { hangmanTheme } = useGameStore();
  
  const bodyParts = [
    { name: 'head', visible: incorrectGuesses >= 1 },
    { name: 'body', visible: incorrectGuesses >= 2 },
    { name: 'leftArm', visible: incorrectGuesses >= 3 },
    { name: 'rightArm', visible: incorrectGuesses >= 4 },
    { name: 'leftLeg', visible: incorrectGuesses >= 5 },
    { name: 'rightLeg', visible: incorrectGuesses >= 6 }
  ];

  const isHanged = incorrectGuesses >= 6;
  const controls = useAnimation();
  
  // Get theme-specific colors and styles
  const getThemeStyles = () => {
    switch (hangmanTheme) {
      case 'pirate':
        return {
          bodyColor: '#8B4513',
          ropeColor: '#A0522D',
          gallowsColor: '#654321',
          faceColor: '#FFD700'
        };
      case 'cowboy':
        return {
          bodyColor: '#B8860B',
          ropeColor: '#CD853F',
          gallowsColor: '#8B4513',
          faceColor: '#F4A460'
        };
      case 'space':
        return {
          bodyColor: '#FFFFFF',
          ropeColor: '#C0C0C0',
          gallowsColor: '#808080',
          faceColor: '#ADD8E6'
        };
      default:
        return {
          bodyColor: '#FF5E5B',
          ropeColor: '#F8FAFC',
          gallowsColor: '#F8FAFC',
          faceColor: '#FF5E5B'
        };
    }
  };
  
  const themeStyles = getThemeStyles();
  
  useEffect(() => {
    if (isHanged) {
      // Start the animation sequence when hanged
      controls.start({
        rotate: [0, 5, -5, 4, -4, 3, -3, 2, -2, 1, -1, 0],
        transition: {
          duration: 3,
          ease: "easeInOut",
          times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1],
          repeat: Infinity,
          repeatType: "reverse"
        }
      });
    } else {
      controls.stop();
    }
  }, [isHanged, controls]);

  // Face expressions for the hanged state
  const faceElements = isHanged ? (
    <>
      {/* X eyes */}
      <motion.line
        x1="132" y1="50" x2="138" y2="56"
        stroke={themeStyles.faceColor}
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      />
      <motion.line
        x1="138" y1="50" x2="132" y2="56"
        stroke={themeStyles.faceColor}
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      />
      <motion.line
        x1="142" y1="50" x2="148" y2="56"
        stroke={themeStyles.faceColor}
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      />
      <motion.line
        x1="148" y1="50" x2="142" y2="56"
        stroke={themeStyles.faceColor}
        strokeWidth="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      />
      
      {/* Sad mouth */}
      <motion.path
        d="M 132 62 Q 140 58 148 62"
        fill="none"
        stroke={themeStyles.faceColor}
        strokeWidth="2"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1, pathLength: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      />
      
      {/* Theme-specific elements */}
      {hangmanTheme === 'pirate' && (
        <motion.path
          d="M 130 45 Q 135 40 140 45"
          fill="none"
          stroke={themeStyles.faceColor}
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      )}
      
      {hangmanTheme === 'cowboy' && (
        <motion.path
          d="M 125 40 Q 140 35 155 40"
          fill="none"
          stroke="#8B4513"
          strokeWidth="2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      )}
      
      {hangmanTheme === 'space' && (
        <motion.circle
          cx="140" cy="55" r="18"
          stroke="#ADD8E6"
          strokeWidth="1"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 0.3, delay: 0.6 }}
        />
      )}
    </>
  ) : null;

  return (
    <div className="w-full max-w-sm mx-auto h-64 relative">
      <svg 
        viewBox="0 0 200 180" 
        className="w-full h-full"
      >
        {/* Base */}
        <motion.line
          x1="20" y1="180" x2="100" y2="180"
          stroke={themeStyles.gallowsColor}
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
        
        {/* Vertical bar */}
        <motion.line
          x1="60" y1="20" x2="60" y2="180"
          stroke={themeStyles.gallowsColor}
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
        
        {/* Horizontal bar */}
        <motion.line
          x1="60" y1="20" x2="140" y2="20"
          stroke={themeStyles.gallowsColor}
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        
        {/* Rope */}
        <motion.line
          x1="140" y1="20" x2="140" y2="40"
          stroke={themeStyles.ropeColor}
          strokeWidth="4"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        />

        <motion.g
          animate={controls}
          transformOrigin="140 20"
        >
          {/* Head */}
          {bodyParts[0].visible && (
            <>
              <motion.circle
                cx="140" cy="55" r="15"
                stroke={themeStyles.bodyColor}
                strokeWidth="4"
                fill={isHanged ? `${themeStyles.bodyColor}33` : "none"}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {faceElements}
            </>
          )}
          
          {/* Body */}
          {bodyParts[1].visible && (
            <motion.line
              x1="140" y1="70" x2="140" y2="120"
              stroke={themeStyles.bodyColor}
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}
          
          {/* Left Arm */}
          {bodyParts[2].visible && (
            <motion.line
              x1="140" y1="80" x2="120" y2="100"
              stroke={themeStyles.bodyColor}
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isHanged ? 
                { 
                  pathLength: 1, 
                  opacity: 1,
                  rotate: [-5, 5, -3, 3, 0],
                  transition: { 
                    duration: 2, 
                    ease: "easeInOut", 
                    delay: 0.2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                } : 
                { 
                  pathLength: 1, 
                  opacity: 1 
                }
              }
              style={{ transformOrigin: "140px 80px" }}
            />
          )}
          
          {/* Right Arm */}
          {bodyParts[3].visible && (
            <motion.line
              x1="140" y1="80" x2="160" y2="100"
              stroke={themeStyles.bodyColor}
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isHanged ? 
                { 
                  pathLength: 1, 
                  opacity: 1,
                  rotate: [5, -5, 3, -3, 0],
                  transition: { 
                    duration: 2, 
                    ease: "easeInOut", 
                    delay: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                } : 
                { 
                  pathLength: 1, 
                  opacity: 1 
                }
              }
              style={{ transformOrigin: "140px 80px" }}
            />
          )}
          
          {/* Left Leg */}
          {bodyParts[4].visible && (
            <motion.line
              x1="140" y1="120" x2="120" y2="140"
              stroke={themeStyles.bodyColor}
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isHanged ? 
                { 
                  pathLength: 1, 
                  opacity: 1,
                  rotate: [-3, 3, -2, 2, 0],
                  transition: { 
                    duration: 2.5, 
                    ease: "easeInOut", 
                    delay: 0.4,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                } : 
                { 
                  pathLength: 1, 
                  opacity: 1 
                }
              }
              style={{ transformOrigin: "140px 120px" }}
            />
          )}
          
          {/* Right Leg */}
          {bodyParts[5].visible && (
            <motion.line
              x1="140" y1="120" x2="160" y2="140"
              stroke={themeStyles.bodyColor}
              strokeWidth="4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isHanged ? 
                { 
                  pathLength: 1, 
                  opacity: 1,
                  rotate: [3, -3, 2, -2, 0],
                  transition: { 
                    duration: 2.5, 
                    ease: "easeInOut", 
                    delay: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                } : 
                { 
                  pathLength: 1, 
                  opacity: 1 
                }
              }
              style={{ transformOrigin: "140px 120px" }}
            />
          )}
        </motion.g>
      </svg>
      
      {/* Game over flash effect when hanged */}
      {isHanged && (
        <motion.div 
          className="absolute inset-0 bg-red-500/20 rounded-lg pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.7, 0] }}
          transition={{ 
            duration: 1.5, 
            times: [0, 0.5, 1],
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

export default HangmanDrawing;