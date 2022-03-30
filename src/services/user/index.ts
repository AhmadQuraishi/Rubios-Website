import { store } from "../../redux/store";
import axiosInstance from "../axiosInceptor";
import { ResponseContactOptions} from '../../types/olo-api';

//profile
export const RequestUserProfile = () => {
  try {
    const access_token = store.getState().providerReducer.providerToken.access_token
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
    authentication_token: store.getState().providerReducer.providerToken.authentication_token
  }
  try {

    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users`;

    return axiosInstance.put(url, obj).then((response) => response.data).catch((error) => {
      throw error.response;
    });

  } catch (error) {
    throw error;
  }
};


//Update user profile from Profile Screen
export const requestUpdateProfile = (body: object) => {
  const obj = {
    user: body,
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
  }

  try {

    const url = `${process.env.REACT_APP_PUNCHH_API}/api2/mobile/users`;
    return axiosInstance.put(url, obj).then((response) => response.data).catch((error) => {
       console.log(error.response.data.errors);
      throw error.response.data.errors;
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
    authentication_token: store.getState().providerReducer.providerToken.authentication_token
  }

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
export const requestUserRecentOrders = () => {
  try {
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
export const requestUserFavoriteOrders = () => {
  try {
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
    const authtoken =  store.getState().authReducer.authToken.authtoken
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
export const requestUserDeliiveryAddresses = () => {
  try {
    
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
export const requestSetUserDefDelAddress = (body: RequestUserDefaultAddress) => {

  try {
    const url = process.env.REACT_APP_OLO_API || "";
    const authtoken = store.getState().authReducer.authToken.authtoken;
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

export const requestDelUserDelAddress = (addressid: number) => {

  try {
    const url = process.env.REACT_APP_OLO_API || "";
    const authtoken = store.getState().authReducer.authToken.authtoken;
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

export const requestUserBillingAccount = () => {

  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken =  process.env.REACT_APP_AUTH_TOKEN  ? process.env.REACT_APP_AUTH_TOKEN : store.getState().authReducer.authToken.authtoken
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

export const requestUserBillingAccountById = (billingAccountId: number) => {

  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken =  process.env.REACT_APP_AUTH_TOKEN  ? process.env.REACT_APP_AUTH_TOKEN : store.getState().authReducer.authToken.authtoken
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

export const deleteUserBillingAccount = ( billingAccountId: number) => {

  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken =  process.env.REACT_APP_AUTH_TOKEN  ? process.env.REACT_APP_AUTH_TOKEN : store.getState().authReducer.authToken.authtoken
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
export const updateUserBillingAccount = (body: RequestUserDefaultBillingAccount, billingAccountId: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken =  process.env.REACT_APP_AUTH_TOKEN  ? process.env.REACT_APP_AUTH_TOKEN : store.getState().authReducer.authToken.authtoken
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

export const requestUseGiftCards = () => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken =  process.env.REACT_APP_AUTH_TOKEN  ? process.env.REACT_APP_AUTH_TOKEN : store.getState().authReducer.authToken.authtoken
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

export const updateUserContactOptions = ( body: ResponseContactOptions) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken =  process.env.REACT_APP_AUTH_TOKEN  ? process.env.REACT_APP_AUTH_TOKEN : store.getState().authReducer.authToken.authtoken
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

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/customers/sign_in`;

    return axiosInstance.post(url, data).then((response) => response.data).catch((error) => {
      throw error.response;
    });
  } catch (error) {
    throw error;
  }
};


//User Register
export const requestUserRegister = (body: object) => {

  const data = {
    user: body,
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID
  }

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/customers.json`;

    return axiosInstance.post(url, data).then((response) => response.data).catch((error) => {
      throw error.response;
    });
  } catch (error) {
    throw error;
  }
};

//User Forgot Password
export const requestUserForgotPassword = (body: object) => {

  const data = {
    user: body,
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID
  }

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users/forgot_password`;

    return axiosInstance.post(url, data).then((response) => response.data).catch((error) => {
      throw error.response;
    });
  } catch (error) {
    throw error;
  }
};