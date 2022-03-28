
import axiosInstance from "../axiosInceptor";


export const requestCreateCheckIn = (code: string) => {
    const body = {
      bar_code: code,
        client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
      }
      try {
        const url = `${process.env.REACT_APP_PUNCHH_API}/api2/mobile/checkins/barcode`;
        return axiosInstance.post(url, body).then((response) => response.data).catch((error) => {
          throw error;   
        });
    
      } catch (error) {
       
        throw error;
      }
};