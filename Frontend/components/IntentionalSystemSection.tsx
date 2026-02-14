import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSTEM_NODES } from '../constants';

const IntentionalSystemSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Subtle auto-rotate when nothing selected
  useEffect(() => {
    if (activeId !== null) return;
    const t = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.2) % 360);
    }, 50);
    return () => clearInterval(t);
  }, [activeId]);

  const radius = isDesktop ? 140 : 100;
  const nodes = SYSTEM_NODES;

  const getPosition = (index: number) => {
    const angle = (index / nodes.length) * 360 + rotationAngle;
    const rad = (angle * Math.PI) / 180;
    return {
      x: radius * Math.cos(rad),
      y: radius * Math.sin(rad),
    };
  };

  const activeNode = activeId ? nodes.find((n) => n.id === activeId) : null;

  return (
    <section
      id="work"
      className="relative w-full min-h-screen bg-transparent overflow-hidden py-24 px-6 md:px-12"
    >
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
            Design Should Feel <span className="text-kaal-accent italic">Intentional</span>.
          </h2>
          <p className="text-kaal-muted text-xl font-body mt-6 max-w-2xl mx-auto">
            Every element should earn its place.
          </p>
          <p className="text-kaal-muted text-base font-body mt-4">
            The system behind every build:
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-full max-w-2xl mx-auto min-h-[320px] md:min-h-[380px] flex items-center justify-center"
        >
          <div className="relative w-full h-full flex items-center justify-center" style={{ minHeight: 320 }}>
            {/* Circle ring */}
            <div
              className="absolute rounded-full border border-white/10"
              style={{
                width: radius * 2,
                height: radius * 2,
              }}
            />

            {nodes.map((node, index) => {
              const pos = getPosition(index);
              const isActive = activeId === node.id;

              return (
                <motion.button
                  key={node.id}
                  type="button"
                  className="absolute flex flex-col items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-kaal-accent rounded-full transition-colors"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(isActive ? null : node.id);
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                      isActive
                        ? 'bg-kaal-accent border-kaal-accent text-white'
                        : 'bg-black/60 border-white/30 text-white/90 hover:border-kaal-accent/50'
                    }`}
                  >
                    <span className="text-xs font-display font-bold uppercase">
                      {node.title.slice(0, 2)}
                    </span>
                  </div>
                  <span
                    className={`mt-2 text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap ${
                      isActive ? 'text-kaal-accent' : 'text-white/70'
                    }`}
                  >
                    {node.title}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Expanding description area */}
        <motion.div
          layout
          className="mt-12 md:mt-16 min-h-[120px] flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            {activeNode ? (
              <motion.div
                key={activeNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="text-center max-w-lg mx-auto px-4"
              >
                <h3 className="text-kaal-accent font-display font-bold text-xl md:text-2xl mb-3">
                  {activeNode.title}
                </h3>
                <p className="text-white/90 font-body text-lg leading-relaxed">
                  {activeNode.line1}
                  <br />
                  {activeNode.line2}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-kaal-muted text-sm font-body"
              >
                Click a node to explore.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default IntentionalSystemSection;
