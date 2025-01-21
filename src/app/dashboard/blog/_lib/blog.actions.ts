import { toast } from 'sonner';
import { api } from 'src/utils/axios';
import { IBlogDefaultValue } from "./blog.types";

export const createBlogAsync = async (data: IBlogDefaultValue) => {
    try {
        const blogData: Record<string, any> = { ...data };
        if (data?.tags.length) {
            blogData.tags = data.tags.join(",");
        }
        let res = await api.post(`/blog/post`, blogData);
        if (!res.data.success) return;
        toast.success(res.data.message);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        return {
            success: false,
            error: error.response ? error.response.data : 'An unknown error occurred',
        };
    }
};