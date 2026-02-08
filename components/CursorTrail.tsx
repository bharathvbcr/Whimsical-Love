import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface Point {
  x: number;
  y: number;
  id: number;
  type: 'heart' | 'sparkle';
  rotation: number;
  scale: number;
}

export const CursorTrail: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);

  useEffect(() => {
    let count = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle creation to avoid performance hits
      if (Math.random() > 0.3) return;

      const newPoint: Point = {
        x: e.clientX,
        y: e.clientY,
        id: count++,
        type: Math.random() > 0.7 ? 'sparkle' : 'heart',
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
      };

      setPoints((prev) => [...prev.slice(-15), newPoint]); // Keep only last 15 points
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
      <AnimatePresence>
        {points.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.8, scale: 0, x: point.x, y: point.y }}
            animate={{ 
                opacity: 0, 
                scale: point.scale, 
                y: point.y + 20 // Drift down slightly
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`absolute ${point.type === 'heart' ? 'text-rose-400' : 'text-yellow-400'}`}
            style={{ 
                left: 0, 
                top: 0,
                rotate: point.rotation 
            }}
          >
            {point.type === 'heart' ? (
              <Heart size={16} fill="currentColor" />
            ) : (
              <Sparkles size={16} />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};