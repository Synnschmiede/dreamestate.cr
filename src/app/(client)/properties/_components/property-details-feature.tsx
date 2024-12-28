import { Grid, Stack, Typography } from '@mui/material';
import { PropertyDetailsAccordion } from './property-details-accordion';
import { PropertyDetailsContainer } from './property-details-container';
import { Iconify } from 'src/components/iconify';

export const PropertyDetailsFeature = ({
  data,
}: {
  data: {
    interior_details: string[];
    outdoor_details: string[];
    utilities: string[];
    other_features: string[];
  };
}) => {
  return (
    <PropertyDetailsContainer>
      <PropertyDetailsAccordion pannelId="features" title="Features" expanded isLight>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={'semiBold'}>
              Interior Details
            </Typography>
          </Grid>
          {data.interior_details.length > 0 &&
            data.interior_details.map((item: string) => (
              <Grid item xs={12} md={4} key={item}>
                <PropertyDetailsCheckbox value={item || '-'} />
              </Grid>
            ))}
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={'semiBold'}>
              Outdoor Details
            </Typography>
          </Grid>
          {data.outdoor_details.length > 0 &&
            data.outdoor_details.map((item: string) => (
              <Grid item xs={12} md={4} key={item}>
                <PropertyDetailsCheckbox value={item || '-'} />
              </Grid>
            ))}
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={'semiBold'}>
              utilities Details
            </Typography>
          </Grid>
          {data.utilities.length > 0 &&
            data.utilities.map((item: string) => (
              <Grid item xs={12} md={4} key={item}>
                <PropertyDetailsCheckbox value={item || '-'} />
              </Grid>
            ))}
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={'semiBold'}>
              Other Features
            </Typography>
          </Grid>
          {data.other_features.length > 0 &&
            data.other_features.map((item: string) => (
              <Grid item xs={12} md={4} key={item}>
                <PropertyDetailsCheckbox value={item || '-'} />
              </Grid>
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
