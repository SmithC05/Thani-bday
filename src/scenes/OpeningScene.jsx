import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useAudioController } from '../hooks/useAudioController';
import { useScene } from '../context/SceneContext';
import { GiftBox } from '../components/ui/GiftBox';
import { Typography } from '../components/core/Typography';
import { Screen } from '../components/core/Screen';
import { useInteraction } from '../hooks/useInteraction';

/**
 * Opening Scene
 * The cinematic entrance to the birthday experience.
 * Features the "Alive" idle animation and the freezing tap interaction.
 */
export function OpeningScene() {
  const { playTrack, playSfx } = useAudioController();
  const { next } = useScene();
  const { safeTap } = useInteraction(5000); // Prevent multi-tap during 5s intro animation

  const [isOpening, setIsOpening] = useState(false);
  const [isPaused, setIsPaused] = useState(false); // Freezes background particles
  const [isAliveState, setIsAliveState] = useState(false); // Triggers idle glow
  
  const sceneRef = useRef(null);
  const giftRef = useRef(null);

  // The Gift is Alive Loop
  useEffect(() => {
    if (isOpening) return;

    // Every 25 seconds, the gift tries to get attention
    const idleInterval = setInterval(() => {
      setIsAliveState(true);
      playSfx('sparkle');
      
      // Gentle GSAP shake/tilt
      gsap.to(giftRef.current, {
        rotation: 2,
        duration: 0.1,
        yoyo: true,
        repeat: 3,
        ease: "power1.inOut"
      });

      // Reset alive state after glow pulse completes
      setTimeout(() => setIsAliveState(false), 2000);
    }, 25000);

    return () => clearInterval(idleInterval);
  }, [isOpening, playSfx]);

  const handleTap = safeTap(() => {
    if (isOpening) return;
    setIsOpening(true);
    
    // 1. The Freeze (Particles stop, suspense builds)
    setIsPaused(true);
    
    // Tiny shrink for tactile feedback
    gsap.to(giftRef.current, { scale: 0.9, duration: 0.2, ease: "power2.out" });

    // 2. The Burst (0.2s dramatic pause finishes)
    setTimeout(() => {
      setIsPaused(false); // Unfreeze particles
      playSfx('heartbeat'); // Bass thump
      playTrack('intro'); // Start main music

      // GSAP Choreography Timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Proceed to Handwriting sequence
          next();
        }
      });

      // Burst: Box scales up massively, blurs, and fades out into the stars
      tl.to(giftRef.current, { 
        scale: 3, 
        opacity: 0, 
        filter: 'blur(20px)',
        duration: 1.5, 
        ease: "power2.inOut" 
      }, 0);
      
      // Fade out the scene container to fully hand off to the next component
      tl.to(sceneRef.current, { opacity: 0, duration: 0.5 }, 1.2);

    }, 200); // 0.2s freeze duration
  });

  return (
    <Screen ref={sceneRef} className="bg-transparent transition-colors">
      <div className="z-10 flex flex-col items-center justify-center space-y-16 mt-12">
        <div onClick={handleTap}>
          <GiftBox 
            ref={giftRef} 
            isIdleAnimating={isAliveState} 
            isOpening={isOpening} 
          />
        </div>
        
        {/* Subtle hint text that fades out upon interaction */}
        <div className={`transition-opacity duration-1000 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
          <Typography variant="caption" className="animate-pulse opacity-50">
            Awaits
          </Typography>
        </div>
      </div>
    </Screen>
  );
}
