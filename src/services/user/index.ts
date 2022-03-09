import axios from "axios";
import { store } from "../../redux/store";
import axiosInstance from "../axiosInceptor";
import { ResponseContactOptions} from '../../types/olo-api';

//profile
export const RequestUserProfile = () => {
  try {
    const access_token =
    process.env.REACT_APP_ACCESS_TOKEN  ? process.env.REACT_APP_ACCESS_TOKEN : store.getState().tokenReducer.accessToken.access_token
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
    authentication_token: process.env.REACT_APP_AUTHENTICATION_TOKEN  ? process.env.REACT_APP_AUTHENTICATION_TOKEN : store.getState().providerReducer.providerToken.authentication_token
  }

  //  console.log(store.getState().TokensReducer.providertoken);
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
    authentication_token: process.env.REACT_APP_AUTHENTICATION_TOKEN  ? process.env.REACT_APP_AUTHENTICATION_TOKEN : store.getState().providerReducer.providerToken.authentication_token
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

export const updateUserContactOptions = (authtoken: string, body: ResponseContactOptions) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    return axiosInstance
      .put(url + `/users/${authtoken}/contactoptions`, body)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error.response);
        throw error;
      });
  } catch (error) {
    throw error;
  }
}

//User Login
export const requestUserLogin = (body: object) => {

  const data = {
    user: body,
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID
  }

  console.log('obj api', data)

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/customers/sign_in`;

    const config = {
      headers: {
        Authorization : "BasicCustom"
      }
    }
    return axiosInstance.post(url, data, config).then((response) => response.data).catch((error) => {
      throw error.response;
    });
  } catch (error) {
    throw error;
  }
};
