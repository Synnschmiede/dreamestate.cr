import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export const metadata = { title: `Users | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <DashboardContent>Todo: Users list view almost done. will be added here. </DashboardContent>
  );
}
