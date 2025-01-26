export const sortOptions = [
    {
        label: 'Sort by',
        value: 'DEFAULT',
    },
    {
        label: 'Newest → Oldedst',
        value: 'NEWEST',
    },
    {
        label: 'Oldest → Newest',
        value: 'OLDEST',
    }
];

export const sortByTitle = (value: string) => {
    switch (value) {
        case 'NEWEST':
            return 'Newest → Oldedst';
        case 'OLDEST':
            return 'Oldest → Newest';
        default:
            return 'Sort by';
    }
};