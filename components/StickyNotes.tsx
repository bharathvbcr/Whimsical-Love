import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import { useContent } from '../contexts/ContentContext';

interface NoteProps {
  text: string;
  color: string;
  rotate: number;
  x?: string;
  y?: string;
  delay?: number;
}

const Note: React.FC<NoteProps> = ({ text, color, rotate, x, y, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: rotate } : {}}
      whileHover={{ scale: 1.1, rotate: 0, zIndex: 50 }}
      drag
      dragConstraints={{ left: -20, right: 20, top: -20, bottom: 20 }}
      transition={{ type: "spring", bounce: 0.5, delay: delay }}
      className={`absolute p-6 w-64 ${color} paper-shadow cursor-pointer flex items-center justify-center text-center`}
      style={{
        left: x,
        top: y,
        fontFamily: '"Indie Flower", cursive'
      }}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm -rotate-1 transform" style={{ clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0% 100%)" }}></div>
      <div className="text-xl text-slate-800 font-bold leading-tight min-h-[3em]">
        <TypewriterText text={text} trigger={isInView} delay={delay + 0.3} speed={30} />
      </div>
    </motion.div>
  );
};

const MobileNote: React.FC<NoteProps> = ({ text, color, rotate }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: rotate } : {}}
      whileHover={{ scale: 1.05 }}
      className={`relative p-8 w-full ${color} paper-shadow flex items-center justify-center text-center min-h-[200px] my-4`}
      style={{ fontFamily: '"Indie Flower", cursive' }}
    >
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm -rotate-1 transform" style={{ clipPath: "polygon(2% 0, 98% 0, 100% 100%, 0% 100%)" }}></div>
      <div className="text-2xl text-slate-800 font-bold leading-tight">
        <TypewriterText text={text} trigger={isInView} delay={0.2} speed={30} />
      </div>
    </motion.div>
  );
};

export const StickyNotes: React.FC = () => {
  const { stickyNotes } = useContent();
  return (
    <section className="py-32 relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(#444 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="text-center mb-16 relative z-10 px-4">
        <h2 className="font-script text-5xl md:text-7xl text-rose-900 mb-4 transform -rotate-2">The Little Things</h2>
        <p className="font-sans text-xl text-slate-500">Just a few of the million reasons why...</p>
      </div>

      {/* Desktop Layout - Scattered Chaos */}
      <div className="hidden md:block relative h-[600px] max-w-6xl mx-auto">
        {stickyNotes.map((note, i) => (
          <Note key={i} text={note.text} color={note.color} rotate={note.rotate} x={note.x} y={note.y} delay={0.1 * (i + 1)} />
        ))}
      </div>

      {/* Mobile Layout - Vertical Stack (first 4 notes) */}
      <div className="md:hidden flex flex-col px-6">
        {stickyNotes.slice(0, 4).map((note, i) => (
          <MobileNote key={i} text={note.text} color={note.color} rotate={note.rotate > 0 ? 1 : -1} />
        ))}
      </div>
    </section>
  );
};