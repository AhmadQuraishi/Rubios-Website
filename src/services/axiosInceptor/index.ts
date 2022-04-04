import axios from "axios";
import { store } from "../../redux/store";
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  function (config) {
    try {
      
        const url = config.url || '';
        let check = url?.toString().includes('punchh_api');
        let mobile = url?.toString().includes('mobile');

        if (check) {
          if (mobile)
          {
            config.headers = {
             'Authorization': `Bearer ${store.getState().providerReducer.providerToken.access_token}`,
             'punchh-app-device-id' : 'sasewqee234324'
            };
          }
        }
        return config;
      } catch (e) {
        throw e;
      }
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;