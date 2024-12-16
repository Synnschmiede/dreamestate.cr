import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Divider, Stack, Typography } from "@mui/material";

import { CustomChip } from "src/components/custom-chip";
import { Iconify } from "src/components/iconify";
import { SectionDescription } from "src/components/section-description";
import { TitledAvatar } from "src/components/titled-avatar";
import { IconWithText } from "../../_components/icon-with-text";
import { IProperty } from "../_lib/property.interface";
import { currencyFormatter } from "src/utils/currency-view";


export const PropertyGridCard = ({ data }: { data: IProperty }) => {

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 1,
                boxShadow: 3,
                overflow: 'hidden',
                height: '100%',
                marginBottom: 1,
                '&:hover': {
                    boxShadow: (theme) => theme.customShadows.card,
                    '& .MuiCardMedia-root': {
                        transform: 'scale(1.05)', 
                        transition: 'transform 0.3s ease-in-out',
                    }
                }
            }}
        >
            <Box sx={{ position: "relative", overflow: "hidden", cursor: "pointer" }}>
                <CardMedia
                    component="img"
                    height="250"
                    image="https://picsum.photos/600/300?random=1"
                    alt="Property image"
                    sx={{ objectFit: "cover" }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60px",
                        background: "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                        zIndex: 1,
                    }}
                />
                <CustomChip
                    label="For Sale"
                    color="primary"
                    size="small"
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: 2,
                        color: "common.white",
                        zIndex: 2,
                        gap: .5
                    }}
                >
                    <Iconify icon="mdi:camera" width={18} height={18} /> {6}
                </Box>
            </Box>
            <CardContent sx={{ flexGrow: 1, padding: 3 }}>
                <Typography
                    variant="h5"
                    color="text.secondary"
                >
                    {data?.title}
                </Typography>
                <Typography
                    variant="h6"
                    color="primary"
                    sx={{ mt: 1 }}
                >
                    {currencyFormatter(data?.price)}
                </Typography>
                <IconWithText icon="carbon:location" text="Inner Circular Lamar Street, Houston, Texas" />
                <SectionDescription
                    sx={{
                        color: 'text.disabled',
                        fontSize: 16,
                        marginTop: 2
                    }}>
                    {data?.description}
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
                            color: '#333'
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