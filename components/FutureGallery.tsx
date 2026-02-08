import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Plane, Armchair, Moon } from 'lucide-react';

interface CardProps {
  title: string;
  subtitle: string;
  icon: React.ElementType;
  color: string;
  index: number;
}

const Card: React.FC<CardProps> = ({ title, subtitle, icon: Icon, color, index }) => (
    <motion.div 
        className={`flex-shrink-0 w-80 h-96 ${color} rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group border-4 border-white shadow-xl mx-4 snap-center`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10 }}
    >
        <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-1/2 -translate-y-1/2 scale-150">
            <Icon size={200} />
        </div>
        
        <div className="bg-white/30 backdrop-blur-sm w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-inner">
            <Icon size={32} />
        </div>

        <div>
            <h3 className="font-script text-4xl text-white mb-2">{title}</h3>
            <p className="font-sans text-white/90 text-lg leading-tight">{subtitle}</p>
        </div>
    </motion.div>
);

export const FutureGallery: React.FC = () => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const cards = [
    { title: "Our Dream Home", subtitle: "A cozy place with a big porch and a garden.", icon: Home, color: "bg-rose-400" },
    { title: "Travel The World", subtitle: "Collecting passport stamps and memories together.", icon: Plane, color: "bg-blue-400" },
    { title: "Date Nights", subtitle: "Never stopping dating, no matter how old we get.", icon: Moon, color: "bg-purple-400" },
    { title: "Growing Old", subtitle: "Sitting side by side, watching the grandkids play.", icon: Armchair, color: "bg-orange-400" },
  ];

  return (
    <section ref={ref} className="py-24 bg-slate-50 overflow-hidden min-h-[150vh] relative">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <div className="text-center mb-12">
            <h2 className="font-script text-5xl text-slate-800">Our Future</h2>
            <p className="font-sans text-slate-500">I can see it all so clearly.</p>
        </div>

        <motion.div style={{ x }} className="flex px-12 w-max">
            {cards.map((card, i) => (
                <Card key={i} {...card} index={i} />
            ))}
        </motion.div>
      </div>
    </section>
  );
};