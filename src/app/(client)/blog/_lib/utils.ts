export const showOptions = [
    {
        label: 'Show',
        value: '',
    },
    {
        label: '2',
        value: '2',
    },
    {
        label: '6',
        value: '6',
    },
    {
        label: '12',
        value: '12',
    },
    {
        label: '24',
        value: '24',
    }
];

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