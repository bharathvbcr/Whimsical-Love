import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import * as defaultContent from '../content';
import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../lib/firebase';

// Type inference from the default content
type ContentType = typeof defaultContent;

interface ContentContextType {
    content: ContentType;
    isLoading: boolean;
    isCustom: boolean;
}

const ContentContext = createContext<ContentContextType | null>(null);

export const useContent = () => {
    const context = useContext(ContentContext);
    if (!context) {
        throw new Error('useContent must be used within a ContentProvider');
    }
    return context;
};

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
                        // Deep merge specific sections if needed, or replace entire sections
                        // For now we'll assume the data structure matches content.ts exports
                        // We might need to map fields if they are stored differently

                        // NOTE: This implementation assumes the stored data matches the structure 
                        // of the exports in content.ts. You might need parsers here.

                        // Since content.ts exports multiple named exports, we need to handle them.
                        // Ideally, we store them as a single JSON object in Firestore.

                        // Merging strategy:
                        const mergedContent = { ...defaultContent };

                        if (data.personalization) mergedContent.personalization = { ...mergedContent.personalization, ...data.personalization };
                        if (data.storyPages) mergedContent.storyPages = data.storyPages; // Arrays are usually replaced
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
                if (analytics) {
                    logEvent(analytics, 'view_default_proposal', { reason: 'no_id' });
                }
            }
            setIsLoading(false);
        };

        loadContent();
    }, []);

    // Create a wrapper object that matches the export structure of content.ts
    // so consuming components can destructure it easily: const { personalization } = useContent();
    const value = {
        ...content, // Spread the content object so properties are top-level
        content,    // Also provide the full object if needed
        isLoading,
        isCustom
    };

    return (
        <ContentContext.Provider value={value as any}>
            {children}
        </ContentContext.Provider>
    );
};
