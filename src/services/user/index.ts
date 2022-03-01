import axios from "axios";
import { store } from "../../redux/store";
import axiosInstance from "../axiosInceptor";
//profile
export const RequestUserProfile = () => {
  try {
    const access_token =
      'ede0074cdd8df2f60ff81037cae9358ca9cdf9030c1698d5d3709b65456ce2c1';
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users?client=${process.env.REACT_APP_PUNCHH_CLIENT_ID}&access_token=${access_token}`;
    return axiosInstance.get(url).then((response) => response.data);
  } catch (error) {
    throw error;
  }
};

//Update user profile
export const requestUpdateUser = (body: object) => {
  const obj = {
    user: body,
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
    authentication_token: "JckRvf5eQoHPFNb8-Uhm"
  }

  // console.log(store.getState().TokensReducer.providertoken);
  try {

    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users`;

    return axiosInstance.put(url, obj).then((response) => response.data).catch((error) => {
      // console.log(error.response);
      throw error.response;
    });

  } catch (error) {
    throw error;
  }
};

//Change Password
export const requestChangePassword = (body: object) => {
  const obj = {
    user: body,
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
    authentication_token: "JckRvf5eQoHPFNb8-Uhm"
  }

  // console.log(store.getState().TokensReducer.providertoken);
  try {

    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users/change_password`;

    return axiosInstance.patch(url, obj).then((response) => response.data).catch((error) => {

      throw error.response;
    });

  } catch (error) {
    throw error;
  }
};


//Recent Orders
export const requestUserRecentOrders = (authtoken: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || "";
    return axiosInstance
      .get(url + `/users/${authtoken}/recentorders`)
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
    const url = process.env.REACT_APP_OLO_API || "";
    return axiosInstance
      .get(url + `/users/${authtoken}/faves`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
};

//DELETE FAV order
export const requestDeleteFavOrder = ( favid: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || "";
    const authtoken = '99aUK4SLSvQwZkmCeM8kSgp6uCPR2KNz';
    return axiosInstance
      .delete(url + `/users/${authtoken}/faves/${favid}`)
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
    // const auth = store.getState().authReducer.authToken.authtoken;
    const url = process.env.REACT_APP_OLO_API || "";
    return axiosInstance
      .get(url + `/users/${authtoken}/userdeliveryaddresses`)
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
    const url = process.env.REACT_APP_OLO_API || "";
    return axiosInstance
      .put(url + `/users/${authtoken}/userdeliveryaddresses/default`, body)
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
    const url = process.env.REACT_APP_OLO_API || "";
    return axiosInstance
      .delete(url + `/users/${authtoken}/userdeliveryaddresses/${addressid}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }

}

//Get User Billing accounts

export const requestUserBillingAccount = (authtoken: string) => {

  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axiosInstance
      .get(url + `/users/${authtoken}/billingaccounts`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}



//Get User Billing account by id (Api not Valid)

export const requestUserBillingAccountById = (authtoken: string, billingAccountId: number) => {

  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axiosInstance
      .get(url + `/users/${authtoken}/billingaccount/${billingAccountId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}


// Delete Billing Account

export const deleteUserBillingAccount = (authtoken: string, billingAccountId: number) => {

  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axiosInstance
      .delete(url + `/users/${authtoken}/billingaccounts/${billingAccountId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

// Update Billing Account
export const updateUserBillingAccount = (body: RequestUserDefaultBillingAccount,authtoken: string, billingAccountId: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axiosInstance
      .put(url + `/users/${authtoken}/creditcards/${billingAccountId}`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}


//Get User Gift Card

export const requestUseGiftCards = (authtoken: string) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axiosInstance
      .get(url + `/users/${authtoken}/billingaccounts/storedvalue`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}
