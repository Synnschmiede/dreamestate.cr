// ./src/app/(home)/properties/page.tsx
import { CONFIG } from 'src/config-global';
import { NotAuthorizedView } from './not-authorized-view';

export const metadata = {
  title: `${CONFIG.appName} | Properties`,
  description:
    'Dreamestate is a real estate trading website that allows users to sell and buy properties.',
};

export default async function PropertiesPage() {
  return <NotAuthorizedView />;
}
