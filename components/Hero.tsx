'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('Hero');

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background with Overlay */}
            {/* Background with Overlay and Slow Zoom Animation */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: "url('/hero-bg-3d.png')" }}
                    initial={{ scale: 1, x: 0, y: 0 }}
                    animate={{ scale: 1.15, x: -20, y: -10 }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#041226]/95 via-[#041226]/80 to-[#041226]/60 dark:from-black/90 dark:via-[#041226]/80 dark:to-transparent" />
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10 text-center text-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading mb-6 leading-tight drop-shadow-xl pb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-500 to-purple-600 drop-shadow-[0_0_25px_rgba(59,130,246,0.6)]">
                            {t('title')} {t('highlight')}
                        </span>
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-medium">
                        {t('subtitle')}
                    </p>
                    <Link
                        href="/book"
                        className="inline-block px-8 py-4 bg-primary text-white dark:text-slate-900 font-bold rounded-lg shadow-lg hover:bg-blue-600 transform hover:-translate-y-1 transition-all"
                    >
                        {t('cta')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
