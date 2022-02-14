import axios from 'axios';

//profile
export const RequestUserProfile = () => {
  try {
    const access_token =
      'ede0074cdd8df2f60ff81037cae9358ca9cdf9030c1698d5d3709b65456ce2c1';

    const url = `https://sandbox.punchh.com/api/auth/users?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}&access_token=${access_token}`;

    return axios(url).then((response) => response.data);
  } catch (error) {
    throw error;
  }
};

//Recent Orders
export const requestUserRecentOrders = (authtoken: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API_URL || '';
    return axios
      .get(url + `users/${authtoken}/recentorders`, {
        headers: {
          Authorization: `OloKey ElwEkgDhuasD9HydkYI2kp3Hs0EWPkR2`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

//Favorite Orders
export const requestUserFavoriteOrders = (authtoken: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API_URL || '';
    return axios
      .get(url + `users/${authtoken}/faves`, {
        headers: {
          Authorization: `OloKey ElwEkgDhuasD9HydkYI2kp3Hs0EWPkR2`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

//Delivery Addresses
export const requestUserDeliiveryAddresses = (authtoken: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API_URL || '';
    return axios
      .get(url + `users/${authtoken}/userdeliveryaddresses`, {
        headers: {
          Authorization: `OloKey ElwEkgDhuasD9HydkYI2kp3Hs0EWPkR2`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

//Set Default Delivery Address
export const requestSetUserDefDelAddress = (body: RequestUserDefaultAddress, authtoken: string) => {

  try {
    const url = process.env.REACT_APP_OLO_API_URL || '';
    return axios
      .put(url + `users/${authtoken}/userdeliveryaddresses/default`, body, {
        headers: {
          Authorization: `OloKey ElwEkgDhuasD9HydkYI2kp3Hs0EWPkR2`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }

}
//Delete User Delivery address

export const requestDelUserDelAddress = (addressid: number, authtoken: string) => {

  try {
    const url = process.env.REACT_APP_OLO_API_URL || '';
    return axios
      .delete(url + `users/${authtoken}/userdeliveryaddresses/${addressid}`, {
        headers: {
          Authorization: `OloKey ElwEkgDhuasD9HydkYI2kp3Hs0EWPkR2`,
        },
      })
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }

}