import React from 'react';
import { motion } from 'framer-motion';
import { ThreeDPrincipleCarousel } from './ui/3d-carousel';
import { PRINCIPLES } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Testimonials3D: React.FC = () => {
  const { shouldReduceMotion } = useReducedMotion();
  return (
    <section className="py-20 sm:py-24 md:py-40 px-6 md:px-12 bg-transparent overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-8 sm:mb-12 relative z-10"
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold">
            Engineered with <span className="text-kaal-accent">Intention</span>.
          </h2>
          <p className="text-kaal-muted text-lg font-body mt-4">
            Every decision is deliberate.<br />
            Every build is measured.
          </p>
          <p className="text-kaal-muted text-base font-body mt-4 sm:mt-6 max-w-2xl mx-auto">
            Design is emotional. Execution is deliberate.
          </p>
          <p className="text-kaal-muted text-sm sm:text-base font-body mt-2 sm:mt-3 max-w-2xl mx-auto hidden sm:block">
            Every project is built on clear principles — not trends, not templates, not guesswork.
          </p>
        </motion.div>

        <div className="relative z-[3] h-[300px] sm:h-[380px] md:h-[600px]">
          <ThreeDPrincipleCarousel principles={PRINCIPLES} />
        </div>

        <div className="mt-16 sm:mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center border-y border-kaal-border py-8 sm:py-12 items-center justify-items-center">
          <div className="flex flex-col items-center">
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">4</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Weeks Average Launch</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">100%</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Custom Design</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">0</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Templates Used</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials3D;
