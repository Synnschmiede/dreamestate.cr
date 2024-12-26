// ./src/app/(home)/properties/page.tsx
import { Box, Container } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { CONFIG } from 'src/config-global';
import { PropertiesView } from './properties-view';

export const metadata = {
  title: `${CONFIG.appName} | Properties`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Record<string, any>;
}) {
  const queryString = new URLSearchParams(searchParams).toString();
  console.log(queryString);
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/property?${queryString}`, {
    cache: 'no-cache',
  });
  const properties = await res.json();

  return (
    <Box sx={{ background: '#f8f8f8', py: { xs: 4, md: 6 } }}>
      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Our Properties"
          links={[{ name: 'Home', href: '/' }, { name: 'Properties' }]}
          sx={{ mb: 2 }}
        />
        <PropertiesView properties={properties.data} />
      </Container>
    </Box>
  );
}
