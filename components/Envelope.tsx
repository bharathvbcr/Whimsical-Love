import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface EnvelopeProps {
  onOpen: () => void;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(onOpen, 1600); // Trigger callback after animation completes
    }
  };

  return (
    <div className="relative w-80 h-56 mx-auto cursor-pointer group perspective-1000" onClick={handleOpen}>
      {/* Back of Envelope */}
      <div className="absolute inset-0 bg-rose-200 rounded-lg shadow-xl"></div>
      
      {/* The Letter Inside */}
      <motion.div 
        className="absolute left-4 right-4 bg-white p-6 text-center rounded shadow-sm flex flex-col justify-center items-center origin-bottom"
        style={{ zIndex: 5 }}
        initial={{ top: 10, height: '90%', scale: 0.95 }}
        animate={isOpen ? { 
            top: -120, 
            height: '130%',
            scale: 1,
        } : { top: 10, height: '90%', scale: 0.95 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <div className="h-full w-full border-2 border-rose-100 p-2 flex flex-col justify-center items-center rounded-sm">
            <h3 className="font-script text-3xl text-rose-800 mb-2">My Dearest...</h3>
            <p className="font-hand text-slate-600 text-lg leading-tight mb-3">
                I have a very important question to ask you.
            </p>
            <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <Heart size={24} className="text-rose-400 fill-rose-200" />
            </motion.div>
        </div>
      </motion.div>

      {/* Side Flaps (Pocket) */}
      <div 
        className="absolute inset-0 z-10 bg-rose-300 rounded-lg pointer-events-none"
        style={{ clipPath: "polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)" }}
      ></div>

      {/* Bottom Flap */}
      <div 
        className="absolute inset-0 z-10 bg-rose-400 rounded-lg pointer-events-none"
        style={{ clipPath: "polygon(0 100%, 50% 55%, 100% 100%)" }}
      ></div>

      {/* Top Flap (The one that opens) */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1/2 bg-rose-400 rounded-t-lg origin-top shadow-lg"
        style={{ clipPath: "polygon(0 0, 100% 0, 50% 100%)" }}
        initial={{ rotateX: 0, zIndex: 20 }}
        animate={isOpen ? { rotateX: 180, zIndex: 0 } : { rotateX: 0, zIndex: 20 }}
        transition={{ 
            rotateX: { duration: 0.8, type: "spring", stiffness: 260, damping: 15 }, 
            zIndex: { delay: isOpen ? 0.2 : 0 } 
        }}
      >
        {/* Wax Seal */}
        <motion.div 
            className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-rose-600 rounded-full shadow-lg flex items-center justify-center border-4 border-rose-700/50 z-30"
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
        >
            <Heart size={20} className="text-rose-100" fill="currentColor" />
        </motion.div>
      </motion.div>
      
      {!isOpen && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 5, 0] }}
            transition={{ delay: 1, duration: 2, repeat: Infinity }}
            className="absolute -bottom-16 left-0 right-0 text-center text-rose-200 font-hand text-xl tracking-wider"
          >
              Tap to open
          </motion.p>
      )}
    </div>
  );
};