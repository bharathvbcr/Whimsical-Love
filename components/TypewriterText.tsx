import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  trigger?: boolean;
  cursor?: boolean;
}

export const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  delay = 0, 
  speed = 50, 
  className = "", 
  trigger = true,
  cursor = false
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timeout = setTimeout(() => {
        setStarted(true);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [trigger, delay]);

  useEffect(() => {
    if (!started) return;
    
    // Start fresh
    setDisplayedText("");
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      // Use slicing which is deterministic and robust against race conditions
      // This prevents "Tewway" (The way) or "cfffee" (coffee) glitches
      if (currentIndex < text.length) {
        currentIndex++;
        setDisplayedText(text.slice(0, currentIndex));
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && <motion.span 
        animate={{ opacity: [0, 1, 0] }} 
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-0.5 h-[1em] bg-current align-middle ml-0.5"
      />}
    </span>
  );
};