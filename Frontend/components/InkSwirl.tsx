import React, { useRef, useEffect, useState } from 'react';

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
    color: string;
    brightness: number;
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

    // Mouse tracking - create long spark trails (throttled)
    let lastMouseMoveTime = 0;
    const throttleDelay = 50; // Only create sparks every 50ms (half the frequency)
    
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastMouseMoveTime < throttleDelay) {
        return; // Skip if too soon since last spark creation
      }
      lastMouseMoveTime = now;
      
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Create fewer particles - reduced by half
      const sparkCount = Math.random() * 2 + 1.5; // 1.5-3.5 sparks per movement (rounded down)
      for (let i = 0; i < Math.floor(sparkCount); i++) {
        // Random angle for spark direction - more spread out
        const angle = Math.random() * Math.PI * 2;
        // Slow initial velocity for long trails
        const speed = (Math.random() * 0.8 + 0.3) * 0.5; // Very slow: 0.15-0.55 pixels per frame
        
        // Only orange and white sparks
        const colorOptions = [
          { color: '#FFFFFF', brightness: 0.9 }, // White
          { color: '#FF6B00', brightness: 0.8 },  // Kaal accent orange
          { color: '#FF9800', brightness: 0.7 },  // Bright orange
        ];
        const selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
        
        particlesRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 8, // Slight random offset
          y: e.clientY + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2, // Slightly larger sparks: 2-6px
          life: 0,
          maxLife: Math.random() * 200 + 300, // Long lifetime: 300-500 frames for trails
          color: selectedColor.color,
          brightness: selectedColor.brightness
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
