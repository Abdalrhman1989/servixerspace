'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Lightbulb, PenTool, Code, Rocket } from 'lucide-react';

export default function Process() {
    const t = useTranslations('Process');

    const steps = [
        {
            icon: <Lightbulb className="w-8 h-8 text-yellow-400" />,
            title: t('step1Title'),
            description: t('step1Desc')
        },
        {
            icon: <PenTool className="w-8 h-8 text-pink-400" />,
            title: t('step2Title'),
            description: t('step2Desc')
        },
        {
            icon: <Code className="w-8 h-8 text-blue-400" />,
            title: t('step3Title'),
            description: t('step3Desc')
        },
        {
            icon: <Rocket className="w-8 h-8 text-green-400" />,
            title: t('step4Title'),
            description: t('step4Desc')
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-slate-50 dark:bg-[#020817] transition-colors duration-300">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[-5%] w-[30%] h-[30%] bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[-5%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 uppercase text-gray-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400 transition-colors">
                        {t('title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg transition-colors">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[60px] left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 shadow-xl dark:shadow-2xl border border-blue-100 dark:border-slate-800 flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300">
                                    <div className="absolute inset-0 bg-blue-50 dark:bg-slate-800 rounded-3xl transform rotate-6 scale-90 -z-10 transition-transform group-hover:rotate-12" />
                                    {step.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                                    {step.description}
                                </p>

                                {/* Step Number Background */}
                                <div className="absolute -top-4 -right-4 text-9xl font-bold text-gray-100 dark:text-white/[0.02] -z-20 select-none">
                                    {index + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
