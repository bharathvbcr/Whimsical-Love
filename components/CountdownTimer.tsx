import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart } from 'lucide-react';
import { useContent } from '../hooks/useContent';

export const CountdownTimer: React.FC = () => {
    const { personalization, features } = useContent();
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        if (!personalization.proposalDate || !features?.enableCountdown) return;

        const targetDate = new Date(personalization.proposalDate).getTime();

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            if (difference <= 0) {
                setTimeLeft(null);
                return;
            }

            setTimeLeft({
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            });
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [personalization.proposalDate, features?.enableCountdown]);

    if (!timeLeft || !features?.enableCountdown) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 flex flex-col items-center gap-4 py-6 px-8 rounded-2xl bg-white/40 backdrop-blur-md border border-rose-100 shadow-xl shadow-rose-200/20"
            style={{ transform: 'translateZ(1px)' }}
        >
            <div className="flex items-center gap-2 text-rose-500 mb-2">
                <Clock size={20} className="animate-pulse" />
                <span className="font-script text-2xl">Countdown to Forever</span>
            </div>

            <div className="flex gap-4 md:gap-8">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hrs" />
                <TimeUnit value={timeLeft.minutes} label="Min" />
                <TimeUnit value={timeLeft.seconds} label="Sec" />
            </div>

            <motion.div
                className="mt-4 flex items-center gap-2 text-rose-400 font-medium"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <Heart size={16} fill="currentColor" />
                <span>{timeLeft.days} days until forever</span>
            </motion.div>
        </motion.div>
    );
};

const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="text-3xl md:text-4xl font-bold text-rose-900 bg-white/60 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl shadow-inner border border-rose-50">
            {value.toString().padStart(2, '0')}
        </div>
        <span className="text-xs uppercase tracking-widest text-rose-400 mt-2 font-bold">{label}</span>
    </div>
);
