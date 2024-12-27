import { Button, Stack } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import PropertyManageForm from './components/property-manage-form';

export default function PropertyAddView() {
  return (
    <DashboardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
        <CustomBreadcrumbs
          heading="Add Property"
          links={[
            { name: 'Home', href: paths.dashboard.root },
            { name: 'Property', href: paths.dashboard.property },
            { name: 'Add Property' },
          ]}
        />
      </Stack>
      <PropertyManageForm />
    </DashboardContent>
  );
}
