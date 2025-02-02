import { getLocale, getTranslations } from "next-intl/server";

export const getTranslator = async () => {
    const locale = getLocale();
    const t = getTranslations(locale);
    return t
}