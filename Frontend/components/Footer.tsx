
import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="relative py-24 md:py-28 px-6 md:px-12 bg-transparent border-t border-kaal-border overflow-hidden">
      {/* Massive Cinematic Text Background */}
      <div className="absolute bottom-0 left-0 w-full leading-none select-none pointer-events-none opacity-5">
        <h1 className="text-[20vw] font-display font-bold text-center text-white">KAAL</h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Massive CTA */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-8xl font-display font-bold leading-[0.9] mb-6">
            Let's build something<br />
            <span className="text-kaal-accent italic">legendary</span>.
          </h2>
          <p className="text-kaal-muted text-lg md:text-xl font-body mb-8 max-w-md mx-auto">
            If you're serious about growth, let's talk.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-black px-12 py-6 rounded-full text-xl font-body font-bold hover:bg-kaal-accent hover:text-white transition-colors"
          >
            Start Your Project
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-kaal-border pt-16">
          <div className="md:col-span-2">
            <a href="#" className="text-3xl font-display font-bold tracking-tighter text-kaal-text mb-6 block">
              KAAL<span className="text-kaal-accent">.</span>
            </a>
            <p className="text-kaal-muted max-w-sm font-body leading-relaxed mb-8 text-lg">
              Cinematic web design for ambitious brands ready to scale beyond the noise.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-kaal-muted font-body hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">X (Twitter)</a>
              <a href="#" className="text-kaal-muted font-body hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">LinkedIn</a>
              <a href="#" className="text-kaal-muted font-body hover:text-white transition-colors uppercase tracking-[0.2em] text-[10px] font-bold">Instagram</a>
            </div>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-kaal-text font-display font-bold mb-6">Menu</h5>
            <ul className="space-y-4">
              <li><a href="#work" className="text-kaal-muted font-body hover:text-kaal-accent text-sm transition-colors">Work</a></li>
              <li><a href="#process" className="text-kaal-muted font-body hover:text-kaal-accent text-sm transition-colors">Process</a></li>
              <li><a href="#services" className="text-kaal-muted font-body hover:text-kaal-accent text-sm transition-colors">Services</a></li>
              <li><a href="#contact" className="text-kaal-muted font-body hover:text-kaal-accent text-sm transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-kaal-text font-display font-bold mb-6">Connect</h5>
            <ul className="space-y-4">
              <li><a href="#" className="text-kaal-muted font-body hover:text-kaal-accent text-sm transition-colors">Strategy Call</a></li>
              <li><a href="#" className="text-kaal-muted font-body hover:text-kaal-accent text-sm transition-colors">Newsletters</a></li>
              <li><a href="#" className="text-kaal-muted font-body hover:text-kaal-accent text-sm transition-colors">Case Studies</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-kaal-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-kaal-muted font-body font-medium">
          <p>© 2024 KAAL STUDIO. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
