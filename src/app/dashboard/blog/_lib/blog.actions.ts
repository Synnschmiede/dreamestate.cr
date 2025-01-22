import { toast } from 'sonner';
import { TQueryParams } from 'src/types/common';
import { api } from 'src/utils/axios';
import { queryParamsFormatter } from 'src/utils/helper';
import { IBlogDefaultValue } from "./blog.types";

export const getBlogs = async (queryParams: TQueryParams) => {
    try {
        let queryString = '';
        if (queryParams) {
            queryString = queryParamsFormatter(queryParams)
        }
        const res = await api.get(`/blog/posts?${queryString}`);
        return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        return {
            success: false,
            error: error.response ? error.response.data : 'An unknown error occurred',
        };
    }
};

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

export const updateBlogAsync = async (id: string, data: IBlogDefaultValue | Record<string, any>) => {
    try {
        const blogData: Record<string, any> = { ...data };
        if (data?.tags?.length) {
            blogData.tags = data.tags.join(",");
        }
        let res = await api.patch(`/blog/post/${id}`, blogData);
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