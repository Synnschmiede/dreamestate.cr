'use client';

import { Grid } from '@mui/material';

import { IProperty } from '../_lib/property.interface';
import { PropertyListCard } from './property-list-card';

export const PropertyListView = ({ data }: { data: IProperty[] }) => {
  return (
    <Grid container spacing={2}>
      {data?.length > 0 &&
        data.map((item: any) => (
          <Grid item xs={12}>
            <PropertyListCard data={item} />
          </Grid>
        ))}
    </Grid>
  );
};
