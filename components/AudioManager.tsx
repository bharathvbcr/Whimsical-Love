import React, { useEffect } from 'react';
import { useExperience } from './AutoScrollContext';
import { useContent } from '../contexts/ContentContext';

/**
 * AudioManager - Invisible component that manages the hidden audio element
 * and wires it to the ExperienceContext's audioRef.
 */
export const AudioManager: React.FC = () => {
    const { audioRef } = useExperience();
    const { music } = useContent();

    // This component renders a hidden audio element and links it to the context
    return (
        <audio
            ref={audioRef}
            loop
            preload="auto"
            src={music.url}
            className="hidden"
        />
    );
};
