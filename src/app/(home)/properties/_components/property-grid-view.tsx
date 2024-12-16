'use client';


import { Grid } from '@mui/material';

import { PropertyGridCard } from './property-grid-card';

export const PropertyGridView = ({ list }: any) => {


    return (
        <Grid container spacing={2}>
            {list.length > 0 && (
                list.map((item: any) => (
                    <Grid item xs={12} md={6}>
                        <PropertyGridCard />
                    </Grid>
                ))
            )}
        </Grid>
    );
};
