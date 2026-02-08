import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { BookOpen, Sparkles } from 'lucide-react';
import { useAutoScroll } from './AutoScrollContext';
import { useContent } from '../hooks/useContent';

// Enhanced spring configs for realistic paper physics
const pageFlipSpring = {
    type: "spring" as const,
    stiffness: 35,
    damping: 18,
    mass: 1.2,
    restDelta: 0.001
};

const coverOpenSpring = {
    type: "spring" as const,
    stiffness: 25,
    damping: 20,
    mass: 1.5
};

// Page flip visual indicator component
const PageFlipIndicator: React.FC<{ isFlipping: boolean }> = ({ isFlipping }) => (
    <AnimatePresence>
        {isFlipping && (
            <motion.div
                className="absolute right-0 top-1/2 -translate-y-1/2 z-50 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-12 bg-gradient-to-b from-amber-100/0 via-amber-200/40 to-amber-100/0 rounded-full"
                        style={{
                            right: `${i * 3}px`,
                            top: `${(i - 2) * 15}px`
                        }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            x: [-10, -30, -50],
                            scaleY: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.03,
                            ease: "easeOut"
                        }}
                    />
                ))}
            </motion.div>
        )}
    </AnimatePresence>
);

// Extracted Particle Component
const Particle: React.FC<{ x: number, y: number }> = ({ x, y }) => {
    const [anim, setAnim] = useState({ y: 0, x: 0, rotate: 0 });

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnim({
                y: Math.random() * 80 + 20,
                x: (Math.random() - 0.5) * 60,
                rotate: Math.random() * 360
            });
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, x, y }}
            animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                y: y - anim.y,
                x: x + anim.x,
                rotate: anim.rotate
            }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute w-1.5 h-1.5 bg-yellow-200 rounded-full pointer-events-none shadow-[0_0_10px_rgba(253,224,71,0.9)]"
        />
    );
};

// Interactive Cover Component with enhanced animations
const CoverPageContent: React.FC<{ autoTrigger?: boolean }> = ({ autoTrigger }) => {
    const [particles, setParticles] = useState<{ id: number, x: number, y: number }[]>([]);

    const addParticle = useCallback((x: number, y: number) => {
        const newId = Date.now() + Math.random();
        setParticles(prev => {
            const next = [...prev, { id: newId, x, y }];
            if (next.length > 20) return next.slice(next.length - 20);
            return next;
        });
    }, []);

    useEffect(() => {
        if (autoTrigger) {
            const interval = setInterval(() => {
                const x = 150 + (Math.random() - 0.5) * 200;
                const y = 200 + (Math.random() - 0.5) * 300;
                addParticle(x, y);
            }, 100);

            return () => clearInterval(interval);
        }
    }, [autoTrigger, addParticle]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        if (Math.random() > 0.8) {
            addParticle(e.clientX - rect.left, e.clientY - rect.top);
        }
    };

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        for (let i = 0; i < 8; i++) {
            const offsetX = (Math.random() - 0.5) * 60;
            const offsetY = (Math.random() - 0.5) * 60;
            addParticle(e.clientX - rect.left + offsetX, e.clientY - rect.top + offsetY);
        }
    };

    return (
        <div
            className="flex flex-col items-center justify-center h-full text-center p-6 bg-rose-900 text-white border-4 border-yellow-500/50 rounded-r-lg relative overflow-hidden group select-none"
            onMouseMove={handleMouseMove}
            onClick={handleClick}
        >
            {/* Primary shimmer effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-200/15 to-transparent -skew-x-12"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                animate={autoTrigger ? { x: ['-100%', '100%'] } : {}}
                transition={{ duration: 1.5, ease: "easeInOut", repeat: autoTrigger ? Infinity : 0, repeatDelay: 0.5 }}
            />

            {/* Secondary shimmer for depth */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-bl from-rose-400/10 via-transparent to-yellow-100/10"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Floating book icon with enhanced animation */}
            <motion.div
                animate={{
                    y: [0, -10, 0],
                    rotateZ: [0, 3, -3, 0],
                    scale: [1, 1.02, 1]
                }}
                transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="relative"
            >
                <BookOpen
                    size={64}
                    className="mb-6 text-yellow-200 relative z-10 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_25px_rgba(253,224,71,0.4)]"
                />
                {/* Glow effect behind icon */}
                <motion.div
                    className="absolute inset-0 bg-yellow-200/20 rounded-full blur-xl -z-10"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>

            <motion.p
                className="font-sans text-rose-200 relative z-10"
                style={{ transform: 'translateZ(1px)' }}
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Volume 1
            </motion.p>

            {/* Enhanced click prompt with animated sparkles */}
            <motion.div
                className="mt-8 text-sm uppercase tracking-widest text-rose-300/70 relative z-10 flex items-center justify-center gap-2"
                style={{ transform: 'translateZ(1px)' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <motion.span
                    animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <Sparkles size={14} className="text-yellow-200 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
                </motion.span>
                <span>Click to Open</span>
                <motion.span
                    animate={{ rotate: [0, -20, 20, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                    <Sparkles size={14} className="text-yellow-200 drop-shadow-[0_0_6px_rgba(253,224,71,0.8)]" />
                </motion.span>
            </motion.div>

            {/* Particle effects */}
            <AnimatePresence>
                {particles.map((p) => (
                    <Particle key={p.id} x={p.x} y={p.y} />
                ))}
            </AnimatePresence>
        </div>
    );
};

// Enhanced page component with curl effect
const BookPage: React.FC<{
    page: { id: number; content: React.ReactNode; bg: string };
    index: number;
    currentPage: number;
    totalPages: number;
    isFlipping: boolean;
}> = ({ page, index, currentPage, totalPages, isFlipping }) => {
    const isFlipped = index < currentPage;
    const isCurrent = index === currentPage;

    // Calculate dynamic shadow based on flip state
    const shadowIntensity = isFlipped ? 0.05 : (isCurrent ? 0.15 : 0.1);
    const shadowSpread = isFlipped ? 2 : (isCurrent ? 15 : 8);

    return (
        <motion.div
            key={page.id}
            className={`absolute inset-0 rounded-r-lg border border-slate-200/50 origin-left overflow-hidden ${page.bg}`}
            initial={{ rotateY: 0, zIndex: totalPages - index }}
            animate={{
                rotateY: isFlipped ? -180 : 0,
                zIndex: isFlipped ? index : totalPages - index,
                x: isFlipped ? -4 : 0,
            }}
            transition={index === 0 ? coverOpenSpring : pageFlipSpring}
            style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform',
                boxShadow: `${shadowSpread}px 0 ${shadowSpread * 2}px rgba(0,0,0,${shadowIntensity})`,
            }}
        >
            <div className="w-full h-full relative">
                {/* Dynamic spine shadow - darker when page is turning */}
                <motion.div
                    className="absolute top-0 bottom-0 left-0 w-12 pointer-events-none z-10"
                    animate={{
                        background: isFlipping && isCurrent
                            ? 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 30%, transparent 100%)'
                            : 'linear-gradient(to right, rgba(0,0,0,0.08) 0%, transparent 100%)'
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Page curl effect during flip */}
                {isFlipping && isCurrent && (
                    <motion.div
                        className="absolute top-0 bottom-0 right-0 w-16 pointer-events-none z-20"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 0.4, 0],
                            background: [
                                'linear-gradient(to left, rgba(255,255,255,0.8) 0%, transparent 100%)',
                                'linear-gradient(to left, rgba(255,255,255,0.5) 0%, rgba(0,0,0,0.05) 50%, transparent 100%)',
                                'linear-gradient(to left, rgba(255,255,255,0.3) 0%, transparent 100%)'
                            ]
                        }}
                        transition={{ duration: 0.8 }}
                    />
                )}

                {/* Edge glow during flip */}
                {isFlipping && isCurrent && (
                    <motion.div
                        className="absolute top-0 bottom-0 right-0 w-1 pointer-events-none z-30"
                        initial={{ opacity: 0, boxShadow: 'none' }}
                        animate={{
                            opacity: [0, 1, 0],
                            boxShadow: [
                                '0 0 0px rgba(255,255,255,0)',
                                '-5px 0 15px rgba(255,255,255,0.5), -2px 0 8px rgba(253,224,71,0.3)',
                                '0 0 0px rgba(255,255,255,0)'
                            ]
                        }}
                        transition={{ duration: 0.6 }}
                    />
                )}

                {/* Paper Texture */}
                <div
                    className="absolute inset-0 opacity-15 pointer-events-none mix-blend-multiply"
                    style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}
                />

                {page.content}

                {/* Page number with subtle animation */}
                <motion.div
                    className="absolute bottom-4 right-4 text-xs text-slate-300/80 font-mono"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isCurrent ? 1 : 0.5 }}
                    transition={{ duration: 0.3 }}
                >
                    {index === 0 ? '' : index}
                </motion.div>
            </div>
        </motion.div>
    );
};

export const StoryBook: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.5 });

    // Auto Scroll Integration
    const { isPlaying, registerPause, unregisterPause } = useAutoScroll();
    const [hasAutoPlayed, setHasAutoPlayed] = useState(false);
    const { storyPages } = useContent();

    // Define pages dynamically from content.ts
    const pages = storyPages.map((sp) => {
        if (sp.isCover) {
            return {
                id: sp.id,
                content: <CoverPageContent autoTrigger={isPlaying && isInView && !hasAutoPlayed && currentPage === 0} />,
                bg: "bg-rose-900"
            };
        }
        if (sp.isEnding) {
            return {
                id: sp.id,
                content: (
                    <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                        <motion.p
                            className="font-script text-4xl text-rose-600 mb-4"
                            style={{ transform: 'translateZ(1px)' }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            {sp.text}
                        </motion.p>
                        <motion.p
                            className="font-sans text-sm text-slate-400"
                            style={{ transform: 'translateZ(1px)' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            The End (of the beginning)
                        </motion.p>
                    </div>
                ),
                bg: "bg-white"
            };
        }
        return {
            id: sp.id,
            content: (
                <div className="p-8 text-center flex flex-col items-center justify-center h-full">
                    <motion.p
                        className="font-hand text-2xl text-slate-800 leading-relaxed"
                        style={{ transform: 'translateZ(1px)' }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {sp.text}
                    </motion.p>
                </div>
            ),
            bg: "bg-amber-50"
        };
    });

    // Handle page flip with animation state
    const flipPage = useCallback((direction: 'next' | 'prev') => {
        if (isFlipping) return;

        if (direction === 'next' && currentPage < pages.length - 1) {
            setIsFlipping(true);
            setCurrentPage(currentPage + 1);
            setTimeout(() => setIsFlipping(false), 800);
        } else if (direction === 'prev' && currentPage > 0) {
            setIsFlipping(true);
            setCurrentPage(currentPage - 1);
            setTimeout(() => setIsFlipping(false), 800);
        }
    }, [currentPage, pages.length, isFlipping]);

    const nextPage = () => flipPage('next');
    const prevPage = () => flipPage('prev');

    // Auto-turn pages logic
    useEffect(() => {
        if (isPlaying && isInView && !hasAutoPlayed) {
            registerPause('storybook');

            let page = 0;
            let interval: NodeJS.Timeout;

            const startDelay = setTimeout(() => {
                interval = setInterval(() => {
                    page++;
                    if (page < pages.length) {
                        setIsFlipping(true);
                        setCurrentPage(page);
                        setTimeout(() => setIsFlipping(false), 800);
                    } else {
                        clearInterval(interval);
                        setHasAutoPlayed(true);
                        unregisterPause('storybook');
                    }
                }, 2800); // Slightly longer for reading + animation
            }, 2000);

            return () => {
                clearTimeout(startDelay);
                if (interval) clearInterval(interval);
                unregisterPause('storybook');
            };
        }
    }, [isPlaying, isInView, hasAutoPlayed, registerPause, unregisterPause, pages.length]);

    return (
        <section ref={containerRef} className="py-24 bg-slate-100 flex flex-col items-center justify-center overflow-hidden min-h-[800px]" style={{ perspective: '1500px' }}>
            <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="font-script text-5xl text-slate-800">Chapter One</h2>
            </motion.div>

            <motion.div
                className="relative w-[300px] h-[450px] md:w-[400px] md:h-[550px] cursor-pointer"
                onClick={nextPage}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.3 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Book Spine with enhanced 3D effect */}
                <motion.div
                    className="absolute left-0 top-0 bottom-0 w-5 rounded-l-lg z-0 transform -translate-x-full"
                    style={{
                        background: 'linear-gradient(to right, #4c0519 0%, #881337 50%, #9f1239 100%)',
                        boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.3), -3px 0 8px rgba(0,0,0,0.2)'
                    }}
                />

                {/* Back Cover with shadow */}
                <div
                    className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-r-lg border border-slate-200"
                    style={{
                        transform: 'translateZ(-15px)',
                        boxShadow: '5px 5px 20px rgba(0,0,0,0.15)'
                    }}
                />

                {/* Page flip indicator */}
                <PageFlipIndicator isFlipping={isFlipping} />

                {/* Pages Stack */}
                <AnimatePresence initial={false} custom={currentPage}>
                    {pages.map((page, index) => {
                        // Only render nearby pages for performance
                        if (index < currentPage - 1 || index > currentPage + 2) return null;

                        return (
                            <BookPage
                                key={page.id}
                                page={page}
                                index={index}
                                currentPage={currentPage}
                                totalPages={pages.length}
                                isFlipping={isFlipping}
                            />
                        );
                    })}
                </AnimatePresence>

                {/* Navigation controls */}
                <div className="absolute -bottom-14 left-0 right-0 flex justify-between items-center text-slate-400 font-sans text-sm">
                    <motion.button
                        onClick={(e) => { e.stopPropagation(); prevPage(); }}
                        className="hover:text-rose-500 transition-colors px-3 py-1 rounded-md hover:bg-rose-50"
                        whileHover={{ x: -3 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isFlipping || currentPage === 0}
                        style={{ opacity: currentPage === 0 ? 0.3 : 1 }}
                    >
                        ← Previous
                    </motion.button>
                    <motion.span
                        className="opacity-60 font-medium"
                        key={currentPage}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 0.6, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentPage + 1} / {pages.length}
                    </motion.span>
                    <motion.button
                        onClick={(e) => { e.stopPropagation(); nextPage(); }}
                        className="hover:text-rose-500 transition-colors px-3 py-1 rounded-md hover:bg-rose-50"
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isFlipping || currentPage === pages.length - 1}
                        style={{ opacity: currentPage === pages.length - 1 ? 0.3 : 1 }}
                    >
                        Next →
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};