import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const noParallax = shouldReduceMotion ? {} : { y: textY, opacity: textOpacity };
  const entranceDuration = shouldReduceMotion ? 0.2 : 2;
  const wordDelay = shouldReduceMotion ? 0 : 0.3;
  const scrollIndicatorDelay = shouldReduceMotion ? 0.2 : 3.5;
  const scrollIndicatorBounce = shouldReduceMotion ? false : true;

  return (
    <section 
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >

      {/* Main Headline - Left Aligned, Large - same horizontal gutter as description/awards on mobile */}
      <motion.div 
        style={noParallax}
        className="relative z-10 h-full flex items-center px-6 md:px-6 lg:px-12"
      >
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: entranceDuration, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[0.75] md:leading-[0.8] tracking-tight text-white text-left text-[clamp(3.5rem,22vw,10rem)] sm:text-[clamp(4.5rem,20vw,12rem)] md:text-[10rem] lg:text-[14rem] xl:text-[16rem]"
          >
            <span className="block overflow-hidden -mb-2 md:-mb-4">
              <motion.span
                initial={{ y: shouldReduceMotion ? 0 : "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: entranceDuration, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Digital
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: shouldReduceMotion ? 0 : "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: entranceDuration, delay: wordDelay, ease: [0.16, 1, 0.3, 1] }}
                className="block text-kaal-accent"
              >
                Gravity<span className="text-white">.</span>
              </motion.span>
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 1.2, duration: shouldReduceMotion ? 0.2 : 1 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-body leading-snug mt-6 md:mt-8 space-y-1"
          >
            <span className="block">AI-accelerated design.</span>
            <span className="block">Human-led strategy.</span>
            <span className="block">Built to pull users in — and move them to act.</span>
          </motion.p>
        </div>
      </motion.div>

      {/* Supporting Line - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0.1 : 2.5, duration: shouldReduceMotion ? 0.2 : 1.5 }}
        className="absolute top-[calc(100vh-200px)] md:top-auto md:bottom-12 right-6 md:right-6 lg:right-12 left-6 md:left-auto max-w-md md:max-w-md text-left md:text-right z-10"
      >
        <p className="text-base sm:text-lg md:text-base text-white/90 font-body leading-relaxed">
          Cinematic design. Conversion precision.<br />
          Built to be impossible to <strong className="text-white font-bold">ignore.</strong>
        </p>
      </motion.div>

      {/* Tagline - Bottom Left */}
      <motion.div
        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: shouldReduceMotion ? 0.15 : 2.8, duration: shouldReduceMotion ? 0.2 : 1.5 }}
        className="absolute top-[calc(100vh-100px)] md:top-auto md:bottom-12 left-6 md:left-6 lg:left-12 z-10"
      >
        <p className="text-white/90 text-sm sm:text-base font-body uppercase tracking-widest">
          Solo Designer. Strategic Execution.
        </p>
      </motion.div>

      {/* Scroll Indicator - Center Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: scrollIndicatorBounce ? [0, 10, 0] : 0 }}
        transition={
          scrollIndicatorBounce
            ? { delay: scrollIndicatorDelay, y: { repeat: Infinity, duration: 2 } }
            : { delay: scrollIndicatorDelay, duration: 0.3 }
        }
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-kaal-muted hover:text-white transition-colors z-10"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};

export default Hero;
