'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
    locale: string;
}

const languages = [
    { name: 'English', code: 'en' },
    { name: 'Dansk', code: 'da' },
    { name: 'العربية', code: 'ar' },
    { name: 'Deutsch', code: 'de' },
    { name: 'Français', code: 'fr' },
    { name: 'Nederlands', code: 'nl' },
    { name: 'Español', code: 'es' },
];

export default function Navbar({ locale }: NavbarProps) {
    const t = useTranslations('Navbar');
    const [isOpen, setIsOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const navigation = [
        { name: t('home'), href: `/${locale}` },
        { name: t('about'), href: `/${locale}/about` },
        { name: t('services'), href: `/${locale}/services` },
        { name: t('caseStudies'), href: `/${locale}/case-studies` },
        { name: t('portfolio'), href: `/${locale}/portfolio` },
        { name: t('careers'), href: `/${locale}/careers` },
        { name: t('contact'), href: `/${locale}/contact` },
    ];

    const switchLanguage = (newLocale: string) => {
        // Robust navigation for language switching
        const segments = pathname.split('/');

        // Check if the first segment is a locale
        const currentLocale = segments[1];
        const supportedLocales = ['en', 'da', 'ar', 'de', 'fr', 'nl', 'es'];

        if (supportedLocales.includes(currentLocale)) {
            // Replace existing locale: /en/about -> /da/about
            segments[1] = newLocale;
        } else {
            // No locale present (default locale 'en' implicit at root): /about -> /da/about
            // Insert new locale after empty string from initial slash
            segments.splice(1, 0, newLocale);
        }

        const newPath = segments.join('/') || '/'; // Ensure we don't end up with empty string
        router.push(newPath);
        setLangOpen(false);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-sm shadow-sm transition-all duration-300 border-b border-gray-100 dark:border-slate-900">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href={`/${locale}`} className="flex-shrink-0 relative w-auto h-10 flex items-center">
                        <img src="/logo.png" alt="ServixerSpace Logo" className="h-10 w-auto object-contain block dark:hidden" />
                        <img src="/logo-dark.png" alt="ServixerSpace Logo" className="h-10 w-auto object-contain hidden dark:block" />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}

                        {/* Language Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary uppercase"
                            >
                                <Globe className="w-4 h-4" />
                                <span>{locale}</span>
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-gray-100 dark:border-slate-800 py-2 max-h-60 overflow-auto"
                                    >
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => switchLanguage(lang.code)}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-primary dark:hover:text-primary ${locale === lang.code ? 'text-primary font-bold' : 'text-gray-700 dark:text-gray-300'}`}
                                            >
                                                {lang.name}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <ThemeToggle />

                        <Link
                            href={`/${locale}/book`}
                            className="px-5 py-2.5 bg-primary text-white dark:text-slate-900 text-sm font-medium rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                        >
                            {t('bookMeeting')}
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary"
                    >
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary py-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <div className="border-t border-gray-100 dark:border-slate-900 my-2"></div>
                            <div className="flex flex-col gap-3">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('language')}</p>
                                {languages.map((lang) => (
                                    <button
                                        key={lang.code}
                                        onClick={() => switchLanguage(lang.code)}
                                        className={`text-left text-sm hover:text-primary dark:hover:text-primary ${locale === lang.code ? 'text-primary font-bold' : 'text-gray-600 dark:text-gray-400'}`}
                                    >
                                        {lang.name}
                                    </button>
                                ))}
                            </div>
                            <Link
                                href={`/${locale}/book`}
                                className="mt-4 w-full flex items-center justify-center gap-2 px-5 py-3 bg-primary text-white dark:text-slate-900 font-medium rounded-md active:bg-blue-600"
                                onClick={() => setIsOpen(false)}
                            >
                                <Phone className="w-4 h-4" />
                                {t('bookMeeting')}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
