import { store } from '../../redux/store';
import axiosInstance from '../axiosInceptor';
import { ResponseContactOptions } from '../../types/olo-api';
import axios from 'axios';
import { TableBody } from '@mui/material';
import { generateDeviceId } from '../../helpers/common';

//profile
export const RequestUserProfile = () => {
  try {
    const access_token =
      store.getState().providerReducer.providerToken.access_token;
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
    authentication_token:
      store.getState().providerReducer.providerToken.authentication_token,
  };
  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users`;

    return axiosInstance
      .put(url, obj)
      .then((response) => response.data)
      .catch((error) => {
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
  };

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api2/mobile/users`;
    return axiosInstance
      .put(url, obj)
      .then((response) => response.data)
      .catch((error) => {
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
    authentication_token:
      store.getState().providerReducer.providerToken.authentication_token,
  };

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users/change_password`;
    return axiosInstance
      .patch(url, obj)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};

//Reset Password
export const resetPasswordRequest = (
  body: object,
  reset_password_token: string,
) => {
  const obj = {
    user: body,
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
    reset_password_token: reset_password_token,
  };

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users/change_password`;
    return axiosInstance
      .patch(url, obj)
      .then((response) => response.data)
      .catch((error) => {
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
    const url = process.env.REACT_APP_OLO_API || '';
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
    const url = process.env.REACT_APP_OLO_API || '';
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
export const requestDeleteFavOrder = (favid: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
    const url = process.env.REACT_APP_OLO_API || '';
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
export const requestSetUserDefDelAddress = (
  body: RequestUserDefaultAddress,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
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
};
//Delete User Delivery address

export const requestDelUserDelAddress = (addressid: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
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
};

//Get User Billing accounts

export const requestUserBillingAccount = () => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
};

//Get User Billing account by id (Api not Valid)

export const requestUserBillingAccountById = (billingAccountId: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
};

// Delete Billing Account

export const deleteUserBillingAccount = (billingAccountId: number) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
};

// Update Billing Account
export const updateUserBillingAccount = (
  body: RequestUserDefaultBillingAccount,
  billingAccountId: number,
) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
};

//Get User Gift Card

export const requestUseGiftCards = () => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
};

export const updateUserContactOptions = (body: ResponseContactOptions) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
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
};

//User Login
export const requestUserLogin = (body: object) => {
  const data = {
    user: body,
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
  };

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/customers/sign_in`;

    return axiosInstance
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => {
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
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
  };

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/customers.json`;

    return axiosInstance
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => {
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
    client: process.env.REACT_APP_PUNCHH_CLIENT_ID,
  };

  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users/forgot_password`;

    return axiosInstance
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};

export const requestGiftCardBalance = async (billingAccountIds: any) => {
  try {
    const url = process.env.REACT_APP_OLO_API || '';
    const authtoken = store.getState().authReducer.authToken.authtoken;
    const requests: any = [];
    billingAccountIds.forEach((id: any) => {
      requests.push(
        axios.get(
          url + `/users/${authtoken}/billingaccounts/storedvalue/${id}`,
        ),
      );
    });

    const promisesResolved = requests.map((promise: any) =>
      promise.catch((error: any) => ({ error })),
    );

    const checkFailed = (then: any) => {
      return function (responses: any) {
        const someFailed = responses.some((response: any) => response.error);

        if (someFailed) {
          throw responses;
        }

        return then(responses);
      };
    };

    const finalResponse = axios
      .all(promisesResolved)
      .then(
        checkFailed((response: any) => {
          console.log('SUCCESS', response);
          return response;
        }),
      )
      .catch((err) => {
        console.log('FAIL', err);
        return err;
      });

    return await finalResponse;
  } catch (error) {
    throw error;
  }
};

//Facebook User Login
export const requestFacebookUserLogin = (body: object) => {
  const data = body;
  try {
    const url = `${process.env.REACT_APP_PUNCHH_API}/api/auth/users/connect_with_facebook`;

    return axiosInstance
      .post(url, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error.response;
      });
  } catch (error) {
    throw error;
  }
};
