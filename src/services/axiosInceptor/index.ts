import axios from 'axios';
import { store } from '../../redux/store';
import { generateDeviceId } from '../../helpers/common';
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  function (config) {
    try {
      const url = config.url || '';
      let isPunchhApi = url?.toString().includes('punchh_api');
      // let mobile = url?.toString().includes('mobile')
      if (isPunchhApi && !url.includes('api/auth/customers/sign_in')) {
        // if (mobile) {

        const deviceId = store.getState().authReducer.deviceId
          ? store.getState().authReducer.deviceId
          : generateDeviceId();
        console.log('deviceId', deviceId);
        config.headers = {
          Authorization: `Bearer ${
            store.getState().providerReducer.providerToken.access_token
          }`,
          'punchh-app-device-id': deviceId,
        };

        // }
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
