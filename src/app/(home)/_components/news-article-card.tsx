import { Box, Typography } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { RoundedButton } from "src/components/rounded-button";

import { IconWithText } from "./icon-with-text";


export const NewsArticleCard = () => {


    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 2,
                boxShadow: 2,
                overflow: 'hidden',
                height: '100%',
                marginBottom: 1,
                mx: 1
            }}
        >
            <Box
                component="img"
                height="250"
                src="/assets/home/card_1.png"
                alt="Property image"
                sx={{ objectFit: 'cover' }}
            />
            <Box sx={{
                px: 4
            }}>
                <Box
                    sx={{
                        marginY: 2,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <IconWithText
                        icon="clarity:date-line"
                        text="Apr 17, 2024"
                        sx={{ color: "white" }}
                        iconColor="white"
                    />
                    <IconWithText
                        icon="lets-icons:time-light"
                        text="3 min read"
                        sx={{ color: "white" }}
                        iconColor="white"
                    />
                </Box>
                <Typography
                    variant="h4"
                    color="text.white"

                >
                    University class starting soon while the lovely valley team work
                </Typography>
                
                <RoundedButton
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: 'text.white',
                        marginY: 2,
                        color: 'text.white'
                    }}
                    endIcon={<Iconify width={18} icon="guidance:left-2-short-arrow" />}
                > Book Now</RoundedButton>
            </Box>
        </Box>
    )
};