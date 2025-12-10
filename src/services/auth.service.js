import api from './api';

export const loginService = async (credentials) => {
  // credentials = { username: "admin", password: "..." }
  const response = await api.post('/auth/login', credentials);
  return response.data; 
};