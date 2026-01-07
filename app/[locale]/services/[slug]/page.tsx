import React from 'react';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Globe, Layout, Smartphone, Code2, Zap, Search, ShoppingBag, Video, Camera, Share2, PenTool } from 'lucide-react';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale, slug } = await params;
    const t = await getTranslations({ locale, namespace: `ServiceDetails.${slug}` });

    return {
        title: t('title'),
        description: t('description')
    };
}

const icons: Record<string, React.ElementType> = {
    web: Layout,
    app: Smartphone,
    seo: Search,
    speed: Zap,
    ecommerce: ShoppingBag,
    video: Video,
    motion: Clock, // Placeholder
    graphic: PenTool,
    marketing: Share2,
    photo: Camera
};

export default async function ServicePage({ params }: Props) {
    const { locale, slug } = await params;

    // Validate slug against known services or handle 404 in translation fetch
    const validServices = ['web', 'app', 'marketing', 'software', 'video', 'graphic', 'seo', 'speed', 'ecommerce', 'motion', 'photo'];
    if (!validServices.includes(slug)) {
        notFound();
    }

    const t = await getTranslations({ locale, namespace: `ServiceDetails.${slug}` });
    const tCommon = await getTranslations({ locale, namespace: 'Common' });

    const Icon = icons[slug] || Code2;

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
            {/* Hero Section */}
            {/* Hero Section */}
            <section className="relative py-32 overflow-hidden flex items-center justify-center min-h-[60vh]">
                {/* Background with Overlay */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('/services/${slug}.png')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/80 to-gray-900/60" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-4xl mx-auto text-center text-white">
                        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-xl backdrop-blur-md mb-6 border border-white/20 shadow-2xl">
                            <Icon className="w-8 h-8 text-blue-400" />
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-heading drop-shadow-xl text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-300 pb-2">{t('title')}</h1>
                        <p className="text-xl md:text-2xl text-gray-100 max-w-2xl mx-auto leading-relaxed drop-shadow-lg font-medium">
                            {t('subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Left Column: Description & Features */}
                        <div className="space-y-12">
                            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('overviewTitle')}</h2>
                                <div className="prose prose-lg text-gray-600">
                                    <p>{t('description')}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('featuresTitle')}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[0, 1, 2, 3].map((index) => (
                                        <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                                            <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0" />
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-1">{t(`features.${index}.title`)}</h4>
                                                <p className="text-sm text-gray-600">{t(`features.${index}.desc`)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Process & CTA */}
                        <div className="space-y-8 lg:sticky lg:top-24">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">{t('processTitle')}</h3>
                                <div className="space-y-8">
                                    {[0, 1, 2, 3].map((index) => (
                                        <div key={index} className="flex gap-4 relative">
                                            {index !== 3 && (
                                                <div className="absolute left-[19px] top-10 bottom-[-20px] w-0.5 bg-gray-100"></div>
                                            )}
                                            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0 border border-blue-100 z-10">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">{t(`process.${index}.title`)}</h4>
                                                <p className="text-sm text-gray-600 mt-1">{t(`process.${index}.desc`)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-blue-600 p-8 rounded-2xl shadow-xl text-white text-center">
                                <h3 className="text-2xl font-bold mb-4">{t('ctaTitle')}</h3>
                                <p className="text-blue-100 mb-8">{t('ctaDesc')}</p>
                                <Link
                                    href={`/${locale}/book`}
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold hover:bg-blue-50 transition-colors w-full"
                                >
                                    {tCommon('bookMeeting')} <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
