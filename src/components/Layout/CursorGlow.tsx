import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CursorGlow: React.FC = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hoverType, setHoverType] = useState<'none' | 'clickable' | 'input' | 'download'>('none');
  const [isVisible, setIsVisible] = useState(false);

  // Motion Values for smooth physics lag
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 30, stiffness: 220, mass: 0.8 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Detect mobile touch devices
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Determine what element is hovered
      const closestInteractive = target.closest('a, button, [role="button"], input, textarea, select');
      
      if (closestInteractive) {
        if (closestInteractive.tagName === 'INPUT' || closestInteractive.tagName === 'TEXTAREA') {
          setHoverType('input');
        } else if (closestInteractive.getAttribute('download') || closestInteractive.getAttribute('href')?.endsWith('.pdf')) {
          setHoverType('download');
        } else {
          setHoverType('clickable');
        }
      } else {
        setHoverType('none');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  // Custom colors and scale depending on hovered element type
  const getFollowerStyles = () => {
    switch (hoverType) {
      case 'clickable':
        return {
          scale: 1.6,
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.05)',
          borderWidth: '2px',
          text: '[ CLICK ]'
        };
      case 'input':
        return {
          scale: 1.8,
          borderColor: '#a855f7',
          backgroundColor: 'rgba(168, 85, 247, 0.05)',
          borderWidth: '1.5px',
          text: '[ INPUT ]'
        };
      case 'download':
        return {
          scale: 1.7,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          borderWidth: '2px',
          text: '[ DECRYPT ]'
        };
      default:
        return {
          scale: 1.0,
          borderColor: 'rgba(6, 182, 212, 0.35)',
          backgroundColor: 'transparent',
          borderWidth: '1px',
          text: ''
        };
    }
  };

  const currentStyles = getFollowerStyles();

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] hidden md:block">
      {/* 1. Main Cursor Center Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full z-10 bg-cyan-400 mix-blend-screen"
        style={{
          x: coords.x - 4,
          y: coords.y - 4,
          boxShadow: '0 0 10px #06b6d4, 0 0 20px rgba(6, 182, 212, 0.6)',
        }}
      />

      {/* 2. Concentric Ring Follower with HUD Telemetry */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border flex items-center justify-center mix-blend-screen transition-colors duration-200"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: currentStyles.borderColor,
          backgroundColor: currentStyles.backgroundColor,
          borderWidth: currentStyles.borderWidth,
          boxShadow: hoverType !== 'none' ? `0 0 20px ${currentStyles.borderColor}20` : 'none',
        }}
        animate={{
          scale: currentStyles.scale,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        {/* HUD Crosshairs in circle */}
        {hoverType === 'none' && (
          <div className="absolute inset-0 flex items-center justify-center opacity-40">
            <div className="w-[4px] h-[1px] bg-cyan-500 absolute left-0" />
            <div className="w-[4px] h-[1px] bg-cyan-500 absolute right-0" />
            <div className="w-[1px] h-[4px] bg-cyan-500 absolute top-0" />
            <div className="w-[1px] h-[4px] bg-cyan-500 absolute bottom-0" />
          </div>
        )}
      </motion.div>

      {/* 3. Telemetry Coordinates Monospace Panel */}
      <motion.div
        className="fixed top-0 left-0 ml-7 mt-3 flex flex-col gap-0.5 p-2 rounded-lg border font-mono text-[7px] leading-none tracking-wider text-slate-500"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          background: 'rgba(2, 6, 23, 0.85)',
          borderColor: 'rgba(6, 182, 212, 0.1)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span className="text-cyan-400 font-bold">X: {coords.x.toString().padStart(4, '0')}</span>
        <span className="text-cyan-400 font-bold">Y: {coords.y.toString().padStart(4, '0')}</span>
        <span>SYS_LOCK: NOMINAL</span>
        {currentStyles.text && (
          <span 
            className="mt-1 font-bold animate-pulse text-[8px]" 
            style={{ color: hoverType === 'clickable' ? '#06b6d4' : hoverType === 'input' ? '#a855f7' : '#10b981' }}
          >
            {currentStyles.text}
          </span>
        )}
      </motion.div>
    </div>
  );
};
