import { CONFIG } from 'src/config-global';
import { api } from 'src/utils/axios';
import BlogEditView from './blog-edit-view';


// ----------------------------------------------------------------------

export const metadata = { title: `Edit Post | Dashboard - ${CONFIG.appName}` };

export default async function Page({ params }: { params: Record<string, any> }) {
    const response = await api.get(`/blog/post/${params.id}`);

    return <BlogEditView blog={response?.data?.data} />;
}
