import React from 'react';
import { motion } from 'framer-motion';
import { ThreeDPrincipleCarousel } from './ui/3d-carousel';
import { PRINCIPLES } from '../constants';

const Testimonials3D: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-transparent overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Engineered with <span className="text-kaal-accent">Intention</span>.
          </h2>
          <p className="text-kaal-muted text-lg font-body mt-4">
            Every decision is deliberate.<br />
            Every build is measured.
          </p>
          <p className="text-kaal-muted text-base font-body mt-6 max-w-2xl mx-auto">
            Design is emotional. Execution is deliberate.
          </p>
          <p className="text-kaal-muted text-base font-body mt-3 max-w-2xl mx-auto">
            Every project is built on clear principles — not trends, not templates, not guesswork.
          </p>
        </motion.div>

        <div className="relative z-[3] h-[400px] md:h-[600px]">
          <ThreeDPrincipleCarousel principles={PRINCIPLES} />
        </div>

        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center border-y border-kaal-border py-12 items-center justify-items-center">
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
