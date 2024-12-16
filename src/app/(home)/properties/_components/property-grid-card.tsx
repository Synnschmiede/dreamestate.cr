import { Card, Grid, Stack, Divider, CardMedia, Typography, CardContent, Box, ButtonGroup, Button } from "@mui/material";

import { Iconify } from "src/components/iconify";
import { TitledAvatar } from "src/components/titled-avatar";
import { RoundedButton } from "src/components/rounded-button";
import { SectionDescription } from "src/components/section-description";
import { IconWithText } from "../../_components/icon-with-text";
import { CustomChip } from "src/components/custom-chip";


export const PropertyGridCard = () => {


    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1,
                boxShadow: 3,
                overflow: 'hidden',
                height: '100%',
                marginBottom: 1
            }}
        >
            {/* CardMedia Wrapper */}
            <Box sx={{ position: "relative" }}>
                <CardMedia
                    component="img"
                    height="250"
                    image="/assets/home/card_1.png"
                    alt="Property image"
                    sx={{ objectFit: "cover" }}
                />
                {/* Chip at Top Right */}
                <CustomChip
                    label="For Sale"
                    color="primary"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,

                    }}
                />
                {/* Icon at Bottom Right */}
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 6,
                        padding: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: 2,
                        color: "common.white",
                    }}
                >
                    <Iconify icon="mdi:camera" width={18} height={18} /> 6
                </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                <Typography
                    variant="h5"
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

            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 4, py: 2 }}>
                <TitledAvatar path="/assets/home/avatar.jpg" title="John Doe" />
                <ButtonGroup
                    sx={{
                        '& .MuiButton-root': {
                            borderColor: '#DDDDDD',
                            color: '#333',

                        },

                    }}
                    size="small"

                >
                    <Button key="one">
                        <Iconify icon="material-symbols:share" />
                    </Button>
                    <Button key="two">
                        <Iconify icon="carbon:favorite" />
                    </Button>
                    <Button key="three">
                        <Iconify icon="ic:baseline-plus" />
                    </Button>
                </ButtonGroup>
            </Stack>
        </Card>
    )
};