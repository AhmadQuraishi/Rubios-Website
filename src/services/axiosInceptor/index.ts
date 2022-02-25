import axios from "axios";
import * as CryptoJS from "crypto-js";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
    function (config) {
      const url = config.url || '';
      let envUrl = process.env.REACT_APP_PUNCHH_API ||'';
      let checkURL = envUrl+'/api/' ;
      let check = url?.toString().includes(checkURL);
      if (check) {
        var uri = new URL(url?.toString());
        const body = config.data;
        //let uriData = uri.pathname.concat(uri.search);
        var uriData = uri.toString().replace(envUrl,'');
        let secret = process.env.REACT_APP_PUNCHH_CLIENT_SECRET || '';
        let secretString = secret.toString();
        let concatString = '';
        debugger
        if(body === undefined){
          concatString = uriData;
        }
        else{
          concatString = uriData.concat(JSON.stringify(body));
        }
        const signature = CryptoJS.HmacSHA1(concatString,secretString).toString();

        config.headers = {
          'x-pch-digest': signature
        };
      }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
