import axios from "axios";
import * as CryptoJS from "crypto-js";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  function (config) {
    try {
    
        const url = config.url || '';
        let origin = window.location.origin; // http://localhost:3000
        let check = url?.toString().includes('punchh_api');
        let mobile = url?.toString().includes('mobile');
        let preppedUrl = url.replace('/punchh_api/', '/');

        if (check) {
          var uri = new URL(preppedUrl?.toString());
          const body = config.data;
          let uriData = uri.pathname.concat(uri.search);
          let secret = process.env.REACT_APP_PUNCHH_CLIENT_SECRET || '';
          let secretString = secret.toString();
          let concatString = '';
          if(body === undefined){
            concatString = uriData;
          }
          else{
            concatString = uriData.concat(JSON.stringify(body));
          }
          if (mobile)
          {
            const signature = CryptoJS.HmacSHA256(concatString, secretString).toString();
            config.headers = {
              'x-pch-digest': signature,
               'Authorization': 'Bearer ede0074cdd8df2f60ff81037cae9358ca9cdf9030c1698d5d3709b65456ce2c1',
             'punchh-app-device-id' : 'sasewqee234324'
            };
          }
          else {
            const signature = CryptoJS.HmacSHA1(concatString, secretString).toString();
            config.headers = {
              'x-pch-digest': signature,
              
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

