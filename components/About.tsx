import { CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function About() {
    const t = useTranslations('About');

    return (
        <section id="about" className="py-20">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading text-primary-dark mb-4 uppercase">{t('title')}</h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            {t('paragraph1')}
                        </p>
                        <ul className="space-y-4 mb-8">
                            {[
                                t('list1'),
                                t('list2'),
                                t('list3')
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3">
                                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                                    <span className="text-gray-700 dark:text-gray-200">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold font-heading text-primary-dark dark:text-white mb-2">{useTranslations('CompanyInfo')('title')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
                                <p>{useTranslations('CompanyInfo')('legalName')}</p>
                                <p>{useTranslations('CompanyInfo')('cvr')}</p>
                                <p>{useTranslations('CompanyInfo')('cvrp')}</p>
                                <p>{useTranslations('CompanyInfo')('established')}</p>
                                <p>{useTranslations('CompanyInfo')('type')}</p>
                            </div>
                        </div>
                    </div>

                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-slate-800 group">
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/c2h9I4m8Mwo?si=CRHBF_e-5TAoaMtJ"
                            title="Servixer Space Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}
