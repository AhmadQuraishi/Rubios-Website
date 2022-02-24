import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
    function (config) {
      const url = config.url || '';
      let check = url?.toString().includes('/sandbox.punchh.com/api/');
      if (check) {
        var uri = new URL(url?.toString());
        const body = config.data;
        let uriData = uri.pathname.concat(uri.search);
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
        const signature = CryptoJS.HmacSHA1(
         concatString,
          secretString,
        ).toString();
        config.headers = {
          'X-Forwarded-For': signature
        };
      }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
