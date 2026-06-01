import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const fetchToday    = ()         => api.get('/today/');
export const fetchBanners  = ()         => api.get('/banners/');
export const postDailyMenu = (data)     => api.post('/daily-menus/', data);

export default api;