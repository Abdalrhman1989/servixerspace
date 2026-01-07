import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    let locale = await requestLocale;

    // Ensure that incoming `locale` is valid
    if (!locale || !['en', 'da', 'ar', 'de', 'fr', 'nl', 'es'].includes(locale)) {
        locale = 'en';
    }

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
