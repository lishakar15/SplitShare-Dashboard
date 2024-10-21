import axios from 'axios';

const axiosInstance = axios.create({
  //baseURL: 'http://localhost:8085',
});

axiosInstance.interceptors.request.use(
  (config) => {

    if (!config.headers.AUTHORIZATION) { //Adding this to prevent invite token from overriding
      const token = localStorage.getItem('jwtToken');//Get JWT token from storage

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      //Clear existing JWT token and user data from storage
      localStorage.setItem("jwtToken", "");
      localStorage.setItem("userData", null);
      // Redirect to login page
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;