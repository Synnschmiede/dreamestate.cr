import { Button, Stack } from '@mui/material';
import Link from 'next/link';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

export default function PropertyView() {
  return (
    <DashboardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <CustomBreadcrumbs
          heading="Property"
          links={[{ name: 'Home', href: paths.dashboard.root }, { name: 'Property' }]}
        />
        <Link href={paths.dashboard.add_property}>
          <Button variant="contained">Add Property</Button>
        </Link>
      </Stack>
    </DashboardContent>
  );
}
