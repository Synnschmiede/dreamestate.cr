import { CONFIG } from 'src/config-global';

import PropertyView from './property-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Property | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PropertyView />;
}