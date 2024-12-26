import { toast } from 'sonner';
import { api } from 'src/utils/axios';
import { IProfile, IResetPassword } from './types';
import { RestartAlt } from '@mui/icons-material';

export const getProfileData = async () => {
  try {
    const res = await api.get(`/user/profile`);
    return { success: true, data: res.data.data };
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const updateProfileData = async (data: IProfile) => {
  const { profile_pic, ...rest } = data;
  console.log(data, 'data....');
  let formData = new FormData();
  if (data.profile_pic) {
    formData.append('profile_pic', profile_pic);
  }
  formData.append('data', JSON.stringify(rest));

  try {
    const res = await api.patch(`/user/update-profile`, { profile_pic: formData, data: {} });
    toast.success(res.data.message);
    return { success: true, data: res.data.data };
  } catch (error) {
    console.error('Error updating profile data:', error);
    toast.error(error.response.data.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const resetPasswordAsync = async (data: IResetPassword) => {
  try {
    const { confirmPassword, ...rest } = data;
    const res = await api.post(`/auth/reset-password`, rest);
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
