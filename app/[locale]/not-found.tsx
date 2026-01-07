import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
    const t = useTranslations('NotFound');

    return (
        <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-9xl font-bold text-primary/10 dark:text-white/5 mb-4 select-none">
                404
            </h1>
            <div className="relative -mt-16 sm:-mt-20">
                <h2 className="text-3xl md:text-4xl font-bold font-heading text-primary-dark dark:text-white mb-4">
                    {t('title')}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
                    {t('description')}
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-md hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl dark:shadow-blue-900/20"
                >
                    <Home className="w-5 h-5" />
                    <span>{t('backButton')}</span>
                </Link>
            </div>
        </main>
    );
}
