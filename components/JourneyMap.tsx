import React, { useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export const JourneyMap: React.FC = () => {
    const { journeyMilestones } = useContent();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Smooth out the drawing
    const pathLength = useSpring(scrollYProgress, { stiffness: 40, damping: 25 });

    // Generate dynamic path based on milestones
    // Sort milestones by Y position to ensure the path goes through them in order
    const sortedMilestones = useMemo(() =>
        [...journeyMilestones].sort((a, b) => a.y - b.y),
        [journeyMilestones]
    );

    const pathData = useMemo(() => {
        if (sortedMilestones.length < 2) return "";

        // Start point
        let d = `M ${sortedMilestones[0].x * 10},${sortedMilestones[0].y * 10}`;

        for (let i = 1; i < sortedMilestones.length; i++) {
            const prev = sortedMilestones[i - 1];
            const curr = sortedMilestones[i];

            // Create a smooth curve between milestones
            const midY = (prev.y + curr.y) / 2 * 10;
            d += ` C ${prev.x * 10},${midY} ${curr.x * 10},${midY} ${curr.x * 10},${curr.y * 10}`;
        }

        return d;
    }, [sortedMilestones]);

    return (
        <section ref={containerRef} className="py-32 relative bg-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-rose-200/30"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                            duration: 5 + i,
                            repeat: Infinity,
                            delay: i * 0.5
                        }}
                        style={{
                            left: `${15 + i * 15}%`,
                            top: `${10 + (i % 3) * 30}%`
                        }}
                    >
                        <Sparkles size={40 + (i % 3) * 20} />
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="font-script text-7xl text-slate-800 mb-4"
                >
                    The Road So Far
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="font-sans text-xl text-slate-500 italic"
                >
                    Every step led me straight to you.
                </motion.p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto h-[1200px] md:h-[1400px] bg-slate-50/30 rounded-[3rem] border-8 border-white shadow-2xl overflow-hidden backdrop-blur-none md:backdrop-blur-sm">
                {/* Vintage Paper Texture Overlay - Hidden on mobile for performance */}
                <div className="absolute inset-0 opacity-40 mix-blend-multiply pointer-events-none hidden md:block" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper-fibers.png")' }}></div>

                {/* Background Grid */}
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                {/* The Path SVG */}
                <svg className="absolute inset-0 w-[1000px] h-full pointer-events-none left-1/2 -translate-x-1/2" viewBox="0 0 1000 1400" preserveAspectRatio="none">
                    {/* Background Trace Path */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="#e2e8f0"
                        strokeWidth="12"
                        strokeLinecap="round"
                        className="opacity-50"
                    />
                    {/* Dashed Tracer */}
                    <path
                        d={pathData}
                        fill="none"
                        stroke="#94a3b8"
                        strokeWidth="2"
                        strokeDasharray="10 10"
                        className="opacity-30"
                    />
                    {/* Animated Progress Path */}
                    <motion.path
                        d={pathData}
                        fill="none"
                        stroke="url(#pathGradient)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        pathLength={pathLength}
                        className="drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                    />

                    <defs>
                        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#fda4af" />
                            <stop offset="50%" stopColor="#f43f5e" />
                            <stop offset="100%" stopColor="#be123c" />
                        </linearGradient>
                    </defs>
                </svg>

                {/* Milestones */}
                {sortedMilestones.map((m, i) => (
                    <div
                        key={i}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${m.x}%`, top: `${m.y}%` }}
                    >
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
                            className="relative group"
                        >
                            {/* The Pin - Pulsing Ring */}
                            <div className="absolute -inset-4 bg-white/50 rounded-full blur-md group-hover:bg-rose-100/50 transition-colors"></div>

                            {/* The Pin - Main Bubble */}
                            <div className={`w-14 h-14 ${m.color} rounded-full flex items-center justify-center shadow-xl border-4 border-white relative z-10 group-hover:scale-110 transition-transform duration-500 cursor-pointer`}>
                                <m.icon size={24} />
                                {/* Hidden indicator for "drawn" state */}
                                <motion.div
                                    className="absolute -inset-1 border-2 border-rose-400 rounded-full"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1.2, opacity: 0 }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>

                            {/* Polaroid Card (Visible on Hover/Focus) */}
                            <div className={`absolute ${m.y > 80 ? 'bottom-full mb-8' : m.x > 70 ? 'right-full mr-8' : 'left-full ml-8'} ${m.y > 80 ? 'left-1/2 -translate-x-1/2' : 'top-1/2 -translate-y-1/2'} w-64 opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100 z-30 pointer-events-none group-hover:pointer-events-auto`}>
                                <div className="bg-white p-3 pb-8 shadow-2xl border-b-12 border-slate-100 rounded-sm -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                    <div className={`${m.color.replace('text-', 'bg-').split(' ')[0]} aspect-square rounded-sm flex items-center justify-center mb-3 text-white`}>
                                        <m.icon size={48} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="font-hand text-2xl font-bold text-slate-800 leading-tight mb-1">{m.label}</h3>
                                    <p className="font-sans text-sm text-slate-500 leading-relaxed italic">{m.description}</p>
                                </div>
                                {/* Decorative Tape */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-8 bg-rose-200/40 md:backdrop-blur-sm -rotate-2 border border-rose-300/20"></div>
                            </div>
                        </motion.div>
                    </div>
                ))}

                {/* Moving Character/Avatar (The Heart) */}
                <motion.div
                    className="absolute w-16 h-16 bg-rose-500 rounded-full shadow-[0_0_30px_rgba(244,63,94,0.6)] z-20 flex items-center justify-center border-4 border-white"
                    style={{
                        offsetPath: `path("${pathData}")`,
                        offsetDistance: useTransform(pathLength, [0, 1], ["0%", "100%"]),
                        // Rotate based on progress for a slight "lean"
                        rotate: useTransform(pathLength, [0, 0.5, 1], [-5, 0, 5])
                    }}
                >
                    <Heart size={32} className="text-white fill-white animate-pulse" />

                    {/* Trail Effect (Particles) */}
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-rose-300 rounded-full"
                            style={{
                                width: 8 - i * 2,
                                height: 8 - i * 2,
                                opacity: 1 - i * 0.3
                            }}
                            animate={{
                                scale: [1, 2, 0],
                                opacity: [0.8, 0],
                                x: [0, (i - 1) * 15],
                                y: [20, 40]
                            }}
                            transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.2
                            }}
                        />
                    ))}
                </motion.div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white to-transparent z-10 pointer-events-none"></div>
        </section>
    );
};