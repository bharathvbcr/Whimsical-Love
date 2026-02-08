import React from 'react';
import { Hero } from './components/Hero';
import { Logo } from './components/Logo';
import { ProposalConfigProvider } from './components/ProposalConfig';
import { PreviewBanner } from './components/PreviewBanner';
import { FloatingBackground } from './components/FloatingElements';
import { QualitiesSection } from './components/QualitiesSection';
import { TimeSection } from './components/TimeSection';
import { ProposalFooter } from './components/ProposalFooter';
import { MemoryTimeline } from './components/MemoryTimeline';
import { StickyNotes } from './components/StickyNotes';
import { PromiseSection } from './components/PromiseSection';
import { FutureGallery } from './components/FutureGallery';
import { CursorTrail } from './components/CursorTrail';
import { MusicPlayer } from './components/MusicPlayer';
import { ScratchCard } from './components/ScratchCard';
import { ConstellationSection } from './components/ConstellationSection';
import { DateNightSpinner } from './components/DateNightSpinner';
import { RecipeSection } from './components/RecipeSection';
import { FuturePostcard } from './components/FuturePostcard';
import { JourneyMap } from './components/JourneyMap';
import { StoryBook } from './components/StoryBook';
import { GrainOverlay } from './components/GrainOverlay';
import { LoveQuiz } from './components/LoveQuiz';
import { GardenSection } from './components/GardenSection';
import { AutoScrollController } from './components/AutoScrollController';
import { AutoScrollProvider } from './components/AutoScrollContext';
import { BeginOverlay } from './components/BeginOverlay';
import { AudioManager } from './components/AudioManager';
import { ShareButton } from './components/ShareButton';
import { PhotoGallery } from './components/PhotoGallery';
import { ExitConfirmation } from './components/ExitConfirmation';
import { ContentProvider } from './contexts/ContentContext';
import { motion, useScroll, useSpring } from 'framer-motion';

const WaveDividerTop = ({ fill = "fill-white" }: { fill?: string }) => (
    <div className="w-full overflow-hidden leading-[0] rotate-180">
        <svg className={`relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px] ${fill}`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
    </div>
);

const WaveDividerBottom = ({ fill = "fill-white" }: { fill?: string }) => (
    <div className="w-full overflow-hidden leading-[0]">
        <svg className={`relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px] ${fill}`} data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
    </div>
);

const App: React.FC = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <ProposalConfigProvider>
            <ContentProvider>
                <AutoScrollProvider>
                    {/* Hidden audio element managed by context */}
                    <AudioManager />

                    <div className="min-h-screen relative bg-rose-50 selection:bg-rose-200 cursor-default">
                        {/* Preview Mode Banner */}
                        <PreviewBanner />

                        {/* App Logo */}
                        <Logo className="fixed top-6 left-6 z-40" />

                        {/* Cinematic Grain Overlay */}
                        <GrainOverlay />

                        {/* Progress Bar */}
                        <motion.div
                            className="fixed top-0 left-0 right-0 h-1 bg-rose-400 origin-left z-50"
                            style={{ scaleX }}
                        />

                        {/* Begin Experience Overlay */}
                        <BeginOverlay />

                        {/* Global FX */}
                        <CursorTrail />
                        <MusicPlayer />
                        <AutoScrollController />
                        <ExitConfirmation />

                        {/* Ambient Background Animation */}
                        <FloatingBackground />

                        {/* Main Content */}
                        <main className="relative z-10">
                            {/* 1. Intro - Love at First Sight */}
                            <Hero />

                            <div className="relative">
                                {/* Transition Gradient from Hero */}
                                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/0 to-slate-100/0 pointer-events-none"></div>

                                {/* 2. Narrative Start */}
                                <StoryBook />

                                {/* 3. The History */}
                                <MemoryTimeline />

                                {/* Our Photos */}
                                <PhotoGallery />

                                <WaveDividerBottom fill="fill-white" />
                                <JourneyMap />

                                {/* 4. The Present - Qualities & Little Things */}
                                <div className="bg-white">
                                    <QualitiesSection />
                                </div>

                                <WaveDividerTop fill="fill-white" />
                                <StickyNotes />

                                {/* 5. Fun & Connection */}
                                <LoveQuiz />

                                <WaveDividerBottom fill="fill-orange-50" />
                                <RecipeSection />

                                {/* 6. Deepening - Time & Universe */}
                                <WaveDividerTop fill="fill-orange-50" />
                                <TimeSection />

                                <WaveDividerBottom fill="fill-slate-900" />
                                <ConstellationSection />

                                {/* 7. The Vows */}
                                <WaveDividerTop fill="fill-rose-900" />
                                <div className="bg-rose-900">
                                    <PromiseSection />
                                </div>

                                {/* 8. The Future */}
                                <WaveDividerBottom fill="fill-rose-900" />
                                <FuturePostcard />

                                <WaveDividerBottom fill="fill-slate-50" />
                                <FutureGallery />

                                {/* 9. Building Together */}
                                <WaveDividerTop fill="fill-slate-50" />
                                <GardenSection />

                                {/* 10. Fun Future */}
                                <WaveDividerBottom fill="fill-rose-50" />
                                <DateNightSpinner />

                                {/* 11. Final Secret */}
                                <WaveDividerTop fill="fill-rose-50" />
                                <ScratchCard />

                            </div>

                            {/* 12. The Proposal */}
                            <ProposalFooter />
                            <ShareButton />
                        </main>
                    </div>
                </AutoScrollProvider>
            </ContentProvider>
        </ProposalConfigProvider>
    );
};

export default App;