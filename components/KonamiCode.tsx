import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export const KonamiCode: React.FC = () => {
    const { features } = useContent();
    const [input, setInput] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

    const konamiCode = [
        'ArrowUp', 'ArrowUp',
        'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight',
        'ArrowLeft', 'ArrowRight',
        'b', 'a'
    ];

    useEffect(() => {
        if (!features?.enableKonami) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            const newInput = [...input, e.key];

            // Keep only the last N keys where N is the length of Konami Code
            if (newInput.length > konamiCode.length) {
                newInput.shift();
            }

            setInput(newInput);

            // Check if the input matches the Konami Code
            if (newInput.join('').toLowerCase() === konamiCode.join('').toLowerCase()) {
                triggerEasterEgg();
                setInput([]); // Reset after success
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [input, features.enableKonami]);

    const triggerEasterEgg = () => {
        const duration = 5000;
        const end = Date.now() + duration;

        setShowModal(true);

        (function frame() {
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#fb7185', '#fda4af', '#f43f5e', '#ec4899', '#db2777']
            });
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#fb7185', '#fda4af', '#f43f5e', '#ec4899', '#db2777']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };

    if (!features?.enableKonami) return null;

    return (
        <AnimatePresence>
            {showModal && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowModal(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="relative bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-rose-100 text-center"
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="mx-auto w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mb-6"
                        >
                            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
                        </motion.div>

                        <h3 className="font-script text-4xl text-rose-900 mb-4">Secret Message!</h3>

                        <p className="text-slate-600 text-lg leading-relaxed italic">
                            "{features.konamiSecretMessage}"
                        </p>

                        <div className="mt-8 pt-6 border-t border-rose-50">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-rose-200 transition-all hover:scale-105"
                            >
                                Close with Love
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
