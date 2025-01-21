'use client';

import { m } from 'framer-motion';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


import { PageNotFoundIllustration } from 'src/assets/illustrations';
import { SimpleLayout } from 'src/layouts/simple';

import { usePathname, useRouter } from 'next/navigation';
import { MotionContainer, varBounce } from 'src/components/animate';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export function NotFoundView({ returnTo = '/' }: { returnTo?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleGoBack = () => {
    if (pathname && pathname.includes('dashboard')) {
      router.push(paths.dashboard.root);
    } else {
      router.push(paths.home);
    }
  };
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Sorry, page not found!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button onClick={handleGoBack} size="large" variant="contained">
          Go back
        </Button>
      </Container>
    </SimpleLayout>
  );
}
