"use client";

import type { Swiper as SwiperClass } from "swiper";

import React from 'react';
import { SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Scrollbar, Navigation, Pagination } from 'swiper/modules';

import { Box, Grid, Container, IconButton } from "@mui/material";

import { pxToRem } from "src/theme/styles";

import { Iconify } from 'src/components/iconify';
import { SectionTitle } from "src/components/section-title";
import { AnimatedShape } from 'src/components/animated-shape';
import { SectionTopText } from "src/components/section-toptext";
import { SliderWrapper } from "src/components/slider/slider-wrapper";
import { SectionDescription } from "src/components/section-description";

import { TestimonialCard } from './testimonial-card';

export const Testimonials = () => {

    const swiperRef = React.useRef<SwiperClass | null>(null);

    const handleSwiper = (swiper: any) => {
        swiperRef.current = swiper;
    };

    const handleNext = () => {
        swiperRef.current?.slideNext(); 
    };

    const handlePrev = () => {
        swiperRef.current?.slidePrev(); 
    };
    return (
        <Box sx={{
            // background: (theme) => theme.palette.custom.darker_bg,
            backgroundColor: "#A4B5BA",
        }}>
            <Container maxWidth="xl" sx={{
                minHeight: pxToRem(300),
                py: { xs: pxToRem(40), md: pxToRem(120) },
                px: { xs: pxToRem(15), md: pxToRem(0) },
                position: "relative",
            }}>
                <AnimatedShape
                    animationType="topToBottom"
                    size={{ width: 100, height: 100 }}
                    duration={3}
                    sx={{
                        position: "absolute",
                        top: 20,
                        right: 0,
                        mY: 4,
                        display: { xs: "none", md: "block" }
                    }}
                >
                    <Box
                        component="img"
                        src="\assets\core\shape_1.png"
                        alt="animated shape"
                        sx={{
                            width: "100%",
                            height: "100%",
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
                        <SectionTopText sx={{
                            color: "text.primary",
                            dividerSx: { mx: "auto" }
                        }}>
                            Testimonial
                        </SectionTopText>
                        <SectionTitle sx={{
                            color: 'text.secondary',
                        }}>
                            What Our Customers Says
                        </SectionTitle>

                        <SectionDescription
                            sx={{
                                color: 'text.secondary',
                                marginTop: pxToRem(10),
                                fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(20) },
                                maxWidth: { xs: "100%", md: "70%" },
                            }}>
                            Realar help you easily create a real estate trading website. With the function Register, Login, Post real estate news.
                        </SectionDescription>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        md={4}
                        sx={{
                            display: "flex",
                            justifyContent: { xs: "start", md: "flex-end" },
                            alignItems: "center",
                            gap: 2, 
                            mt: 4,
                        }}
                    >
                        <IconButton
                            aria-label="navigate"
                            size="large"
                            title="previous slide"
                            onClick={handlePrev}
                            sx={{
                                border: "1px solid",
                                borderColor: "text.primary",
                                borderRadius: "50%",
                                p: 1,
                            }}
                        >
                            <Iconify width={22} icon="guidance:right-2-short-arrow" color="text.primary" />
                        </IconButton>
                        <IconButton
                            aria-label="navigate"
                            size="large"
                            title="next slide"
                            onClick={handleNext}
                            sx={{
                                border: "1px solid",
                                borderColor: "text.primary",
                                borderRadius: "50%",
                                p: 1,
                            }}
                        >
                            <Iconify width={22} icon="guidance:left-2-short-arrow" color="text.primary" />
                        </IconButton>
                    </Grid>
                </Grid>
                {/* sliders */}
                <Box>
                    <SliderWrapper
                        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                        autoplay={{ delay: 5000, disableOnInteraction: true }}
                        breakpoints={{
                            0: { slidesPerView: 1 },
                            768: { slidesPerView: 2 }
                        }}
                        speed={2000}
                        onSwiper={handleSwiper}
                    >
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <TestimonialCard />
                        </SwiperSlide>
                    </SliderWrapper>
                </Box>
                <AnimatedShape
                    animationType="spin"
                    size={{ width: 150, height: 150 }}
                    duration={16}
                    sx={{
                        position: "absolute",
                        bottom: 2,
                        left: 0,
                        m: 4,
                        display: { xs: "none", md: "block" }
                    }}
                >
                    <Box
                        component="img"
                        src="\assets\core\shape_2.png"
                        alt="animated shape"
                        sx={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </AnimatedShape>
            </Container>
        </Box>
    )
};