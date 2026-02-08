import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Ticket } from 'lucide-react';

const activities = ["Stargazing Picnic", "Arcade Battle", "Sunset Beach Walk", "Movie Marathon", "Comedy Club", "Build a Fort"];
const foods = ["Italian Bistro", "Taco Fiesta", "Sushi Boat", "Ice Cream Sundaes", "Midnight Pizza", "Fancy Cheese Board"];
const vibes = ["Romantic", "Silly", "Cozy", "Adventures", "Lazy", "Fancy"];

export const DateNightSpinner: React.FC = () => {
    const [result, setResult] = useState({ activity: "???", food: "???", vibe: "???" });
    const [isSpinning, setIsSpinning] = useState(false);
    const [couponGenerated, setCouponGenerated] = useState(false);

    const spin = () => {
        if (isSpinning) return;
        setIsSpinning(true);
        setCouponGenerated(false);

        let count = 0;
        const interval = setInterval(() => {
            setResult({
                activity: activities[Math.floor(Math.random() * activities.length)],
                food: foods[Math.floor(Math.random() * foods.length)],
                vibe: vibes[Math.floor(Math.random() * vibes.length)]
            });
            count++;
            if (count > 15) {
                clearInterval(interval);
                setIsSpinning(false);
                setCouponGenerated(true);
            }
        }, 100);
    };

    return (
        <section className="py-24 bg-rose-50 relative overflow-hidden">
             {/* Background decorative blobs */}
             <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-100 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
             <div className="absolute bottom-0 right-0 w-80 h-80 bg-rose-200 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

            <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                <h2 className="font-script text-5xl md:text-6xl text-rose-900 mb-4">Our Next Adventure</h2>
                <p className="font-sans text-xl text-slate-600 mb-12">I can't wait for our future. Let's pick a date right now!</p>

                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border-4 border-rose-200 relative">
                    {/* Slot Machine Display */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {[
                            { label: "Activity", val: result.activity, color: "bg-blue-50 text-blue-600 border-blue-200" },
                            { label: "Food", val: result.food, color: "bg-orange-50 text-orange-600 border-orange-200" },
                            { label: "Vibe", val: result.vibe, color: "bg-purple-50 text-purple-600 border-purple-200" }
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col gap-2">
                                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{item.label}</span>
                                <div className={`h-24 flex items-center justify-center rounded-xl border-2 text-xl md:text-2xl font-hand font-bold p-4 shadow-inner transition-colors duration-200 ${item.color}`}>
                                    {item.val}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Spin Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={spin}
                        disabled={isSpinning}
                        className="bg-rose-500 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-rose-600 hover:shadow-rose-300/50 transition-all flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <RefreshCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                        {isSpinning ? "Picking..." : "Spin For A Date!"}
                    </motion.button>
                    
                    {/* The Coupon Result */}
                    <AnimatePresence>
                        {couponGenerated && (
                            <motion.div
                                initial={{ opacity: 0, y: 50, rotate: -5 }}
                                animate={{ opacity: 1, y: 0, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ type: "spring", bounce: 0.5 }}
                                className="mt-12 max-w-md mx-auto relative group cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-yellow-400 rounded-xl rotate-2 group-hover:rotate-6 transition-transform"></div>
                                <div className="relative bg-white border-2 border-slate-800 rounded-xl p-6 text-center shadow-lg" 
                                     style={{ backgroundImage: 'radial-gradient(#e5e7eb 1px, transparent 1px)', backgroundSize: '10px 10px' }}>
                                    
                                    {/* Ticket Cutouts */}
                                    <div className="absolute top-1/2 -left-3 w-6 h-6 bg-rose-50 border-r-2 border-slate-800 rounded-full"></div>
                                    <div className="absolute top-1/2 -right-3 w-6 h-6 bg-rose-50 border-l-2 border-slate-800 rounded-full"></div>

                                    <div className="border-2 border-dashed border-slate-300 p-4">
                                        <div className="flex items-center justify-center gap-2 text-rose-500 mb-2">
                                            <Ticket />
                                            <span className="font-bold uppercase tracking-wider text-sm">Admit Two</span>
                                            <Ticket />
                                        </div>
                                        <h3 className="font-script text-4xl text-slate-800 mb-2">Official Date Coupon</h3>
                                        <p className="font-hand text-xl text-slate-600 mb-4">
                                            Good for one <strong>{result.vibe}</strong> night of <strong>{result.activity}</strong> eating <strong>{result.food}</strong>!
                                        </p>
                                        <div className="text-xs text-slate-400 font-mono">NO EXPIRATION DATE • REDEEMABLE ANYTIME</div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};