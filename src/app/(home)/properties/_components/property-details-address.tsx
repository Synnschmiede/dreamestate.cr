import { Grid, Stack, Typography } from "@mui/material"
import { IPropertyLocation } from "../_lib/property.interface"
import { PropertyDetailsAccordion } from "./property-details-accordion"
import { PropertyDetailsContainer } from "./property-details-container"

export const PropertyDetailsAddress = ({ data }: { data: IPropertyLocation }) => {

    return (
        <PropertyDetailsContainer>
            <PropertyDetailsAccordion
                pannelId="address"
                title="Address"
                expanded
                isLight
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Address:" value={data.addressLine1 || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="City:" value={data.city || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="State:" value={data.state || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Postal:" value={data.postalCode || "-"} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <PropertyDetailsAddressFieldView label="Country:" value={data.country || "-"} />
                    </Grid>
                </Grid>
            </PropertyDetailsAccordion>
        </PropertyDetailsContainer>
    )
}

const PropertyDetailsAddressFieldView = ({ label, value }: { label: string, value: string }) => {

    return (
        <Stack direction="row" spacing={1}>
            <Typography variant="body2" fontWeight={"semiBold"}>{label}</Typography>
            <Typography variant="body2">{value}</Typography>
        </Stack>
    )
}