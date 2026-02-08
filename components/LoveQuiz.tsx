import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Heart, Trophy, Smile, Sparkles } from 'lucide-react';
import { useAutoScroll } from './AutoScrollContext';

const questions = [
    {
        id: 2,
        text: "Who has the cutest smile?",
        options: [
            { text: "You do!", correct: true, message: "It lights up my world." },
            { text: "The Dog?", correct: false, message: "Close, but no." }
        ],
        icon: Sparkles
    },
    {
        id: 3,
        text: "How much do I love you?",
        options: [
            { text: "To the moon", correct: true, message: "And back!" },
            { text: "Infinity", correct: true, message: "And beyond!" }
        ],
        icon: Heart
    }
];

export const LoveQuiz: React.FC = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [shaking, setShaking] = useState(false);

    // Movie Mode Integration
    const { isPlaying, registerPause, unregisterPause } = useAutoScroll();
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.5 });
    const [hasAutoAnswered, setHasAutoAnswered] = useState(false);

    // Auto-answer effect for Movie Mode
    useEffect(() => {
        if (isPlaying && isInView && !hasAutoAnswered && !isComplete) {
            registerPause('quiz');

            let questionIndex = currentQ;
            let autoAnswerTimeout: NodeJS.Timeout;

            const autoAnswer = () => {
                if (questionIndex >= questions.length) {
                    setHasAutoAnswered(true);
                    setTimeout(() => unregisterPause('quiz'), 2000);
                    return;
                }

                const question = questions[questionIndex];
                const correctOption = question.options.find(opt => opt.correct);
                if (correctOption) {
                    setFeedback(correctOption.message);
                    autoAnswerTimeout = setTimeout(() => {
                        setFeedback(null);
                        questionIndex++;
                        if (questionIndex < questions.length) {
                            setCurrentQ(questionIndex);
                            autoAnswerTimeout = setTimeout(autoAnswer, 2000);
                        } else {
                            setIsComplete(true);
                            setHasAutoAnswered(true);
                            setTimeout(() => unregisterPause('quiz'), 3000);
                        }
                    }, 1500);
                }
            };

            const startDelay = setTimeout(autoAnswer, 1500);

            return () => {
                clearTimeout(startDelay);
                if (autoAnswerTimeout) clearTimeout(autoAnswerTimeout);
                unregisterPause('quiz');
            };
        }
    }, [isPlaying, isInView, hasAutoAnswered, isComplete, currentQ, registerPause, unregisterPause]);

    const handleAnswer = (correct: boolean, message: string) => {
        setFeedback(message);
        if (correct) {
            setTimeout(() => {
                setFeedback(null);
                if (currentQ < questions.length - 1) {
                    setCurrentQ(currentQ + 1);
                } else {
                    setIsComplete(true);
                }
            }, 1200);
        } else {
            setShaking(true);
            setTimeout(() => setShaking(false), 500);
        }
    };

    return (
        <section ref={containerRef} className="py-24 bg-gradient-to-br from-purple-50 to-rose-50 flex items-center justify-center relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-rose-200 rounded-full blur-3xl opacity-50 animate-pulse delay-700"></div>

            <div className="max-w-xl w-full mx-4 relative z-10">
                <div className="text-center mb-10">
                    <h2 className="font-script text-5xl text-rose-900 mb-2">The Relationship Quiz</h2>
                    <p className="font-sans text-slate-500">Let's see if you know the truth...</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white p-8 md:p-12 min-h-[400px] flex flex-col items-center justify-center relative">
                    <AnimatePresence mode="wait">
                        {!isComplete ? (
                            <motion.div
                                key={questions[currentQ].id}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="w-full text-center"
                            >
                                <div className="mb-6 inline-block p-4 bg-rose-100 rounded-full text-rose-500">
                                    {React.createElement(questions[currentQ].icon, { size: 32 })}
                                </div>

                                <h3 className="font-hand text-3xl text-slate-800 mb-8 font-bold">
                                    {questions[currentQ].text}
                                </h3>

                                <div className="grid grid-cols-1 gap-4">
                                    {questions[currentQ].options.map((opt, idx) => (
                                        <motion.button
                                            key={idx}
                                            onClick={() => handleAnswer(opt.correct, opt.message)}
                                            animate={shaking && !opt.correct ? { x: [-10, 10, -10, 10, 0] } : {}}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`p-4 rounded-xl text-xl font-sans font-semibold border-2 transition-all
                                                ${feedback && opt.correct
                                                    ? "bg-green-100 border-green-300 text-green-700"
                                                    : feedback && !opt.correct
                                                        ? "bg-red-50 border-red-200 text-red-400"
                                                        : "bg-white border-slate-100 hover:border-rose-200 hover:shadow-lg text-slate-600"
                                                }
                                            `}
                                        >
                                            {opt.text}
                                        </motion.button>
                                    ))}
                                </div>

                                {feedback && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-6 text-rose-500 font-bold font-hand text-xl"
                                    >
                                        {feedback}
                                    </motion.div>
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="complete"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center"
                            >
                                <motion.div
                                    className="inline-block relative mb-6"
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                                >
                                    <Trophy size={80} className="text-yellow-400 fill-yellow-100" />
                                    <div className="absolute top-0 right-0">
                                        <Sparkles className="text-yellow-500 animate-spin-slow" />
                                    </div>
                                </motion.div>
                                <h3 className="font-script text-5xl text-rose-600 mb-4">Perfect Score!</h3>
                                <p className="font-sans text-xl text-slate-600 mb-8">
                                    You know us perfectly.
                                </p>
                                <div className="p-4 bg-rose-50 rounded-xl border border-rose-100 inline-block">
                                    <span className="font-mono text-sm text-rose-400">AWARD CERTIFIED BY: YOUR FUTURE HUSBAND</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Progress Dots */}
                    {!isComplete && (
                        <div className="absolute bottom-8 flex gap-2">
                            {questions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${i === currentQ ? 'bg-rose-500' : 'bg-slate-200'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};