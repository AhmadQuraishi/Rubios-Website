import { store } from '../../../redux/store';
import axiosInstance from '../../axiosInceptor';

export const requestRewardRedemptionCode = (id: string) => {
  const body = {
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
    reward_id: id,
  };
  try {
    const authentication_token =
      store.getState().providerReducer.providerToken.authentication_token;

    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/redemptions?authentication_token=${authentication_token}`;
    return axiosInstance
      .post(url, body)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};

export const requestRedeemableRedemptionCode = (id: number) => {
  const body = {
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
    redeemable_id: id,
  };
  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api2/mobile/redemptions/redeemable`;
    return axiosInstance
      .post(url, body)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};
