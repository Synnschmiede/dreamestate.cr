import { CONFIG } from 'src/config-global';
import { FeatureAndTagView } from './feature-and-tag-view';


// ----------------------------------------------------------------------

export const metadata = { title: `Blog | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return <FeatureAndTagView />;
}
