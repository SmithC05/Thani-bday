import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Reusable Section Shell
 */
export function Section({ children, className, id, ...props }) {
  return (
    <section 
      id={id}
      className={cn("min-h-screen w-full flex flex-col items-center justify-center py-24", className)}
      {...props}
    >
      {children}
    </section>
  );
}
