"use client";
import { Grid } from "@mui/material";
import { FilterToolbar } from "./_components/filter-toolbar";
import { PropertyGridCard } from "./_components/property-grid-card";
import { PropertyGridView } from "./_components/property-grid-view";

export const PropertiesView = ({ properties }: any) => {
    return (
        <>
            <FilterToolbar />
            <Grid container spacing={2} sx={{ mt: { xs: 1, md: 2 }}}>
                <Grid item xs={12} md={8}>
                    <PropertyGridView list={properties} />
                </Grid>
                <Grid item xs={12} md={4}>
                    sidebar
                </Grid>
            </Grid>

        </>
    )
};