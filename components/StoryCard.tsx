import React from 'react';
import { motion } from 'framer-motion';
import { StoryCardProps } from '../types';

export const StoryCard: React.FC<StoryCardProps> = ({ title, text, delay = 0, rotation = 0, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      whileHover="hover"
      variants={{
        hover: { 
            scale: 1.05, 
            y: -10, 
            rotate: 0, 
            zIndex: 10,
            transition: { type: "spring", stiffness: 300, damping: 15 } 
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, type: "spring", bounce: 0.4 }}
      style={{ willChange: 'transform' }}
      className="bg-white/90 md:backdrop-blur-md p-8 max-w-md w-full shadow-xl shadow-rose-100/50 hover:shadow-2xl hover:shadow-rose-300/40 transition-shadow duration-300 hand-drawn-border border-2 border-rose-100 relative group cursor-pointer"
    >
        {/* Decorative Tape */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-rose-200/50 -rotate-2 transform" style={{ clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0% 100%)" }}></div>
        
        {icon && (
            <motion.div 
                className="mb-4 text-rose-400 flex justify-center"
                variants={{
                    hover: { 
                        scale: 1.15,
                        filter: "drop-shadow(0 0 6px rgba(251, 113, 133, 0.5))",
                        transition: {
                            duration: 0.3, 
                            ease: "easeOut"
                        }
                    }
                }}
            >
                {icon}
            </motion.div>
        )}

      <h3 className="font-script text-4xl text-rose-800 mb-4 text-center group-hover:text-rose-600 transition-colors">{title}</h3>
      <p className="font-sans text-lg text-slate-600 leading-relaxed text-center font-medium">
        {text}
      </p>
      
      {/* Decorative doodles */}
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-r-2 border-b-2 border-rose-300 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -top-2 -left-2 w-8 h-8 border-l-2 border-t-2 border-rose-300 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
};