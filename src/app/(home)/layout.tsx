'use client';

import type { Breakpoint } from '@mui/material/styles';

import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { MenuButton } from 'src/layouts/components/menu-button';
import { HeaderSection } from 'src/layouts/core/header-section';
import { LayoutSection } from 'src/layouts/core/layout-section';
import { Main } from 'src/layouts/main';
import { Footer } from 'src/layouts/main/footer';
import { NavDesktop } from 'src/layouts/main/nav/desktop';
import { NavMobile } from 'src/layouts/main/nav/mobile';
import { navData } from 'src/router';

import { Iconify } from 'src/components/iconify';
import { Logo } from 'src/components/logo';
import { PublicFooter } from 'src/components/public-footer';
import { RoundedButton } from 'src/components/rounded-button';

// ----------------------------------------------------------------------

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  const pathname = usePathname();

  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery: Breakpoint = 'md';

  const navConfigData = navData;

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                {/* -- Nav mobile -- */}
                <MenuButton
                  onClick={mobileNavOpen.onTrue}
                  sx={{
                    mr: 1,
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navConfigData}
                  open={mobileNavOpen.value}
                  onClose={mobileNavOpen.onFalse}
                />
                {/* -- Logo -- */}
                <Logo />
              </>
            ),
            rightArea: (
              <>
                {/* -- Nav desktop -- */}
                <NavDesktop
                  data={navConfigData}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
                  }}
                />
                <RoundedButton
                  endIcon={<Iconify width={22} icon="guidance:left-2-short-arrow" />}
                  variant='contained'
                  sx={{
                    display: { xs: 'none', sm: 'flex' },
                  }}
                >
                  Request a Visit
                </RoundedButton>
              </>
            ),
          }}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      // footerSection={homePage ? <PublicFooter /> : <Footer layoutQuery={layoutQuery} />}
      footerSection={<PublicFooter />}
      /** **************************************
       * Style
       *************************************** */    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
