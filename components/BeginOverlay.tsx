import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Play, Sparkles } from 'lucide-react';
import { useExperience } from './AutoScrollContext';

export const BeginOverlay: React.FC = () => {
    const { hasStarted, startExperience } = useExperience();

    return (
        <AnimatePresence>
            {!hasStarted && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-gradient-to-br from-rose-100 via-white to-rose-50 flex flex-col items-center justify-center"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.3, 0.2],
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/4 -left-20 w-96 h-96 bg-rose-200 rounded-full blur-3xl"
                        />
                        <motion.div
                            animate={{
                                scale: [1.2, 1, 1.2],
                                opacity: [0.3, 0.2, 0.3],
                            }}
                            transition={{ duration: 5, repeat: Infinity }}
                            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"
                        />
                    </div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="relative z-10 text-center px-8"
                    >
                        {/* Floating hearts */}
                        <motion.div
                            animate={{ y: [-5, 5, -5] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="inline-block mb-8"
                        >
                            <Heart size={64} className="text-rose-400 fill-rose-400" />
                        </motion.div>

                        <h1 className="font-script text-5xl md:text-7xl text-rose-900 mb-4">
                            A Story For You
                        </h1>
                        <p className="font-sans text-xl text-slate-600 mb-12 max-w-md mx-auto">
                            This is best experienced with sound. Find a quiet moment, and let me show you something special.
                        </p>

                        {/* Start Button */}
                        <motion.button
                            onClick={startExperience}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-rose-500 hover:bg-rose-600 text-white font-sans text-xl font-semibold rounded-full shadow-xl shadow-rose-500/30 transition-all duration-300"
                        >
                            <Play size={24} className="fill-current" />
                            <span>Begin Our Story</span>
                            <Sparkles size={20} className="absolute -top-2 -right-2 text-yellow-300 animate-pulse" />
                        </motion.button>

                        <p className="mt-8 text-sm text-slate-400">
                            Tap anywhere or click the button to start
                        </p>
                    </motion.div>

                    {/* Click anywhere to start */}
                    <div
                        onClick={startExperience}
                        className="absolute inset-0 z-0 cursor-pointer"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
