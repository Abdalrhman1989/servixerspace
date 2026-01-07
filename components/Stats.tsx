'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Star, Zap, Heart, ShieldCheck } from 'lucide-react';

export default function Stats() {
    const t = useTranslations('Stats');

    const stats = [
        {
            icon: <Star className="w-8 h-8 text-yellow-400" />,
            label: t('quality'),
            desc: t('qualityDesc')
        },
        {
            icon: <Zap className="w-8 h-8 text-blue-400" />,
            label: t('delivery'),
            desc: t('deliveryDesc')
        },
        {
            icon: <Heart className="w-8 h-8 text-red-400" />,
            label: t('support'),
            desc: t('supportDesc')
        },
        {
            icon: <ShieldCheck className="w-8 h-8 text-green-400" />,
            label: t('experts'),
            desc: t('expertsDesc')
        },
    ];

    return (
        <section className="py-16 bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 transition-colors duration-300">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center p-6 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-sm border border-gray-100 dark:border-white/5 hover:border-blue-500/50 dark:hover:bg-white/10 shadow-lg dark:shadow-none transition-all duration-300"
                        >
                            <div className="mb-4 p-3 bg-blue-50 dark:bg-white/5 rounded-full backdrop-blur-md transition-colors">
                                {stat.icon}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{stat.label}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm transition-colors">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
