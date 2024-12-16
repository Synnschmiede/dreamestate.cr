'use client';


import { Grid } from '@mui/material';

import { PropertyGridCard } from './property-grid-card';

export const PropertyGridView = ({ data }: any) => {

    return (
        <Grid container spacing={2}>
            {data.length > 0 && (
                data.map((item: any) => (
                    <Grid item xs={12} md={6}>
                        <PropertyGridCard />
                    </Grid>
                ))
            )}
        </Grid>
    );
};
