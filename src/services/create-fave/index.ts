import axios from 'axios';
import { store } from '../../redux/store';

export const requestCreateFave = (body: RequestNewFave) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
    return axios
      .post(url + `/users/${authtoken}/faves`, body)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    throw error;
  }
};
