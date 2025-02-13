import { paths } from 'src/routes/paths';

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
    title: 'home',
    path: '/',
    icon: 'material-symbols-light:dashboard-outline-rounded',
  },
  {
    title: 'properties',
    icon: 'material-symbols-light:dashboard-outline-rounded',
    path: '/properties',
  },
  {
    title: 'blog',
    icon: 'material-symbols-light:dashboard-outline-rounded',
    path: '/blog',
  }
];

export const dashboardNavData = [
  {
    subheader: 'General',
    items: [
      {
        title: 'Dashboard',
        path: paths.dashboard.root,
        icon: 'material-symbols-light:dashboard-outline-rounded',
        allowedRoles: ['admin', 'user'],
      },
      {
        title: 'Properties',
        path: paths.dashboard.property,
        icon: 'teenyicons:search-property-outline',
        allowedRoles: ['admin', 'user'],
      },
      {
        title: 'Blog',
        path: paths.dashboard.blog,
        icon: 'material-symbols-light:article-outline',
        allowedRoles: ['admin', 'user'],
      },
      {
        title: 'Feature & Tag',
        path: paths.dashboard.feature_and_tag,
        icon: 'arcticons:device-utility',
        allowedRoles: ['admin', 'user'],
      }
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
        icon: 'prime:users',
        allowedRoles: ['admin'],
      },
    ],
  },
];

export const additionalRoutes = [
  {
    path: paths.dashboard.security,
    allowedRoles: ['admin', 'user'],
  },
];
