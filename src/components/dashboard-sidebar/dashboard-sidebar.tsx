import { Box, Icon, Stack, Typography } from '@mui/material';
import { usePathname } from 'next/navigation';
import { Iconify } from '../iconify';
import { paths } from 'src/routes/paths';
import { isNavItemActive } from 'src/utils/helper';
import { RouterLink } from 'src/routes/components';


interface INavItem {
    key: string;
    title: string;
    items?: {
      key: string;
      title: string;
      href: string;
      icon: string;
    }[];
  }
  

export const DashboardSidebar = ({ INavItems }: { INavItems: INavItem[] }) => {
  const pathname = usePathname();
  return (
    <div>
      <Stack
        spacing={3}
        sx={{
          flex: '0 0 auto',
          flexDirection: { xs: 'column-reverse', md: 'column' },
          position: { md: 'sticky' },
          top: '64px',
          width: { xs: '100%', md: '240px' },
        }}
      >
        <Stack component="ul" spacing={3} sx={{ listStyle: 'none', m: 0, p: 0 }}>
          {INavItems.map((group: INavItem) => (
            <Stack component="li" key={group.key} spacing={2}>
              {group.title ? (
                <div>
                  <Typography color="text.secondary" variant="caption">
                    {group.title}
                  </Typography>
                </div>
              ) : null}
              <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {group.items.map((item) => (
                  <NavItem {...item} key={item.key} pathname={pathname} />
                ))}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </div>
  );
};

function NavItem({
  disabled,
  external,
  href,
  icon,
  pathname,
  title,
}: {
  disabled?: boolean;
  external?: boolean;
  href: string;
  icon?: string;
  pathname: string;
  title: string;
}) {
  const active = isNavItemActive({ disabled, external, href, pathname });

  return (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        {...(href
          ? {
              component: external ? 'a' : RouterLink,
              href,
              target: external ? '_blank' : undefined,
              rel: external ? 'noreferrer' : undefined,
            }
          : { role: 'button' })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--mui-palette-text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && { color: 'var(--mui-palette-text-disabled)', cursor: 'not-allowed' }),
          ...(active && {
            bgcolor: 'var(--mui-palette-action-selected)',
            color: 'var(--mui-palette-text-primary)',
          }),
          '&:hover': {
            ...(!active &&
              !disabled && {
                bgcolor: 'var(--mui-palette-action-hover)',
                color: 'var(---mui-palette-text-primary)',
              }),
          },
        }}
        tabIndex={0}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            flex: '0 0 auto',
          }}
        >
          <Iconify
            title="View Post"
            icon="mdi:instagram"
            width={32}
            sx={{ color: 'white', cursor: 'pointer' }}
          />
        </Box>

        <Box sx={{ flex: '1 1 auto' }}>
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
