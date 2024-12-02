"use client"

import { SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { Box, Button, Container, Grid, Stack } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { SectionTopText } from 'src/components/section-toptext';
import { SliderWrapper } from 'src/components/slider/slider-wrapper';
import { SectionTitle } from 'src/components/section-title';
import { SectionDescription } from 'src/components/section-description';
import { RoundedButton } from 'src/components/rounded-button';
import { ArrowRightAlt } from '@mui/icons-material';

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
                minHeight: pxToRem(400),
                paddingY: { xs: pxToRem(40), md: pxToRem(80)},
            }}
        >
            <Container maxWidth="xl">
                <SliderWrapper
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                    breakpoints={{
                        0: { slidesPerView: 3 },
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
                    marginTop: { xs: pxToRem(40), md: pxToRem(70)},
                }}>
                    <SectionTopText sx={{
                        color: "text.primary",
                    }}>
                        Featured Listings
                    </SectionTopText>

                    <Grid container>
                        <Grid item xs={12} md={6}>
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
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: { xs: 'start', md: 'flex-end' }, alignItems: 'center' }}>
                            <RoundedButton
                                endIcon={<ArrowRightAlt />}
                                variant='contained'
                                sx={{ mt: 2, py: { xs: 1.5, md: 2.5}, px: { xs: 3, md: 4} }}
                            >
                                View all properties
                            </RoundedButton>
                        </Grid>
                    </Grid>
                </Box>
            </Container>

        </Box>
    );
};