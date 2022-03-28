import axiosInstance from "../axiosInceptor";

  export const requestRewards = () => {
    try {
      const url = `${process.env.REACT_APP_PUNCHH_API}/api2/mobile/users/balance?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}`;
      return axiosInstance.get(url).then((response) => response.data);
    } catch (error) {
      throw error;
    }
  };
