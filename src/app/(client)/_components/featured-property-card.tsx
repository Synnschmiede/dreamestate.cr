import { Box, Card, CardContent, CardMedia, Divider, Stack, Typography } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { SectionDescription } from "src/components/section-description";
import { TitledAvatar } from "src/components/titled-avatar";

import { RoundedButton } from "src/components/button/rounded-button";
import { IconWithText } from "./icon-with-text";


export const FeaturedPropertyCard = () => {


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
                >
                    Virgin Vineyard House
                </Typography>
                <IconWithText icon="carbon:location" text="Inner Circular Lamar Street, Houston, Texas" />
                <SectionDescription
                    sx={{
                        color: 'text.disabled',
                        fontSize: 16,
                        marginTop: 2
                    }}>
                    Egestas fringilla phasellus faucibus scelerisque eleifend donec. Porta nibh venenatis.
                </SectionDescription>
                <Box
                    sx={{
                        marginTop: 2,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
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
                <TitledAvatar path="/assets/home/avatar.jpg" title="John Doe" />
                <RoundedButton
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: 'text.primary',
                    }}
                    endIcon={<Iconify width={18} icon="guidance:left-2-short-arrow" />}
                    handleClick={() => console.log('clicked')}
                > Book Now</RoundedButton>
            </Stack>
        </Card>
    )
};