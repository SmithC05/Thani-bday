import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * Reusable Background Engine
 * Persists behind all scenes. Uses a performant HTML5 Canvas for particles and CSS for Aurora.
 */
export function Background({ className, showParticles = true, isPaused = false }) {
  const canvasRef = useRef(null);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationFrameId;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedY = (Math.random() * 0.5) - 0.25;
        this.speedX = (Math.random() * 0.5) - 0.25;
        this.opacity = Math.random() * 0.5;
      }
      update() {
        this.y -= this.speedY;
        this.x -= this.speedX;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
      }
      draw() {
        ctx.fillStyle = `rgba(253, 230, 138, ${this.opacity})`; // gold-light
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 30 : 60;
      for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        if (!isPausedRef.current) p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={cn("fixed inset-0 pointer-events-none -z-10", className)}>
      
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-background" />

      {/* Volumetric Fog / Aurora Gradient */}
      <motion.div 
        className="absolute inset-0 opacity-40 mix-blend-screen"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 70%, rgba(217, 119, 6, 0.2) 0%, transparent 60%)",
            "radial-gradient(circle at 50% 50%, rgba(253, 230, 138, 0.1) 0%, transparent 70%)",
            "radial-gradient(circle at 20% 30%, rgba(217, 119, 6, 0.15) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 20,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      {/* Subtle depth shadow mask to darken edges */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Canvas Particle System (Stars/Dust) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60 mix-blend-screen" 
      />
      
    </div>
  );
}
