import { haptic, supportsHaptics } from 'ios-haptics';

export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') => {
  // Respect user preference for reduced motion
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // Use iOS haptics if supported
  if (supportsHaptics) {
    try {
      if (type === 'success') {
        haptic.confirm();
      } else if (type === 'error') {
        haptic.error();
      } else {
        haptic();
      }
    } catch {
      // Ignore if ios-haptics fails
    }
    return;
  }

  // Fallback to standard web vibration API (Android)
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    try {
      switch (type) {
        case 'light':
          navigator.vibrate(15);
          break;
        case 'medium':
          navigator.vibrate(30);
          break;
        case 'heavy':
          navigator.vibrate(50);
          break;
        case 'success':
          navigator.vibrate([20, 40, 20]);
          break;
        case 'error':
          navigator.vibrate([30, 40, 30, 40, 30]);
          break;
        default:
          navigator.vibrate(15);
      }
    } catch {
      // Ignore if navigator.vibrate fails or is restricted
    }
  }
};
