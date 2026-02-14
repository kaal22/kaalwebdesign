
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PROCESS_STEPS } from '../constants';

const ProcessTimeline: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section 
      ref={ref}
      id="process" 
      className="relative py-28 md:py-40 px-6 md:px-12 bg-transparent overflow-hidden min-h-screen flex items-center"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-6">
            The Path to <span className="text-kaal-accent">Clarity</span>.
          </h2>
          <p className="text-kaal-muted text-xl font-body max-w-2xl mx-auto">
            A focused process. No chaos. No guesswork.
          </p>
        </motion.div>

        <div className="relative">
          {/* Animated Vertical Line */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-kaal-border to-transparent overflow-hidden">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-gradient-to-b from-kaal-accent via-kaal-accent/50 to-transparent"
            />
          </div>

          <div className="space-y-24">
            {PROCESS_STEPS.map((step, idx) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col md:flex-row items-start md:items-center ${
                  idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="w-full md:w-1/2 mb-8 md:mb-0">
                  <div className={`flex flex-col ${idx % 2 === 0 ? 'md:items-end md:text-right' : 'md:items-start md:text-left'} px-0 md:px-16`}>
                    <span className="text-kaal-accent text-6xl font-display font-bold opacity-20 mb-2">{step.number}</span>
                    <h3 className="text-3xl font-display font-bold mb-4">{step.title}</h3>
                    <p className="text-kaal-muted font-body leading-relaxed max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Animated Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 200 }}
                  className="absolute left-0 md:left-1/2 -translate-x-[7px] md:-translate-x-1/2 w-4 h-4 rounded-full bg-kaal-accent border-4 border-black z-10 shadow-[0_0_15px_rgba(255,77,26,0.6)]"
                />

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
