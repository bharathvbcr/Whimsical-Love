import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useContent } from '../contexts/ContentContext';

export const PromiseSection: React.FC = () => {
    const { promises } = useContent();
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="py-32 relative bg-rose-900 text-rose-50 overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

            <motion.div style={{ y }} className="absolute top-0 right-0 w-96 h-96 bg-rose-500 rounded-full blur-[128px] opacity-20 pointer-events-none" />
            <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]) }} className="absolute bottom-0 left-0 w-96 h-96 bg-rose-400 rounded-full blur-[128px] opacity-20 pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <motion.div
                    style={{ opacity }}
                    className="text-center mb-20"
                >
                    <h2 className="font-script text-6xl md:text-7xl mb-6 text-rose-100">My Vow to You</h2>
                    <p className="font-sans text-xl text-rose-200/80 max-w-2xl mx-auto">
                        Words are easy, but promises are sacred. Here is my heart, laid bare.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {promises.map((promise, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.8 }}
                            className="text-center group"
                        >
                            <div className="inline-block p-6 rounded-full bg-white/5 border border-white/10 mb-6 group-hover:bg-white/10 group-hover:scale-110 transition-all duration-500">
                                <promise.icon size={40} className="text-rose-200" />
                            </div>
                            <h3 className="font-script text-4xl mb-4 text-rose-100">{promise.title}</h3>
                            <p className="font-sans text-lg text-rose-200/70 leading-relaxed px-4">
                                {promise.text}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};