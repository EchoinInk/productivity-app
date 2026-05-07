/**
 * Lumo Animation Utilities
 * 
 * Centralized animation definitions and utilities for consistent performance
 * and maintainability across the application.
 */

// Animation durations (in ms)
export const DURATIONS = {
  fast: 150,
  normal: 250,
  slow: 350,
  slower: 500,
} as const;

// Animation easing functions
export const EASING = {
  easeOut: 'ease-out',
  easeIn: 'ease-in',
  easeInOut: 'ease-in-out',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
} as const;

// Keyframe animations
export const KEYFRAMES = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  fadeInUp: {
    from: { opacity: 0, transform: 'translateY(10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  fadeInDown: {
    from: { opacity: 0, transform: 'translateY(-10px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
  },
  slideInRight: {
    from: { opacity: 0, transform: 'translateX(20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  slideInLeft: {
    from: { opacity: 0, transform: 'translateX(-20px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
  },
  scaleIn: {
    from: { opacity: 0, transform: 'scale(0.95)' },
    to: { opacity: 1, transform: 'scale(1)' },
  },
  pulse: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0.7 },
  },
} as const;

// Predefined animation configs
export const ANIMATIONS = {
  // Page transitions
  pageTransition: {
    duration: DURATIONS.normal,
    easing: EASING.easeOut,
    keyframes: KEYFRAMES.fadeInUp,
  },
  
  // Component animations
  componentFadeIn: {
    duration: DURATIONS.fast,
    easing: EASING.easeOut,
    keyframes: KEYFRAMES.fadeIn,
  },
  
  // Card animations
  cardEntrance: {
    duration: DURATIONS.normal,
    easing: EASING.easeOut,
    keyframes: KEYFRAMES.fadeInUp,
  },
  
  // Button interactions
  buttonPress: {
    duration: DURATIONS.fast,
    easing: EASING.easeOut,
    keyframes: KEYFRAMES.scaleIn,
  },
  
  // Modal animations
  modalEntrance: {
    duration: DURATIONS.normal,
    easing: EASING.easeOut,
    keyframes: KEYFRAMES.scaleIn,
  },
  
  // List item animations
  listItemSlide: {
    duration: DURATIONS.fast,
    easing: EASING.easeOut,
    keyframes: KEYFRAMES.slideInRight,
  },
  
  // Loading animations
  loadingPulse: {
    duration: 1500,
    easing: EASING.easeInOut,
    keyframes: KEYFRAMES.pulse,
  },
} as const;

// CSS animation utility functions
export const createAnimationString = (config: typeof ANIMATIONS[keyof typeof ANIMATIONS]): string => {
  const { duration, easing } = config;
  return `${duration}ms ${easing}`;
};

// React animation utility for CSS-in-JS
export const createAnimationProps = (config: typeof ANIMATIONS[keyof typeof ANIMATIONS]) => ({
  style: {
    animation: `${createAnimationString(config)}`,
    animationFillMode: 'forwards' as const,
  },
});

// Stagger animation utilities for lists
export const createStaggeredDelay = (index: number, baseDelay: number = 50): number => {
  return index * baseDelay;
};

// Performance-optimized animation hooks
export const useOptimizedAnimation = (config: typeof ANIMATIONS[keyof typeof ANIMATIONS]) => {
  return {
    style: {
      animation: `${createAnimationString(config)}`,
      animationFillMode: 'forwards' as const,
      willChange: 'transform, opacity' as const,
    },
  };
};

// Tailwind animation classes (mapped to our tokens)
export const TAILWIND_ANIMATIONS = {
  fadeIn: 'animate-[fadeIn_0.45s_ease-out]',
  fadeInUp: 'animate-[fadeInUp_0.25s_ease-out]',
  fadeInDown: 'animate-[fadeInDown_0.25s_ease-out]',
  slideInRight: 'animate-[slideInRight_0.15s_ease-out]',
  slideInLeft: 'animate-[slideInLeft_0.15s_ease-out]',
  scaleIn: 'animate-[scaleIn_0.25s_ease-out]',
  pulse: 'animate-[pulse_1.5s_ease-in-out_infinite]',
} as const;

// Animation performance utilities
export const ANIMATION_PERFORMANCE = {
  // Hardware acceleration hints
  hardwareAccelerate: {
    transform: 'translateZ(0)',
    backfaceVisibility: 'hidden' as const,
    perspective: 1000,
  },
  
  // Reduce motion for accessibility
  prefersReducedMotion: '@media (prefers-reduced-motion: reduce)',
  
  // Performance monitoring
  shouldAnimate: () => {
    // Check if user prefers reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  },
} as const;

export type AnimationConfig = typeof ANIMATIONS[keyof typeof ANIMATIONS];
export type TailwindAnimation = keyof typeof TAILWIND_ANIMATIONS;
