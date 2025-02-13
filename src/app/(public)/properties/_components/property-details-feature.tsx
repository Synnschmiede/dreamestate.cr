import { Grid, Stack, Typography } from '@mui/material';
import { Fragment } from 'react';
import { Iconify } from 'src/components/iconify';
import { TFeatureGroup } from '../_lib/property.interface';
import { PropertyDetailsAccordion } from './property-details-accordion';
import { PropertyDetailsContainer } from './property-details-container';

export const PropertyDetailsFeature = ({
  data,
}: {
  data: TFeatureGroup[];
}) => {
  return (
    <PropertyDetailsContainer>
      <PropertyDetailsAccordion pannelId="features" title="Features" expanded isLight>
        <Grid container spacing={2}>
          {
            data?.length > 0 && data.map((feature_group) => (
              <Fragment key={feature_group.group_name}>
                <Grid item xs={12}>
                  <Typography variant="body2" fontWeight={'semiBold'}>
                    {feature_group.group_name}
                  </Typography>
                </Grid>
                {
                  feature_group.features.map((feature) => (
                    <Grid item xs={12} md={4} key={feature}>
                      <PropertyDetailsCheckbox value={feature || '-'} />
                    </Grid>
                  ))
                }
              </Fragment>
            ))}
        </Grid>
      </PropertyDetailsAccordion>
    </PropertyDetailsContainer>
  );
};

const PropertyDetailsCheckbox = ({ value }: { value: string }) => {
  return (
    <Stack direction="row" spacing={1}>
      <Iconify icon="ei:check" sx={{ color: 'success.main' }} />
      <Typography variant="body2">{value}</Typography>
    </Stack>
  );
};
