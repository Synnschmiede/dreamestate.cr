import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DashboardSidebar } from 'src/components/dashboard-sidebar/dashboard-sidebar';
import { paths } from 'src/routes/paths';
import { Container } from '@mui/material';

const navItems = [
  {
    key: 'personal',
    title: 'Personal',
    items: [
      {
        key: 'account',
        title: 'Account',
        href: paths.dashboard.myAccount,
        icon: 'mingcute:user-4-line',
      },
      { key: 'security', title: 'Security', href: paths.dashboard.security, icon: 'hugeicons:security-lock' },
    ],
  },
  {
    key: 'organization',
    title: 'Organization',
    items: [
      {
        key: 'notification',
        title: 'Notificaitons',
        href: paths.home,
        icon: 'si:notifications-thick-line',
      }
    ],
  },
];

interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return (
    <Container maxWidth="xl">
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ position: 'relative' }}>
        <DashboardSidebar navItems={navItems} />
        <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>{children}</Box>
      </Stack>
    </Container>
  );
}
