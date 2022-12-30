import axios from 'axios';
import { store } from '../../redux/store';
import { generateDeviceId } from '../../helpers/common';
const axiosInstance = axios.create();

const withoutTokenEndpoints = [
  'api/auth/customers/sign_in',
  'api/auth/customers.json',
  'api/auth/users/forgot_password',
  'api/auth/users/change_password',
  'api/auth/users/connect_with_facebook',
];
axiosInstance.interceptors.request.use(
  function (config) {
    try {
      const punchhId: string = 'punchh-app-device-id'
      const url = config.url || '';
      let isPunchhApi = url?.toString().includes('punchh_api');
      // let mobile = url?.toString().includes('mobile')
      if (isPunchhApi) {
        // if (mobile) {

        let endpoint: any = url?.toString().split('punchh_api/');

        endpoint = endpoint[1];

        if (!withoutTokenEndpoints.includes(endpoint)) {
          config.headers = {
            Authorization: `Bearer ${
              store.getState().providerReducer.providerToken.access_token
            }`,
          };
        }
        const deviceId: string = store.getState().authReducer.deviceId
          ? store.getState().authReducer.deviceId
          : generateDeviceId();

        if (deviceId && config && config.headers) {
          config.headers[punchhId] = deviceId;
        }

        // config.headers = {
        //   ...config.headers,
        //   'punchh-app-device-id': deviceId,
        // };

        // console.log('working 2');

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
