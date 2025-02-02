import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';

export default getRequestConfig(async () => {
    const cookieStore = cookies();
    const localeLang = cookieStore.get('locale_lang')?.value || 'en';

    return {
        locale: localeLang,
        messages: (await import(`src/locales/langs/${localeLang}.json`)).default
    };
});