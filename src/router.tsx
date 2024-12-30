import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const navData = [
  {
    title: 'Home',
    path: '/',
    icon: <Iconify width={22} icon="solar:home-2-bold-duotone" />,
  },
  // {
  //     title: 'Project',
  //     path: '/project',
  //     icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
  // },
  {
    title: 'Properties',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: '/properties',
  },
  // {
  //     title: 'Team',
  //     icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
  //     path: paths.faqs,
  // },
  // {
  //     title: 'Testimonials',
  //     icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
  //     path: '/testimonials',
  // },

  {
    title: 'About',
    path: '/about',
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Blog',
    icon: <Iconify width={22} icon="solar:notebook-bold-duotone" />,
    path: '/blog',
  },
];
