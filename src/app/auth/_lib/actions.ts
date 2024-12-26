import { toast } from 'sonner';
import { api, publicApi } from 'src/utils/axios';
import { IRegisterUser } from './types';

export const forgotPasswordAsync = async (data: any, step: number) => {
  try {
    if (step === 1) {
      const res = await publicApi.post(`/auth/forgot-password`, { email: data.email });
      // if (!res.data.success) return;
      toast.success(res.data.message);
      return { success: true, data: res.data.data };
    } else if (step === 2) {
      const res = await publicApi.post(`/auth/forgot-password`, {
        email: data.email,
        otp: Number(data.otp),
        new_password: data.new_password,
      });
      // if (!res.data.success) return;
      toast.success(res.data.message);
      return { success: true, data: res.data.data };
    }
  } catch (error) {
    console.error('API Error:', error);
    toast.error(error.response.data.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const createUser = async (data: IRegisterUser, isPublicRegistration = false) => {
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
    toast.error(error.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};
