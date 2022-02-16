
import axios from 'axios';
import CryptoJS from 'crypto-js';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
    function (config) {
      debugger
let obj = {
  "seconds_to_expire": 2344440,
  "revoked_at": "2022-02-15T11:mm:ssZ",
  "refresh_token": "string",
}
console.log(obj.seconds_to_expire)
//refresh token check 


      const url = config.url || '';
      let check = url?.toString().includes('/sandbox.punchh.com/api/');
      if (check) {
        var uri = new URL(url?.toString());
        const body = config.data;
        let uriData = uri.pathname.concat(uri.search);
        let secret = process.env.REACT_APP_PUNCHH_CLIENT_SECRET || '';
        let secretString = secret.toString();
        let concatString ='';
        if(body === undefined){
          concatString = uriData;
        }
        else{
          concatString = uriData.concat(JSON.stringify(body));
        }
        const signature = CryptoJS.HmacSHA1(
         concatString,
          secretString,
        ).toString();
        config.headers = {
          'x-pch-digest': signature,
        };
      }
  
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  export default axiosInstance;