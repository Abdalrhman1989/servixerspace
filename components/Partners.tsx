'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const partners = [
    { name: 'Waseem Hakeem', logo: '/partners/waseem_hakeem.jpg' },
    { name: 'The Creative Stations', logo: '/partners/creative_stations.jpg' },
    { name: 'Joans Flytteservice', logo: '/partners/joans.png' },
    { name: 'Dardashah Scoop', logo: '/partners/dardashah.png' },
    { name: 'Buddyhood', logo: '/partners/buddyhood.jpg' },
    { name: 'Den Itabenske Isbutik', logo: '/partners/den_itabenske.jpg' },
    { name: 'UBreakWeFix', logo: '/partners/ubreakwefix.jpg' },
];

export default function Partners() {
    const t = useTranslations('Partners');

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 mb-12 text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t('title')}</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
            </div>

            <div className="relative w-full overflow-hidden">
                <div className="flex gap-16 py-8 animate-marquee whitespace-nowrap">
                    {[...partners, ...partners].map((partner, index) => (
                        <div
                            key={index}
                            className="relative flex-shrink-0 flex items-center justify-center w-48 h-32 bg-white rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="relative w-32 h-20 transition-transform duration-300 group-hover:scale-110">
                                {/* Images are JPGs with white backgrounds, so we keep the card white to blend them. */}
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                    sizes="128px"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Side Fade Gradients */}
                <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-white dark:from-[#020817] to-transparent z-10" />
                <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-white dark:from-[#020817] to-transparent z-10" />
            </div>
        </section>
    );
}
