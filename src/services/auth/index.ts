import { store } from '../../redux/store';
import axiosInterceptor from '../../services/axiosInceptor';

export const getAuthToken = async (basketID: string = ''): Promise<any> => {
  const providertoken =
    store.getState().providerReducer.providerToken.access_token;
  const provideruserid =
    store.getState().providerReducer.providerToken.authentication_token;
  const email = store.getState().providerReducer.providerToken.email;
  // const number = store.getState().providerReducer.providerToken.authentication_token;
  const fName = store.getState().providerReducer.providerToken.first_name;
  const lName = store.getState().providerReducer.providerToken.last_name;

  const url = process.env.REACT_APP_OLO_API + `/users/getorcreate`;
  return axiosInterceptor.post(
    url,
    {
      provider: 'punchh',
      providertoken: providertoken,
      provideruserid: provideruserid,
      firstname: fName,
      lastname: lName,
      emailaddress: email,
      basketid: basketID,
    },
    {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Device-Id': ' a4b5cda8-d52b-11eb-b8bc-0242ac130003',
      },
    },
  );
};
