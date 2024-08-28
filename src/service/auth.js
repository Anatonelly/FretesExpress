import { api } from '@/service/api';

const BASE_URL = '/login';

export const tryLogin = async (email, senha) => {
  const response = await api.post(`${BASE_URL}`, { email, senha });
  return response.data;
};

export const checkAuth = async () => {
  const response = await api.get(`/checkAuth`, {
    headers: {
      'access-token': localStorage.getItem('token'), // Assuming token is stored in localStorage
    },
  });
  return response.data;
};
