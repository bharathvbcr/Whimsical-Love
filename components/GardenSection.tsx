import React, { useEffect, useRef, useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
import { useInView } from 'framer-motion';
import { useAutoScroll } from './AutoScrollContext';

interface Flower {
    x: number;
    y: number;
    size: number;
    color: string;
    petalCount: number;
    rotation: number;
    growth: number; // 0 to 1
}

export const GardenSection: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [flowers, setFlowers] = useState<Flower[]>([]);
    const animationFrameId = useRef<number>(0);

    const colors = useMemo(() => ['#f43f5e', '#fb7185', '#fecdd3', '#fda4af', '#e11d48', '#be123c', '#fbbf24', '#fcd34d'], []);

    // Movie Mode Integration
    const { isPlaying, registerPause, unregisterPause } = useAutoScroll();
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.5 });
    const [hasAutoPlanted, setHasAutoPlanted] = useState(false);

    // Auto-plant effect for Movie Mode
    useEffect(() => {
        if (isPlaying && isInView && !hasAutoPlanted && flowers.length === 0) {
            registerPause('garden');

            const canvas = canvasRef.current;
            if (!canvas) return;

            const rect = canvas.getBoundingClientRect();
            let flowerCount = 0;
            const maxFlowers = 8;
            const interval: ReturnType<typeof setInterval> = setInterval(() => {
                const x = 50 + Math.random() * (rect.width - 100);
                const y = 80 + Math.random() * (rect.height - 160);

                const newFlower: Flower = {
                    x,
                    y,
                    size: Math.random() * 20 + 20,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    petalCount: Math.floor(Math.random() * 5) + 5,
                    rotation: Math.random() * Math.PI,
                    growth: 0
                };

                setFlowers(prev => [...prev, newFlower]);
                flowerCount++;

                if (flowerCount >= maxFlowers) {
                    clearInterval(interval);
                    setHasAutoPlanted(true);
                    // Wait for flowers to bloom
                    setTimeout(() => unregisterPause('garden'), 2500);
                }
            }, 400);

            return () => {
                if (interval) clearInterval(interval);
                unregisterPause('garden');
            };
        }
    }, [isPlaying, isInView, hasAutoPlanted, flowers.length, colors, registerPause, unregisterPause]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw flowers
            flowers.forEach((flower) => {
                if (flower.growth < 1) {
                    flower.growth += 0.02;
                }

                ctx.save();
                ctx.translate(flower.x, flower.y);
                ctx.rotate(flower.rotation);
                ctx.scale(flower.growth, flower.growth);

                // Draw Stem (only if grown enough)
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.quadraticCurveTo(5, 20, 0, 40);
                ctx.strokeStyle = '#10b981';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Draw Petals
                for (let i = 0; i < flower.petalCount; i++) {
                    ctx.save();
                    ctx.rotate((Math.PI * 2 / flower.petalCount) * i);
                    ctx.beginPath();
                    ctx.ellipse(0, -flower.size / 2, flower.size / 4, flower.size / 2, 0, 0, Math.PI * 2);
                    ctx.fillStyle = flower.color;
                    ctx.fill();
                    ctx.restore();
                }

                // Center
                ctx.beginPath();
                ctx.arc(0, 0, flower.size / 4, 0, Math.PI * 2);
                ctx.fillStyle = '#fffbeb';
                ctx.fill();

                ctx.restore();
            });

            animationFrameId.current = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId.current);
    }, [flowers]);

    const addFlower = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        let clientX, clientY;
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = (e as React.MouseEvent).clientX;
            clientY = (e as React.MouseEvent).clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const newFlower: Flower = {
            x,
            y,
            size: Math.random() * 20 + 20,
            color: colors[Math.floor(Math.random() * colors.length)],
            petalCount: Math.floor(Math.random() * 5) + 5,
            rotation: Math.random() * Math.PI,
            growth: 0
        };

        setFlowers(prev => [...prev, newFlower]);
    };

    return (
        <section ref={containerRef} className="py-24 bg-green-50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20"
                style={{ backgroundImage: 'radial-gradient(#86efac 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mb-8 pointer-events-none">
                <h2 className="font-script text-5xl text-green-800 mb-2">Plant Our Garden</h2>
                <p className="font-sans text-green-700/70">Tap anywhere to make love bloom.</p>
            </div>

            <div className="relative w-full h-[500px] border-y-4 border-green-800/10 cursor-pointer touch-none bg-white/30 backdrop-blur-sm"
                onMouseDown={addFlower}
                onTouchStart={addFlower}
            >
                <canvas ref={canvasRef} className="w-full h-full" />

                {flowers.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="bg-white/80 px-6 py-3 rounded-full shadow-lg animate-bounce text-green-600 font-hand font-bold text-xl">
                            Click here! 🌸
                        </div>
                    </div>
                )}
            </div>

            <div className="text-center mt-8">
                <button
                    onClick={() => setFlowers([])}
                    className="flex items-center gap-2 mx-auto text-green-600 hover:text-green-800 transition-colors font-sans text-sm font-bold uppercase tracking-widest"
                >
                    <RefreshCw size={16} />
                    Clear Garden
                </button>
            </div>
        </section>
    );
};