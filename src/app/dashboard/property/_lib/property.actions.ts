import { toast } from 'sonner';
import { TQueryParams } from 'src/types/common';
import { api } from 'src/utils/axios';
import { queryParamsFormatter } from 'src/utils/helper';
import { IProperty } from './property.types';

export const getProperty = async (queryParams: TQueryParams) => {
  try {
    let queryString = '';
    if (queryParams) {
      queryString = queryParamsFormatter(queryParams)
    }
    const res = await api.get(`/property?${queryString}`);
    return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const getSingleProperty = async (id: string) => {
  try {
    const res = await api.get(`/property/${id}`);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const createPropertyAsync = async (data: IProperty) => {
  try {
    let res = await api.post(`/property/add-property`, data);
    if (!res.data.success) return;
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const updatePropertyAsync = async (id: string, data: Record<string, any>) => {
  try {
    let res = await api.patch(`/property/update/${id}`, data);
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

export const deletePropertyAsync = async (ids: string[]) => {
  try {
    let res = await api.delete(`/property/delete-properties`, {
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
