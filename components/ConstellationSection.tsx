import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TypewriterText } from './TypewriterText';
import { Sparkles } from 'lucide-react';

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  fading: boolean;
  speed: number;
}

export const ConstellationSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const isInView = useInView(containerRef, { amount: 0.3 });

  // Interactive "Major Stars" (The constellations)
  const constellations = [
    { id: 1, x: 20, y: 30, title: "My North Star", text: "You always guide me home when I'm lost." },
    { id: 2, x: 75, y: 25, title: "My Sun", text: "You bring warmth to my coldest days." },
    { id: 3, x: 50, y: 60, title: "My Moon", text: "You shine brightest in my darkest hours." },
    { id: 4, x: 80, y: 70, title: "My Universe", text: "Simply put, you are my everything." },
    { id: 5, x: 15, y: 80, title: "My Serenity", text: "With you, the noise of the world fades away." },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let stars: Star[] = [];
    const numStars = 200;

    // Initialize stars
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5,
        alpha: Math.random(),
        fading: Math.random() > 0.5,
        speed: Math.random() * 0.02 + 0.005
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw Stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        // Twinkle effect
        if (star.fading) {
          star.alpha -= star.speed;
          if (star.alpha <= 0.2) star.fading = false;
        } else {
          star.alpha += star.speed;
          if (star.alpha >= 1) star.fading = true;
        }

        // Mouse interaction (Connect lines nearby)
        const dx = mouseX - star.x;
        const dy = mouseY - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist / 100})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        }
      });

      requestAnimationFrame(draw);
    };

    const animId = requestAnimationFrame(draw);

    return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 overflow-hidden flex items-center justify-center text-white">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      {/* Content Layer */}
      <div className="relative z-10 text-center pointer-events-none px-4">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
        >
            <Sparkles className="w-12 h-12 text-yellow-200 mx-auto mb-6 animate-pulse" />
            <h2 className="font-script text-5xl md:text-7xl mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-white to-rose-200">
                My Universe
            </h2>
            <p className="font-sans text-xl md:text-2xl text-purple-100/80 max-w-2xl mx-auto leading-relaxed">
                In a galaxy of billions, I found the only star that matters.
            </p>
        </motion.div>
      </div>

      {/* Interactive Constellation Points */}
      {constellations.map((c) => (
          <motion.div
            key={c.id}
            className="absolute z-20"
            style={{ left: `${c.x}%`, top: `${c.y}%` }}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: c.id * 0.3, type: "spring" }}
          >
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setHoveredStar(c.id)}
                onMouseLeave={() => setHoveredStar(null)}
              >
                  {/* Glowing Star */}
                  <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)] animate-pulse group-hover:scale-150 transition-transform duration-300"></div>
                  <div className="absolute -inset-4 border border-white/20 rounded-full animate-ping opacity-50"></div>
                  
                  {/* Tooltip / Reveal */}
                  <div className={`absolute left-1/2 -translate-x-1/2 bottom-8 w-64 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-center transition-all duration-500 origin-bottom ${hoveredStar === c.id ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}>
                      <h3 className="font-script text-2xl text-yellow-200 mb-1">{c.title}</h3>
                      <div className="font-sans text-sm text-white/90">
                          {hoveredStar === c.id && (
                              <TypewriterText text={c.text} speed={30} delay={0.1} />
                          )}
                      </div>
                      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/10 border-r border-b border-white/20 transform rotate-45"></div>
                  </div>
              </div>
          </motion.div>
      ))}
    </section>
  );
};