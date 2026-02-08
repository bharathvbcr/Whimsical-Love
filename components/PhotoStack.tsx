import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  "https://picsum.photos/400/500?random=1",
  "https://picsum.photos/400/500?random=2",
  "https://picsum.photos/400/500?random=3",
];

export const PhotoStack: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % photos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-72 h-80 mx-auto">
      <AnimatePresence mode='popLayout'>
        {photos.map((src, i) => {
            // Only show current, previous, and next to save DOM resources
            if (i !== index && i !== (index + 1) % photos.length) return null;

            const isCurrent = i === index;
            
            return (
                <motion.div
                    key={src}
                    initial={{ opacity: 0, scale: 0.9, rotate: Math.random() * 10 - 5 }}
                    animate={{ 
                        opacity: 1, 
                        scale: isCurrent ? 1 : 0.95,
                        zIndex: isCurrent ? 10 : 0,
                        rotate: isCurrent ? Math.random() * 4 - 2 : Math.random() * 10 - 5,
                        x: isCurrent ? 0 : (Math.random() * 20 - 10),
                        y: isCurrent ? 0 : (Math.random() * 20 - 10),
                    }}
                    exit={{ 
                        opacity: 0, 
                        x: 100, 
                        rotate: 20, 
                        transition: { duration: 0.5 } 
                    }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="absolute inset-0 bg-white p-3 pb-12 shadow-xl rounded-sm border border-slate-100"
                >
                    <div className="w-full h-full overflow-hidden bg-slate-100 relative">
                        <img src={src} alt="Memory" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-transparent opacity-30 mix-blend-overlay"></div>
                    </div>
                    
                    {/* Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm shadow-sm rotate-1"></div>
                </motion.div>
            );
        })}
      </AnimatePresence>
    </div>
  );
};