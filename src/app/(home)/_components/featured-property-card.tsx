import { Card, Grid, Stack, Divider, CardMedia, Typography, CardContent } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { TitledAvatar } from "src/components/titled-avatar";
import { RoundedButton } from "src/components/rounded-button";
import { SectionDescription } from "src/components/section-description";

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
            <CardContent sx={{ flexGrow: 1, padding: 2 }}>
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
                <Grid container spacing={1} sx={{ marginTop: 2 }}>
                    <Grid item xs={4}>
                        <IconWithText icon="fluent:bed-16-regular" text="Bed 7" />
                    </Grid>
                    <Grid item xs={4} >
                        <IconWithText icon="tabler:bath" text="Bath 5" />
                    </Grid>
                    <Grid item xs={4}>
                        <IconWithText icon="hugeicons:square-arrow-expand-02" text="1690 sqft" />
                    </Grid>
                </Grid>
            </CardContent>

            <Divider sx={{
                mx: "auto",
                width: "80%",
            }} />

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ padding: 2 }}>
                <TitledAvatar path="/assets/home/avatar.jpg" title="John Doe" />
                <RoundedButton
                    size="small"
                    variant="outlined"
                    sx={{
                        borderColor: 'text.primary',
                    }}
                    endIcon={<Iconify width={18} icon="guidance:left-2-short-arrow" />}
                > Book Now</RoundedButton>
            </Stack>
        </Card>
    )
};