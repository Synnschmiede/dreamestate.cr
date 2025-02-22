import { Box, Container, Grid, Stack } from "@mui/material";

import { pxToRem } from "src/theme/styles";

import { AnimatedShape } from 'src/components/animated-shape';
import { RedirectButton } from "src/components/button/redirect-button";
import { SectionDescription } from "src/components/section-description";
import { SectionTitle } from "src/components/section-title";
import { SectionTopText } from "src/components/section-toptext";
import { PropertyGridCard } from "../properties/_components/property-grid-card";
import { IProperty } from '../properties/_lib/property.interface';


export const AvailableProperties = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/property?property=available&limit=3`, {
        cache: 'no-cache',
    });

    const available_properties = await res.json();

    return (
        <Box sx={{
            minHeight: pxToRem(300),
            py: { xs: pxToRem(40), md: pxToRem(120) },
            px: { xs: pxToRem(15), md: pxToRem(0) },
            position: "relative",
        }}>
            <AnimatedShape
                animationType="spin"
                size={{ width: 100, height: 100 }}
                duration={16}
                sx={{
                    position: "absolute",
                    top: 20,
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

            <Container maxWidth="xl">
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: { xs: pxToRem(20), md: pxToRem(50) },
                    }}
                >
                    <SectionTopText sx={{
                        color: "text.primary",
                        dividerSx: { mx: "auto" }
                    }}>
                        Best Proejct
                    </SectionTopText>
                    <SectionTitle sx={{
                        color: 'text.secondary',
                    }}>
                        Available Properties
                    </SectionTitle>

                    <SectionDescription
                        sx={{
                            color: 'text.secondary',
                            marginTop: pxToRem(10),
                            fontSize: { xs: pxToRem(16), sm: pxToRem(18), md: pxToRem(20) },
                            maxWidth: { xs: "100%", md: "50%" },
                            textAlign: "center"
                        }}>
                        Quis nulla blandit vulputate morbi adipiscing sem vestibulum. Nulla turpis integer dui sed posuere sem. Id molestie mi arcu gravida lorem potenti.
                    </SectionDescription>
                </Box>

                <Grid container spacing={2}>
                    {
                        available_properties?.data && available_properties?.data?.slice(0, 3).map((item: IProperty) => (
                            <Grid key={item.id} item xs={4}>
                                <PropertyGridCard data={item} />
                            </Grid>
                        ))
                    }
                </Grid>

                <Stack direction='row' justifyContent='center' sx={{ mt: 2 }}>
                    <RedirectButton path='/properties?property=available' title='Browse all' sx={{ borderColor: '#1C2D37', color: '#1C2D37' }} />
                </Stack>
            </Container>

            <AnimatedShape
                animationType="topToBottom"
                size={{ width: 100, height: 100 }}
                duration={3}
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 20,
                    m: 4,
                    display: { xs: "none", md: "block" }
                }}
            >
                <Box
                    component="img"
                    src="\assets\core\shape_1.png"
                    alt="animated shape"
                />
            </AnimatedShape>
        </Box>
    )
};