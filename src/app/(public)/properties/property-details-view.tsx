import { Container, Grid, Stack, Typography } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { ContactForm } from 'src/components/form-components/contact-form';
import { currencyFormatter } from 'src/utils/currency-view';
import { PropertyDetailsAddress } from './_components/property-details-address';
import { PropertyDetailsDescription } from './_components/property-details-description';
import { PropertyDetailsDetails } from './_components/property-details-details';
import { PropertyDetailsFeature } from './_components/property-details-feature';
import { PropertyDetailsImageCarousel } from './_components/property-details-image-carousel';
import { PropertyDetailsOverview } from './_components/property-details-overview';
import { IProperty } from './_lib/property.interface';

export const PropertyDetailsView = ({ data, slug }: { data: IProperty; slug: string }) => {
  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <CustomBreadcrumbs
            heading={`${data?.title}`}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Properties', href: '/properties' },
              { name: slug || '' },
            ]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack
            direction={'column'}
            justifyContent="end"
            alignItems={{ md: 'end', xs: 'start' }}
            sx={{ height: '100%' }}
          >
            {
              data?.property_details?.property_lot_size && (
                <Typography variant="h6" color="primary">
                  {data.property_details.property_lot_size} sqft
                </Typography>
              )
            }
            <Typography variant="h4" color="primary">
              {currencyFormatter(data?.price)}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ my: { xs: 1, md: 2 } }}>
        {/* property details */}
        <Grid item xs={12} md={8}>
          <PropertyDetailsImageCarousel images={data?.images || []} />
          <PropertyDetailsOverview data={data?.property_details} updated_on={data?.updated_at} />
          <PropertyDetailsDescription data={data?.description || ''} />
          <PropertyDetailsAddress data={data?.location} />
          <PropertyDetailsDetails data={data?.property_details} />
          <PropertyDetailsFeature data={data?.features} />
        </Grid>
        {/* sidebar */}
        <Grid item xs={12} md={4}>
          <ContactForm author={data?.uploaded_by} />
        </Grid>
      </Grid>
    </Container>
  );
};
