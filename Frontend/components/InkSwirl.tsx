import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface InkSwirlProps {
  className?: string;
}

const InkSwirl: React.FC<InkSwirlProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    life: number;
    maxLife: number;
    angle: number;
    angularVelocity: number;
  }>>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Create new particles at mouse position - fluid ink effect
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 0.2 + 0.08) * 0.5; // Very slow initial speed
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 30 + 25,
          life: 0,
          maxLife: Math.random() * 120 + 180, // Longer lifetime for ink effect
          angle: Math.random() * Math.PI * 2,
          angularVelocity: (Math.random() - 0.5) * 0.003 // Very slow rotation
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles with fluid ink dissipation
      particlesRef.current = particlesRef.current.filter(particle => {
        // Fluid-like motion - particles spread outward and swirl
        particle.life++;
        
        // Update angle for swirling motion
        particle.angle += particle.angularVelocity;
        
        // Create flowing, organic movement like ink in water
        const flowAngle = particle.life * 0.004 + particle.angle; // Very slow flow
        const flowStrength = 0.02 * (1 - particle.life / particle.maxLife); // Minimal flow strength
        
        // Add curl-like flow pattern (simulating fluid dynamics)
        const curlX = Math.cos(flowAngle) * flowStrength;
        const curlY = Math.sin(flowAngle) * flowStrength;
        
        // Update velocity with flow
        particle.vx += curlX;
        particle.vy += curlY;
        
        // Decay velocity gradually (like viscosity) - very slow decay for smooth trails
        particle.vx *= 0.995;
        particle.vy *= 0.995;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Gradually increase size as ink spreads (like diffusion)
        const spreadFactor = 1 + (particle.life / particle.maxLife) * 0.5;
        const currentSize = particle.size * spreadFactor;

        // Fade out as life increases
        const alpha = 1 - Math.pow(particle.life / particle.maxLife, 1.5);
        
        if (alpha <= 0) return false;

        // Draw ink swirl effect with more organic shape
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, currentSize
        );
        
        // Orange accent color with smooth fade
        gradient.addColorStop(0, `rgba(255, 107, 0, ${alpha * 0.4})`);
        gradient.addColorStop(0.2, `rgba(255, 77, 26, ${alpha * 0.25})`);
        gradient.addColorStop(0.5, `rgba(255, 107, 0, ${alpha * 0.15})`);
        gradient.addColorStop(0.8, `rgba(139, 69, 19, ${alpha * 0.08})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      // No automatic background swirls - only cursor-following trail

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ mixBlendMode: 'screen', zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default InkSwirl;
