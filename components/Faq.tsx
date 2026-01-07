'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Faq() {
    const t = useTranslations('Faq');
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const questions = [
        { id: 'q1', key: 'q1' },
        { id: 'q2', key: 'q2' },
        { id: 'q3', key: 'q3' },
        { id: 'q4', key: 'q4' },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading text-primary-dark dark:text-white mb-4">{t('title')}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{t('subtitle')}</p>
                </div>

                <div className="space-y-4">
                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="font-semibold text-gray-900 dark:text-gray-100">{t(`${q.key}Title`)}</span>
                                <span className="shrink-0 ml-4 p-2 bg-gray-50 dark:bg-slate-800 rounded-full text-primary dark:text-blue-400">
                                    {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-50 dark:border-slate-800/50 pt-4">
                                            {t(`${q.key}Desc`)}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
