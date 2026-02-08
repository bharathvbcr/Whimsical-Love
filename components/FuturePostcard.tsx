import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Stamp } from 'lucide-react';

export const FuturePostcard: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="py-32 bg-sky-50 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Clouds */}
            <div className="absolute top-20 left-10 text-white/40 animate-float delay-0"><Cloud size={80} /></div>
            <div className="absolute top-40 right-20 text-white/60 animate-float delay-1000"><Cloud size={120} /></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10 mb-12">
                <h2 className="font-script text-5xl text-sky-900 mb-4">A Note From The Future</h2>
                <p className="font-sans text-sky-700/70">I found this in our mailbox, dated 50 years from now...</p>
            </div>

            <div className="relative h-[500px] w-full max-w-2xl flex items-center justify-center perspective-1000">
                <AnimatePresence mode="wait">
                    {!isOpen ? (
                        <motion.div
                            key="mailbox"
                            className="cursor-pointer group relative"
                            onClick={() => setIsOpen(true)}
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring" }}
                        >
                            {/* Mailbox Graphic CSS Construction */}
                            <div className="w-64 h-48 bg-slate-700 rounded-t-full relative z-10 shadow-2xl flex items-center justify-center overflow-hidden border-b-8 border-slate-800">
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-800"></div>
                                <div className="text-white/20 font-bold text-6xl font-sans tracking-tighter">US</div>
                            </div>
                            <div className="w-4 h-32 bg-slate-800 mx-auto -mt-2"></div>
                            
                            {/* Flag */}
                            <motion.div 
                                className="absolute right-[-20px] top-10 w-4 h-24 bg-red-500 origin-bottom rounded-t-md z-0"
                                animate={{ rotate: [0, -20, 0] }}
                                transition={{ repeat: Infinity, duration: 3, repeatDelay: 1 }}
                            />
                            
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg text-sky-600 font-bold animate-bounce whitespace-nowrap">
                                You have mail! 📬
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="postcard"
                            initial={{ rotateY: 90, opacity: 0 }}
                            animate={{ rotateY: 0, opacity: 1 }}
                            exit={{ rotateY: -90, opacity: 0 }}
                            transition={{ duration: 0.8, type: "spring" }}
                            className="bg-amber-50 w-full max-w-lg aspect-[1.4] shadow-2xl p-8 relative hand-drawn-border transform rotate-2"
                        >
                            {/* Postcard Layout */}
                            <div className="absolute top-4 right-4 w-20 h-24 border-2 border-dashed border-amber-200 flex flex-col items-center justify-center rotate-3">
                                <div className="w-16 h-16 bg-sky-200 rounded-full overflow-hidden mb-1 relative">
                                    <div className="absolute bottom-0 w-full h-1/2 bg-green-200"></div>
                                    <div className="absolute top-2 right-2 w-4 h-4 bg-yellow-200 rounded-full"></div>
                                </div>
                                <span className="text-[10px] font-mono text-amber-400 uppercase">Forever Stamp</span>
                            </div>

                            {/* Postmark */}
                            <div className="absolute top-6 right-24 opacity-60 rotate-12">
                                <div className="w-24 h-24 border-2 border-slate-800 rounded-full flex items-center justify-center">
                                    <div className="text-center text-xs font-mono font-bold leading-tight">
                                        FUTURE POST<br/>
                                        AUG 12<br/>
                                        2074
                                    </div>
                                </div>
                                <div className="w-32 h-4 border-t-2 border-b-2 border-slate-800 absolute top-1/2 left-full -ml-4 wave-lines"></div>
                            </div>

                            <div className="flex h-full gap-8">
                                <div className="flex-1 flex flex-col justify-center">
                                    <h3 className="font-hand text-2xl text-slate-800 mb-6 font-bold">My Dearest Love,</h3>
                                    <p className="font-hand text-lg text-slate-700 leading-relaxed mb-4">
                                        We just finished watching the sunset from our porch. You are still as beautiful as the day I proposed.
                                    </p>
                                    <p className="font-hand text-lg text-slate-700 leading-relaxed">
                                        Thank you for saying "Yes" to this lifetime of shared adventures and endless love.
                                    </p>
                                    <p className="font-hand text-xl text-slate-800 font-bold mt-8 text-right transform -rotate-2">
                                        - Future Us
                                    </p>
                                </div>
                            </div>
                            
                            {/* Close button */}
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sky-600 underline font-sans text-sm hover:text-sky-800"
                            >
                                Close & Return to Now
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

const Cloud = ({ size }: { size: number }) => (
    <svg width={size} height={size * 0.6} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5,19c-3.037,0-5.5-2.463-5.5-5.5c0-1.056,0.306-2.039,0.83-2.868c-0.264-0.086-0.542-0.132-0.83-0.132
		c-1.657,0-3,1.343-3,3c0,0.209,0.021,0.413,0.061,0.611C8.756,13.902,8.441,13.82,8.113,13.82c-2.209,0-4,1.791-4,4s1.791,4,4,4
		h9.387C19.988,21.82,22,19.343,22,16.5C22,13.463,19.537,11,16.5,11S11,13.463,11,16.5"/>
        <path d="M17.5,19c-3.037,0-5.5-2.463-5.5-5.5c0-3.037,2.463-5.5,5.5-5.5S23,10.463,23,13.5S20.537,19,17.5,19z" opacity="0.5"/>
    </svg>
);