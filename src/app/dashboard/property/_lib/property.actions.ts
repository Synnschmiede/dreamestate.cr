import { toast } from 'sonner';
import { api } from 'src/utils/axios';
import { getSearchQuery, IQueryParamsProps } from 'src/utils/helper';
import { IProperty } from './property.types';

export const getProperty = async (queryParams: IQueryParamsProps) => {
  try {
    const searchQuery = getSearchQuery(queryParams);
    const res = await api.get(`/property${searchQuery}`);
    return { success: true, data: res.data.data, totalRecords: res.data.meta.total };
  } catch (error) {
    toast.error(error.message);
    return {
      success: false,
      error: error.response ? error.response.data : 'An unknown error occurred',
    };
  }
};

export const createPropertyAsync = async (data: IProperty) => {
  try {
    const { created_at, updated_at, status, feature_image, images, ...rest } = data;
    let formData = new FormData();

    if (feature_image) {
      formData.append('feature_image', feature_image);
    }

    if (images && Array.isArray(images)) {
      images.forEach((image, index) => {
        formData.append(`images`, image);
      });
    }

    formData.append('data', JSON.stringify(rest));

    let res = await api.post(`/property/add-property`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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

// export const updateUserData = async (data) => {
//   try {
//     const payload = {
//       role: data.role,
//       is_deleted: data.is_deleted,
//       status: data.status,
//       contact_number: data.contact_number,
//     };
//     const res = await api.patch(`/user/update-user/${data.id}`, payload);
//     toast.success(res.data.message);
//     return { success: true, data: res.data.data };
//   } catch (error) {
//     toast.error(error.response.data.message);
//     return {
//       success: false,
//       error: error.response ? error.response.data : 'An unknown error occurred',
//     };
//   }
// };
