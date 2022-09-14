import { facebookConversionTypes as Type } from '../../types/facebook-conversion';

export function facebookSendEvent(
  eventType: string,
  userData: any,
  customData: any,
) {
  return {
    type: Type.FACEBOOK_EVENT_REQUEST,
    eventType: eventType,
    userData: userData,
    customData: customData,
  };
}

export function facebookSendEventSuccess() {
  return {
    type: Type.FACEBOOK_EVENT_SUCCESS,
  };
}

export function facebookSendEventFailure(error: any) {
  return {
    type: Type.FACEBOOK_EVENT_FAILURE,
  };
}
