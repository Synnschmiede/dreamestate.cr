// ./src/app/(home)/properties/page.tsx
import { Box, Container } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { CONFIG } from 'src/config-global';
import { PropertiesView } from './properties-view';
import { IProperty } from './_lib/property.interface';

export const metadata = {
  title: `${CONFIG.appName} | Properties`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertiesPage() {
  const res = await fetch('http://localhost:5005/api/v1/property', { cache: 'no-cache' });
  const properties = await res.json();
  console.log('Property data: ', properties);

  return (
    <Box sx={{ background: '#f8f8f8', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Our Properties"
          links={[{ name: 'Home', href: '/' }, { name: 'Properties' }]}
          sx={{ mb: 2 }}
        />
        <PropertiesView properties={properties} />
      </Container>
    </Box>
  );
}
