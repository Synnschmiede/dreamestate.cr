import { Grid, Stack, Typography } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { PropertyDetailsContainer } from './property-details-container';
import { IPropertyDetails } from '../_lib/property.interface';
import dayjs from 'dayjs';

export const PropertyDetailsOverview = ({
  data,
  updated_on,
}: {
  data: IPropertyDetails | undefined;
  updated_on: string;
}) => {
  return (
    <PropertyDetailsContainer>
      <Typography variant="h6">Overview</Typography>
      <Grid container columns={10} pt={{ xs: 2, md: 4 }} spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={5} md={2}>
          <Stack direction="column" alignItems={{ xs: 'center', md: 'start' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              Updated on:{' '}
            </Typography>
            <Typography variant="body2" mt={0.5}>
              {dayjs(updated_on).format('MMM D, YYYY')}
            </Typography>
          </Stack>
        </Grid>
        {data?.bedroom && (
          <Grid item xs={5} md={2}>
            <PropertyOverviewBlock
              suffix="Bedrooms"
              prefix={data?.bedroom}
              icon="ion:bed-outline"
            />
          </Grid>
        )}
        {data?.bathroom && (
          <Grid item xs={5} md={2}>
            <PropertyOverviewBlock suffix="Bathrooms" prefix={data?.bathroom} icon="fa:bath" />
          </Grid>
        )}
        {data?.garage && (
          <Grid item xs={5} md={2}>
            <PropertyOverviewBlock suffix="Garages" prefix={data?.garage} icon="gravity-ui:car" />
          </Grid>
        )}
        {data?.area_size && (
          <Grid item xs={5} md={2}>
            <PropertyOverviewBlock suffix="ft2" prefix={data?.area_size} icon="bx:area" />
          </Grid>
        )}
      </Grid>
    </PropertyDetailsContainer>
  );
};

const PropertyOverviewBlock = ({
  prefix,
  suffix,
  icon,
}: {
  prefix: string | number;
  suffix: string;
  icon: string;
}) => {
  return (
    <Stack direction="column" alignItems={'center'}>
      <Iconify width={22} icon={icon} />
      <Typography variant="body2" mt={0.5}>
        {prefix} {suffix}
      </Typography>
    </Stack>
  );
};
