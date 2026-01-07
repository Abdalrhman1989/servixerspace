import { useTranslations, useMessages } from 'next-intl';

export default function CookiesPage() {
    const t = useTranslations('Cookies');
    const messages = useMessages();

    // Safely type-cast messages to explore the structure
    // @ts-ignore
    const sections = messages.Cookies?.sections || {};
    const sectionKeys = Object.keys(sections).sort((a, b) => parseInt(a) - parseInt(b));

    return (
        <main className="pt-32 pb-20 bg-white dark:bg-slate-950 min-h-screen">
            <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
                <h1 className="text-4xl lg:text-5xl font-bold font-heading text-primary-dark dark:text-white mb-6">
                    {t('title')}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8 font-medium">
                    {t('lastUpdated')}
                </p>

                <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                    <p className="text-gray-600 dark:text-gray-300">
                        {t('intro')}
                    </p>

                    {sectionKeys.map((key) => (
                        <section key={key}>
                            <h2 className="text-2xl font-bold font-heading text-primary-dark dark:text-white mb-4">
                                {t(`sections.${key}.title`)}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                                {t(`sections.${key}.content`)}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
