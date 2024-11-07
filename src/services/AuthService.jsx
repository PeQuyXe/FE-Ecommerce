import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const register = async (fullname, email, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    fullname,
    email,
    password,
  });
  return response.data;
};

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, null, {
    params: {
      email,
      password,
    },
  });
  return response.data;
};

const refreshToken = async (refreshToken) => {
  const response = await axios.post(`${API_URL}/refresh-token`, null, {
    params: {
      refreshToken,
    },
  });
  return response.data;
};

export default {
  register,
  login,
  refreshToken,
};
