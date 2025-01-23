import { CONFIG } from 'src/config-global';
import BlogAddView from './blog-add-view';

// ----------------------------------------------------------------------

export const metadata = { title: `New Post | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return <BlogAddView />;
}
