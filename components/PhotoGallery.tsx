import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import { useContent } from '../contexts/ContentContext';

interface PhotoGalleryProps {
    className?: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ className = '' }) => {
    const { photoMemories } = useContent();
    const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

    // Skip rendering if no photos configured
    if (!photoMemories || photoMemories.length === 0) return null;

    return (
        <section className={`relative py-24 px-6 bg-gradient-to-b from-rose-50 to-white overflow-hidden ${className}`}>
            {/* Background Hearts */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
                {[...Array(8)].map((_, i) => (
                    <Heart
                        key={i}
                        size={40 + Math.random() * 60}
                        className="absolute text-rose-300 fill-rose-300"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            transform: `rotate(${Math.random() * 30 - 15}deg)`,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h2 className="font-script text-5xl md:text-6xl text-rose-900 mb-4">
                        Our Memories
                    </h2>
                    <p className="text-slate-600 text-lg max-w-md mx-auto">
                        Every moment with you is a treasure I keep close to my heart.
                    </p>
                </motion.div>

                {/* Photo Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {photoMemories.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, rotate: Math.random() * 10 - 5 }}
                            whileInView={{ opacity: 1, y: 0, rotate: Math.random() * 6 - 3 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            whileHover={{
                                scale: 1.05,
                                rotate: 0,
                                zIndex: 10,
                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                            }}
                            onClick={() => setSelectedPhoto(index)}
                            className="relative cursor-pointer group"
                        >
                            {/* Polaroid Frame */}
                            <div className="bg-white p-3 pb-12 rounded-sm shadow-xl">
                                {/* Photo */}
                                <div className="aspect-square bg-slate-100 overflow-hidden">
                                    <img
                                        src={photo.src}
                                        alt={photo.caption}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback for missing images
                                            (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`
                                                <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
                                                    <rect fill="#fecaca" width="400" height="400"/>
                                                    <text x="200" y="180" font-family="Arial" font-size="16" fill="#be123c" text-anchor="middle">Add your photo!</text>
                                                    <text x="200" y="210" font-family="Arial" font-size="14" fill="#f43f5e" text-anchor="middle">/public/photos/</text>
                                                </svg>
                                            `)}`;
                                        }}
                                    />
                                </div>

                                {/* Caption */}
                                <div className="absolute bottom-2 left-3 right-3">
                                    <p className="font-hand text-sm text-slate-700 truncate">
                                        {photo.caption}
                                    </p>
                                    {photo.date && (
                                        <p className="text-xs text-slate-400">{photo.date}</p>
                                    )}
                                </div>

                                {/* Heart on hover */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileHover={{ scale: 1, opacity: 1 }}
                                    className="absolute top-5 right-5 bg-rose-500/90 text-white p-2 rounded-full shadow-lg"
                                >
                                    <Heart size={16} fill="white" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedPhoto !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPhoto(null)}
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-8"
                    >
                        <motion.button
                            className="absolute top-6 right-6 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
                            onClick={() => setSelectedPhoto(null)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X size={32} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="relative max-w-4xl max-h-[80vh] bg-white p-4 rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={photoMemories[selectedPhoto].src}
                                alt={photoMemories[selectedPhoto].caption}
                                className="max-w-full max-h-[60vh] object-contain mx-auto"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = `data:image/svg+xml,${encodeURIComponent(`
                                        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
                                            <rect fill="#fecaca" width="600" height="400"/>
                                            <text x="300" y="200" font-family="Arial" font-size="20" fill="#be123c" text-anchor="middle">Photo not found</text>
                                        </svg>
                                    `)}`;
                                }}
                            />
                            <div className="mt-4 text-center">
                                <p className="font-hand text-2xl text-rose-800">{photoMemories[selectedPhoto].caption}</p>
                                {photoMemories[selectedPhoto].date && (
                                    <p className="text-slate-500 mt-1">{photoMemories[selectedPhoto].date}</p>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
