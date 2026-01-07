'use client';

import { Code2, Smartphone, Search, Monitor, PenTool, BarChart3, Globe, Camera, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

const services = [
    {
        icon: <Code2 className="w-8 h-8" />,
        title: "Webudvikling",
        description: "Skræddersyede hjemmesider i WordPress eller React, der konverterer besøgende til kunder.",
        link: "/services/web"
    },
    {
        icon: <Smartphone className="w-8 h-8" />,
        title: "App udvikling",
        description: "Native og cross-platform apps til iOS og Android, der skaber værdi for din forretning.",
        link: "/services/app"
    },
    {
        icon: <Search className="w-8 h-8" />,
        title: "SEO Optimering",
        description: "Bliv fundet på Google. Vi optimerer din synlighed og skaber organisk trafik.",
        link: "/services/seo"
    },
    {
        icon: <Monitor className="w-8 h-8" />,
        title: "Webdesign",
        description: "Unikka og brugervenlige designs, der styrker dit brand og fastholder dine besøgende.",
        link: "/services/design"
    },
    {
        icon: <PenTool className="w-8 h-8" />,
        title: "Grafisk Design",
        description: "Logoer, visuel identitet og alt grafisk materiale til både print og digital brug.",
        link: "/services/graphic"
    },
    {
        icon: <BarChart3 className="w-8 h-8" />,
        title: "Digital Marketing",
        description: "Effektiv markedsføring på sociale medier og Google Ads, der skaber målbare resultater.",
        link: "/services/marketing"
    },
    {
        icon: <Code2 className="w-8 h-8" />,
        title: "Software udvikling",
        description: "Skræddersyede softwareløsninger, der effektiviserer dine arbejdsprocesser.",
        link: "/services/software"
    },
    {
        icon: <Camera className="w-8 h-8" />,
        title: "Videoproduktion",
        description: "Professionelle videoer og animationer, der fortæller din historie og fanger opmærksomheden.",
        link: "/services/video"
    },
    {
        icon: <Share2 className="w-8 h-8" />,
        title: "SoMe Management",
        description: "Vi håndterer dine sociale medier, så du kan fokusere på at drive din forretning.",
        link: "/services/some"
    }
];

export default function Services() {
    const t = useTranslations('Services');
    const tDetails = useTranslations('ServiceDetails');
    const locale = useLocale();

    // Consolidated list based on new structure
    // We fetch titles/descriptions directly from the ServiceDetails to ensure consistency
    const services = [
        {
            id: 'web',
            icon: <Code2 className="w-8 h-8" />,
            link: "/services/web"
        },
        {
            id: 'app',
            icon: <Smartphone className="w-8 h-8" />,
            link: "/services/app"
        },
        {
            id: 'marketing', // Includes SEO & SoMe
            icon: <BarChart3 className="w-8 h-8" />,
            link: "/services/marketing"
        },
        {
            id: 'software', // New
            icon: <Monitor className="w-8 h-8" />,
            link: "/services/software"
        },
        {
            id: 'video',
            icon: <Camera className="w-8 h-8" />,
            link: "/services/video"
        },
        {
            id: 'graphic',
            icon: <PenTool className="w-8 h-8" />,
            link: "/services/graphic"
        }
    ];

    return (
        <section id="services" className="py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 uppercase text-primary-dark dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-blue-400 dark:to-purple-400">
                        {t('title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={`/${locale}${service.link}`}
                            className="block h-full group"
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="bg-white dark:bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-gray-100 dark:border-slate-800 hover:border-blue-500/50 transition-all duration-500 h-full flex flex-col relative overflow-hidden group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] shadow-lg dark:shadow-none"
                            >
                                {/* Hover Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:via-purple-600/5 group-hover:to-blue-600/5 dark:group-hover:from-blue-600/10 dark:group-hover:via-purple-600/10 dark:group-hover:to-blue-600/10 transition-all duration-500 opacity-0 group-hover:opacity-100" />

                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-blue-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-md dark:shadow-lg border border-blue-100 dark:border-slate-700 group-hover:border-blue-500/30 group-hover:bg-white dark:group-hover:bg-slate-800/80">
                                        {service.icon}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-transparent dark:group-hover:bg-clip-text dark:group-hover:bg-gradient-to-r dark:group-hover:from-blue-400 dark:group-hover:to-purple-400 transition-all duration-300">
                                        {tDetails(`${service.id}.title`)}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed line-clamp-3">
                                        {tDetails(`${service.id}.description`)}
                                    </p>

                                    <div className="flex items-center text-sm font-bold text-blue-400 uppercase tracking-wider mt-auto group-hover:gap-3 transition-all duration-300">
                                        Læs mere <Share2 className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
