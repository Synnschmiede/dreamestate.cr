'use client';

import { SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Box, Container, Grid, useTheme } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SectionTitle } from 'src/components/section-title';
import { AnimatedShape } from 'src/components/animated-shape';
import { RoundedButton } from 'src/components/rounded-button';
import { SliderWrapper } from 'src/components/slider/slider-wrapper';
import { SectionDescription } from 'src/components/section-description';

import { NewsArticleCard } from './news-article-card';

export const NewsArticles = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.custom.dark_bg,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          minHeight: pxToRem(300),
          py: { xs: pxToRem(40), md: pxToRem(120) },
          px: { xs: pxToRem(15), md: pxToRem(0) },
          position: 'relative',
        }}
      >
        <AnimatedShape
          animationType="topToBottom"
          size={{ width: 100, height: 100 }}
          duration={3}
          sx={{
            position: 'absolute',
            top: 20,
            right: 0,
            mY: 4,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            component="img"
            src="\assets\core\shape_1.png"
            alt="animated shape"
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </AnimatedShape>
        <Grid
          container
          sx={{
            marginBottom: { xs: pxToRem(20), md: pxToRem(50) },
          }}
        >
          <Grid item xs={12} md={8}>
            <SectionTitle
              sx={{
                color: 'text.white',
              }}
            >
              News & Articles
            </SectionTitle>

            <SectionDescription
              sx={{
                color: 'text.white',
                marginTop: pxToRem(10),
                fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(20) },
                maxWidth: { xs: '100%', md: '70%' },
              }}
            >
              Realar help you easily create a real estate trading website. With the function
              Register, Login, Post real estate news.
            </SectionDescription>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'start', md: 'flex-end' },
              alignItems: 'center',
            }}
          >
            <RoundedButton
              endIcon={<Iconify width={22} icon="guidance:left-2-short-arrow" />}
              variant="outlined"
              sx={{
                borderColor: 'text.white',
                marginY: 2,
                color: 'text.white',
              }}
            >
              Browse All Project
            </RoundedButton>
          </Grid>
        </Grid>
        {/* sliders */}
        <Box>
          <SliderWrapper
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
            }}
            speed={2000}
          >
            <SwiperSlide>
              <NewsArticleCard />
            </SwiperSlide>
            <SwiperSlide>
              <NewsArticleCard />
            </SwiperSlide>
            <SwiperSlide>
              <NewsArticleCard />
            </SwiperSlide>
            <SwiperSlide>
              <NewsArticleCard />
            </SwiperSlide>
          </SliderWrapper>
        </Box>
        <AnimatedShape
          animationType="spin"
          size={{ width: 150, height: 150 }}
          duration={16}
          sx={{
            position: 'absolute',
            bottom: 2,
            left: 0,
            m: 4,
            display: { xs: 'none', md: 'block' },
          }}
        >
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
      </Container>
    </Box>
  );
};
