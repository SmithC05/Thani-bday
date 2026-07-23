import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

/**
 * GiftBox Component
 * A premium multi-layered asset component for the Opening Experience.
 * Relies on absolute positioning of distinct PNG layers (base, lid, ribbon, glow).
 */
export const GiftBox = forwardRef(({ 
  className, 
  isIdleAnimating = false, 
  isOpening = false 
}, ref) => {

  // Floating idle animation variants
  const floatVariants = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 0.5, -0.5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    opening: {
      y: 0,
      rotate: 0,
    }
  };

  // Pulse glow inside the box when "alive"
  const glowVariants = {
    alive: {
      opacity: [0, 0.6, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: 'reverse'
      }
    },
    static: { opacity: 0 }
  };

  return (
    <motion.div 
      ref={ref}
      className={cn("relative w-64 h-64 md:w-80 md:h-80 cursor-pointer", className)}
      variants={floatVariants}
      animate={isOpening ? "opening" : "idle"}
      whileHover={!isOpening ? { scale: 1.05 } : {}}
      whileTap={!isOpening ? { scale: 0.95 } : {}}
    >
      {/* Single Box Image with radial mask to fade out hard edges */}
      <img 
        src="/images/gift-assets/gift-box.png" 
        alt="Luxury Gift Box" 
        className="absolute inset-0 w-full h-full object-contain mix-blend-lighten drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] gift-single"  
        style={{
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 70%)'
        }}
      />
    </motion.div>
  );
});

GiftBox.displayName = 'GiftBox';
