import React, { useRef, useEffect, useState } from 'react';
import { useIsDesktopPointer, useReducedMotion } from '../hooks/useReducedMotion';

interface InkSwirlProps {
  className?: string;
}

const InkSwirl: React.FC<InkSwirlProps> = ({ className = '' }) => {
  const hasFinePointer = useIsDesktopPointer();
  const { isMobile } = useReducedMotion();
  const isDesktop = hasFinePointer && !isMobile;
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
    color: string;
    brightness: number;
  }>>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!isDesktop) return;
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

    // Mouse tracking - create long spark trails (throttled)
    let lastMouseMoveTime = 0;
    const throttleDelay = 25; // Create sparks more frequently for denser trails
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseMoveTime < throttleDelay) {
        return;
      }
      lastMouseMoveTime = now;
      
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // More sparks per movement with higher dispersion
      const sparkCount = Math.random() * 6 + 6; // 6–12 sparks per movement
      for (let i = 0; i < Math.floor(sparkCount); i++) {
        // Full 360° random angle for wide dispersion
        const angle = Math.random() * Math.PI * 2;
        // Variable speed for more spread (some fast, some slow)
        const speed = (Math.random() * 1.2 + 0.4) * 0.6; // 0.24–0.96 px/frame
        
        // All white sparks
        const brightness = 0.85 + Math.random() * 0.15;
        
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 28, // Larger random offset for dispersion
          y: e.clientY + (Math.random() - 0.5) * 28,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
          life: 0,
          maxLife: Math.random() * 200 + 350,
          color: '#FFFFFF',
          brightness
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw spark trails
      particlesRef.current = particlesRef.current.filter(particle => {
        particle.life++;
        
        // Very slow movement with slight gravity
        particle.vy += 0.02; // Minimal gravity
        
        // Very slow velocity decay (maintains trail)
        particle.vx *= 0.99;
        particle.vy *= 0.99;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Gradual fade out for long trails
        const lifeRatio = particle.life / particle.maxLife;
        const alpha = (1 - Math.pow(lifeRatio, 0.8)) * particle.brightness;
        
        if (alpha <= 0) return false;

        // Draw spark with long trail glow effect
        // Create radial gradient for spark glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 4
        );
        
        // Bright center with gradual fade for trail effect
        const hexAlpha = Math.floor(alpha * 255).toString(16).padStart(2, '0');
        const hexAlphaHalf = Math.floor(alpha * 0.5 * 255).toString(16).padStart(2, '0');
        const hexAlphaQuarter = Math.floor(alpha * 0.25 * 255).toString(16).padStart(2, '0');
        
        gradient.addColorStop(0, `${particle.color}${hexAlpha}`);
        gradient.addColorStop(0.3, `${particle.color}${hexAlphaHalf}`);
        gradient.addColorStop(0.7, `${particle.color}${hexAlphaQuarter}`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw bright core spark
        ctx.fillStyle = `${particle.color}${hexAlpha}`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

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
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ mixBlendMode: 'screen', zIndex: 0, pointerEvents: 'none' }}
    />
  );
};

export default InkSwirl;
