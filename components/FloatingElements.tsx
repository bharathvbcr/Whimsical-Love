import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart, Star, Cloud, Sparkles } from 'lucide-react';

// --- Layer 1: Canvas Dust Motes (High Performance Particles) ---
const DustOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Resize handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Particle Config
    const particleCount = 60;
    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; opacity: number; fadeSpeed: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random(),
        fadeSpeed: Math.random() * 0.01 + 0.002
      });
    }

    // Animation Loop
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Set shadow once before the loop instead of 60x per frame
      ctx.shadowBlur = 4;
      ctx.shadowColor = "white";

      particles.forEach((p) => {
        // Update Position
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off screen edges with position clamping to prevent oscillation
        if (p.x < 0) { p.x = 0; p.speedX = Math.abs(p.speedX); }
        else if (p.x > width) { p.x = width; p.speedX = -Math.abs(p.speedX); }

        if (p.y < 0) { p.y = 0; p.speedY = Math.abs(p.speedY); }
        else if (p.y > height) { p.y = height; p.speedY = -Math.abs(p.speedY); }

        // Twinkle Effect
        p.opacity += p.fadeSpeed;
        if (p.opacity > 0.8 || p.opacity < 0.2) p.fadeSpeed = -p.fadeSpeed;

        // Draw
        ctx.beginPath();
        const drawX = Math.round(p.x);
        const drawY = Math.round(p.y);
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 228, 230, ${p.opacity})`;
        ctx.fill();
      });

      // Reset shadow to avoid affecting other draws
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" style={{ willChange: 'contents' }} />;
};

// --- Layer 2: Soft Glowing Orbs (Atmosphere) ---
const GlowingOrbs: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Orb 1: Top Left Rose */}
      <motion.div
        style={{ y: y1 }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-rose-200/30 rounded-full blur-[100px]"
      />

      {/* Orb 2: Bottom Right Gold */}
      <motion.div
        style={{ y: y2 }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-amber-100/30 rounded-full blur-[120px]"
      />

      {/* Orb 3: Middle Lavender */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-purple-200/20 rounded-full blur-[80px]"
      />
    </div>
  );
};

// --- Layer 3: Iconic Elements (Hearts, Stars) ---
export const FloatingBackground: React.FC = () => {
  // Reduced count slightly to balance with new layers
  const [elements, setElements] = React.useState<any[]>([]);

  React.useEffect(() => {
    setElements(Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        duration: 20 + Math.random() * 20,
        delay: Math.random() * 5,
        scale: 0.2 + Math.random() * 0.5, // Smaller on average
        type: i % 4, // 0: Heart, 1: Star, 2: Cloud, 3: Sparkle
    })));
  }, []);

  return (
    <>
      <GlowingOrbs />
      <DustOverlay />

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {elements.map((el) => (
          <motion.div
            key={el.id}
            className="absolute text-rose-300/20"
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: [0, 0.4, 0],
              y: [-50, -150, -50], // Slower, vertical drift
              x: [-20, 20, -20],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: el.duration,
              repeat: Infinity,
              delay: el.delay,
              ease: "linear",
            }}
            style={{
              left: el.left,
              top: el.top,
              scale: el.scale,
            }}
          >
            {el.type === 0 && <Heart fill="currentColor" size={48} />}
            {el.type === 1 && <Star fill="currentColor" size={32} />}
            {el.type === 2 && <Cloud fill="currentColor" size={64} />}
            {el.type === 3 && <Sparkles size={40} />}
          </motion.div>
        ))}
      </div>
    </>
  );
};