import React from 'react';
import { motion } from 'framer-motion';
import { ThreeDTestimonialCarousel } from './ui/3d-carousel';
import { TESTIMONIALS } from '../constants';

const Testimonials3D: React.FC = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-transparent overflow-hidden relative">
        <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Trusted by <span className="text-kaal-accent">Ambitious</span> Founders.
          </h2>
          <p className="text-kaal-muted text-lg font-body mt-4">
            Design that moves metrics — not just pixels.
          </p>
        </motion.div>

        <div className="relative z-[3] h-[400px] md:h-[600px]">
          <ThreeDTestimonialCarousel testimonials={TESTIMONIALS} />
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-kaal-border py-12">
          <div>
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">45+</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Projects Delivered</span>
          </div>
          <div>
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">4</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Weeks Average Launch</span>
          </div>
          <div>
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">100%</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Custom Design</span>
          </div>
          <div>
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">0</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Templates Used</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials3D;
