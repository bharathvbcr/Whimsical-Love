import React, { useEffect } from 'react';
import { useExperience } from './AutoScrollContext';

/**
 * ExitConfirmation Component
 * 
 * Adds a browser-native confirmation dialog when user tries to leave the page
 * during the proposal experience. This prevents accidental navigation away.
 */
export const ExitConfirmation: React.FC = () => {
    const { hasStarted } = useExperience();

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // Only show confirmation if the experience has started
            if (!hasStarted) return;

            // Standard way to trigger beforeunload dialog
            e.preventDefault();
            // For older browsers
            e.returnValue = 'Wait! Are you sure you want to leave? This moment is special...';
            return e.returnValue;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [hasStarted]);

    // This component doesn't render anything visible
    return null;
};
