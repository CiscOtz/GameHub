import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const register = (name, age, email, phoneNumber, password, payMethods) => {
  return axios.post(`${API_URL}/users/register`, {
    name,
    age,
    email,
    phoneNumber,
    password,
    payMethods
  });
};

const login = (email, password) => {
  return axios.post(`${API_URL}/users/login`, {
    email,
    password
  });
};

const logout = () => {
  return axios.post(`${API_URL}/users/logout`);
};

const getProfile = () => {
  return axios.get(`${API_URL}/users/profile`, { withCredentials: true });
};

const authService = {
  register,
  login,
  logout,
  getProfile
};

export default authService;
