
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PROJECTS } from '../constants';

const HorizontalGallery: React.FC = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0, 0, -50]);

  return (
    <section id="work" ref={targetRef} className="relative h-[300vh] bg-transparent">
      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-kaal-border z-[150]">
        <motion.div
          style={{ scaleX: scrollYProgress }}
          className="h-full bg-kaal-accent origin-left"
        />
      </div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <motion.div 
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute top-12 left-6 md:left-12 z-20"
        >
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tighter"
          >
            Signature <span className="text-kaal-accent">Work</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-kaal-muted text-sm uppercase tracking-widest mt-4"
          >
            Scroll to explore →
          </motion.p>
        </motion.div>

        <motion.div style={{ x }} className="flex gap-12 pl-[10vw] items-center">
          {PROJECTS.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] flex-shrink-0 group"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-transparent border border-white/10 z-[3]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-8 left-8 right-8">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-kaal-accent text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                      <h3 className="text-3xl md:text-4xl font-display font-bold">{project.title}</h3>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl md:text-3xl font-display font-bold text-kaal-success">{project.result}</span>
                      <p className="text-[10px] text-kaal-muted uppercase tracking-widest mt-1">Growth Outcome</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-kaal-muted text-lg font-body leading-relaxed max-w-lg mb-6">
                  {project.description}
                </p>
                <button className="flex items-center gap-2 group/btn text-kaal-text font-body font-bold uppercase tracking-widest text-sm hover:text-kaal-accent transition-colors">
                  View Case Study
                  <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HorizontalGallery;
