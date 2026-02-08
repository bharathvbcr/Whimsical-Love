import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { Envelope } from './Envelope';
import { TypewriterText } from './TypewriterText';
import { RingBox } from './RingBox';
import { useContent } from '../contexts/ContentContext';
import confetti from 'canvas-confetti';

export const ProposalFooter: React.FC = () => {
    const { personalization } = useContent();
    const [isHovered, setIsHovered] = useState(false);
    const [hasSaidYes, setHasSaidYes] = useState(false);
    const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
    const [isRingBoxOpen, setIsRingBoxOpen] = useState(false);
    const [showProposal, setShowProposal] = useState(false);
    const [showWhiteOverlay, setShowWhiteOverlay] = useState(false);

    // Refs for "No Way" button animation
    const noBtnRef = useRef<HTMLDivElement>(null);
    const noBtnOriginRef = useRef<{ x: number; y: number } | null>(null);
    const lastEscapeAngle = useRef<number>(0);

    // Motion values for smooth "No Way" button animation with struggle effect
    const noBtnX = useMotionValue(0);
    const noBtnY = useMotionValue(0);
    const noBtnRotate = useMotionValue(0);

    // Soft spring physics for smooth, playful movement
    const springNoBtnX = useSpring(noBtnX, { stiffness: 120, damping: 15, mass: 1 });
    const springNoBtnY = useSpring(noBtnY, { stiffness: 120, damping: 15, mass: 1 });
    const springNoBtnRotate = useSpring(noBtnRotate, { stiffness: 200, damping: 20 });

    // Parallax logic for celebration screen
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

    // Parallax transforms - Increased range for more noticeable effect
    const headingX = useTransform(springX, [-0.5, 0.5], [-50, 50]);
    const headingY = useTransform(springY, [-0.5, 0.5], [-50, 50]);
    const bgX = useTransform(springX, [-0.5, 0.5], [80, -80]);
    const bgY = useTransform(springY, [-0.5, 0.5], [80, -80]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!hasSaidYes) return;
        const { clientX, clientY, currentTarget } = e;
        const { width, height, left, top } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width - 0.5);
        mouseY.set((clientY - top) / height - 0.5);
    };

    // Calculate the origin position of the "No Way" button on first render
    const captureNoBtnOrigin = useCallback(() => {
        if (noBtnRef.current && !noBtnOriginRef.current) {
            const rect = noBtnRef.current.getBoundingClientRect();
            noBtnOriginRef.current = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }
    }, []);

    // Enhanced evasion with smooth struggle effect
    const handleNoBtnMouseMove = useCallback((e: React.MouseEvent) => {
        if (!noBtnRef.current) return;

        // Capture origin on first interaction
        captureNoBtnOrigin();
        if (!noBtnOriginRef.current) return;

        const mouseXPos = e.clientX;
        const mouseYPos = e.clientY;

        // Get current button screen position (origin + current offset)
        const currentBtnX = noBtnOriginRef.current.x + springNoBtnX.get();
        const currentBtnY = noBtnOriginRef.current.y + springNoBtnY.get();

        // Distance from mouse to button center
        const dx = currentBtnX - mouseXPos;
        const dy = currentBtnY - mouseYPos;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Trigger zone - larger for earlier response, smoother experience
        const triggerRadius = 250;

        if (distance < triggerRadius) {
            // Calculate escape direction (away from mouse)
            let escapeAngle = Math.atan2(dy, dx);

            // Add "struggle" wobble - oscillate the angle slightly for a playful effect
            const wobbleIntensity = 0.4; // radians
            const wobbleSpeed = Date.now() / 150; // oscillation speed
            const wobble = Math.sin(wobbleSpeed) * wobbleIntensity * (1 - distance / triggerRadius);
            escapeAngle += wobble;

            // Smoothly blend with last escape angle to prevent jitter
            const angleDiff = escapeAngle - lastEscapeAngle.current;
            // Normalize angle difference to [-PI, PI]
            const normalizedDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff));
            escapeAngle = lastEscapeAngle.current + normalizedDiff * 0.3;
            lastEscapeAngle.current = escapeAngle;

            // Increased movement range - the closer the mouse, the further it escapes
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const safeMargin = 60;
            const maxRangeX = Math.min(viewportWidth / 2 - safeMargin, 500); // Increased from 400
            const maxRangeY = Math.min(viewportHeight / 3, 350); // Increased from 250

            // Escape distance is proportional to how close the mouse is
            const urgency = 1 - (distance / triggerRadius);
            const escapeMultiplier = 0.6 + urgency * 0.6; // 60% to 120% of max range

            let targetX = Math.cos(escapeAngle) * maxRangeX * escapeMultiplier;
            let targetY = Math.sin(escapeAngle) * maxRangeY * escapeMultiplier;

            // Clamp to safe boundaries
            targetX = Math.max(-maxRangeX, Math.min(maxRangeX, targetX));
            targetY = Math.max(-maxRangeY, Math.min(maxRangeY, targetY));

            // Apply the new position - spring physics will handle smooth transition
            noBtnX.set(targetX);
            noBtnY.set(targetY);

            // Add rotation based on movement direction for extra personality
            const rotationAmount = Math.sin(wobbleSpeed * 1.5) * 15 * urgency;
            noBtnRotate.set(rotationAmount);
        }
    }, [captureNoBtnOrigin, springNoBtnX, springNoBtnY, noBtnX, noBtnY, noBtnRotate]);

    const triggerConfetti = () => {
        const duration = 5000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 8,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#fb7185', '#f43f5e', '#fff']
            });
            confetti({
                particleCount: 8,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#fb7185', '#f43f5e', '#fff']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const handleYesClick = () => {
        // Start white flash transition
        setShowWhiteOverlay(true);

        // Wait for screen to go white before changing content
        setTimeout(() => {
            setHasSaidYes(true);
            triggerConfetti();

            // Start fading out the white overlay to reveal the "Yes" screen
            setTimeout(() => {
                setShowWhiteOverlay(false);
            }, 100);
        }, 1000); // 1s fade in duration matches the animation duration below
    };

    return (
        <footer className="min-h-screen relative flex flex-col items-center justify-center bg-rose-900 text-white overflow-hidden pb-20 pt-20">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            {/* White Transition Overlay */}
            <AnimatePresence>
                {showWhiteOverlay && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="fixed inset-0 z-[100] bg-white pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!hasSaidYes ? (
                    <motion.div
                        key="question"
                        className="relative z-10 text-center px-4 w-full max-w-4xl"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mb-10 max-w-2xl mx-auto"
                        >
                            <p className="font-hand text-4xl md:text-5xl text-rose-100 leading-normal mb-6 drop-shadow-sm">
                                <TypewriterText
                                    text="I think my life would be much better with you beside me."
                                    trigger={true}
                                    delay={0.5}
                                    speed={50}
                                />
                            </p>
                        </motion.div>

                        <p className="font-sans text-xl md:text-2xl text-rose-200 mb-16 tracking-[0.2em] uppercase opacity-90">One last question...</p>

                        {!isEnvelopeOpen ? (
                            <div className="mb-24 transform scale-110">
                                <Envelope onOpen={() => {
                                    setIsEnvelopeOpen(true);
                                    // Trigger ring box to open after a short delay
                                    setTimeout(() => setIsRingBoxOpen(true), 500);
                                }} />
                            </div>
                        ) : !showProposal ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="mb-12"
                            >
                                <RingBox
                                    isOpen={isRingBoxOpen}
                                    onAnimationComplete={() => {
                                        setTimeout(() => setShowProposal(true), 1000);
                                    }}
                                />
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isRingBoxOpen ? 1 : 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-rose-200 font-hand text-2xl mt-4"
                                >
                                    For you, {personalization.partnerName}...
                                </motion.p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="relative inline-block group cursor-pointer mb-16"
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {/* Text Entrance Wrapper with Bounce */}
                                    <motion.div
                                        initial={{ scale: 0.2, opacity: 0, y: 50, filter: "blur(10px)" }}
                                        animate={{ scale: 1, opacity: 1, y: 0, filter: "blur(0px)" }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 15, // Low damping for bounce
                                            mass: 1,
                                            delay: 0.1
                                        }}
                                    >
                                        {/* Text Continuous Pulse */}
                                        <motion.div
                                            animate={{
                                                scale: isHovered ? 1.15 : [1, 1.05, 1],
                                            }}
                                            transition={{
                                                scale: {
                                                    duration: isHovered ? 0.3 : 2,
                                                    repeat: Infinity,
                                                    repeatType: "reverse",
                                                    ease: "easeInOut"
                                                }
                                            }}
                                            className="font-script text-7xl md:text-9xl text-rose-100 drop-shadow-[0_0_25px_rgba(255,228,230,0.6)]"
                                        >
                                            Will You Be Mine?
                                        </motion.div>
                                    </motion.div>

                                    <motion.div
                                        className="absolute -inset-10 bg-rose-500/20 blur-3xl rounded-full -z-10"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    />
                                </div>

                                <div
                                    className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative"
                                    onMouseMove={handleNoBtnMouseMove}
                                >
                                    {/* YES BUTTON */}
                                    <motion.button
                                        onClick={handleYesClick}
                                        whileHover={{
                                            scale: 1.15,
                                            y: -5,
                                            boxShadow: "0 20px 40px -10px rgba(255, 255, 255, 0.4)",
                                            textShadow: "0 0 8px rgba(255,255,255,0.8)"
                                        }}
                                        whileTap={{ scale: 0.95, y: 0 }}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                        className="bg-white text-rose-600 px-16 py-6 rounded-full font-bold text-2xl shadow-[0_0_40px_rgba(255,255,255,0.5)] transition-all flex items-center gap-3 ring-4 ring-rose-300 ring-opacity-50 z-20"
                                    >
                                        <Heart className="fill-rose-600 text-rose-600 animate-pulse w-8 h-8" />
                                        <span>YES!</span>
                                    </motion.button>

                                    {/* NO BUTTON WRAPPER - Smooth spring-based animation */}
                                    <motion.div
                                        ref={noBtnRef}
                                        style={{
                                            x: springNoBtnX,
                                            y: springNoBtnY,
                                            rotate: springNoBtnRotate,
                                        }}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        className="relative z-10"
                                    >
                                        {/* Extended proximity trigger for continuous tracking */}
                                        <div
                                            className="absolute -inset-40 rounded-full cursor-not-allowed"
                                            onMouseMove={handleNoBtnMouseMove}
                                        ></div>

                                        <button
                                            className="bg-rose-950/50 text-rose-300 px-10 py-4 rounded-full font-semibold text-lg border border-rose-800/50 hover:bg-rose-900 transition-colors backdrop-blur-sm pointer-events-none"
                                        >
                                            No way
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="celebration"
                        className="fixed inset-0 z-50 bg-rose-950/90 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center cursor-default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        onMouseMove={handleMouseMove}
                    >
                        {/* Floating Hearts BG - Parallax Layer */}
                        <motion.div
                            style={{ x: bgX, y: bgY }}
                            className="absolute inset-0 overflow-hidden pointer-events-none"
                        >
                            {Array.from({ length: 40 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute text-rose-500/20"
                                    initial={{ y: "100vh", x: Math.random() * 100 + "vw", scale: Math.random() * 0.5 + 0.5 }}
                                    animate={{ y: "-10vh" }}
                                    transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, delay: Math.random() * 5 }}
                                >
                                    <Heart size={Math.random() * 50 + 20} fill="currentColor" />
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 50, damping: 15 }}
                            className="relative z-10 perspective-1000"
                        >
                            {/* Scale Up Entrance + Sparkles + Mouse Parallax */}
                            <motion.div
                                style={{ x: headingX, y: headingY }}
                                className="relative"
                            >
                                <motion.h2
                                    initial={{ scale: 0.5, opacity: 0, filter: "blur(10px)" }}
                                    animate={{ scale: [0.5, 1.1, 1], opacity: 1, filter: "blur(0px)" }}
                                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3, times: [0, 0.7, 1] }}
                                    className="font-script text-7xl md:text-9xl text-white mb-6 drop-shadow-[0_0_20px_rgba(244,63,94,0.6)]"
                                >
                                    She Said Yes!
                                </motion.h2>

                                {/* Sparkles around text */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute text-yellow-200"
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{
                                            scale: [0, 1, 0],
                                            opacity: [0, 1, 0],
                                            rotate: [0, 180],
                                            x: Math.cos(i * 60 * (Math.PI / 180)) * 200,
                                            y: Math.sin(i * 60 * (Math.PI / 180)) * 100
                                        }}
                                        transition={{ duration: 2.5, delay: 1 + i * 0.2, repeat: Infinity, repeatDelay: 1 }}
                                        style={{
                                            left: "50%",
                                            top: "50%",
                                            marginLeft: -12,
                                            marginTop: -12
                                        }}
                                    >
                                        <Sparkles size={24 + Math.random() * 20} />
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 2, duration: 1 }}
                                className="max-w-2xl mx-auto bg-white/10 p-8 rounded-3xl border border-white/20 backdrop-blur-md"
                            >
                                <div className="font-hand text-3xl text-rose-100 leading-relaxed mb-6 min-h-[5em]">
                                    <TypewriterText
                                        text={`"${personalization.specialMessage}"`}
                                        trigger={true}
                                        delay={2.5}
                                        speed={40}
                                        cursor={true}
                                    />
                                </div>
                                <p className="text-rose-200 font-hand text-xl mb-4">With all my love,</p>
                                <p className="text-rose-100 font-script text-3xl">{personalization.yourName}</p>
                                <div className="flex justify-center gap-4 text-rose-300">
                                    <Heart fill="currentColor" />
                                    <Heart fill="currentColor" />
                                    <Heart fill="currentColor" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative footer bottom */}
            <div className="absolute bottom-4 text-rose-300/50 font-sans text-sm flex items-center gap-2">
                <span>Made with all my heart</span>
                <span>•</span>
                <a href="https://github.com/yourusername/whimsical-proposal" target="_blank" rel="noopener noreferrer" className="hover:text-rose-300 transition-colors">
                    Open Source
                </a>
            </div>
        </footer>
    );
};