import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DashboardSidebar } from 'src/components/dashboard-sidebar/dashboard-sidebar';
import { paths } from 'src/routes/paths';

const navItems = [
  {
    key: 'personal',
    title: 'Personal',
    items: [
      {
        key: 'account',
        title: 'Account',
        href: paths.home,
        icon: 'user-circle',
      },
      { key: 'security', title: 'Security', href: paths.home, icon: 'lock-key' },
      // { key: 'notifications', title: 'Notifications', href: paths.dashboard.settings.notifications, icon: 'bell' },
    ],
  },
  {
    key: 'organization',
    title: 'Organization',
    items: [
      {
        key: 'billing',
        title: 'Billing & plans',
        href: paths.home,
        icon: 'credit-card',
      },
      { key: 'team', title: 'Team', href: paths.home, icon: 'users-three' },
      {
        key: 'integrations',
        title: 'Integrations',
        href: paths.home,
        icon: 'plugs-connected',
      },
    ],
  },
];

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    // <PageContainer>
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ position: 'relative' }}>
      <DashboardSidebar navItems={navItems} />
      <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>{children}</Box>
    </Stack>
    // </PageContainer>
  );
}
