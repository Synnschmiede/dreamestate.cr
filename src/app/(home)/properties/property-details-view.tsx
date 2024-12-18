import { Box, Container, Grid, Stack, Typography } from "@mui/material"
import { IProperty } from "./_lib/property.interface"
import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs/custom-breadcrumbs"
import { currencyFormatter } from "src/utils/currency-view"
import { PropertyDetailsImageCarousel } from "./_components/property-details-image-carousel"

export const PropertyDetailsView = ({ data, slug }: { data: IProperty, slug: string }) => {
    console.log(data, "property...........")
    return (
        <Container maxWidth="xl">
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                    <CustomBreadcrumbs
                        heading={`${data.title}`}
                        links={[
                            { name: 'Home', href: '/' },
                            { name: 'Properties', href: '/properties' },
                            { name: 'Modern Condo for Sale' }
                        ]}
                    />
                </Grid>
                <Grid item xs={12} md={4} >
                    <Stack
                        direction={"column"}
                        justifyContent="end"
                        alignItems={{ md: "end", xs: "start" }}
                        sx={{ height: "100%" }}
                    >
                        <Typography
                            variant="h6"
                            color="primary"

                        >
                            {data?.property_details?.property_lot_size}
                        </Typography>
                        <Typography
                            variant="h4"
                            color="primary"

                        >
                            {currencyFormatter(data?.price)}
                        </Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ my: { xs: 1, md: 2 } }}>
                {/* property details */}
                <Grid item xs={12} md={8}>
                    <PropertyDetailsImageCarousel images={data.images || []} />
                </Grid>
                {/* sidebar */}
                <Grid item xs={12} md={4}>
                    sidebar
                </Grid>
            </Grid>
        </Container>
    )
}