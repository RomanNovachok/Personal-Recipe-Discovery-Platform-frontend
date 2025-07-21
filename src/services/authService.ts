import axios from 'axios';

const API = import.meta.env.VITE_API_URL + '/auth';

export const register = async (email: string, password: string) => {
  const response = await axios.post(`${API}/register`, { email, password });
  return response.data;
};

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API}/login`, { email, password });
  return response.data; // має повертати { access_token: string }
};
