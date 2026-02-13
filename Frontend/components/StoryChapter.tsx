import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StoryChapterProps {
  children: React.ReactNode;
  chapterNumber: number;
  title: string;
  className?: string;
  showTitle?: boolean;
}

const StoryChapter: React.FC<StoryChapterProps> = ({ 
  children, 
  chapterNumber, 
  title,
  className = '',
  showTitle = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <motion.section
      ref={ref}
      className={`relative ${className}`}
    >
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] ${
          chapterNumber % 2 === 0 ? 'bg-kaal-accent/5' : 'bg-purple-900/5'
        }`} />
      </motion.div>

      {/* Chapter Indicator */}
      {showTitle && (
        <motion.div 
          className="absolute top-12 left-6 md:left-12 z-10"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <span className="text-kaal-accent text-sm font-bold tracking-widest uppercase">
              Chapter {chapterNumber}
            </span>
            <div className="h-px w-20 bg-kaal-accent/30" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-display font-bold text-white"
          >
            {title}
          </motion.h2>
        </motion.div>
      )}

      <div className="relative z-10">
        {children}
      </div>
    </motion.section>
  );
};

export default StoryChapter;
