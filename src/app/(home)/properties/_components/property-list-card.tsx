import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import { CustomChip } from "src/components/custom-chip";
import { Iconify } from "src/components/iconify";
import { SectionDescription } from "src/components/section-description";
import { TitledAvatar } from "src/components/titled-avatar";
import { IconWithText } from "../../_components/icon-with-text";
import { IProperty } from "../_lib/property.interface";
import { currencyFormatter } from "src/utils/currency-view";

export const PropertyListCard = ({ data }: { data: IProperty }) => {
    return (
        <Grid
            container
            sx={{
                borderRadius: "4px",
                '&:hover': {
                    boxShadow: (theme) => theme.customShadows.card,
                }
            }}
        >
            {/* IMAGE SECTION */}
            <Grid item xs={12} md={5} sx={{ position: "relative", }}>
                <Box
                    component="img"
                    height="100%"
                    width="100%"
                    src="https://picsum.photos/600/300?random=1"
                    alt="Property image"
                    sx={{ objectFit: "cover", borderRadius: { xs: "4px 4px 0 0", md: "4px 0 0 4px" } }}
                />

                <Box
                    sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        height: "50px",
                        background:
                            "linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
                        zIndex: 1,
                    }}
                />

                <Box sx={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 1 }}>
                    <CustomChip label="Featured" color="success" size="small" />
                    <CustomChip label="Active" color="info" size="small" />
                </Box>

                <Box
                    sx={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        display: "flex",
                        alignItems: "center",
                        color: "common.white",
                        zIndex: 2,
                        gap: 0.5,
                    }}
                >
                    <Iconify icon="mdi:camera" width={18} height={18} /> {6}
                </Box>
            </Grid>

            {/* CONTENT SECTION */}
            <Grid
                item
                xs={12}
                md={7}
                sx={{ backgroundColor: "common.white", px: { xs: 2, md: 3 }, pt: { xs: 2, md: 3 }, borderRadius: { xs: "0 0 4px 4px", md: "0 4px 4px 0" } }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {data?.title}
                </Typography>

                <Typography
                    variant="h6"
                    color="primary"
                    gutterBottom
                >
                    {currencyFormatter(data?.price)}
                </Typography>

                <SectionDescription
                    sx={{
                        color: "text.secondary",
                        fontSize: 14,
                        marginTop: 1,
                    }}
                >
                    {data?.description}
                </SectionDescription>

                {/* Icons Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: { xs: "space-between", md: "start" },
                        gap: 4
                    }}
                >
                    <IconWithText icon="fluent:bed-16-regular" text="5" />
                    <IconWithText icon="tabler:bath" text="6" />
                    <IconWithText icon="hugeicons:square-arrow-expand-02" text="190 ft²" />
                </Box>

                <Divider sx={{ mx: "auto", width: "90%", my: 2 }} />

                {/* FOOTER SECTION */}
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ pb: 2 }}
                >
                    <TitledAvatar path="/assets/home/avatar.jpg" title="John Collins" />

                    {/* Buttons */}
                    <ButtonGroup
                        sx={{
                            "& .MuiButton-root": {
                                borderColor: "#DDDDDD",
                                color: "#333",
                            },
                        }}
                        size="small"
                    >
                        <Button>
                            <Iconify icon="material-symbols:share" />
                        </Button>
                        <Button>
                            <Iconify icon="carbon:favorite" />
                        </Button>
                        <Button>
                            <Iconify icon="ic:baseline-plus" />
                        </Button>
                    </ButtonGroup>
                </Stack>
            </Grid>
        </Grid>
    );
};
