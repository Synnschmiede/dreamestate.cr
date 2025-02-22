export const sortOptions = [
    {
        label: 'Price (high → low)',
        value: 'PRICE_HIGH_TO_LOW',
    },
    {
        label: 'Price (low → high)',
        value: 'PRICE_LOW_TO_HIGH',
    },
    {
        label: 'Newest → Oldedst',
        value: 'NEWEST',
    },
    {
        label: 'Oldest → Newest',
        value: 'OLDEST',
    },
    {
        label: 'Default',
        value: 'DEFAULT',
    },
];

export const generalFilterOptions = [
    {
        label: 'Relevance',
        value: 'relevance',
    },
    {
        label: 'Featured',
        value: 'featured',
    },
    {
        label: 'Available',
        value: 'available',
    }
];

export const sortByTitle = (value: string) => {
    switch (value) {
        case 'PRICE_LOW_TO_HIGH':
            return 'Price (low → high)';
        case 'PRICE_HIGH_TO_LOW':
            return 'Price (high → low)';
        case 'NEWEST':
            return 'Newest → Oldedst';
        case 'OLDEST':
            return 'Oldest → Newest';
        default:
            return 'Default';
    }
};


export const categoriesOptions = [
    { label: 'ALL', value: 'ALL' },
    { label: 'Apartment', value: 'APARTMENT' },
    { label: 'Villa', value: 'VILLA' },
    { label: 'House', value: 'HOUSE' },
    { label: 'Land', value: 'LAND' },
];

export const cityOptions = [
    { label: 'ALL', value: 'ALL' },
    { label: 'New York', value: 'new york' },
    { label: 'Los Angeles', value: 'los angeles' },
    { label: 'Chicago', value: 'chicago' },
    { label: 'Houston', value: 'houston' },
    { label: 'Miami', value: 'miami' },
];