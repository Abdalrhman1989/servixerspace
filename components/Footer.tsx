import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Footer');
    const navT = useTranslations('Navbar');

    return (
        <footer className="bg-white dark:bg-slate-950 border-t border-gray-100 dark:border-slate-900 pt-16 pb-8">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand & Contact */}
                    <div>
                        <h3 className="text-2xl font-bold font-heading text-primary-dark dark:text-white mb-6">
                            Servixer<span className="text-primary dark:text-blue-400">Space</span>
                        </h3>
                        <div className="flex flex-col gap-4 text-gray-600 dark:text-gray-400 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-primary dark:text-blue-400 mt-0.5 shrink-0" />
                                <p>{t('address')}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-primary dark:text-blue-400 shrink-0" />
                                <p>{t('phone')}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-primary dark:text-blue-400 shrink-0" />
                                <p>{t('email')}</p>
                            </div>

                            {/* Company Legal Info */}
                            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-800 text-xs opacity-80">
                                <p className="font-semibold mb-1">ServixerSpace</p>
                                <p>CVR: 38804596</p>
                                <p>CVRP: 1026842499</p>
                            </div>
                        </div>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h4 className="text-lg font-bold font-heading text-primary-dark dark:text-white mb-6">{t('usefulLinks')}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">{navT('home')}</Link></li>
                            <li><Link href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">{navT('about')}</Link></li>
                            <li><Link href="/services" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">{navT('services')}</Link></li>
                            <li><Link href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">{t('careers')}</Link></li>
                            <li><Link href="/case-studies" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">{t('caseStudies')}</Link></li>
                            <li><Link href="/terms" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">Terms of service</Link></li>
                            <li><Link href="/privacy" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">Privacy policy</Link></li>
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-lg font-bold font-heading text-primary-dark dark:text-white mb-6">{t('servicesLinks')}</h4>
                        <ul className="space-y-3 text-sm">
                            <li><Link href="/services/web" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">Webudvikling</Link></li>
                            <li><Link href="/services/app" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">App udvikling</Link></li>
                            <li><Link href="/services/seo" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">SEO Optimering</Link></li>
                            <li><Link href="/services/marketing" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">Digital Marketing</Link></li>
                            <li><Link href="/services/video" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-blue-400 transition-colors hover:translate-x-1 inline-block duration-200">Videoproduktion</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold font-heading text-primary-dark dark:text-white mb-6">{t('newsletter')}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{t('newsletterText')}</p>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Din email"
                                className="flex-1 px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white dark:bg-slate-900 dark:text-white"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-primary dark:bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-600 dark:hover:bg-blue-500 transition-colors"
                            >
                                {t('subscribe')}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-gray-100 dark:border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        &copy; {new Date().getFullYear()} <strong>{t('copyright')}</strong>. All Rights Reserved
                    </p>
                    <div className="flex items-center gap-4">
                        {/* Social links */}
                        <a href="#" className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:text-white transition-all">
                            <Twitter className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.facebook.com/share/1AUZkRsQRx/?mibextid=wwXIfr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:text-white transition-all"
                        >
                            <Facebook className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.instagram.com/servixerspace?igsh=MXYwMjVqZWJucXFvOA%3D%3D&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:text-white transition-all"
                        >
                            <Instagram className="w-4 h-4" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/abd-alrhman-al-darra-45160911b/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-primary dark:text-blue-400 hover:bg-primary hover:text-white dark:hover:text-white transition-all"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
