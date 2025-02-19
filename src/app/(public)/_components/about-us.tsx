'use client';

import { Avatar, AvatarGroup, Box, Container, Grid, Typography } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { AnimatedShape } from 'src/components/animated-shape';
import { Iconify } from 'src/components/iconify';
import { SectionDescription } from 'src/components/section-description';
import { SectionTitle } from 'src/components/section-title';
import { SectionTopText } from 'src/components/section-toptext';

import { RoundedButton } from 'src/components/button/rounded-button';
import { IconWithText } from './icon-with-text';

export const AboutUs = () => {
  return (
    <Box
      sx={{
        // background: (theme) => theme.palette.custom.darker_bg,
        backgroundColor: '#F1F4F5',
        minHeight: pxToRem(300),
        pt: { xs: pxToRem(100), md: pxToRem(200) },
        pb: { xs: pxToRem(40), md: pxToRem(80) },
        position: 'relative',
        zIndex: 8
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={0} alignItems="center">
          {/* Left Section */}
          <Grid item xs={12} md={6} pr={4}>
            <SectionTopText
              sx={{
                color: 'text.primary',
              }}
            >
              About us
            </SectionTopText>
            <SectionTitle
              sx={{
                color: 'text.secondary',
              }}
            >
              We Are Simply What You Haven’t Imagined Yet.
            </SectionTitle>

            <SectionDescription
              sx={{
                color: 'text.secondary',
                marginTop: pxToRem(10),
                fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(20) },
              }}
            >
              Though we have a great deal of commercial expertise under our belt, our firm is
              primarily focused on high-end residential projects. As a distinct reaction to the
              customer and the environment, each of our projects takes shape.
            </SectionDescription>

            <Grid container spacing={2} sx={{ marginTop: pxToRem(10) }}>
              <Grid item xs={12} md={6}>
                <IconWithText
                  icon="prime:check-circle"
                  text="Quality real estate services"
                  iconSize={24}
                  sx={{ color: 'text.secondary', fontSize: 20 }}
                />
                <IconWithText
                  icon="prime:check-circle"
                  text="100% Satisfaction guarantee"
                  iconSize={24}
                  sx={{ color: 'text.secondary', fontSize: 20 }}
                />
                <IconWithText
                  icon="prime:check-circle"
                  text="Highly professional team"
                  iconSize={24}
                  sx={{ color: 'text.secondary', fontSize: 20 }}
                />
                <IconWithText
                  icon="prime:check-circle"
                  text="Dealing always on time"
                  iconSize={24}
                  sx={{ color: 'text.secondary', fontSize: 20 }}
                />
                <RoundedButton
                  endIcon={<Iconify width={22} icon="guidance:left-2-short-arrow" />}
                  variant="contained"
                  sx={{ mt: 4 }}
                  handleClick={() => console.log('clicked')}
                >
                  More About Dreamesate
                </RoundedButton>
              </Grid>

              <Grid item xs={12} md={6} sx={{ borderLeft: '1px solid var(--light_bg)' }}>
                <Iconify
                  icon="material-symbols-light:phone-in-talk-outline"
                  width={44}
                  sx={{
                    color: 'white',
                    backgroundColor: 'text.secondary',
                    borderRadius: '50%',
                    padding: 1,
                  }}
                />
                <Typography variant="h6" sx={{ color: 'text.secondary' }} mt={1}>
                  Call Us 24/7
                </Typography>
                <Typography variant="h3" color="text.secondary">
                  +01 234 56789
                </Typography>
                <AnimatedShape
                  animationType="leftToRight"
                  size={{ width: 80, height: 80 }}
                  duration={3}
                  sx={{ mt: 2, display: { xs: 'none', md: 'block' } }}
                >
                  <Box component="img" src="\assets\core\shape_1.png" alt="animated shape" />
                </AnimatedShape>
              </Grid>
            </Grid>
          </Grid>
          {/* Right Section */}
          <Grid item xs={12} md={6} mt={{ xs: pxToRem(20), md: 0 }} sx={{ position: 'relative' }}>
            {/* Image */}
            <Box
              component="img"
              src="\assets\home\hero_thumb_4_1.png"
              sx={{
                maxWidth: '100%',
                borderRadius: '5%',
                zIndex: 10,
                position: 'relative',
              }}
            />

            {/* Spinner */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '5%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 5,
                display: { xs: 'none', md: 'block' },
              }}
            >
              <AnimatedShape animationType="spin" size={{ width: 100, height: 100 }} duration={16}>
                <Box
                  component="img"
                  src="\assets\core\shape_2.png"
                  alt="animated shape"
                  sx={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </AnimatedShape>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <HappyClients />
    </Box>
  );
};

const HappyClients = () => {
  return (
    <AnimatedShape
      animationType="topToBottom"
      size={{ width: 300, height: 80 }}
      duration={3}
      sx={{ right: 0, bottom: '40%', zIndex: 20, display: { xs: 'none', md: 'block' } }}
    >
      <Box
        sx={{
          backgroundColor: 'text.secondary',
          padding: pxToRem(20),
          borderTopLeftRadius: pxToRem(10),
          borderBottomLeftRadius: pxToRem(10),
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'end',
          alignItems: 'start',
          gap: pxToRem(16),
        }}
      >
        <Typography variant="h4" color="white">
          128k+Happy Client
        </Typography>
        <AvatarGroup>
          <Avatar sx={{ width: 60, height: 60 }} alt="Remy Sharp" src="assets\home\avatar.jpg" />
          <Avatar sx={{ width: 60, height: 60 }} alt="Travis Howard" src="assets\home\avatar.jpg" />
          <Avatar sx={{ width: 60, height: 60 }} alt="Agnes Walker" src="assets\home\avatar.jpg" />
          <Avatar
            sx={{ width: 60, height: 60 }}
            alt="Trevor Henderson"
            src="assets\home\avatar.jpg"
          />
        </AvatarGroup>
      </Box>
    </AnimatedShape>
  );
};
