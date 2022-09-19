import axios from 'axios';
import moment from 'moment';
import { facebookConversionTypes } from '../../redux/types/facebook-conversion';
import { sha256Method } from '../../helpers/common';

const eventList = {
  purchase: {
    event_name: 'Purchase',
    event_id: 12345,
  },
  addToCart: {
    event_id: 12345,
    event_name: 'TestEvent',
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
    let current_timestamp: any = moment().unix();

    let obj: any = {
      event_time: current_timestamp,
      event_source_url: window.location.href,
      action_source: 'website',
      user_data: {
        client_ip_address: '203.175.78.102',
        client_user_agent:
          'Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.5 Mobile/15E148 Safari/604.1',
      },
    };

    const userHashedData = await hashUserData(userData);

    if (Object.keys(userHashedData).length) {
      const userDataTemp: any = {
        ...obj.user_data,
        ...userHashedData,
      };
      obj.user_data = userDataTemp;
    }

    let eventDetails = null;
    if (eventType === facebookConversionTypes.FACEBOOK_PURCHASE_EVENT) {
      eventDetails = eventList.purchase;
    } else if (eventType === facebookConversionTypes.FACEBOOK_ADD_CART_EVENT) {
      eventDetails = eventList.addToCart;
    }
    console.log('eventDetails', eventDetails);
    console.log('type', eventType);
    if (eventDetails) {
      console.log('workinggggggggg');
      obj = {
        ...obj,
        ...eventDetails,
      };
    }

    if (customData) {
      obj['custom_data'] = customData;
    }

    const body = {
      data: [obj],
      test_event_code: 'TEST91250',
    };

    const url = `https://graph.facebook.com/v14.0/${process.env.REACT_APP_FACEBOOK_PIXEL_ID}/events?access_token=${process.env.REACT_APP_FACEBOOK_PIXEL_ACCESS_TOKEN}`;
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
