import { Media, ResponsiveImages } from '@/types';

export const formatDatetimeToLocale = (
    dateString: string,
    locale: string = 'es-MX',
) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    });
};

export const formatDateToLocale = (
    dateString: string,
    locale: string = 'es-MX',
) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        weekday: 'long',
        day: 'numeric',
    });
};

export const compareDates = (date1: Date, date2: Date) => {
    return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
    );
}

export const formatCurrency = (currency: number) => {
    return Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(currency);
};

export const getIdealResponsiveMediaLink = (media?: Media, size: keyof ResponsiveImages = 'xs') => {
    if (!media) return '';
    return media.responsive[size] || Object.values(media.responsive).find((item) => item !== null) || media.urls.original
};
