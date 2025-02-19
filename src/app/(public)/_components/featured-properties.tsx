import { Box, Container, Grid } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import { RedirectButton } from 'src/components/button/redirect-button';
import { SectionDescription } from 'src/components/section-description';
import { SectionTitle } from 'src/components/section-title';
import { SectionTopText } from 'src/components/section-toptext';
import { PropertyGridCard } from '../properties/_components/property-grid-card';
import { IProperty } from '../properties/_lib/property.interface';


export const FeaturedProperties = async () => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/property?featured=true`, {
        cache: 'no-cache',
    });

    const featured_properties = await res.json();

    return (
        <Box
            sx={{
                backgroundImage: 'url(assets/background/hero_bg_4_1.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                marginBottom: { xs: `-${pxToRem(60)}`, md: `-${pxToRem(120)}` },
                zIndex: 10
            }}
        >
            <Container maxWidth="xl">
                <Box sx={{
                    marginTop: { xs: pxToRem(40), md: pxToRem(100) },
                    marginBottom: { xs: pxToRem(20), md: pxToRem(50) },
                }}>
                    <SectionTopText sx={{
                        color: "text.primary",
                    }}>
                        Amazing Section
                    </SectionTopText>

                    <Grid container>
                        <Grid item xs={12} md={7}>
                            <SectionTitle sx={{
                                color: 'text.secondary',
                            }}>
                                Featured Properties
                            </SectionTitle>
                            <SectionDescription
                                sx={{
                                    color: 'text.secondary',
                                    marginTop: pxToRem(10),
                                }}>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae ab illo inventore veritatis et quasi architecto beatae vitae
                                dicta sunt explicabo.
                            </SectionDescription>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: 'flex', justifyContent: { xs: 'start', md: 'flex-end' }, alignItems: 'center' }}>
                            <RedirectButton path='/properties?featured=true' title='Browse all' sx={{ borderColor: '#1C2D37', color: '#1C2D37' }} />
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={2}>
                    {
                        featured_properties?.data && featured_properties?.data?.slice(0, 3).map((item: IProperty) => (
                            <Grid key={item.id} item xs={4}>
                                <PropertyGridCard data={item} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Container>
        </Box>
    );
};



