import { api } from '@/service/api';

const BASE_URL = '/driver';

export const getAllDrivers = async () => api.get(`${BASE_URL}`);

export const getAllUniqueDrivers = async () => api.get(`${BASE_URL}/unique`);

export const getAllDriversWithRoute = async () => {
  return await api.get(`${BASE_URL}s/routes`);
};

export const getDriverById = async (id) => api.get(`${BASE_URL}/${id}`);

export const createDriver = async (formData) =>
  api.post(`${BASE_URL}`, formData, {
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
    },
  });
