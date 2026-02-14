import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

const ScrollProgress: React.FC = () => {
  const { shouldReduceMotion } = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const springScaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const linearScaleX = useTransform(scrollYProgress, (v) => v);
  const scaleX = shouldReduceMotion ? linearScaleX : springScaleX;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-kaal-accent/20 z-[200] origin-left"
      style={{ scaleX }}
    />
  );
};

export default ScrollProgress;
