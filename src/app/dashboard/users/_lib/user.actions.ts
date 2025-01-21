import { toast } from 'sonner';
import { api, publicApi } from 'src/utils/axios';
import { getSearchQuery, IQueryParamsProps } from 'src/utils/helper';
import { IUpdateUser, IUser } from './user.types';

export const getUsersAsync = async (queryParams: IQueryParamsProps) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/user${searchQuery}`);
    return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.response.data.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const createUserAsync = async (data: IUser, isPublicRegistration = false) => {
  try {
    const { confirm_password, status, ...rest } = data;
    let res;
    if (isPublicRegistration) {
      res = await publicApi.post(`/auth/create-user`, rest);
    } else {
      res = await api.post(`/auth/create-user`, rest);
    }
    if (!res.data.success) return;
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const updateUserAsync = async (data: IUpdateUser) => {
  try {
    const payload = {
      role: data.role,
      is_deleted: data.is_deleted,
      status: data.status,
      contact_number: data.contact_number,
    };
    const res = await api.patch(`/user/update-user/${data.id}`, payload);
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    toast.error(error.response.data.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};
