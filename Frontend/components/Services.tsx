import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SERVICES } from '../constants';
import { Check } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { shouldReduceMotion } = useReducedMotion();
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
      className="relative py-28 md:py-40 px-6 md:px-12 bg-transparent overflow-hidden flex items-center"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-kaal-accent/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-md mx-auto relative z-10">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
            Work <span className="text-kaal-accent">Together</span>.
          </h2>
          <p className="text-kaal-muted text-lg mt-4">
            A focused, strategy-led website experience.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-6 md:p-8"
        >
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
            {service.title}
          </h3>
          <p className="text-kaal-muted font-body text-base md:text-lg leading-relaxed mb-8">
            {service.description}
          </p>

          <h4 className="text-xs uppercase tracking-widest text-kaal-muted font-bold mb-4">
            What's Included
          </h4>
          <ul className="space-y-3 mb-8">
            {service.features?.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-white/90 font-body text-base">
                <Check size={18} className="text-kaal-accent shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          <div className="pt-6 border-t border-white/10">
            <p className="text-xs uppercase tracking-widest text-kaal-muted font-bold mb-2">
              Investment
            </p>
            <p className="text-kaal-accent font-display font-bold text-2xl md:text-3xl">
              {service.price}
            </p>
            {service.delivery && (
              <p className="text-kaal-muted text-base font-body mt-2">
                {service.delivery}
              </p>
            )}
            <a
              href="#contact"
              className="mt-6 w-full py-4 rounded-xl text-center block font-bold text-base border border-kaal-accent/50 bg-kaal-accent/10 text-white hover:bg-kaal-accent hover:border-kaal-accent transition-all"
            >
              Start Your Project
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
