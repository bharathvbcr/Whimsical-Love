import React from 'react';
import { motion } from 'framer-motion';
import { StoryCardProps } from '../types';

export const HighlightCard: React.FC<StoryCardProps> = ({ title, text, delay = 0, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      whileHover={{ scale: 1.05, rotate: 2 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 200 }}
      className="bg-gradient-to-br from-lavender-50 to-white p-8 rounded-[2rem] shadow-xl border-4 border-double border-lavender-200 relative overflow-hidden group h-full flex flex-col justify-center"
    >
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-lavender-100 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 opacity-60"></div>
        <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-rose-100 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 opacity-60"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center">
            <div className="bg-white p-4 rounded-2xl shadow-sm mb-5 text-lavender-500 transform -rotate-3 group-hover:rotate-3 transition-transform duration-300 ring-4 ring-lavender-50">
                {icon}
            </div>

            <h3 className="font-script text-3xl text-slate-800 mb-3">{title}</h3>
            <p className="font-sans text-slate-600 font-medium leading-relaxed">
                {text}
            </p>
        </div>
    </motion.div>
  );
};