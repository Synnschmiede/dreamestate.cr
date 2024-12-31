import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  {
    title: 'Home',
    path: '/',
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  {
    title: 'Properties',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: '/properties',
  },
  {
    title: 'Blog',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: '/blog',
  },
];
