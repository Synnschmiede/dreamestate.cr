import { CONFIG } from 'src/config-global';
import { BlogView } from './blog-view';


// ----------------------------------------------------------------------

export const metadata = { title: `Blog | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <BlogView />;
}
