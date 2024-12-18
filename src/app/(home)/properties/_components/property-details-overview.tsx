import { Grid, Stack, Typography } from "@mui/material"
import { Iconify } from "src/components/iconify"
import { IPropertyOverview } from "../_lib/property.interface"
import { PropertyDetailsContainer } from "./property-details-container"

export const PropertyDetailsOverview = ({ data }: { data: IPropertyOverview }) => {
    console.log(data, "overview")
    return (
        <PropertyDetailsContainer>
            <Typography variant="h6">Overview</Typography>
            <Grid
                container
                columns={10}
                pt={{ xs: 2, md: 4 }}
                spacing={{ xs: 2, md: 4 }}
            >
                <Grid item xs={5} md={2}>
                    <Stack direction="column" alignItems={{ xs: "center", md: "start"}}>
                        <Typography variant="body1" sx={{ fontWeight: "bold" }}>Updated on: </Typography>
                        <Typography variant="body2" mt={.5}>{data.updated_on}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={5} md={2}>
                    <PropertyOverviewBlock
                        suffix="Bedrooms"
                        prefix={data.bedrooms}
                        icon="ion:bed-outline"
                    />
                </Grid>
                <Grid item xs={5} md={2}>
                    <PropertyOverviewBlock
                        suffix="Bathrooms"
                        prefix={data.bathrooms}
                        icon="fa:bath"
                    />
                </Grid>
                <Grid item xs={5} md={2}>
                    <PropertyOverviewBlock
                        suffix="Garages"
                        prefix={data.garage}
                        icon="gravity-ui:car"
                    />
                </Grid>
                <Grid item xs={5} md={2}>
                    <PropertyOverviewBlock
                        suffix="ft2"
                        prefix={data.area_size}
                        icon="bx:area"
                    />
                </Grid>
            </Grid>
        </PropertyDetailsContainer>
    )
}


const PropertyOverviewBlock = ({ prefix, suffix, icon }: { prefix: string | number, suffix: string, icon: string }) => {
    return (
        <Stack direction="column" alignItems={"center"}>
            <Iconify width={22} icon={icon} />
            <Typography variant="body2" mt={.5}>{prefix} {suffix}</Typography>
        </Stack>
    )
}