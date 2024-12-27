import { CONFIG } from 'src/config-global';

import PropertyAddView from './property-add-view';

// ----------------------------------------------------------------------

export const metadata = { title: `Property | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <PropertyAddView />;
}
