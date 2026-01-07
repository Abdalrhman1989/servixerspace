import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, TrendingUp, CheckCircle, Target } from 'lucide-react';

export default function CaseStudies() {
    const t = useTranslations('CaseStudies');

    return (
        <main className="min-h-screen pt-20 pb-16 bg-gray-50 dark:bg-slate-950">
            {/* Header */}
            <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 py-24 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-primary-dark dark:text-white">
                        {t('title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-primary font-medium max-w-3xl mx-auto">
                        {t('subtitle')}
                    </p>
                    <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </div>
            </section>

            {/* Case Studies List */}
            <div className="container mx-auto px-4 space-y-16 max-w-6xl">
                <CaseStudyCard
                    id="1"
                    t={t}
                    image="/portfolio/den-italinsk-ice.jpg"
                />
                <CaseStudyCard
                    id="2"
                    t={t}
                    image="/portfolio/buddyhood.jpg"
                    reversed
                />
                <CaseStudyCard
                    id="3"
                    t={t}
                    image="/portfolio/explore-ease-logo.png"
                />
                <CaseStudyCard
                    id="4"
                    t={t}
                    image="/portfolio/triply-logo-white.png"
                    reversed
                />
            </div>
        </main>
    );
}

function CaseStudyCard({ id, t, image, reversed = false }: { id: string, t: any, image: string, reversed?: boolean }) {
    return (
        <section className={`flex flex-col ${reversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-stretch bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800`}>
            {/* Content Side */}
            <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                    <span className="inline-block px-4 py-1 bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 font-bold rounded-full text-sm mb-4">
                        {t(`studies.${id}.client`)}
                    </span>
                    <h2 className="text-3xl font-bold font-heading text-primary-dark dark:text-white mb-2">
                        {t(`studies.${id}.title`)}
                    </h2>
                </div>

                <div className="space-y-6 mb-8">
                    {/* Problem */}
                    <div className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-1">
                                {t('problem')}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t(`studies.${id}.problem`)}
                            </p>
                        </div>
                    </div>

                    {/* Solution */}
                    <div className="flex gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500">
                            <CheckCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wider mb-1">
                                {t('solution')}
                            </h4>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {t(`studies.${id}.solution`)}
                            </p>
                        </div>
                    </div>

                    {/* Result */}
                    <div className="flex gap-4 bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/30">
                        <div className="w-10 h-10 shrink-0 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400">
                            <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="font-bold text-green-800 dark:text-green-400 text-sm uppercase tracking-wider mb-1">
                                {t('result')}
                            </h4>
                            <p className="text-green-900 dark:text-green-200 font-medium leading-relaxed">
                                {t(`studies.${id}.result`)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Side */}
            <div className="lg:w-2/5 min-h-[300px] relative overflow-hidden group">
                <Image
                    src={image}
                    alt={t(`studies.${id}.title`)}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            </div>
        </section>
    );
}
