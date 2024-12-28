'use client';

import Link from 'next/link';

import {
  Box,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { Iconify } from './iconify';

export const PublicFooter = () => {
  const theme = useTheme();
  return (
    <Box sx={{ background: theme.palette.custom.dark_bg, color: 'grey.300', pt: 8, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* About Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h4" color="text.white">
              About Us
            </Typography>
            <Typography
              variant="body2"
              color="grey.500"
              sx={{ fontSize: { xs: pxToRem(16), md: pxToRem(18) }, mt: 1 }}
            >
              We are a company dedicated to providing innovative solutions for our customers. Our
              mission is to make technology accessible and beneficial for everyone.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={3}>
            <Typography variant="h4" color="text.white">
              Quick Links
            </Typography>
            <List sx={{ fontSize: pxToRem(18), mt: 1 }}>
              {['Home', 'Services', 'Products', 'Contact'].map((item) => (
                <ListItem key={item} disablePadding sx={{ py: 0.5 }}>
                  <ListItemText
                    primary={
                      <Link
                        href={`/${item.toLowerCase()}`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <Typography
                          variant="body2"
                          color="grey.500"
                          sx={{
                            '&:hover': { color: 'text.white' },
                            transition: 'color 0.3s',
                            fontSize: { xs: pxToRem(16), md: pxToRem(17) },
                          }}
                        >
                          {item}
                        </Typography>
                      </Link>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Grid>

          {/* Contact Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h4" color="text.white">
              Contact Us
            </Typography>
            <Typography
              variant="body2"
              color="grey.500"
              sx={{ fontSize: { xs: pxToRem(16), md: pxToRem(18) }, mt: 1 }}
            >
              123 Tech Street
            </Typography>
            <Typography
              variant="body2"
              color="grey.500"
              sx={{ fontSize: { xs: pxToRem(16), md: pxToRem(18) }, mt: 1 }}
            >
              San Francisco, CA 94107
            </Typography>
            <Typography
              variant="body2"
              color="grey.500"
              sx={{ fontSize: { xs: pxToRem(16), md: pxToRem(18) }, mt: 1 }}
            >
              Phone: (123) 456-7890
            </Typography>
            <Typography
              variant="body2"
              color="grey.500"
              sx={{ fontSize: { xs: pxToRem(16), md: pxToRem(18) }, mt: 1 }}
            >
              Email: info@example.com
            </Typography>
          </Grid>

          {/* Follow Us */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ color: 'text.white', mb: 2 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[
                'mdi:instagram',
                'circum:linkedin',
                'arcticons:x-twitter',
                'qlementine-icons:facebook-16',
              ].map((social) => (
                <Iconify key={social} width={22} icon={social} />
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'grey.800', my: 4 }} />

        <Typography variant="body2" align="center" sx={{ color: 'grey.500', mt: 1 }}>
          &copy; {new Date().getFullYear()} Dreamestate Inc. All rights reserved. | Admin?{' '}
          <Link href="/auth/sign-in" style={{  color: 'inherit' }}>login to your account</Link>
        </Typography>
      </Container>
    </Box>
  );
};
