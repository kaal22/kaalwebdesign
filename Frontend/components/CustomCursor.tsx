import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if device is desktop (has mouse)
    const checkDesktop = () => {
      setIsDesktop(window.matchMedia('(pointer: fine)').matches);
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    if (isDesktop) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'none';
    }

    return () => {
      window.removeEventListener('resize', checkDesktop);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.body.style.cursor = 'auto';
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)',
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      }}
    >
      {/* Outer Ring 3 - Largest */}
      <motion.div
        className="absolute rounded-full border border-kaal-accent/30"
        style={{
          width: '100px',
          height: '100px',
          left: '-50px',
          top: '-50px',
        }}
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />

      {/* Outer Ring 2 */}
      <motion.div
        className="absolute rounded-full border border-kaal-accent/40"
        style={{
          width: '80px',
          height: '80px',
          left: '-40px',
          top: '-40px',
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.3,
        }}
      />

      {/* Outer Ring 1 */}
      <motion.div
        className="absolute rounded-full border-2 border-kaal-accent/60"
        style={{
          width: '60px',
          height: '60px',
          left: '-30px',
          top: '-30px',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Middle Rotating Ring */}
      <motion.div
        className="absolute rounded-full border border-kaal-accent/50"
        style={{
          width: '40px',
          height: '40px',
          left: '-20px',
          top: '-20px',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner Rotating Ring */}
      <motion.div
        className="absolute rounded-full border border-kaal-accent/70"
        style={{
          width: '24px',
          height: '24px',
          left: '-12px',
          top: '-12px',
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Inner Core Orb */}
      <motion.div
        className="absolute rounded-full bg-kaal-accent"
        style={{
          width: '10px',
          height: '10px',
          left: '-5px',
          top: '-5px',
          boxShadow: '0 0 20px rgba(255, 77, 26, 1), 0 0 40px rgba(255, 77, 26, 0.6), 0 0 60px rgba(255, 77, 26, 0.3)',
        }}
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Glow Effect */}
      <div
        className="absolute rounded-full bg-kaal-accent/40 blur-2xl"
        style={{
          width: '40px',
          height: '40px',
          left: '-20px',
          top: '-20px',
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
