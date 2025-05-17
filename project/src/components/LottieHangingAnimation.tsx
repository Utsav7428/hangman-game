import React, { useEffect, useState } from 'react';
import Lottie from 'lottie-react';
import { useGameStore } from '../store/gameStore';

// Import the Lottie animation JSON files
import defaultAnimation from '../assets/animations/default-hanging.json';
import pirateAnimation from '../assets/animations/pirate-hanging.json';
import cowboyAnimation from '../assets/animations/cowboy-hanging.json';
import spaceAnimation from '../assets/animations/space-hanging.json';

interface LottieHangingAnimationProps {
  theme?: string;
  width?: number | string;
  height?: number | string;
}

const LottieHangingAnimation: React.FC<LottieHangingAnimationProps> = ({ 
  theme, 
  width = 200, 
  height = 200 
}) => {
  const { hangmanTheme } = useGameStore();
  const [animationData, setAnimationData] = useState<any>(null);
  const activeTheme = theme || hangmanTheme;

  // Fallback animation data in case the JSON files aren't available
  const fallbackAnimation = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 60,
    w: 200,
    h: 200,
    nm: "Hanging Animation",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Shape Layer",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { 
            a: 1, 
            k: [
              { t: 0, s: [0], e: [5] },
              { t: 15, s: [5], e: [-5] },
              { t: 30, s: [-5], e: [3] },
              { t: 45, s: [3], e: [-3] },
              { t: 60, s: [-3], e: [0] }
            ], 
            ix: 10 
          },
          p: { a: 0, k: [100, 100, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: { a: 0, k: [100, 100, 100], ix: 6 }
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                d: 1,
                ty: "el",
                s: { a: 0, k: [40, 40], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                nm: "Head",
                mn: "ADBE Vector Shape - Ellipse",
                hd: false
              },
              {
                ty: "st",
                c: { a: 0, k: [0.5, 0.5, 0.5, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 4, ix: 5 },
                lc: 1,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: "Stroke",
                mn: "ADBE Vector Graphic - Stroke",
                hd: false
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, -30], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: "Transform"
              }
            ],
            nm: "Head",
            np: 2,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false
          },
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                d: 1,
                s: { a: 0, k: [10, 60], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                r: { a: 0, k: 0, ix: 4 },
                nm: "Body",
                mn: "ADBE Vector Shape - Rect",
                hd: false
              },
              {
                ty: "st",
                c: { a: 0, k: [0.5, 0.5, 0.5, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 4, ix: 5 },
                lc: 1,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: "Stroke",
                mn: "ADBE Vector Graphic - Stroke",
                hd: false
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 10], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: "Transform"
              }
            ],
            nm: "Body",
            np: 2,
            cix: 2,
            bm: 0,
            ix: 2,
            mn: "ADBE Vector Group",
            hd: false
          }
        ],
        ip: 0,
        op: 60,
        st: 0,
        bm: 0
      }
    ],
    markers: []
  };

  useEffect(() => {
    // In a real implementation, you would use the imported JSON files
    // For now, we'll use the theme to determine which animation to show
    // but use the fallback animation since we don't have the actual JSON files
    
    const getAnimationForTheme = () => {
      try {
        switch (activeTheme) {
          case 'pirate':
            return pirateAnimation;
          case 'cowboy':
            return cowboyAnimation;
          case 'space':
            return spaceAnimation;
          default:
            return defaultAnimation;
        }
      } catch (error) {
        console.warn('Failed to load animation, using fallback', error);
        return fallbackAnimation;
      }
    };

    setAnimationData(getAnimationForTheme());
  }, [activeTheme]);

  if (!animationData) {
    return <div style={{ width, height }}>Loading animation...</div>;
  }

  return (
    <div className="lottie-animation-container">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width, height }}
      />
    </div>
  );
};

export default LottieHangingAnimation;