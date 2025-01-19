import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from '../components/svg-color';
import { CONFIG } from '../config-global';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />
);

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

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

export const dashboardNavData = [
  {
    subheader: 'General',
    items: [
      {
        title: 'Dashboard',
        path: paths.dashboard.root,
        icon: ICONS.dashboard,
        allowedRoles: ['admin', 'user'],
      },
      {
        title: 'Properties',
        path: paths.dashboard.property,
        icon: ICONS.booking,
        allowedRoles: ["admin", 'user'],
      },
    ],
  },
  {
    subheader: 'Admin Only',
    items: [
      // {
      //   title: 'Group',
      //   path: paths.dashboard.group.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Four', path: paths.dashboard.group.root },
      //     { title: 'Five', path: paths.dashboard.group.five },
      //     { title: 'Six', path: paths.dashboard.group.six },
      //   ],
      // },
      {
        title: 'Users',
        path: paths.dashboard.users,
        icon: ICONS.user,
        allowedRoles: ['admin'],
      },
    ],
  },
];

export const additionalRoutes = [
  {
    path: paths.dashboard.security,
    allowedRoles: ['admin', 'user'],
  }
];
