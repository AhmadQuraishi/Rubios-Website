import axiosInstance from '../axiosInceptor';
import { store } from '../../redux/store';
import axios from "axios";

export const requestRewards = () => {
  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api2/mobile/users/balance?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}`;
    return axiosInstance.get(url).then((response) => response.data);
  } catch (error) {
    throw error;
  }
};

export const testingRewards = () => {
  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/checkins/balance?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}`;
    return axiosInstance.get(url).then((response) => response.data);
  } catch (error) {
    throw error;
  }
};

export const testingRedemption = (id: string, points: any) => {
  const body = {
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
    reward_id: id,
    redeemed_points: points,
  };
  try {
    const authentication_token =
      store.getState().providerReducer.providerToken.authentication_token;

    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/redemptions?authentication_token=${authentication_token}`;
    return axios
      .post(url, body)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};
