import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYSTEM_NODES } from '../constants';
import { useReducedMotion } from '../hooks/useReducedMotion';

const IntentionalSystemSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const { shouldReduceMotion, isMobile, prefersReducedMotion } = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Auto-rotate when nothing selected - only off for prefers-reduced-motion; slower on mobile
  useEffect(() => {
    if (activeId !== null || prefersReducedMotion) return;
    const step = isMobile ? 0.12 : 0.3;
    const t = setInterval(() => {
      setRotationAngle((prev) => (prev + step) % 360);
    }, 50);
    return () => clearInterval(t);
  }, [activeId, prefersReducedMotion, isMobile]);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setActiveId(null);
    }
  };

  const nodes = SYSTEM_NODES;
  // Smaller wheel on mobile so it fits and doesn’t dominate the screen
  const circleRadius = isDesktop ? 320 : 100;
  const iconSize = isDesktop ? 56 : 32;
  const iconOffset = iconSize / 2 + 8;
  const radius = circleRadius + iconOffset;
  const svgSize = isDesktop ? 640 : 240;
  const svgCenter = svgSize / 2;

  const isRotating = activeId === null && !prefersReducedMotion;
  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radian = (angle * Math.PI) / 180;
    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);
    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );
    return { x, y, zIndex, opacity };
  };

  return (
    <section
      id="work"
      className="relative w-full min-h-screen bg-transparent overflow-hidden py-28 md:py-40 px-6 md:px-12"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8 }}
          className="relative z-20 mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
            Design Should Feel <span className="text-kaal-accent">Intentional</span>.
          </h2>
          <p className="text-kaal-muted text-xl font-body mt-6 max-w-2xl">
            Every element should earn its place.
          </p>
          <p className="text-kaal-muted text-base font-body mt-4">
            The system behind every build:
          </p>
        </motion.div>

        <div className="relative w-full max-w-4xl mx-auto min-h-[280px] sm:min-h-[340px] md:min-h-[500px] lg:min-h-[600px] flex items-center justify-center overflow-visible">
          <div
            ref={orbitRef}
            className="absolute w-full h-full flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            {/* Center core - same style as original wheel; no pulse on mobile */}
            <motion.div
              className="absolute w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-kaal-accent via-orange-500 to-red-500 flex items-center justify-center z-10"
              animate={shouldReduceMotion ? { scale: 1 } : { scale: [1, 1.1, 1] }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity }}
            >
              <div className={`absolute w-20 h-20 md:w-28 md:h-28 rounded-full border border-kaal-accent/20 opacity-70 ${shouldReduceMotion ? '' : 'animate-ping'}`} />
              <div
                className={`absolute w-24 h-24 md:w-36 md:h-36 rounded-full border border-kaal-accent/10 opacity-50 ${shouldReduceMotion ? '' : 'animate-ping'}`}
                style={{ animationDelay: '0.5s' }}
              />
              <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/80 backdrop-blur-md" />
            </motion.div>

            {/* Orbital ring - SVG */}
            <svg
              className="absolute"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: svgSize,
                height: svgSize,
              }}
              viewBox={`0 0 ${svgSize} ${svgSize}`}
            >
              <circle
                cx={svgCenter}
                cy={svgCenter}
                r={circleRadius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="1"
              />
            </svg>

            {/* Nodes */}
            {nodes.map((node, index) => {
              const pos = calculateNodePosition(index, nodes.length);
              const isExpanded = activeId === node.id;

              const nodeStyle = {
                transform: `translate(calc(50% + ${pos.x}px - ${iconOffset}px), calc(50% + ${pos.y}px - ${iconOffset}px))`,
                transformOrigin: 'center center',
                zIndex: isExpanded ? 200 : pos.zIndex,
                opacity: isExpanded ? 1 : pos.opacity,
              };

              return (
                <div
                  key={node.id}
                  className={`absolute cursor-pointer ${isRotating ? 'transition-none' : 'transition-all duration-300'}`}
                  style={nodeStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveId(isExpanded ? null : node.id);
                  }}
                >
                  {/* Node circle with title visible */}
                  <motion.div
                    className={`
                      w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center border-2
                      ${isExpanded
                        ? 'bg-kaal-accent border-kaal-accent text-white shadow-lg shadow-kaal-accent/30 scale-125'
                        : 'bg-transparent text-kaal-text border-white/40 hover:border-kaal-accent/50'
                      }
                    `}
                    whileHover={shouldReduceMotion ? undefined : { scale: 1.2 }}
                  >
                    <span className="text-[10px] sm:text-xs md:text-sm font-display font-bold">
                      {node.title.slice(0, 1)}
                    </span>
                  </motion.div>

                  {/* Node title below circle (backup if text doesn't fit in circle on small screens) */}
                  <div
                    className={`
                      absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider
                      ${isExpanded ? 'text-kaal-accent' : 'text-white/70'}
                    `}
                  >
                    {node.title}
                  </div>

                  {/* Mini popout with description */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.8, y: shouldReduceMotion ? 0 : 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
                        className="absolute top-14 sm:top-20 left-1/2 -translate-x-1/2 w-64 sm:w-72 z-[3] rounded-2xl bg-black/90 backdrop-blur-lg border border-white/20 shadow-xl shadow-kaal-accent/10 overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-px h-2 bg-kaal-accent/50" />
                        <div className="p-4">
                          <h4 className="font-display font-bold text-sm text-kaal-accent mb-2">
                            {node.title}
                          </h4>
                          <p className="text-xs text-white/90 font-body leading-relaxed">
                            {node.line1}
                            <br />
                            {node.line2}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntentionalSystemSection;
