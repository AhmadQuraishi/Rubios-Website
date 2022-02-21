import { store } from "../../redux/store";
import axiosInterceptor from "../../services/axiosInceptor";


export const getAuthToken = async (): Promise<any> => {

  const providertoken = store.getState().TokensReducer.providertoken;
  const provideruserid = store.getState().TokensReducer.providertoken;
  debugger
  const url = process.env.REACT_APP_OLO_API + `/users/getorcreate`;
  return axiosInterceptor.post(url, {
      "provider": "punchh",
      "providertoken": providertoken,
      "provideruserid": provideruserid,
      "contactnumber": "15055555555",
      "firstname": "Ron",
      "lastname": "Idaho",
      "emailaddress": "ron@example.com"
    },
    {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "DonutApp/v2",
        "X-Device-Id": " a4b5cda8-d52b-11eb-b8bc-0242ac130003"
      }
    });
};
