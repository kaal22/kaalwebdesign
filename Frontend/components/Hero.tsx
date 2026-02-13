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

      {/* Main Headline - Left Aligned, Large - same horizontal gutter as description/awards on mobile */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 h-full flex items-center px-6 md:px-6 lg:px-12"
      >
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[0.85] md:leading-[0.85] tracking-tight text-white text-left text-[clamp(3.5rem,22vw,10rem)] sm:text-[clamp(4.5rem,20vw,12rem)] md:text-[10rem] lg:text-[14rem] xl:text-[16rem]"
          >
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Digital
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block text-kaal-accent"
              >
                Gravity.
              </motion.span>
            </span>
          </motion.h1>
        </div>
      </motion.div>

      {/* Descriptive Text - Bottom Right - Mobile: Below title, Desktop: Bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1.5 }}
        className="absolute top-[calc(100vh-200px)] md:top-auto md:bottom-12 right-6 md:right-6 lg:right-12 left-6 md:left-auto max-w-md md:max-w-md text-left md:text-right z-10"
      >
        <p className="text-base sm:text-lg md:text-base text-white/90 font-body leading-relaxed">
          The intersection of cinematic aesthetics and conversion engineering. We build digital experiences that feel illegal to <strong className="text-white font-bold">ignore.</strong>
        </p>
      </motion.div>

      {/* Awards - Bottom Left - Mobile: Below description, Desktop: Bottom left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.8, duration: 1.5 }}
        className="absolute top-[calc(100vh-100px)] md:top-auto md:bottom-12 left-6 md:left-6 lg:left-12 z-10"
      >
        <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center gap-4 md:gap-6 lg:gap-8">
          {/* Award 1 - Awwwards */}
          <div className="flex flex-col items-start">
            <div className="text-white/60 text-[10px] sm:text-[10px] uppercase tracking-widest mb-1">Awwwards</div>
            <div className="text-white text-xs sm:text-xs font-bold">Honorable Mention</div>
          </div>
          
          {/* Award 2 - CSS Design Awards */}
          <div className="flex flex-col items-start">
            <div className="text-white/60 text-[10px] sm:text-[10px] uppercase tracking-widest mb-1">CSS Design Awards</div>
            <div className="text-white text-xs sm:text-xs font-bold">Site of the Day</div>
          </div>
          
          {/* Award 3 - Clutch */}
          <div className="flex flex-col items-start">
            <div className="text-white/60 text-[10px] sm:text-[10px] uppercase tracking-widest mb-1">Clutch</div>
            <div className="text-white text-xs sm:text-xs font-bold">Top Agency 2024</div>
          </div>
          
          {/* Award 4 - FWA */}
          <div className="flex flex-col items-start">
            <div className="text-white/60 text-[10px] sm:text-[10px] uppercase tracking-widest mb-1">FWA</div>
            <div className="text-white text-xs sm:text-xs font-bold">Site of the Day</div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator - Center Bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 3.5, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-kaal-muted hover:text-white transition-colors z-10"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  );
};

export default Hero;
