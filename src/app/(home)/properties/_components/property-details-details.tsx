import { Grid, Stack, Typography } from "@mui/material"
import { IPropertyDetails } from "../_lib/property.interface"
import { PropertyDetailsAccordion } from "./property-details-accordion"
import { PropertyDetailsContainer } from "./property-details-container"

export const PropertyDetailsDetails = ({ data }: { data: IPropertyDetails }) => {

    return (
        <PropertyDetailsContainer>
            <PropertyDetailsAccordion
                pannelId="details"
                title="Details"
                expanded
                isLight
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Property id:" value={data.id || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Price:" value={data.price || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Property size:" value={data.size || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Property lot size:" value={data.property_lot_size || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Rooms:" value={data.rooms || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Bedrooms:" value={data.bedrooms || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Bathrooms:" value={data.bathrooms || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Garages:" value={data.garage || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Year built:" value={data.year_build || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Garage size:" value={data.garage_size || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Available from:" value={data.available_from || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Structure type:" value={data.structure_type || "-"} />
                    </Grid>
                </Grid>
            </PropertyDetailsAccordion>
        </PropertyDetailsContainer>
    )
}

const PropertyDetailsAddressFieldView = ({ label, value }: { label: string, value: string | number }) => {

    return (
        <Stack direction="row" spacing={1}>
            <Typography variant="body2" fontWeight={"semiBold"}>{label}</Typography>
            <Typography variant="body2">{value}</Typography>
        </Stack>
    )
}