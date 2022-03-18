import { store } from "../../../redux/store";
import axiosInstance from "../../axiosInceptor";

export const requestRedemptionCode = (id: string) => {
    const body = {
      reward_id: id,
      client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
      }
  try {
    const authentication_token = store.getState().providerReducer.providerToken.authentication_token;

        const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/redemptions?${authentication_token}`;
        return axiosInstance.post(url, body).then((response) => response.data).catch((error) => {
          throw error.response;   
        });
    
      } catch (error) {
       
        throw error;
      }
};