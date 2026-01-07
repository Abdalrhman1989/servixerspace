import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight, Globe, Laptop, BookOpen, Clock } from 'lucide-react';

export default function Careers() {
    const t = useTranslations('Careers');

    return (
        <main className="min-h-screen pt-20 pb-16">
            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-950 py-20">
                <div className="container mx-auto px-4 text-center max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold font-heading text-primary-dark dark:text-white mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-primary font-medium mb-8">
                        {t('subtitle')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
                        {t('description')}
                    </p>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-16 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold font-heading text-center text-primary-dark dark:text-white mb-12">
                        {t('benefitsTitle')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <BenefitCard
                            icon={<Globe className="w-8 h-8" />}
                            title={t('benefits.1')}
                            color="text-blue-500"
                            bg="bg-blue-50 dark:bg-blue-900/20"
                        />
                        <BenefitCard
                            icon={<Laptop className="w-8 h-8" />}
                            title={t('benefits.2')}
                            color="text-green-500"
                            bg="bg-green-50 dark:bg-green-900/20"
                        />
                        <BenefitCard
                            icon={<BookOpen className="w-8 h-8" />}
                            title={t('benefits.3')}
                            color="text-purple-500"
                            bg="bg-purple-50 dark:bg-purple-900/20"
                        />
                        <BenefitCard
                            icon={<Clock className="w-8 h-8" />}
                            title={t('benefits.4')}
                            color="text-orange-500"
                            bg="bg-orange-50 dark:bg-orange-900/20"
                        />
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section className="py-16 bg-gray-50 dark:bg-slate-900">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-bold font-heading text-center text-primary-dark dark:text-white mb-12">
                        {t('openingsTitle')}
                    </h2>

                    <div className="space-y-6">
                        <JobCard
                            title={t('jobs.1.title')}
                            type={t('jobs.1.type')}
                            location={t('jobs.1.location')}
                            description={t('jobs.1.description')}
                            applyText={t('apply')}
                        />
                        <JobCard
                            title={t('jobs.2.title')}
                            type={t('jobs.2.type')}
                            location={t('jobs.2.location')}
                            description={t('jobs.2.description')}
                            applyText={t('apply')}
                        />
                    </div>

                    <div className="mt-12 text-center p-8 bg-blue-50 dark:bg-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700">
                        <p className="text-gray-600 dark:text-gray-300 mb-6 font-medium">
                            {t('noOpenings')}
                        </p>
                        <a
                            href="mailto:jobs@servixerspace.com"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-primary-foreground rounded-lg transition-colors font-semibold"
                        >
                            Email Us <ArrowRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

function BenefitCard({ icon, title, color, bg }: { icon: React.ReactNode, title: string, color: string, bg: string }) {
    return (
        <div className={`p-6 rounded-xl border border-gray-100 dark:border-slate-800 hover:shadow-lg transition-shadow bg-white dark:bg-slate-900 text-center`}>
            <div className={`w-16 h-16 mx-auto ${bg} ${color} rounded-full flex items-center justify-center mb-4`}>
                {icon}
            </div>
            <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">{title}</h3>
        </div>
    );
}

function JobCard({ title, type, location, description, applyText }: any) {
    return (
        <div className="bg-white dark:bg-slate-950 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/50 transition-all group">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4 text-sm font-medium">
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded-full">
                            {type}
                        </span>
                        <span className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full">
                            {location}
                        </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        {description}
                    </p>
                </div>
                <div className="shrink-0">
                    <a
                        href={`mailto:jobs@servixerspace.com?subject=Application: ${title}`}
                        className="inline-block w-full md:w-auto px-6 py-3 bg-white dark:bg-slate-900 border-2 border-primary text-primary dark:text-blue-400 font-semibold rounded-lg hover:bg-primary hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all text-center"
                    >
                        {applyText}
                    </a>
                </div>
            </div>
        </div>
    );
}
