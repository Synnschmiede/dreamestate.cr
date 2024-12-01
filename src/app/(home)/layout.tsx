'use client';

import type { Breakpoint } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { navData } from 'src/router';
import { Main } from 'src/layouts/main';
import { NavMobile } from 'src/layouts/main/nav/mobile';
import { NavDesktop } from 'src/layouts/main/nav/desktop';
import { Footer, HomeFooter } from 'src/layouts/main/footer';
import { MenuButton } from 'src/layouts/components/menu-button';
import { HeaderSection } from 'src/layouts/core/header-section';
import { LayoutSection } from 'src/layouts/core/layout-section';

import { Logo } from 'src/components/logo';
import { ArrowRight, ArrowRightAlt } from '@mui/icons-material';
import { RoundedButton } from 'src/components/rounded-button';

// ----------------------------------------------------------------------

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  const pathname = usePathname();

  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery: Breakpoint = 'lg';

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
                  endIcon={<ArrowRightAlt />}
                  variant='contained'
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
      footerSection={homePage ? <HomeFooter /> : <Footer layoutQuery={layoutQuery} />}
      /** **************************************
       * Style
       *************************************** */    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
