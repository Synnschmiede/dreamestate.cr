import React from "react";

import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { SectionDescription } from "src/components/section-description";



export const TeamMemberCard: React.FC = () => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 3,
                overflow: 'hidden',
                height: '100%',
                marginBottom: 1
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
                sx={{ padding: 3, background: "#A4B5BA" }}
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
        </Card>
    )
};