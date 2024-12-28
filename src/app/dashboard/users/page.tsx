import { CONFIG } from 'src/config-global';
import { UserView } from './user-view';

export const metadata = { title: `Users | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <UserView />;
}
