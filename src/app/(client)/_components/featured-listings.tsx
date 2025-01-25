"use client"

import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Box, Container, Grid } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { SectionDescription } from 'src/components/section-description';
import { SectionTitle } from 'src/components/section-title';
import { SectionTopText } from 'src/components/section-toptext';
import { SliderWrapper } from 'src/components/slider/slider-wrapper';

import { RoundedButton } from 'src/components/button/rounded-button';
import { FeaturedPropertyCard } from './featured-property-card';

export const FeaturedListings = () => {
    const logos = [
        "/assets/home/brand_1.svg",
        "/assets/home/brand_2.svg",
        "/assets/home/brand_3.svg",
        "/assets/home/brand_4.svg",
        "/assets/home/brand_5.svg",
        "/assets/home/brand_6.svg",
        "/assets/home/brand_3.svg",
    ];
    return (
        <Box
            sx={{
                backgroundImage: 'url(assets/background/hero_bg_4_1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                marginBottom: { xs: `-${pxToRem(60)}`, md: `-${pxToRem(120)}` },
            }}
        >
            <Container maxWidth="xl">
                <SliderWrapper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    breakpoints={{
                        0: { slidesPerView: 2 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                >
                    {logos.map((logo, index) => (
                        <SwiperSlide key={index}>
                            <Box
                                component="img"
                                src={logo}
                                alt={`Brand ${index + 1}`}
                                sx={{
                                    width: "100%",
                                    height: "auto",
                                    display: "block",
                                    margin: "0 auto",
                                    maxHeight: 60,
                                    objectFit: "contain",
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </SliderWrapper>
                <Box sx={{
                    marginTop: { xs: pxToRem(40), md: pxToRem(100) },
                    marginBottom: { xs: pxToRem(20), md: pxToRem(50) },
                }}>
                    <SectionTopText sx={{
                        color: "text.primary",
                    }}>
                        Featured Listings
                    </SectionTopText>

                    <Grid container>
                        <Grid item xs={12} md={7}>
                            <SectionTitle sx={{
                                color: 'text.secondary',
                            }}>
                                Featured Listings
                            </SectionTitle>
                            <SectionDescription
                                sx={{
                                    color: 'text.secondary',
                                    marginTop: pxToRem(10),
                                }}>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo.
                            </SectionDescription>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'start', md: 'flex-end' }, alignItems: 'center' }}>
                            <RoundedButton
                                endIcon={<Iconify width={22} icon="guidance:left-2-short-arrow" />}
                                variant='contained'
                                sx={{ mt: 2, py: { xs: 1.5, md: 2.5 }, px: { xs: 3, md: 4 } }}
                                handleClick={() => console.log('clicked')}
                            >
                                View all properties
                            </RoundedButton>
                        </Grid>
                    </Grid>
                </Box>
                <SliderWrapper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    autoplay={{ delay: 5000, disableOnInteraction: true }}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    pauseOnHover
                    speed={2000}
                >
                    <SwiperSlide>
                        <FeaturedPropertyCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeaturedPropertyCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeaturedPropertyCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <FeaturedPropertyCard />
                    </SwiperSlide>
                </SliderWrapper>
            </Container>
        </Box>
    );
};



