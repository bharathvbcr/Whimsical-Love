import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as defaultContent from '../content';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';

// Type inference from the default content
type ContentType = typeof defaultContent;

interface ContentState {
    isLoading: boolean;
    isCustom: boolean;
    content: ContentType;
}

// The context type includes all exports from content.ts plus the state fields
export type ContentContextType = ContentType & ContentState;

export const ContentContext = createContext<ContentContextType | null>(null);

interface ContentProviderProps {
    children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
    const [content, setContent] = useState<ContentType>(defaultContent);
    const [isLoading, setIsLoading] = useState(true);
    const [isCustom, setIsCustom] = useState(false);

    useEffect(() => {
        const loadContent = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const proposalId = urlParams.get('p');

            if (proposalId) {
                try {
                    console.log('Fetching proposal:', proposalId);
                    const docRef = doc(db, 'proposals', proposalId);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        const mergedContent = { ...defaultContent };

                        if (data.personalization) mergedContent.personalization = { ...mergedContent.personalization, ...data.personalization };
                        if (data.storyPages) mergedContent.storyPages = data.storyPages;
                        if (data.timelineEvents) mergedContent.timelineEvents = data.timelineEvents;
                        if (data.promises) mergedContent.promises = data.promises;
                        if (data.stickyNotes) mergedContent.stickyNotes = data.stickyNotes;
                        if (data.qualities) mergedContent.qualities = data.qualities;
                        if (data.journeyMilestones) mergedContent.journeyMilestones = data.journeyMilestones;
                        if (data.musicConfig) mergedContent.musicConfig = { ...mergedContent.musicConfig, ...data.musicConfig };
                        if (data.themeConfig) mergedContent.themeConfig = { ...mergedContent.themeConfig, ...data.themeConfig };
                        if (data.photoMemories) mergedContent.photoMemories = data.photoMemories;

                        setContent(mergedContent);
                        setIsCustom(true);

                        if (analytics) {
                            logEvent(analytics, 'view_custom_proposal', { proposal_id: proposalId });
                        }
                    } else {
                        console.warn('Proposal not found, using default content');
                        if (analytics) {
                            logEvent(analytics, 'view_default_proposal', { reason: 'not_found' });
                        }
                    }
                } catch (error) {
                    console.error('Error loading proposal:', error);
                    if (analytics) {
                        logEvent(analytics, 'error_loading_proposal', { error: String(error) });
                    }
                }
            } else {
                // Try fetching local config from public/proposal.config.json
                try {
                    const response = await fetch('/proposal.config.json');
                    if (response.ok) {
                        const localData = await response.json();
                        const mergedLocalContent = { ...defaultContent };

                        if (localData.personalization) mergedLocalContent.personalization = { ...mergedLocalContent.personalization, ...localData.personalization };
                        if (localData.themeConfig) mergedLocalContent.themeConfig = { ...mergedLocalContent.themeConfig, ...localData.themeConfig };
                        if (localData.musicConfig) mergedLocalContent.musicConfig = { ...mergedLocalContent.musicConfig, ...localData.musicConfig };

                        setContent(mergedLocalContent);
                        setIsCustom(true);
                        console.log('Loaded local configuration');
                    }
                } catch (e) {
                    console.log('No local config found or failed to load');
                }

                if (analytics) {
                    logEvent(analytics, 'view_default_proposal', { reason: 'no_id' });
                }
            }
            setIsLoading(false);
        };

        loadContent();
    }, []);

    // Apply theme CSS variables whenever themeConfig changes
    useEffect(() => {
        const primaryColor = content.themeConfig.primaryColor as keyof typeof defaultContent.themes;
        const themeVars = defaultContent.themes[primaryColor] || defaultContent.themes.rose;

        const root = document.documentElement;
        Object.entries(themeVars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, [content.themeConfig.primaryColor]);

    // Create a wrapper object that matches the export structure of content.ts
    // so consuming components can destructure it easily: const { personalization } = useContent();
    const value = {
        personalization: content.personalization,
        features: content.features || defaultContent.features, // Ensure fallback
        themeConfig: content.themeConfig,
        photoMemories: content.photoMemories,
        journeyMilestones: content.journeyMilestones,
        storyPages: content.storyPages,
        timelineEvents: content.timelineEvents,
        promises: content.promises,
        stickyNotes: content.stickyNotes,
        qualities: content.qualities,
        musicConfig: content.musicConfig,
        content,
        isLoading,
        isCustom
    };

    return (
        <ContentContext.Provider value={value as any}>
            {children}
        </ContentContext.Provider>
    );
};
