import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';

export default function Cta() {
    const t = useTranslations('Cta');
    const locale = useLocale();

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="max-w-5xl mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl p-12 lg:p-16 text-center shadow-2xl border border-gray-100 dark:border-slate-800 overflow-hidden relative group transition-all duration-300">
                    {/* Interior Glow - Dark Mode Only */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 dark:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center p-3 mb-8 rounded-2xl bg-white backdrop-blur-md border border-blue-100 dark:border-white/10 shadow-sm dark:shadow-inner">
                            <Heart className="w-6 h-6 text-pink-500 fill-current" />
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6 tracking-tight text-[#041226] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400">
                            {t('title')}
                        </h2>

                        <p className="text-lg lg:text-xl text-gray-600 dark:text-blue-100/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            {t('description')}
                        </p>

                        <Link
                            href={`/${locale}/book`}
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white dark:text-[#041226] bg-[#041226] dark:bg-white rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 transform"
                        >
                            {t('button')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
