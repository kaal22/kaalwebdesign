
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-12 flex items-center justify-between ${scrolled ? 'py-4 bg-kaal-bg/80 backdrop-blur-xl border-b border-kaal-border/50' : 'py-6 md:py-8 bg-transparent'
          }`}
      >
        <a href="#" className="relative z-50 text-2xl font-display font-bold tracking-tighter text-kaal-text group mix-blend-difference">
          KAAL<span className="text-kaal-accent transition-all group-hover:text-white">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-kaal-muted hover:text-white transition-colors group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-kaal-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#contact"
            className="group relative px-6 py-2.5 rounded-full overflow-hidden bg-white text-black transition-all hover:scale-105 active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2 text-sm font-bold">
              Let's Talk <ArrowUpRight size={16} />
            </span>
            <div className="absolute inset-0 bg-kaal-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              Let's Talk <ArrowUpRight size={16} />
            </span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 text-white mix-blend-difference"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-kaal-bg flex flex-col justify-center items-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.1 }}
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-bold text-kaal-text hover:text-kaal-accent transition-colors"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => setMobileMenuOpen(false)}
              className="mt-8 px-8 py-4 bg-kaal-accent text-white rounded-full text-xl font-bold"
            >
              Start Project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
