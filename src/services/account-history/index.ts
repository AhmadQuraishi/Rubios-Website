
import axiosInstance from "../axiosInceptor";


export const requestAccountHistory = ( ) => {
    // const body = {
    //     client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
    //   }
      try {
        const url = `${process.env.REACT_APP_PUNCHH_API}/api2/mobile/users/account_history?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}`;
        return axiosInstance.get(url).then((response) => response.data).catch((error) => {
          throw error;   
        });
    
      } catch (error) {
       
        throw error;
      }
};