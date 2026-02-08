import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Sparkles, Eraser } from 'lucide-react';
import { TypewriterText } from './TypewriterText';
import { useAutoScroll } from './AutoScrollContext';

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [percentCleared, setPercentCleared] = useState(0);

  // Movie Mode Integration
  const { isPlaying, registerPause, unregisterPause } = useAutoScroll();
  const isInView = useInView(cardRef, { amount: 0.6 });
  const [hasAutoScratched, setHasAutoScratched] = useState(false);

  // Auto Scratch Effect
  useEffect(() => {
    if (isPlaying && isInView && !isRevealed && !hasAutoScratched) {
      registerPause('scratch');

      // Wait a beat before starting
      const delayStart = setTimeout(() => {
        let p = 0;
        const interval = setInterval(() => {
          p += 2;
          setPercentCleared(p);

          // Simulate drawing on canvas
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
              const w = canvas.width;
              const h = canvas.height;
              // Random scratches
              ctx.globalCompositeOperation = 'destination-out';
              ctx.beginPath();
              ctx.arc(Math.random() * w, Math.random() * h, 40, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          if (p >= 100) {
            clearInterval(interval);
            setIsRevealed(true);
            setHasAutoScratched(true);
            // Wait to read the revealed message before scrolling
            setTimeout(() => {
              unregisterPause('scratch');
            }, 3000);
          }
        }, 50);

        return () => clearInterval(interval);
      }, 1000);

      return () => {
        clearTimeout(delayStart);
        unregisterPause('scratch');
      };
    }
  }, [isPlaying, isInView, isRevealed, hasAutoScratched, registerPause, unregisterPause]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      // Set canvas size to match the displayed card size exactly
      const rect = card.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      ctx.fillStyle = '#fce7f3';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = '30px "Great Vibes"';
      ctx.fillStyle = '#fb7185';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText("Rub gently to reveal a secret...", canvas.width / 2, canvas.height / 2);

      ctx.globalCompositeOperation = 'destination-out';
    };

    // Initial sizing
    resize();

    // Resize observer is better than window resize for elements
    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(card);

    // Manual scratch logic
    let isDrawing = false;
    const getPos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      e.preventDefault();
      const { x, y } = getPos(e);
      // Larger brush for touch devices (50px vs 30px for mouse)
      const brushRadius = 'touches' in e ? 50 : 30;
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
      if (Math.random() > 0.8 && !hasAutoScratched) {
        // Manual progress check
        setPercentCleared(prev => {
          const next = prev + 2;
          if (next > 60 && !isRevealed) setIsRevealed(true);
          return next;
        });
      }
    };

    const startDraw = (e: MouseEvent | TouchEvent) => {
      isDrawing = true;
      draw(e); // Draw immediately on touch/click
    };
    const endDraw = () => isDrawing = false;

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('touchstart', startDraw, { passive: false });
    canvas.addEventListener('touchmove', draw, { passive: false });
    canvas.addEventListener('touchend', endDraw);

    return () => {
      resizeObserver.disconnect();
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseup', endDraw);
      canvas.removeEventListener('touchstart', startDraw);
      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('touchend', endDraw);
    };
  }, [isRevealed, hasAutoScratched]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h2 className="font-script text-5xl text-rose-900 mb-12">A Little Secret</h2>

        <div ref={cardRef} className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-xl shadow-2xl overflow-hidden border-8 border-rose-100 mx-auto select-none">
          <div className="absolute inset-0 bg-rose-50 flex flex-col items-center justify-center p-8 select-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isRevealed ? { scale: 1, opacity: 1 } : {}}
              className="text-center"
            >
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="font-hand text-3xl md:text-4xl text-rose-600 mb-4 font-bold min-h-[3em] flex items-center justify-center">
                <TypewriterText
                  text='"I loved you from the very first moment."'
                  trigger={isRevealed}
                  delay={0.5}
                  speed={40}
                />
              </h3>
              <p className="font-sans text-slate-500">
                (Also, you look really cute when you're focusing on scratching this card.)
              </p>
            </motion.div>
          </div>

          <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-crosshair touch-none z-10"
            animate={isRevealed ? { opacity: 0, pointerEvents: "none" } : { opacity: 1 }}
            transition={{ duration: 1 }}
          />

          {!isRevealed && percentCleared < 5 && !isPlaying && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-pulse z-20 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
              <Eraser size={16} className="text-rose-500" />
              <span className="text-rose-800 font-sans text-sm font-semibold">Rub here</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};