import { store } from "../../redux/store";
import axiosInterceptor from "../../services/axiosInceptor";
import axios from 'axios';

export const getProviderToken = async (): Promise<any> => {
  // const authtoken = store.getState().TokensReducer.providertoken;
  const authtoken = store.getState().tokenReducer.accessToken.access_token;
  const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}&access_token=${authtoken}`;
  return axios.get(url);
};
