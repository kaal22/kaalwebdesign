import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';
import { Check } from 'lucide-react';

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const service = SERVICES[0];

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

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
            Ways to <span className="text-kaal-accent italic">Elevate</span>.
          </h2>
          <p className="text-kaal-muted text-xl max-w-2xl mx-auto leading-relaxed mb-4">
            One focused way to work together.
          </p>
          <p className="text-kaal-muted text-lg">
            Clear scope. Clear timeline. Clear outcomes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          className="glass p-8 md:p-12 rounded-3xl border border-white/10 z-[3]"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold mb-6 text-kaal-accent">
            {service.title}
          </h3>
          <p className="text-kaal-muted font-body leading-relaxed mb-10 text-lg">
            {service.description}
          </p>

          <h4 className="text-sm uppercase tracking-widest text-kaal-muted font-bold mb-6">
            What You Get
          </h4>
          <ul className="space-y-3 mb-10">
            {service.features?.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3 text-kaal-text font-body">
                <Check size={18} className="text-kaal-accent shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {service.tagline && (
            <p className="text-white/90 font-body italic mb-10 border-l-2 border-kaal-accent pl-6">
              {service.tagline}
            </p>
          )}

          <div className="pt-8 border-t border-kaal-border">
            <p className="text-xs uppercase tracking-widest text-kaal-muted font-bold mb-2">
              Investment
            </p>
            <p className="text-kaal-accent font-display font-bold text-2xl md:text-3xl mb-8">
              {service.price}
            </p>
            <a
              href="#contact"
              className="w-full py-4 rounded-xl text-center block font-bold border border-kaal-border hover:bg-kaal-accent hover:text-white hover:border-transparent transition-all"
            >
              Inquire Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
