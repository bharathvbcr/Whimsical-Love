import React, { createContext, useContext, useState, useCallback, useRef, RefObject } from 'react';

interface ExperienceContextType {
    // Scroll state (from original AutoScrollContext)
    isPlaying: boolean;
    togglePlay: () => void;
    setIsPlaying: (playing: boolean) => void;
    isScrollPaused: boolean;
    registerPause: (id: string) => void;
    unregisterPause: (id: string) => void;

    // Music state (unified)
    isMusicPlaying: boolean;
    audioRef: RefObject<HTMLAudioElement | null>;

    // Master control
    hasStarted: boolean;
    startExperience: () => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Scroll state
    const [isPlaying, setIsPlayingState] = useState(false);
    const [pausers, setPausers] = useState<Set<string>>(new Set());

    // Music state
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Master state
    const [hasStarted, setHasStarted] = useState(false);

    const setIsPlaying = (playing: boolean) => setIsPlayingState(playing);
    const togglePlay = () => setIsPlayingState(prev => !prev);

    const registerPause = useCallback((id: string) => {
        setPausers(prev => {
            const newSet = new Set(prev);
            newSet.add(id);
            return newSet;
        });
    }, []);

    const unregisterPause = useCallback((id: string) => {
        setPausers(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
        });
    }, []);

    const isScrollPaused = pausers.size > 0;

    /**
     * Master entry point - starts both music and auto-scroll together.
     * This ensures the user interaction satisfies browser autoplay policies.
     */
    const startExperience = useCallback(() => {
        setHasStarted(true);

        // Start music
        if (audioRef.current) {
            audioRef.current.volume = 0;
            audioRef.current.play()
                .then(() => {
                    // Fade in the volume
                    let vol = 0;
                    const fadeIn = setInterval(() => {
                        vol += 0.05;
                        if (audioRef.current && vol <= 0.7) {
                            audioRef.current.volume = vol;
                        } else {
                            clearInterval(fadeIn);
                        }
                    }, 50);
                    setIsMusicPlaying(true);
                })
                .catch(e => console.log("Audio play prevented:", e));
        }

        // Start auto-scroll
        setIsPlayingState(true);
    }, []);

    return (
        <ExperienceContext.Provider value={{
            isPlaying,
            togglePlay,
            setIsPlaying,
            isScrollPaused,
            registerPause,
            unregisterPause,
            isMusicPlaying,
            audioRef,
            hasStarted,
            startExperience,
        }}>
            {children}
        </ExperienceContext.Provider>
    );
};

export const useExperience = () => {
    const context = useContext(ExperienceContext);
    if (!context) throw new Error("useExperience must be used within ExperienceProvider");
    return context;
};

// Backward compatibility alias for existing components using useAutoScroll
export const useAutoScroll = useExperience;
export const AutoScrollProvider = ExperienceProvider;