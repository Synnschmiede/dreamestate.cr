'use client';

import { Grid } from '@mui/material';

import { PropertyGridCard } from './property-grid-card';
import { IProperty } from '../_lib/property.interface';
import { useRouter } from 'next/navigation';

export const PropertyGridView = ({ data }: { data: IProperty[] }) => {
  const router = useRouter();

  const hanldeRedirect = (slug: string) => {
    router.push(`/properties/${slug}`);
  };
  return (
    <Grid container spacing={2}>
      {data?.length > 0 &&
        data.map((item: IProperty) => (
          <Grid key={item.id} item xs={12} md={6} onClick={() => hanldeRedirect(item.slug)}>
            <PropertyGridCard data={item} />
          </Grid>
        ))}
    </Grid>
  );
};
