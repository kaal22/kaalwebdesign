import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Animated3DObject: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{
        perspective: '1000px',
        perspectiveOrigin: 'center center',
      }}
    >
      {/* Rotating 3D Cube */}
      <motion.div
        className="relative"
        style={{
          width: '256px',
          height: '256px',
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: 360,
          rotateX: 15,
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        {/* Front Face */}
        <div
          className="absolute border-2 border-kaal-accent/50 bg-kaal-accent/10 backdrop-blur-sm"
          style={{
            width: '256px',
            height: '256px',
            transform: 'translateZ(128px)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-kaal-accent text-4xl font-bold">K</div>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute border-2 border-white/20 bg-white/5 backdrop-blur-sm"
          style={{
            width: '256px',
            height: '256px',
            transform: 'translateZ(-128px) rotateY(180deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white/30 text-4xl font-bold">K</div>
          </div>
        </div>

        {/* Right Face */}
        <div
          className="absolute border-2 border-kaal-accent/30 bg-kaal-accent/5 backdrop-blur-sm"
          style={{
            width: '256px',
            height: '256px',
            transform: 'rotateY(90deg) translateZ(128px)',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Left Face */}
        <div
          className="absolute border-2 border-white/20 bg-white/5 backdrop-blur-sm"
          style={{
            width: '256px',
            height: '256px',
            transform: 'rotateY(-90deg) translateZ(128px)',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Top Face */}
        <div
          className="absolute border-2 border-kaal-accent/40 bg-kaal-accent/10 backdrop-blur-sm"
          style={{
            width: '256px',
            height: '256px',
            transform: 'rotateX(90deg) translateZ(128px)',
            transformStyle: 'preserve-3d',
          }}
        />

        {/* Bottom Face */}
        <div
          className="absolute border-2 border-white/20 bg-white/5 backdrop-blur-sm"
          style={{
            width: '256px',
            height: '256px',
            transform: 'rotateX(-90deg) translateZ(128px)',
            transformStyle: 'preserve-3d',
          }}
        />
      </motion.div>

      {/* Floating particles/orbs around the cube */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full bg-kaal-accent/40 blur-sm"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [
              Math.cos((i * Math.PI * 2) / 6) * 150,
              Math.cos((i * Math.PI * 2) / 6) * 180,
              Math.cos((i * Math.PI * 2) / 6) * 150,
            ],
            y: [
              Math.sin((i * Math.PI * 2) / 6) * 150,
              Math.sin((i * Math.PI * 2) / 6) * 180,
              Math.sin((i * Math.PI * 2) / 6) * 150,
            ],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Glow effect */}
      <div 
        className="absolute inset-0 blur-3xl pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 77, 26, 0.2) 0%, transparent 70%)',
        }}
      />
    </div>
  );
};

export default Animated3DObject;
