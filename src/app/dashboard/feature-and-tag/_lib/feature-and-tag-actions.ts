import { toast } from 'sonner';
import { TQueryParams } from 'src/types/common';
import { api } from 'src/utils/axios';
import { queryParamsFormatter } from 'src/utils/helper';

export const getUtilities = async () => {
    try {
        const res = await api.get(`/utility`);
        return { success: true, data: res.data.data };
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        return {
            success: false,
            error: error.response ? error.response.data : 'An unknown error occurred',
        };
    }
};

export const addFeatureGroupAsync = async (data: { name: string }) => {
    try {
        let res = await api.post(`/feature/add-feature-group`, data);
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

export const updateFeatureGroupAsync = async (id: string, data: { name: string } | Record<string, any>) => {
    try {
        let res = await api.patch(`/feature/feature-group/${id}`, data);
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

export const deleteFeatureGroupAsync = async (id: string) => {
    try {
        let res = await api.delete(`/feature/delete-group/${id}`);
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

export const addFeatureAsync = async (data: { name: string; feature_group_id: string }) => {
    try {
        let res = await api.post(`/feature/add-feature`, data);
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

export const getFeatures = async (queryParams: TQueryParams) => {
    try {
        let queryString = '';
        if (queryParams) {
            queryString = queryParamsFormatter(queryParams)
        }
        const res = await api.get(`/feature?${queryString}`);
        return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
        return {
            success: false,
            error: error.response ? error.response.data : 'An unknown error occurred',
        };
    }
};

export const updateFeatureAsync = async (id: string, data: { name: string; feature_group_id: string } | Record<string, any>) => {
    try {
        let res = await api.patch(`/feature/${id}`, data);
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

export const deleteFeatureAsync = async (ids: string[]) => {
    try {
        let res = await api.delete(`/feature/delete-features`, {
            data: { ids }
        });
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

export const addTagAsync = async (data: { name: string; }) => {
    try {
        let res = await api.post(`/utility/add-tag`, data);
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

export const updateTagAsync = async (id: string, data: { name: string; } | Record<string, any>) => {
    try {
        let res = await api.patch(`/utility/tag/${id}`, data);
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

export const deleteTagAsync = async (ids: string[]) => {
    try {
        let res = await api.delete(`/utility/delete-tags`, {
            data: { ids }
        });
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