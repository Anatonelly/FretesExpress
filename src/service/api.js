import axios from 'axios';

import { API } from '@/config/app';

export const api = axios.create({
  baseURL: API,
});
