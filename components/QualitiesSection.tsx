import React from 'react';
import { StoryCard } from './StoryCard';
import { HighlightCard } from './HighlightCard';
import { Star, Smile, HeartHandshake, Sparkles, Sun, LucideIcon } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '../hooks/useContent';

// Map icon names to actual icon components
const iconMap: Record<string, LucideIcon> = {
  HeartHandshake,
  Smile,
  Star,
  Sun,
};

export const QualitiesSection: React.FC = () => {
  const { qualities } = useContent();
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section className="relative py-32 px-4 min-h-screen flex flex-col items-center justify-center gap-16 overflow-hidden">
      {/* Parallax Background Element */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-rose-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-lavender-200 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="text-center mb-10">
        <h2 className="font-script text-6xl text-rose-900 mb-4">A Rare Superpower</h2>
        <div className="h-1 w-24 bg-rose-300 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {qualities.map((q, i) => {
          const IconComponent = iconMap[q.iconName];
          if (q.isHighlight) {
            return (
              <HighlightCard
                key={i}
                title={q.title}
                text={q.text}
                delay={0.2 * (i + 1)}
                icon={<IconComponent size={40} />}
              />
            );
          }
          return (
            <StoryCard
              key={i}
              title={q.title}
              text={q.text}
              delay={0.2 * (i + 1)}
              rotation={q.rotation}
              icon={<IconComponent size={40} />}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-16 text-center max-w-2xl bg-white/60 p-8 rounded-[2rem] border border-rose-100 shadow-sm"
      >
        <Sparkles className="inline-block text-yellow-400 mb-2" />
        <p className="font-script text-3xl text-rose-800 leading-normal">
          "Never lose that; the world really needs more of whatever it is you're made of."
        </p>
      </motion.div>
    </section>
  );
};