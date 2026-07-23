import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Container Shell
 * Restricts maximum width and centers content for optimal reading on large screens.
 */
export function Container({ children, className, ...props }) {
  return (
    <div 
      className={cn("w-full max-w-md mx-auto px-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}
