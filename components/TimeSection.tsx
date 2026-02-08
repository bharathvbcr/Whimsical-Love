import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { PhotoStack } from './PhotoStack';

export const TimeSection: React.FC = () => {
  return (
    <section className="py-24 relative bg-gradient-to-br from-white via-rose-50 to-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Image / Visual Side */}
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
        >
             {/* Decorative Elements around photo stack */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-rose-100/50 rounded-full blur-3xl -z-10" />
             
             <PhotoStack />
                 
             {/* Floating Badge */}
             <motion.div 
                className="absolute top-0 right-10 bg-white p-3 rounded-full shadow-lg text-rose-500 z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
             >
                 <Clock size={24} />
             </motion.div>
        </motion.div>

        {/* Text Side */}
        <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 text-center md:text-left z-10"
        >
            <h2 className="font-script text-5xl md:text-6xl text-rose-900 mb-6">A Lifetime Isn't Enough</h2>
            <p className="font-sans text-xl text-slate-600 leading-relaxed mb-6">
                They say time flies, but with you, every second feels like a gift I want to hold onto forever.
                <span className="font-bold text-rose-500 block text-2xl my-4">I want a million more moments.</span>
                Just you and me, against the world.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-rose-200 inline-block rotate-1 transform shadow-sm">
                <p className="font-script text-2xl text-rose-800">You are my timeless love.</p>
            </div>
        </motion.div>
      </div>
    </section>
  );
};