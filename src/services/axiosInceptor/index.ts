import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;

