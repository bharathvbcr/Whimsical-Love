import React from 'react';
import { motion } from 'framer-motion';


export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="relative group cursor-default">
                <div className="absolute -inset-4 bg-rose-100/50 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <motion.div
                    className="relative w-16 h-16 transition-transform group-hover:scale-105"
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                >
                    <img src="/logo.svg" alt="Whimsical Proposal" className="w-full h-full drop-shadow-md" />
                </motion.div>
            </div>
        </div>
    );
};
