
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={ref}
      className="relative w-full h-screen overflow-hidden bg-transparent"
    >

      {/* Content Container */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex items-center px-6 md:px-12"
      >
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-xs uppercase tracking-[0.2em] font-bold text-white/80"
            >
              <span className="w-2 h-2 rounded-full bg-kaal-accent animate-pulse" />
              Accepting New Projects
            </motion.div>

            <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-display font-bold leading-[0.9] tracking-tight mb-8 text-white drop-shadow-2xl">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  Digital
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-kaal-accent"
                >
                  Gravity.
                </motion.span>
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-2xl font-body leading-relaxed mb-12 drop-shadow-lg">
              The intersection of cinematic aesthetics and conversion engineering. We build digital experiences that feel illegal to ignore.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#work"
                className="group bg-kaal-accent text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-kaal-accent/30 hover:shadow-kaal-accent/50"
              >
                View Selected Work
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 rounded-full text-lg font-bold border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all flex items-center justify-center text-white backdrop-blur-sm"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-kaal-muted hover:text-white transition-colors"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};

export default Hero;
