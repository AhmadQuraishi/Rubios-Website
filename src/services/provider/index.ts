import { store } from "../../redux/store";
import axiosInterceptor from "../../services/axiosInceptor";


export const getProviderToken = async (): Promise<any> => {
  const authtoken = store.getState().TokensReducer.providertoken;
  const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}&access_token=${authtoken}`;
  return axiosInterceptor.get(url, {});
};