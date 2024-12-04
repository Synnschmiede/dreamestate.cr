import React from "react";

import { Card, Grid, Stack, Divider, CardMedia, Typography, CardContent, Box } from "@mui/material";

import { SectionDescription } from "src/components/section-description";

import { IconWithText } from "./icon-with-text";


export const OngoingProjectCard: React.FC = () => {


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
                height="250"
                image="/assets/home/card_1.png"
                alt="Property image"
                sx={{ objectFit: 'cover' }}
            />
            <CardContent sx={{ flexGrow: 1, padding: 3 }}>
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
                        fontSize: 16,
                        // marginTop: 2,
                        textAlign: "center"
                    }}>
                    California
                </SectionDescription>
                <Box
                    sx={{ 
                        marginTop: 2, 
                        mx: "auto" , 
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center"
                    }}
                >
                    <IconWithText icon="fluent:bed-16-regular" text="Bed 7" />
                    <IconWithText icon="tabler:bath" text="Bath 5" />
                    <IconWithText icon="hugeicons:square-arrow-expand-02" text="1690 sqft" />

                </Box>
            </CardContent>

            <Divider sx={{
                mx: "auto",
                width: "80%",
            }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 3 }}>
                <SectionDescription
                    sx={{
                        color: 'text.disabled',
                        fontSize: 16,
                        marginTop: 2,
                        textAlign: "center"
                    }}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, harum aliquid, porro et ab nihil ad possimus eveniet eaque pariatur doloremque incidunt odio quisquam. Magnam exercitationem at amet earum fugiat.
                </SectionDescription>
            </Stack>
        </Card>
    )
};