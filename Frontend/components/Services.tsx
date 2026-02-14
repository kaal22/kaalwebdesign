
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={ref}
      id="services" 
      className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden min-h-screen flex items-center"
    >
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: backgroundY, opacity: backgroundOpacity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
              Ways to <span className="text-kaal-accent italic">Elevate</span>.
            </h2>
            <p className="text-kaal-muted text-xl max-w-xl leading-relaxed">
              Three ways to work together. Clear scope. Clear outcomes.
            </p>
          </motion.div>
          <div className="hidden lg:block text-right">
            <div className="flex items-center gap-2 justify-end mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kaal-success opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-kaal-success"></span>
              </span>
              <p className="text-kaal-text font-body font-bold text-sm tracking-widest uppercase">Available for projects</p>
            </div>
            <span className="text-xs text-kaal-muted uppercase tracking-widest">Q3 Openings Remaining</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((s, idx) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: idx * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="group relative p-1 rounded-3xl bg-transparent hover:bg-gradient-to-br hover:from-kaal-accent hover:to-purple-600 transition-all duration-500"
            >
              <div className="glass h-full p-10 rounded-[22px] flex flex-col bg-transparent backtrop-blur-xl z-[3]">
                <h3 className="text-3xl font-display font-bold mb-6 group-hover:text-kaal-accent transition-colors">{s.title}</h3>
                <p className="text-kaal-muted font-body leading-relaxed mb-12 flex-grow text-lg">
                  {s.description}
                </p>
                <div className="pt-8 border-t border-kaal-border mt-auto">
                  <div className="flex items-end justify-between mb-8">
                    <span className="block text-kaal-accent font-display font-bold text-2xl">{s.price}</span>
                  </div>
                  <a
                    href="#contact"
                    className="w-full py-4 rounded-xl text-center block font-bold border border-kaal-border group-hover:bg-kaal-accent group-hover:text-white group-hover:border-transparent transition-all"
                  >
                    Inquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
