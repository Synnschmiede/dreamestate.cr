'use client';
import { Button, Container, Typography } from '@mui/material';
import { m } from 'framer-motion';
import Link from 'next/link';
import ForbiddenIllustration from 'src/assets/illustrations/forbidden-illustration';
import { MotionContainer, varBounce } from 'src/components/animate';
import useAuth from 'src/hooks/useAuth';
import { SimpleLayout } from 'src/layouts/simple';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

export const NotAuthorizedView = () => {
  const { userInfo } = useAuth();
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            You are not allowed to access this page!
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            Your current role is {userInfo?.role} but the page you are trying to access is
            restricted for this role. If you think this is a mistake please{' '}
            <Link href={paths.contact}>contact us</Link>
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href={paths.dashboard.root} size="large" variant="contained">
          Return dashboard
        </Button>
      </Container>
    </SimpleLayout>
  );
};
