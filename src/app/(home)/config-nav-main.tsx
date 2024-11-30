import { paths } from 'src/routes/paths';


import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
    { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-2-bold-duotone" /> },
    {
        title: 'Components',
        path: paths.faqs,
        icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
    },
    {
        title: 'Pages',
        path: '/pages',
        icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
        children: [
            {
                subheader: 'Other',
                items: [
                    { title: 'About us', path: paths.faqs },
                    { title: 'Contact us', path: paths.faqs },
                    { title: 'FAQs', path: paths.faqs },
                    
                ],
            },
            
        ],
    },
    {
        title: 'Docs',
        icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
        path: paths.faqs,
    },
];
