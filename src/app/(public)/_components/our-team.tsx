"use client";

import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from 'swiper/modules';
import { SwiperSlide } from 'swiper/react';

import { Box, Container, Grid } from "@mui/material";

import { pxToRem } from "src/theme/styles";

import { AnimatedShape } from 'src/components/animated-shape';
import { SectionDescription } from "src/components/section-description";
import { SectionTitle } from "src/components/section-title";
import { SectionTopText } from "src/components/section-toptext";
import { SliderWrapper } from "src/components/slider/slider-wrapper";

import { TeamMemberCard } from './team-member-card';

export const OurTeam = () => {
    return (
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
                        Team Member
                    </SectionTopText>
                    <SectionTitle sx={{
                        color: 'text.secondary',
                    }}>
                        Meet The Awesome Team
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
                    }}
                >

                    {/* <RoundedButton
                        endIcon={<Iconify width={22} icon="guidance:left-2-short-arrow" />}
                        variant='outlined'
                        sx={{ mt: 4, borderColor: 'text.primary' }}
                    >
                        Browse All Project
                    </RoundedButton> */}
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
                        1024: { slidesPerView: 3 },
                    }}
                    speed={2000}
                >
                    <SwiperSlide>
                        <TeamMemberCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TeamMemberCard />
                    </SwiperSlide>
                    {/* <SwiperSlide>
                        <TeamMemberCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <TeamMemberCard />
                    </SwiperSlide> */}
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
    )
};