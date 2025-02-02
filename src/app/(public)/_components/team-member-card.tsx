import React from "react";

import { alpha, Box, Card, CardMedia, Stack, Typography, useTheme } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { SectionDescription } from "src/components/section-description";



export const TeamMemberCard: React.FC = () => {
    const theme = useTheme();
    return (
        <Card
            sx={{
                position: "relative",
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
                height: '100%',
                marginBottom: 1,
                "&:hover .hover-layer": {
                    opacity: 1,
                    visibility: "visible",
                },
            }}
        >
            <CardMedia
                component="img"
                height="550"
                image="/assets/home/team_2.png"
                alt="Property image"
                sx={{ objectFit: 'container' }}
            />

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                minHeight="110px"
                sx={{
                    paddingX: 3,
                    // background: theme.palette.custom.darker_bg,
                    backgroundColor: "#A4B5BA",
                }}

            >
                <Box>
                    <Typography
                        variant="h4"
                        color="text.secondary"
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        Commercial Space
                    </Typography>
                    <SectionDescription
                        sx={{
                            color: 'text.disabled',
                            fontSize: 16
                        }}>
                        California
                    </SectionDescription>
                </Box>
                <Iconify
                    icon="material-symbols-light:phone-in-talk-outline"
                    width={24}
                    sx={{
                        color: "white",
                        backgroundColor: "text.secondary",
                        borderRadius: "50%",
                        padding: 1,
                    }}
                />
            </Stack>
            <Box
                className="hover-layer"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "calc(100% - 110px)",
                    backgroundColor: alpha(theme.palette.text.secondary, 0.6),
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 2,
                    opacity: 0,
                    visibility: "hidden",
                    transition: "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease",
                    transform: "scale(1)",
                    // transition: "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease", 
                    "&:hover": {
                        transform: "scale(.95)",
                        borderRadius: 2
                    },

                }}
            >
                {/* Social Icons */}
                <Iconify
                    icon="mdi:facebook"
                    width={32}
                    sx={{ color: "white", cursor: "pointer" }}
                />
                <Iconify
                    icon="mdi:twitter"
                    width={32}
                    sx={{ color: "white", cursor: "pointer" }}
                />
                <Iconify
                    icon="mdi:instagram"
                    width={32}
                    sx={{ color: "white", cursor: "pointer" }}
                />
            </Box>
        </Card>
    )
};