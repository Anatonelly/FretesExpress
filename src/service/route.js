import { api } from '@/service/api';

const BASE_URL = '/route';

export const getAllRoutes = async () => api.get(`${BASE_URL}`);

export const getRouteById = async (id) => api.get(`${BASE_URL}/${id}`);

export const createRoute = async (origem, destino, motorista_id) => {
  api.post(`${BASE_URL}`, { origem, destino, motorista_id });
};

export const getRouteByOrigem = async (origem) => {
  return await api.get(`${BASE_URL}/origin/${origem}`);
};

export const getRouteByDestino = async (destino) => {
  return await api.get(`${BASE_URL}/destination/${destino}`);
};

export const getRouteByOrigemDestino = async (origem, destino) => {
  return await api.post(`${BASE_URL}/origin/destination`, { origem, destino });
};
