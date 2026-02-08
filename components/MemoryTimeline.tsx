import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '../hooks/useContent';
import { LucideIcon } from 'lucide-react';

interface TimelineItemProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    date: string;
    align: 'left' | 'right';
    index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ icon: Icon, title, desc, date, align, index }) => {
    const isLeft = align === 'left';
    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className={`flex w-full mb-16 relative ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
        >
            {/* Center Line Dot */}
            <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center h-full">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    className="w-8 h-8 rounded-full bg-white border-4 border-rose-400 z-10 shadow-lg"
                />
            </div>

            {/* Content Box */}
            <div className={`w-1/2 ${isLeft ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                <motion.div
                    whileHover={{ scale: 1.05, rotate: isLeft ? -2 : 2 }}
                    className="bg-white p-6 rounded-2xl shadow-xl border-2 border-rose-100 relative"
                >
                    <div className={`absolute top-4 ${isLeft ? '-right-10' : '-left-10'} bg-rose-100 p-2 rounded-full text-rose-500`}>
                        <Icon size={24} />
                    </div>
                    <span className="text-sm font-bold text-rose-400 uppercase tracking-widest block mb-2">{date}</span>
                    <h3 className="font-script text-3xl text-slate-800 mb-2">{title}</h3>
                    <p className="font-sans text-slate-600 leading-relaxed">{desc}</p>
                </motion.div>
            </div>

            {/* Empty space for the other side */}
            <div className="w-1/2"></div>
        </motion.div>
    );
};

export const MemoryTimeline: React.FC = () => {
    const { timelineEvents } = useContent();
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start center", "end center"]
    });

    const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={ref} className="py-24 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-block bg-white px-6 py-2 rounded-full shadow-sm text-rose-400 font-semibold uppercase tracking-wider mb-4 border border-rose-100"
                    >
                        Our Journey
                    </motion.div>
                    <h2 className="font-script text-5xl md:text-6xl text-rose-900">How It Started...</h2>
                </div>

                {/* Central Line Background */}
                <div className="absolute left-1/2 top-32 bottom-0 w-1 bg-rose-100 -translate-x-1/2 rounded-full"></div>

                {/* Active Filling Line */}
                <motion.div
                    style={{ height }}
                    className="absolute left-1/2 top-32 w-1 bg-gradient-to-b from-rose-300 via-rose-400 to-rose-500 -translate-x-1/2 rounded-full origin-top"
                />

                <div className="relative z-10 pt-10">
                    {timelineEvents.map((event, index) => (
                        <TimelineItem
                            key={index}
                            index={index}
                            align={event.align}
                            icon={event.icon}
                            date={event.date}
                            title={event.title}
                            desc={event.desc}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};