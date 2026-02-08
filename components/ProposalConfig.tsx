import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ProposalConfig {
    // Timing settings
    typewriterSpeed: number; // ms per character
    scrollSpeed: number; // pixels per frame

    // Preview mode
    previewMode: boolean;

    // Feature flags
    enableAutoplay: boolean;

    // Interactive states (to reset)
    resetKey: number;
}

interface ProposalConfigContextType {
    config: ProposalConfig;
    setTypewriterSpeed: (speed: number) => void;
    setScrollSpeed: (speed: number) => void;
    isPreviewMode: boolean;
    resetAllStates: () => void;
}

const defaultConfig: ProposalConfig = {
    typewriterSpeed: 50,
    scrollSpeed: 0.8,
    previewMode: false,
    enableAutoplay: false,
    resetKey: 0,
};

const ProposalConfigContext = createContext<ProposalConfigContextType | null>(null);

export const useProposalConfig = () => {
    const context = useContext(ProposalConfigContext);
    if (!context) {
        // Return default values if used outside provider (for compatibility)
        return {
            config: defaultConfig,
            setTypewriterSpeed: () => { },
            setScrollSpeed: () => { },
            isPreviewMode: false,
            resetAllStates: () => { },
        };
    }
    return context;
};

interface ProposalConfigProviderProps {
    children: ReactNode;
}

export const ProposalConfigProvider: React.FC<ProposalConfigProviderProps> = ({ children }) => {
    // Check URL for preview mode
    const urlParams = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search)
        : new URLSearchParams();
    const isPreviewFromUrl = urlParams.get('preview') === 'true';

    const isAutoplayFromUrl = urlParams.get('autoplay') === 'true';

    const [config, setConfig] = useState<ProposalConfig>({
        ...defaultConfig,
        previewMode: isPreviewFromUrl,
        enableAutoplay: isAutoplayFromUrl,
    });

    const setTypewriterSpeed = useCallback((speed: number) => {
        setConfig(prev => ({ ...prev, typewriterSpeed: speed }));
    }, []);

    const setScrollSpeed = useCallback((speed: number) => {
        setConfig(prev => ({ ...prev, scrollSpeed: speed }));
    }, []);

    const resetAllStates = useCallback(() => {
        // Increment resetKey to force all components to remount/reset
        setConfig(prev => ({
            ...prev,
            resetKey: prev.resetKey + 1
        }));
    }, []);

    const value: ProposalConfigContextType = {
        config,
        setTypewriterSpeed,
        setScrollSpeed,
        isPreviewMode: config.previewMode,
        resetAllStates,
    };

    return (
        <ProposalConfigContext.Provider value={value}>
            {children}
        </ProposalConfigContext.Provider>
    );
};
