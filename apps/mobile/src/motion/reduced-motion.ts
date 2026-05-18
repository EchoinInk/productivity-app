import { useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';

let reducedMotionCache: boolean | null = null;

export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    if (reducedMotionCache !== null) {
      setReducedMotion(reducedMotionCache);
      return;
    }
    
    // Check for system reduced motion preference
    // In a real implementation, this would check AccessibilityInfo
    // For now, defaulting to false
    const checkReducedMotion = async () => {
      // Placeholder for actual reduced motion check
      setReducedMotion(false);
    };
    
    checkReducedMotion();
  }, []);
  
  return reducedMotion;
};

export const shouldReduceMotion = (forceReduceMotion?: boolean): boolean => {
  if (forceReduceMotion !== undefined) return forceReduceMotion;
  return reducedMotionCache ?? false;
};

export const setReducedMotionPreference = (prefersReduced: boolean) => {
  reducedMotionCache = prefersReduced;
};
