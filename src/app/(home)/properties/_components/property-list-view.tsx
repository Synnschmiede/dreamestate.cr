'use client';


import { Grid } from '@mui/material';

import { PropertyGridCard } from './property-grid-card';
import { PropertyListCard } from './property-list-card';

export const PropertyListView = ({ data }: any) => {

    return (
        <Grid container spacing={2}>
            {data.length > 0 && (
                data.map((item: any) => (
                    <Grid item xs={12} >
                        <PropertyListCard />
                    </Grid>
                ))
            )}
        </Grid>
    );
};
