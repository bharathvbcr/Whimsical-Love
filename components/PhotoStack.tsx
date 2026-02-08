import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  "https://picsum.photos/400/500?random=1",
  "https://picsum.photos/400/500?random=2",
  "https://picsum.photos/400/500?random=3",
];

// Extracted Item Component
const StackItem: React.FC<{
    src: string;
    index: number;
    currentIndex: number;
}> = ({ src, index, currentIndex }) => {
    const isCurrent = index === currentIndex;

    const [anim, setAnim] = useState({
        initialRotate: 0,
        animateRotate: 0,
        animateX: 0,
        animateY: 0,
        bgRotate: 0
    });

    React.useEffect(() => {
        setAnim({
            initialRotate: Math.random() * 10 - 5,
            animateRotate: Math.random() * 4 - 2,
            animateX: Math.random() * 20 - 10,
            animateY: Math.random() * 20 - 10,
            bgRotate: Math.random() * 10 - 5
        });
    }, []);

    return (
        <motion.div
            key={src}
            initial={{ opacity: 0, scale: 0.9, rotate: anim.initialRotate }}
            animate={{ 
                opacity: 1, 
                scale: isCurrent ? 1 : 0.95,
                zIndex: isCurrent ? 10 : 0,
                rotate: isCurrent ? anim.animateRotate : anim.bgRotate,
                x: isCurrent ? 0 : anim.animateX,
                y: isCurrent ? 0 : anim.animateY,
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
};

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
            return <StackItem key={src} src={src} index={i} currentIndex={index} />;
        })}
      </AnimatePresence>
    </div>
  );
};