import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ShareButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const proposalId = urlParams.get('p');
        const shareUrl = proposalId
            ? `${window.location.origin}/?p=${proposalId}`
            : window.location.href;

        const title = document.title;
        const text = "Check out this beautiful proposal!";

        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url: shareUrl
                });
            } catch (err) {
                console.error("Error sharing:", err);
            }
        } else {
            navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
            setIsOpen(!isOpen);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="bg-white p-2 rounded-xl shadow-lg border border-rose-100 mb-2"
                    >
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-4 py-2 hover:bg-rose-50 rounded-lg text-slate-600 transition-colors whitespace-nowrap"
                        >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            <span className="text-sm font-medium">{copied ? "Copied!" : "Copy Link"}</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg border border-rose-100 text-rose-500 hover:text-rose-600 hover:shadow-xl transition-all"
                aria-label="Share"
            >
                <Share2 className="w-5 h-5" />
            </motion.button>
        </div>
    );
};
