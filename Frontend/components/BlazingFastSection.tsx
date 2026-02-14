import React from 'react';
import { motion } from 'framer-motion';

const BlazingFastSection: React.FC = () => {
  return (
    <section className="py-28 md:py-40 px-6 md:px-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Blazing Fast. <span className="text-kaal-accent italic">By Design.</span>
            </h2>
            <p className="text-kaal-muted text-lg md:text-xl font-body leading-relaxed mb-8">
              Speed isn't an afterthought.<br />
              It's engineered into every build.
            </p>
            <ul className="space-y-3 mb-8">
              {['Optimised assets.', 'Clean code.', 'Zero bloat.'].map((line, i) => (
                <li key={i} className="text-white/90 font-body text-lg flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-kaal-accent shrink-0" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="text-white/95 font-body text-lg leading-relaxed">
              Built to load instantly — and stay smooth under pressure.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2 relative rounded-2xl w-full p-[3px] flame-border"
          >
            <div className="rounded-2xl overflow-hidden bg-[#000]">
              <img
                src="/blazing-fast-scores-cropped.webp"
                alt="Performance scores — blazing fast by design"
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BlazingFastSection;
