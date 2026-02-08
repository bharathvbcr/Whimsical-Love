import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Upload, ChevronUp, ChevronDown } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { useExperience } from './AutoScrollContext';

export const MusicPlayer: React.FC = () => {
  const { musicConfig } = useContent();

  // Get audioRef and centralized music state from unified context
  const { 
    audioRef, 
    isMusicPlaying, 
    customAudioUrl, 
    setCustomAudioUrl 
  } = useExperience();

  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [showControls, setShowControls] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Sync local isPlaying state with context
  useEffect(() => {
    setIsPlaying(isMusicPlaying);
  }, [isMusicPlaying]);

  // Apply volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const fadeAudio = (targetVolume: number, duration: number = 500): Promise<void> => {
    return new Promise((resolve) => {
      if (!audioRef.current) {
        resolve();
        return;
      }

      const audio = audioRef.current;
      const startVolume = audio.volume;
      const delta = targetVolume - startVolume;
      const steps = 20;
      const stepTime = duration / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;
        audio.volume = startVolume + (delta * progress);

        if (currentStep >= steps) {
          clearInterval(timer);
          audio.volume = targetVolume;
          resolve();
        }
      }, stepTime);
    });
  };

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        setIsFading(true);
        await fadeAudio(0);
        audioRef.current.pause();
        audioRef.current.volume = volume; // Reset volume for next play
        setIsFading(false);
      } else {
        audioRef.current.volume = 0;
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
        await fadeAudio(volume);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current && isPlaying) {
      audioRef.current.volume = newVolume;
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Stop current playback
      if (audioRef.current && isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      }

      // Create URL for uploaded file
      const url = URL.createObjectURL(file);
      setCustomAudioUrl(url);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Expanded Controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full mb-2 left-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-rose-100 p-4 min-w-[200px]"
          >
            {/* Volume Slider */}
            <div className="mb-4">
              <label className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-2 block">
                Volume
              </label>
              <div className="flex items-center gap-3">
                <VolumeX size={16} className="text-slate-400" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="flex-1 h-2 bg-rose-100 rounded-full appearance-none cursor-pointer accent-rose-500"
                />
                <Volume2 size={16} className="text-slate-400" />
              </div>
              <div className="text-center text-xs text-slate-400 mt-1">
                {Math.round(volume * 100)}%
              </div>
            </div>

            {/* Upload Custom Audio */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors text-sm font-medium"
            >
              <Upload size={16} />
              {customAudioUrl ? 'Change Song' : 'Upload Our Song'}
            </button>

            {customAudioUrl && (
              <div className="mt-2 text-xs text-green-600 text-center">
                ✓ Custom song loaded
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={togglePlay}
          disabled={isFading}
          className={`flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-md shadow-lg border transition-all duration-500 ${isPlaying
            ? 'bg-rose-500/80 border-rose-400 text-white shadow-rose-500/30'
            : 'bg-white/50 border-white/50 text-slate-600 hover:bg-white/80'
            } ${isFading ? 'opacity-50 cursor-wait' : ''}`}
        >
          <div className="relative">
            {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-ping" />
            )}
          </div>
          <span className="font-sans text-sm font-medium hidden md:block">
            {isPlaying ? (customAudioUrl ? 'Custom Song' : musicConfig.label) : 'Play Music'}
          </span>

          {/* Visualizer bars */}
          {isPlaying && (
            <div className="flex gap-1 items-end h-4 ml-2">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-current rounded-full"
                  animate={{ height: [4, 16, 8, 12, 4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "linear"
                  }}
                />
              ))}
            </div>
          )}
        </motion.button>

        {/* Settings Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowControls(!showControls)}
          className="w-10 h-10 rounded-full bg-white/50 backdrop-blur-md shadow-md border border-white/50 flex items-center justify-center text-slate-500 hover:bg-white/80 transition-colors"
        >
          {showControls ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
        </motion.button>
      </div>
    </div>
  );
};