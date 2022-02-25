import axios from "axios";



  export const RequestRedeemRewards = () => {
    try {
      const access_token =
        'ede0074cdd8df2f60ff81037cae9358ca9cdf9030c1698d5d3709b65456ce2c1';
      const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/offers?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}&access_token=${access_token}`;
      return axios.get(url).then((response) => response.data);
    } catch (error) {
      throw error;
    }
  };
