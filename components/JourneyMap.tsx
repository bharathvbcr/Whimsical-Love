import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

export const JourneyMap: React.FC = () => {
    const { journeyMilestones } = useContent();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Smooth out the drawing
    const pathLength = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

    return (
        <section ref={containerRef} className="py-32 relative bg-white overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center mb-12">
                <h2 className="font-script text-6xl text-slate-800 mb-4">The Road So Far</h2>
                <p className="font-sans text-slate-500">Every step led me straight to you.</p>
            </div>

            <div className="relative w-full max-w-5xl mx-auto h-[1000px] md:h-[1200px] bg-slate-50/50 rounded-3xl border-4 border-slate-100 shadow-inner overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

                {/* The Path SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <motion.path
                        d="M 200,100 C 400,200 800,200 800,400 C 800,600 300,600 300,800 C 300,1000 500,1100 500,1200"
                        fill="none"
                        stroke="#fb7185" // rose-400
                        strokeWidth="8"
                        strokeDasharray="1"
                        strokeLinecap="round"
                        pathLength={pathLength}
                        className="drop-shadow-lg"
                    />
                </svg>

                {/* Milestones */}
                {journeyMilestones.map((m, i) => {
                    // We calculate visibility based on scroll progress relative to this item's position
                    // This is a rough approximation for the parallax reveal effect
                    const yPos = m.y / 100;

                    return (
                        <div
                            key={i}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2"
                            style={{ left: `${m.x}%`, top: `${m.y}%` }}
                        >
                            <motion.div
                                initial={{ scale: 0, opacity: 0, y: 20 }}
                                whileInView={{ scale: 1, opacity: 1, y: 0 }}
                                viewport={{ margin: "-100px" }}
                                transition={{ type: "spring", delay: 0.2 }}
                                className="relative group"
                            >
                                {/* The Pin */}
                                <div className={`w-16 h-16 ${m.color} rounded-full flex items-center justify-center shadow-xl border-4 border-white relative z-10 group-hover:scale-110 transition-transform duration-300 cursor-pointer`}>
                                    <m.icon size={28} />

                                    {/* Pulse effect */}
                                    <div className={`absolute inset-0 ${m.color} rounded-full animate-ping opacity-20`}></div>
                                </div>

                                {/* The Label Card */}
                                <div className={`absolute ${m.y > 80 ? 'bottom-full mb-4' : 'top-full mt-4'} left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-xl shadow-lg border border-slate-100 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${m.y > 80 ? 'translate-y-[-8px] group-hover:translate-y-0' : 'translate-y-2 group-hover:translate-y-0'} z-20`}>
                                    <span className="font-hand text-lg font-bold text-slate-700">{m.label}</span>
                                    {/* Triangle pointer */}
                                    <div className={`absolute ${m.y > 80 ? '-bottom-2 border-r border-b' : '-top-2 border-l border-t'} left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-slate-100 transform rotate-45`}></div>
                                </div>
                            </motion.div>
                        </div>
                    );
                })}

                {/* Moving Character/Avatar */}
                <motion.div
                    className="absolute w-12 h-12 bg-rose-500 rounded-full shadow-2xl z-20 flex items-center justify-center border-4 border-white"
                    style={{
                        offsetPath: 'path("M 200,100 C 400,200 800,200 800,400 C 800,600 300,600 300,800 C 300,1000 500,1100 500,1200")',
                        offsetDistance: useTransform(pathLength, [0, 1], ["0%", "100%"])
                    }}
                >
                    <Heart size={20} className="text-white fill-white animate-pulse" />
                </motion.div>
            </div>
        </section>
    );
};