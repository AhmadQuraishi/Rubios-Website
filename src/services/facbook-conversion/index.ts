import axios from 'axios';
import moment from 'moment';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import { sha256Method } from '../../helpers/common';

const eventList = {
  purchase: {
    event_name: 'Purchase',
  },
  addToCart: {
    event_name: 'AddToCart',
  },
  completeRegistration: {
    event_name: 'CompleteRegistration',
  },
  findLocation: {
    event_name: 'FindLocation',
  },
  initiateCheckout: {
    event_name: 'InitiateCheckout',
  },
  viewContent: {
    event_name: 'ViewContent',
  },
};

const hashUserData = async (payload: any) => {
  const userData: any = {};
  if (payload) {
    for (const key in payload) {
      console.log('key', key);
      switch (key) {
        case 'first_name':
          userData['fn'] = await sha256Method(payload[key]);
          break;
        case 'last_name':
          userData['ln'] = await sha256Method(payload[key]);
          break;
        case 'email':
          userData['em'] = await sha256Method(payload[key]);
          break;
        case 'phone':
          userData['ph'] = await sha256Method(payload[key]);
          break;
        default:
          break;
      }
    }
  }
  // const userData: any = null;
  // if (payload && payload.first_name) {
  //   userData['fn'] = sha256(payload.first_name);
  // }
  // if (payload && payload.last_name) {
  //   userData['ln'] = sha256(payload.last_name);
  // }
  // if (payload && payload.email) {
  //   userData['em'] = sha256(payload.email);
  // }
  // if (payload && payload.phone) {
  //   userData['ph'] = sha256(payload.phone);
  // }
  console.log('mubashir working', userData);
  return userData;
};

export const requestFacebookConversion = async (
  eventType: any,
  userData: any,
  customData: any,
) => {
  try {
    let body: any = {
      event_details: {},
      custom_data: {},
      user_data: {},
    };

    if (userData) {
      body.user_data = userData;
    }

    let eventDetails: any = {};
    if (eventType === facebookConversionTypes.FACEBOOK_PURCHASE_EVENT) {
      eventDetails['event_name'] = eventList.purchase.event_name;
    } else if (eventType === facebookConversionTypes.FACEBOOK_ADD_CART_EVENT) {
      eventDetails['event_name'] = eventList.addToCart.event_name;
    } else if (
      eventType === facebookConversionTypes.FACEBOOK_VIEW_CONTENT_EVENT
    ) {
      eventDetails['event_name'] = eventList.viewContent.event_name;
    } else if (
      eventType === facebookConversionTypes.FACEBOOK_COMPLETE_REGISTER_EVENT
    ) {
      eventDetails['event_name'] = eventList.completeRegistration.event_name;
    } else if (
      eventType === facebookConversionTypes.FACEBOOK_FIND_LOCATION_EVENT
    ) {
      eventDetails['event_name'] = eventList.findLocation.event_name;
    } else if (
      eventType === facebookConversionTypes.FACEBOOK_INITIATE_CHECKOUT_EVENT
    ) {
      eventDetails['event_name'] = eventList.initiateCheckout.event_name;
    }

    body.event_details = eventDetails;

    if (customData) {
      body['custom_data'] = customData;
    }

    const url = `${process.env.REACT_APP_FACEBOOK_CONVERSION_API}`;
    return axios
      .post(url, body)
      .then((response) => {
        console.log('response', response);
        return response.data;
      })
      .catch((error) => {
        console.log('error', error);
        return error.response;
      });
  } catch (error) {
    return error;
  }
};
