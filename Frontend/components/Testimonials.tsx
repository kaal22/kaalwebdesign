
import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
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
          <h2 className="text-4xl md:text-5xl font-display font-bold">Trusted by <span className="text-kaal-accent">Ambitious</span> Founders.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-10 rounded-3xl relative border border-white/10 hover:border-kaal-accent/20 transition-colors z-[3]"
            >
              <div className="flex gap-1 mb-6 text-kaal-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>

              <p className="text-kaal-text text-lg italic leading-relaxed mb-8">
                "{t.content}"
              </p>

              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border border-white/10" />
                <div>
                  <h4 className="font-bold text-lg leading-none">{t.name}</h4>
                  <p className="text-kaal-muted text-sm font-medium mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border-y border-kaal-border py-12">
          <div>
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">45+</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Projects Shipped</span>
          </div>
          <div>
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">14%</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Avg. Conversion Lift</span>
          </div>
          <div>
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">4wks</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Launch Timeline</span>
          </div>
          <div>
            <span className="block text-4xl font-display font-bold text-kaal-accent mb-2">100%</span>
            <span className="text-xs uppercase tracking-widest text-kaal-muted font-bold">Founder Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
