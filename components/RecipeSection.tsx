import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Heart, Coffee, Smile, Sun, Check } from 'lucide-react';

interface Ingredient {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const ingredientsList: Ingredient[] = [
  { id: 'trust', label: 'Unshakable Trust', icon: Check, color: 'bg-blue-100 text-blue-500' },
  { id: 'talks', label: 'Late Night Talks', icon: Moon, color: 'bg-indigo-100 text-indigo-500' },
  { id: 'laughs', label: 'Silly Laughter', icon: Smile, color: 'bg-yellow-100 text-yellow-500' },
  { id: 'coffee', label: 'Morning Coffee', icon: Coffee, color: 'bg-amber-100 text-amber-600' },
  { id: 'warmth', label: 'Endless Warmth', icon: Sun, color: 'bg-orange-100 text-orange-500' },
];

export const RecipeSection: React.FC = () => {
  const [added, setAdded] = useState<string[]>([]);
  const [isComplete, setIsComplete] = useState(false);

  const handleAdd = (id: string) => {
    if (!added.includes(id)) {
      const newAdded = [...added, id];
      setAdded(newAdded);
      if (newAdded.length === ingredientsList.length) {
        setTimeout(() => setIsComplete(true), 1000);
      }
    }
  };

  return (
    <section className="py-24 bg-orange-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5" 
           style={{ backgroundImage: 'radial-gradient(#f97316 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-script text-5xl md:text-6xl text-orange-900 mb-4">Our Perfect Recipe</h2>
        <p className="font-sans text-xl text-orange-800/60 mb-12">Let's cook up a lifetime of happiness.</p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Ingredients Shelf */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {ingredientsList.map((ing) => {
              const isAdded = added.includes(ing.id);
              return (
                <motion.button
                  key={ing.id}
                  onClick={() => handleAdd(ing.id)}
                  disabled={isAdded}
                  whileHover={!isAdded ? { scale: 1.05 } : {}}
                  whileTap={!isAdded ? { scale: 0.95 } : {}}
                  className={`p-4 rounded-2xl flex items-center gap-3 font-bold transition-all shadow-sm border-2 
                    ${isAdded 
                      ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-default opacity-50 grayscale' 
                      : 'bg-white border-white hover:border-orange-200 hover:shadow-md text-slate-700'}`}
                >
                  <div className={`p-2 rounded-full ${isAdded ? 'bg-slate-200' : ing.color}`}>
                    <ing.icon size={20} />
                  </div>
                  <span className="text-sm text-left">{ing.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Mixing Bowl Area */}
          <div className="flex-1 relative h-80 w-full flex items-center justify-center">
             {/* The Bowl */}
             <div className="relative w-64 h-64">
                <motion.div 
                    className="absolute bottom-0 left-0 right-0 h-32 bg-white rounded-b-full border-4 border-slate-200 shadow-xl z-20 overflow-hidden"
                    animate={isComplete ? { borderColor: '#fbbf24', boxShadow: "0 20px 25px -5px rgba(251, 191, 36, 0.3)" } : {}}
                >
                    {/* Liquid inside */}
                    <motion.div 
                        className="absolute bottom-0 left-0 right-0 bg-orange-200 opacity-80"
                        initial={{ height: '0%' }}
                        animate={{ height: `${(added.length / ingredientsList.length) * 85}%` }}
                        transition={{ type: "spring", bounce: 0.2 }}
                    >
                         {/* Bubbles */}
                         {added.length > 0 && (
                             <motion.div 
                                className="w-full h-full relative"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                 <div className="absolute top-2 left-1/4 w-3 h-3 bg-white/50 rounded-full animate-ping" />
                                 <div className="absolute top-6 right-1/3 w-2 h-2 bg-white/50 rounded-full animate-ping delay-700" />
                             </motion.div>
                         )}
                    </motion.div>
                </motion.div>
                
                {/* Dropping Ingredients Animation */}
                <AnimatePresence>
                    {added.map((id, index) => {
                        const ing = ingredientsList.find(i => i.id === id);
                        if (!ing) return null;
                        // Only show the drop animation briefly
                        return (
                            <motion.div
                                key={`drop-${id}`}
                                initial={{ y: -100, opacity: 1, scale: 1 }}
                                animate={{ y: 150, opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.6, ease: "easeIn" }}
                                className={`absolute left-1/2 -translate-x-1/2 z-10 p-2 rounded-full ${ing.color}`}
                            >
                                <ing.icon size={24} />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* Final Result */}
                <AnimatePresence>
                    {isComplete && (
                        <motion.div
                            initial={{ scale: 0, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            className="absolute -top-10 left-0 right-0 z-30 flex flex-col items-center"
                        >
                            <motion.div 
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                <Heart size={80} className="text-rose-500 fill-rose-500 drop-shadow-lg" />
                            </motion.div>
                            <div className="bg-white px-6 py-3 rounded-xl shadow-lg border-2 border-orange-200 mt-4">
                                <h3 className="font-hand text-2xl text-orange-600 font-bold">The Perfect Blend!</h3>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};