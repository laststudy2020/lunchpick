import axios from 'axios';

const api = axios.create({
  baseURL: 'https://lunchpick.onrender.com/api',  // ← 이 부분 변경
});

export const fetchToday    = ()     => api.get('/today/');
export const fetchBanners  = ()     => api.get('/banners/');
export const postDailyMenu = (data) => api.post('/daily-menus/', data);

export default api;