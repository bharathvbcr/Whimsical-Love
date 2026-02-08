import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';
import { Logo } from './Logo';

export const Hero: React.FC = () => {
  const { personalization } = useContent();
  // Parallax Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for mouse movement - slightly bouncier for "alive" feel
  const mouseX = useSpring(x, { stiffness: 40, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 15 });

  // Text Rotation (3D Tilt)
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Background Parallax Movement
  // Layer 1: Glitter (Further back, moves slowly in direction of mouse)
  const layer1X = useTransform(mouseX, [-0.5, 0.5], ["-40px", "40px"]);
  const layer1Y = useTransform(mouseY, [-0.5, 0.5], ["-40px", "40px"]);

  // Layer 2: Floating Icons (Closer, moves faster in opposite direction for depth)
  const layer2X = useTransform(mouseX, [-0.5, 0.5], ["60px", "-60px"]);
  const layer2Y = useTransform(mouseY, [-0.5, 0.5], ["60px", "-60px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate normalized position (-0.5 to 0.5)
    const normalizedX = (e.clientX - rect.left) / width - 0.5;
    const normalizedY = (e.clientY - rect.top) / height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Typewriter Logic - uses personalized phrases from content.ts
  const phrases = personalization.heroSubtitles;
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        setTypingSpeed(30);
      } else {
        const nextCharIndex = displayText.length;
        setDisplayText(fullText.substring(0, nextCharIndex + 1));

        // Dynamic speed for natural typing feel
        let nextSpeed = 100 - Math.random() * 50; // 50-100ms

        // Pause before typing a space (end of word) to simulate thinking
        if (fullText[nextCharIndex] === ' ') {
          nextSpeed = 450;
        }

        setTypingSpeed(nextSpeed);
      }

      if (!isDeleting && displayText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 2000); // Longer pause at end
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Pause before next phrase
      } else {
        timer = setTimeout(handleTyping, typingSpeed);
      }
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, phrases, typingSpeed]);

  // Floating Elements Logic
  const heroFloatingElements = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: Math.random() * 120 - 10,
    top: Math.random() * 120 - 10,
    size: Math.random() * 0.8 + 0.4,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 2,
    type: i % 3,
    color: i % 3 === 0 ? 'text-rose-300' : (i % 3 === 1 ? 'text-rose-200' : 'text-lavender-300'),
    moveX: Math.random() * 50 - 25,
    moveY: Math.random() * 50 - 25,
  }));

  const glitterParticles = Array.from({ length: 50 }).map((_, i) => ({
    id: `glitter-${i}`,
    left: Math.random() * 120 - 10,
    top: Math.random() * 120 - 10,
    size: Math.random() * 6 + 2,
    color: ['bg-yellow-200', 'bg-rose-200', 'bg-white', 'bg-lavender-200'][Math.floor(Math.random() * 4)],
    shape: Math.random() > 0.5 ? 'rounded-full' : 'rounded-sm',
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 5,
  }));

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-rose-50 opacity-80 z-0" />

      {/* Logo */}
      <div className="absolute top-6 left-6 z-20 opacity-80 hover:opacity-100 transition-opacity">
        <Logo />
      </div>

      {/* Glitter/Confetti Layer - Parallax Layer 1 */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {glitterParticles.map((el) => (
          <motion.div
            key={el.id}
            className={`absolute ${el.color} ${el.shape}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0],
              rotate: [0, 180, 360],
              y: [0, 20]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "easeInOut"
            }}
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
              width: el.size,
              height: el.size,
            }}
          />
        ))}
      </motion.div>

      {/* Hero Specific Animated Background Layer - Parallax Layer 2 */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {heroFloatingElements.map((el) => (
          <motion.div
            key={el.id}
            className={`absolute ${el.color}`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, el.size, 0],
              x: [0, el.moveX],
              y: [0, el.moveY],
              rotate: [0, 180]
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              repeatType: "reverse",
              delay: el.delay,
              ease: "easeInOut"
            }}
            style={{
              left: `${el.left}%`,
              top: `${el.top}%`,
            }}
          >
            {el.type === 0 && <Heart fill="currentColor" className="w-6 h-6" />}
            {el.type === 1 && <Star fill="currentColor" className="w-5 h-5" />}
            {el.type === 2 && <Sparkles className="w-7 h-7" />}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        style={{ rotateX, rotateY, z: 100 }}
        className="relative z-10 max-w-4xl text-center transform-style-3d cursor-default"
      >
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 inline-block"
        >
          <Heart className="w-16 h-16 text-rose-400 fill-rose-200" strokeWidth={1.5} />
        </motion.div>

        <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-rose-900 leading-tight mb-6 drop-shadow-sm">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="block mb-2"
          >
            The Moment
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="block text-rose-400 text-5xl md:text-7xl mb-4"
          >
            I Saw
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="block"
          >
            You...
          </motion.span>
        </h1>

        <motion.p
          className="font-sans text-xl md:text-2xl text-slate-600 font-light max-w-2xl mx-auto leading-relaxed h-20"
        >
          ...everything changed, and <br />
          <span className="inline-flex items-center">
            <span className="font-semibold text-rose-500">{displayText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="w-0.5 h-6 bg-rose-400 ml-1 inline-block"
            />
          </span>
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 animate-bounce"
      >
        <div className="flex flex-col items-center gap-2 text-rose-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  );
};