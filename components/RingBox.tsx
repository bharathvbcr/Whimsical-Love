import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface RingBoxProps {
    isOpen: boolean;
    onAnimationComplete?: () => void;
}

export const RingBox: React.FC<RingBoxProps> = ({ isOpen, onAnimationComplete }) => {
    return (
        <div className="relative w-48 h-48 perspective-1000 mx-auto mb-8">
            {/* Box Container */}
            <motion.div
                className="relative w-full h-full"
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Box Base */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-rose-800 to-rose-950 rounded-xl shadow-2xl"
                    animate={{
                        scale: isOpen ? 1 : [1, 1.02, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: isOpen ? 0 : Infinity,
                    }}
                >
                    {/* Velvet Interior - visible when open */}
                    <motion.div
                        className="absolute inset-4 bg-gradient-to-b from-rose-900 to-rose-950 rounded-lg overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isOpen ? 1 : 0 }}
                    >
                        {/* Ring Cushion */}
                        <div className="absolute inset-2 bg-rose-950/50 rounded-lg flex items-center justify-center">
                            {/* The Ring */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isOpen ? 1 : 0,
                                    opacity: isOpen ? 1 : 0,
                                }}
                                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                                className="relative"
                            >
                                {/* Ring Glow */}
                                <motion.div
                                    className="absolute inset-0 bg-yellow-200/60 blur-xl rounded-full"
                                    animate={{
                                        scale: [1, 1.3, 1],
                                        opacity: [0.6, 0.9, 0.6],
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />

                                {/* Ring Band */}
                                <div className="relative w-16 h-16">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <defs>
                                            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#fef3c7" />
                                                <stop offset="50%" stopColor="#fbbf24" />
                                                <stop offset="100%" stopColor="#f59e0b" />
                                            </linearGradient>
                                        </defs>
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="35"
                                            fill="none"
                                            stroke="url(#ringGradient)"
                                            strokeWidth="8"
                                        />
                                    </svg>

                                    {/* Diamond */}
                                    <motion.div
                                        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1"
                                        animate={{
                                            scale: [1, 1.1, 1],
                                        }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M12 2L2 9L12 22L22 9L12 2Z"
                                                fill="url(#diamondGradient)"
                                                stroke="white"
                                                strokeWidth="0.5"
                                            />
                                            <defs>
                                                <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                                    <stop offset="0%" stopColor="#ffffff" />
                                                    <stop offset="50%" stopColor="#e0f2fe" />
                                                    <stop offset="100%" stopColor="#bae6fd" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </motion.div>
                                </div>

                                {/* Sparkles around ring */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute text-yellow-200"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: isOpen ? [0, 1, 0] : 0,
                                            opacity: isOpen ? [0, 1, 0] : 0,
                                            x: Math.cos(i * 60 * (Math.PI / 180)) * 50,
                                            y: Math.sin(i * 60 * (Math.PI / 180)) * 40,
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: 0.8 + i * 0.1,
                                            repeat: Infinity,
                                            repeatDelay: 1,
                                        }}
                                        style={{
                                            left: '50%',
                                            top: '50%',
                                            marginLeft: -8,
                                            marginTop: -8,
                                        }}
                                    >
                                        <Sparkles size={16} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Box Lid */}
                <motion.div
                    className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-rose-700 to-rose-800 rounded-t-xl origin-top shadow-lg"
                    initial={{ rotateX: 0 }}
                    animate={{
                        rotateX: isOpen ? -120 : 0,
                    }}
                    transition={{
                        type: 'spring',
                        stiffness: 100,
                        damping: 15,
                    }}
                    onAnimationComplete={() => isOpen && onAnimationComplete?.()}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Lid Decorative Line */}
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-1 bg-rose-600/50 rounded-full" />
                </motion.div>
            </motion.div>

            {/* Light beams when open */}
            {isOpen && (
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-32 h-32 -translate-x-1/2 -translate-y-1/2"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-full h-full bg-yellow-200/30 blur-2xl rounded-full" />
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
};
