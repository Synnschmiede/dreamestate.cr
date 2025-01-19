import { Stack } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

export default function BlogAddView() {
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
            {/* blog form */}
        </DashboardContent>
    );
}
