import React from 'react';
import { motion } from 'framer-motion';
import { Eye, RotateCcw } from 'lucide-react';
import { useProposalConfig } from './ProposalConfig';

export const PreviewBanner: React.FC = () => {
    const { isPreviewMode, resetAllStates } = useProposalConfig();

    if (!isPreviewMode) return null;

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-[100] bg-amber-500 text-amber-950 py-2 px-4 flex items-center justify-between shadow-lg"
        >
            <div className="flex items-center gap-2">
                <Eye size={18} />
                <span className="font-bold uppercase tracking-wider text-sm">Preview Mode</span>
                <span className="text-amber-800 text-xs">— Interactions won't persist</span>
            </div>

            <button
                onClick={resetAllStates}
                className="flex items-center gap-2 px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-full text-sm font-medium transition-colors"
            >
                <RotateCcw size={14} />
                Reset All
            </button>
        </motion.div>
    );
};
