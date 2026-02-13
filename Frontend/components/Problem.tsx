
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy, Target, TrendingUp } from 'lucide-react';

const Problem: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);

  const problems = [
    {
      title: 'Generic Design',
      desc: 'Looking like everyone else is the fastest way to be forgotten in a saturated market.',
      icon: <Copy size={24} className="text-kaal-accent" />
    },
    {
      title: 'Weak Positioning',
      desc: "If your message is for everyone, it's for no one. We refine your core narrative.",
      icon: <Target size={24} className="text-kaal-accent" />
    },
    {
      title: 'No Conversion Strategy',
      desc: 'Traffic without conversion is just vanity. We build websites that drive ROI.',
      icon: <TrendingUp size={24} className="text-kaal-accent" />
    }
  ];

  return (
    <section 
      ref={ref}
      className="relative py-32 px-6 md:px-12 bg-transparent overflow-hidden min-h-screen flex items-center"
    >
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y: backgroundY, opacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-kaal-accent/5 rounded-full blur-[120px]" />
      </motion.div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight"
          >
            Most websites look fine.<br />
            <motion.span 
              className="text-kaal-muted"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              They just don&apos;t perform.
            </motion.span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((p, idx) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: idx * 0.15,
                duration: 0.6,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group glass p-10 rounded-3xl relative overflow-hidden border border-white/10 hover:border-kaal-accent/30 transition-all duration-500 cursor-pointer z-[3]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <motion.div 
                className="mb-8 w-14 h-14 flex items-center justify-center bg-transparent rounded-2xl border border-white/10 group-hover:scale-110 transition-transform duration-500"
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {p.icon}
              </motion.div>

              <h3 className="text-2xl font-display font-bold mb-4 group-hover:text-white transition-colors">{p.title}</h3>
              <p className="text-kaal-muted leading-relaxed group-hover:text-white/80 transition-colors">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;
