import { createContext, useContext } from 'react';
import { useDateLock } from '../hooks/useDateLock';

const TimeContext = createContext(null);

export function TimeProvider({ children }) {
  // Use our hyper-smooth date lock hook
  const timeState = useDateLock();

  return (
    <TimeContext.Provider value={timeState}>
      {children}
    </TimeContext.Provider>
  );
}

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) throw new Error('useTime must be used within a TimeProvider');
  return context;
};
