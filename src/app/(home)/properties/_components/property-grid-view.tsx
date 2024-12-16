'use client';


import { Grid } from '@mui/material';

import { PropertyGridCard } from './property-grid-card';
import { IProperty } from '../_lib/property.interface';

export const PropertyGridView = ({ data }: { data: IProperty[] }) => {

    return (
        <Grid container spacing={2}>
            {data.length > 0 && (
                data.map((item: any) => (
                    <Grid item xs={12} md={6}>
                        <PropertyGridCard data={item} />
                    </Grid>
                ))
            )}
        </Grid>
    );
};
