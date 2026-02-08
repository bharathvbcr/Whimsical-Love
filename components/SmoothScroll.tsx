import React, { useEffect, useRef } from 'react';
import { ReactLenis } from 'lenis/react';
import type { LenisRef } from 'lenis/react';
import { cancelFrame, frame } from 'framer-motion';

export const SmoothScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const lenisRef = useRef<LenisRef>(null);

    // Drive Lenis from framer-motion's existing RAF loop instead of creating a new one
    useEffect(() => {
        function update(data: { timestamp: number }) {
            lenisRef.current?.lenis?.raf(data.timestamp);
        }
        frame.update(update, true);
        return () => cancelFrame(update);
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                syncTouch: false, // Don't sync touch scroll with JS to prevent jitter
            }}
        >
            {children}
        </ReactLenis>
    );
};
