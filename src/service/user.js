import { api } from '@/service/api';

const BASE_URL = '/user';

export const getAllUser = async () => api.get(`${BASE_URL}`);

export const getUserById = async (id) => api.get(`${BASE_URL}/${id}`);

export const getScore = async () => api.get(`${BASE_URL}Score`);

export const getScoreBet = async (data_inicial, data_final) =>
  api.get(
    `${BASE_URL}ScoreBet?data_inicial=${data_inicial}&data_final=${data_final}`
  );

export const getScoreDate = async (data_inicial) =>
  api.get(`${BASE_URL}ScoreDate?data_inicial=${data_inicial}`);
