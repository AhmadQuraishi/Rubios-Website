import axios from "axios";
import { store } from "../../redux/store";


  export const RequestRedeemRewards = () => {
    try {
      const access_token =
      process.env.REACT_APP_ACCESS_TOKEN  ? process.env.REACT_APP_ACCESS_TOKEN : store.getState().tokenReducer.accessToken.access_token
      const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/offers?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}&access_token=${access_token}`;
      return axios.get(url).then((response) => response.data);
    } catch (error) {
      throw error;
    }
  };
