'use client';

import { Grid } from '@mui/material';

import { IProperty } from '../_lib/property.interface';
import { PropertyListCard } from './property-list-card';
import { useRouter } from 'next/navigation';

export const PropertyListView = ({ data }: { data: IProperty[] }) => {
  const router = useRouter();

  const hanldeRedirect = (slug: string) => {
    router.push(`/properties/${slug}`);
  };

  return (
    <Grid container spacing={2}>
      {data?.length > 0 &&
        data.map((item: any) => (
          <Grid item xs={12} onClick={() => hanldeRedirect(item.slug)} sx={{ cursor: 'pointer' }}>
            <PropertyListCard data={item} />
          </Grid>
        ))}
    </Grid>
  );
};
