import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScene } from '../context/SceneContext';
import { vaultConfig, birthdayConfig } from '../config';

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['♡', '0', '⌫'],
];

// ─────────────────────────────────────────────────────────────
// Floating sparkles / hearts in background
// ─────────────────────────────────────────────────────────────
function FloatingHearts() {
  const items = Array.from({ length: 18 });
  const emojis = ['💕', '✨', '🌸', '💗', '⭐', '🩷'];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-sm select-none"
          style={{
            left: `${5 + Math.random() * 90}%`,
            bottom: '-10%',
            opacity: 0,
            fontSize: `${10 + Math.random() * 10}px`,
          }}
          animate={{
            y: [0, -(300 + Math.random() * 300)],
            opacity: [0, 0.5 + Math.random() * 0.4, 0],
            x: [(Math.random() - 0.5) * 40],
            rotate: [(Math.random() - 0.5) * 30],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: 'easeOut',
          }}
        >
          {emojis[i % emojis.length]}
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Bokeh blobs in background
// ─────────────────────────────────────────────────────────────
function BokehBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[
        { w: 320, h: 320, left: '10%', top: '5%',  color: 'rgba(255,182,193,0.25)' },
        { w: 250, h: 250, left: '60%', top: '20%', color: 'rgba(255,160,220,0.2)' },
        { w: 200, h: 200, left: '5%',  top: '55%', color: 'rgba(255,200,230,0.18)' },
        { w: 280, h: 280, left: '65%', top: '60%', color: 'rgba(255,182,193,0.22)' },
        { w: 180, h: 180, left: '40%', top: '75%', color: 'rgba(220,150,200,0.15)' },
      ].map((blob, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: blob.w, height: blob.h,
            left: blob.left, top: blob.top,
            background: blob.color,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 6 + i * 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.8,
          }}
        />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Keypad button
// ─────────────────────────────────────────────────────────────
function KeyButton({ label, onPress, disabled }) {
  const isAction = label === '⌫' || label === '♡';
  return (
    <motion.button
      className={`flex items-center justify-center rounded-2xl select-none touch-none focus:outline-none
        ${isAction
          ? 'bg-white/20 text-pink-300/80'
          : 'bg-white/30 text-rose-900/80 shadow-[0_4px_16px_rgba(255,150,180,0.18)]'
        }`}
      style={{
        height: 60,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.45)',
        fontSize: isAction ? 20 : 24,
        fontFamily: isAction ? 'inherit' : "'Playfair Display', serif",
        fontWeight: 300,
      }}
      whileTap={!disabled ? { scale: 0.9, boxShadow: '0 0 20px rgba(255,150,180,0.4)' } : {}}
      whileHover={!disabled ? { scale: 1.04, backgroundColor: 'rgba(255,255,255,0.45)' } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={() => !disabled && onPress(label)}
      disabled={disabled}
    >
      {label}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────
export function SecretVault() {
  const { next } = useScene();
  const [pin, setPin] = useState('');
  const [status, setStatus] = useState('idle'); // idle | wrong | correct | dissolving
  const [shaking, setShaking] = useState(false);
  const [burstHearts, setBurstHearts] = useState(false);

  const handleKey = useCallback((label) => {
    if (status === 'correct' || status === 'dissolving') return;

    if (label === '⌫') {
      setPin(p => p.slice(0, -1));
      if (status === 'wrong') setStatus('idle');
      return;
    }
    if (label === '♡') return; // decorative

    const digit = label;
    const newPin = (pin + digit).slice(0, 4);
    setPin(newPin);

    if (newPin.length === 4) {
      if (newPin === vaultConfig.secretPin) {
        // ✅ CORRECT
        setStatus('correct');
        setBurstHearts(true);

        setTimeout(() => {
          setStatus('dissolving');
          setTimeout(() => next(), 2000);
        }, 1800);
      } else {
        // ❌ WRONG — soft bounce, no red
        setStatus('wrong');
        setShaking(true);
        setTimeout(() => {
          setShaking(false);
          setPin('');
          setStatus('idle');
        }, 1400);
      }
    }
  }, [pin, status, next]);

  const progress = pin.length;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 30%, #ffeaf2 60%, #fce4ec 100%)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
    >
      <BokehBackground />
      <FloatingHearts />

      {/* Burst hearts on correct */}
      <AnimatePresence>
        {burstHearts && (
          <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{ left: `${30 + Math.random() * 40}%`, top: '55%' }}
                initial={{ opacity: 0, y: 0, scale: 0.5 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  y: -(150 + Math.random() * 200),
                  x: (Math.random() - 0.5) * 150,
                  scale: [0.5, 1.2, 0.8],
                  rotate: (Math.random() - 0.5) * 60,
                }}
                transition={{ duration: 1.5, delay: i * 0.05, ease: 'easeOut' }}
              >
                {['💖', '💕', '✨', '🌸', '💗'][i % 5]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Dissolve overlay */}
      <AnimatePresence>
        {status === 'dissolving' && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,182,193,1) 0%, rgba(255,255,255,0.8) 60%, transparent 100%)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1.5 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      {/* ── Lock Card ── */}
      <motion.div
        className="relative z-10 w-full max-w-xs mx-4"
        animate={shaking ? {
          x: [-8, 8, -6, 6, -4, 4, 0],
        } : { x: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.div
          className="rounded-3xl p-8 flex flex-col items-center gap-6"
          style={{
            background: 'rgba(255,255,255,0.45)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 20px 60px rgba(255,100,150,0.2), 0 4px 20px rgba(255,100,150,0.1)',
          }}
          animate={status === 'correct' ? {
            scale: [1, 1.04, 1],
            boxShadow: ['0 20px 60px rgba(255,100,150,0.2)', '0 20px 80px rgba(255,150,180,0.6)', '0 20px 60px rgba(255,100,150,0.2)'],
          } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Lock icon */}
          <motion.div
            className="text-5xl"
            animate={{ scale: status === 'correct' ? [1, 1.3, 1] : 1 }}
            transition={{ duration: 0.6, ease: 'backOut' }}
          >
            {status === 'correct' ? '💖' : '🔒'}
          </motion.div>

          {/* Title */}
          <div className="text-center">
            <h2
              className="text-rose-700/90 text-xl font-light italic mb-1"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              For {birthdayConfig.nickname} 💕
            </h2>
            <AnimatePresence mode="wait">
              {status === 'wrong' ? (
                <motion.p
                  key="wrong"
                  className="text-rose-400/80 text-sm tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Hmm... try again 💕
                </motion.p>
              ) : status === 'correct' ? (
                <motion.p
                  key="correct"
                  className="text-rose-500/90 text-sm tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  You found it ✨
                </motion.p>
              ) : (
                <motion.p
                  key="idle"
                  className="text-rose-400/60 text-sm tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Unlock your memories ✨
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* PIN dots */}
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{ width: 14, height: 14 }}
                animate={{
                  backgroundColor: i < progress
                    ? status === 'correct'
                      ? 'rgba(236, 72, 153, 0.9)'
                      : status === 'wrong'
                      ? 'rgba(251, 113, 133, 0.7)'
                      : 'rgba(244, 63, 94, 0.8)'
                    : 'rgba(255,182,193,0.3)',
                  boxShadow: i < progress
                    ? status === 'correct'
                      ? '0 0 15px rgba(236,72,153,0.8), 0 0 30px rgba(236,72,153,0.4)'
                      : '0 0 10px rgba(244,63,94,0.5)'
                    : 'none',
                  scale: i < progress ? 1.1 : 1,
                }}
                transition={{ duration: 0.25, type: 'spring', stiffness: 300 }}
              />
            ))}
          </div>

          {/* Keypad */}
          <div className="w-full grid grid-cols-3 gap-3">
            {KEYPAD.map((row, ri) =>
              row.map((key, ci) => (
                <KeyButton
                  key={`${ri}-${ci}`}
                  label={key}
                  onPress={handleKey}
                  disabled={status === 'correct' || status === 'dissolving'}
                />
              ))
            )}
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
