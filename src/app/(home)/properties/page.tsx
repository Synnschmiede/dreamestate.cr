import { Container } from '@mui/material';

import { CONFIG } from 'src/config-global';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import { FilterToolbar } from './_components/filter-toolbar';

export const metadata = {
  title: `${CONFIG.appName} | Properties`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

const PropertiesPage = () => {
  return (
    <Container maxWidth="xl">
      <CustomBreadcrumbs
        heading="Our Properties"
        links={[{ name: 'Home', href: '/' }, { name: 'Properties' }]}
      />
      <FilterToolbar />
      content
    </Container>
  );
};

export default PropertiesPage;
