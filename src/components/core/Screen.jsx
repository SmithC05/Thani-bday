import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Screen Shell
 * 
 * Represents a full-viewport cinematic scene. Usually managed by AnimatePresence.
 */
export function Screen({ children, className, ...props }) {
  return (
    <div 
      className={cn("relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center", className)}
      {...props}
    >
      {children}
    </div>
  );
}
