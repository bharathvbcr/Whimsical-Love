import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, FastForward, Turtle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAutoScroll } from './AutoScrollContext';

export const AutoScrollController: React.FC = () => {
    const { isPlaying, togglePlay, setIsPlaying, isScrollPaused } = useAutoScroll();
    const [speed, setSpeed] = useState(0.8); // Pixels per frame
    const requestRef = useRef<number | null>(null);

    const animate = () => {
        // If external component requested pause (e.g. Book reading), we don't scroll
        // but we stay in "Playing" state
        if (!isScrollPaused) {
            // Check if we reached the bottom (with a small buffer)
            if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 5) {
                setIsPlaying(false);
                return;
            }
            window.scrollBy(0, speed);
        }

        requestRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        if (isPlaying) {
            requestRef.current = requestAnimationFrame(animate);
        } else {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        }
        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [isPlaying, speed, isScrollPaused]);

    // Stop on manual interaction to prevent fighting the user
    useEffect(() => {
        const handleInteraction = () => {
            if (isPlaying) setIsPlaying(false);
        };

        window.addEventListener("wheel", handleInteraction);
        window.addEventListener("touchmove", handleInteraction);
        window.addEventListener("keydown", handleInteraction); // e.g. arrow keys

        return () => {
            window.removeEventListener("wheel", handleInteraction);
            window.removeEventListener("touchmove", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
        };
    }, [isPlaying, setIsPlaying]);

    const changeSpeed = (newSpeed: number) => {
        setSpeed(newSpeed);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-3">
            {/* Speed Controls - Only visible when playing */}
            <AnimatePresence>
                {isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-2 mb-1"
                    >
                        <div className="bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-lg border border-rose-100 flex flex-col gap-1">
                            <button
                                onClick={() => changeSpeed(1.5)}
                                className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium ${speed >= 1.4 ? 'bg-rose-100 text-rose-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                title="Fast"
                            >
                                <FastForward size={16} />
                                <span>Fast</span>
                            </button>
                            <button
                                onClick={() => changeSpeed(1.0)}
                                className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium ${speed >= 0.8 && speed < 1.4 ? 'bg-rose-100 text-rose-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                title="Normal"
                            >
                                <Play size={16} />
                                <span>Normal</span>
                            </button>
                            <button
                                onClick={() => changeSpeed(0.5)}
                                className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm font-medium ${speed < 0.8 ? 'bg-rose-100 text-rose-600' : 'hover:bg-slate-100 text-slate-500'}`}
                                title="Slow"
                            >
                                <Turtle size={16} />
                                <span>Slow</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={togglePlay}
                className={`
                    flex items-center gap-3 px-6 py-4 rounded-full shadow-2xl transition-all duration-300 border-2
                    ${isPlaying
                        ? 'bg-rose-500 text-white border-rose-400 shadow-rose-400/40 ring-4 ring-rose-200'
                        : 'bg-white text-slate-800 border-white shadow-slate-300/40 hover:border-rose-100'}
                `}
            >
                {isPlaying ? (
                    <>
                        {isScrollPaused ? (
                            <div className="flex flex-col items-start">
                                <span className="font-bold font-sans leading-none text-sm">Watching...</span>
                                <span className="text-[10px] opacity-80">Movie Mode</span>
                            </div>
                        ) : (
                            <>
                                <Pause fill="currentColor" size={24} />
                                <span className="font-bold font-sans">Pause</span>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        <Play fill="currentColor" size={24} className="ml-1" />
                        <div className="text-left">
                            <span className="block font-bold font-sans leading-none">Play Movie</span>
                            <span className="text-xs opacity-60 font-medium">Auto-scroll</span>
                        </div>
                    </>
                )}
            </motion.button>
        </div>
    );
};