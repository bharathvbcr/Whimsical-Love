import React, { useEffect } from 'react';
import { useExperience } from './AutoScrollContext';
import { useContent } from '../hooks/useContent';

/**
 * AudioManager - Invisible component that manages the hidden audio element
 * and wires it to the ExperienceContext's audioRef.
 */
export const AudioManager: React.FC = () => {
    const { audioRef, customAudioUrl } = useExperience();
    const { musicConfig } = useContent();

    const currentUrl = customAudioUrl || musicConfig.url;

    // This component renders a hidden audio element and links it to the context
    return (
        <audio
            ref={audioRef}
            loop
            preload="auto"
            src={currentUrl}
            className="hidden"
        />
    );
};
