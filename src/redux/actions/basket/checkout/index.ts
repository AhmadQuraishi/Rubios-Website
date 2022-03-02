import { basketActionsTypes } from '../../../types/basket';
import {
  ResponseRestaurantCalendars, 
  RequestUpdateBasketTimeWanted, 
  ResponseBasket,
  RequestUpdateBasketTip,
  RequestApplyCoupon
 } from '../../../../types/olo-api';
import {displayToast} from '../../../../helpers/toast'
export function getSingleRestaurantCalendar(id: number, dateFrom: string, dateTo: string,) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR,
    id,
    dateFrom,
    dateTo
  };
}

export function getSingleRestaurantCalendarSuccess(data: ResponseRestaurantCalendars) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR_SUCCESS,
    payload: data
  };
}

export function getSingleRestaurantCalendarFailure(error: any) {
  return {
    type: basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR_FAILURE,
    error: error,
  };
}

export function updateBasketTimeWanted(basketId: string, data: RequestUpdateBasketTimeWanted) {
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIME_WANTED,
    basketId,
    data
  };
}

export function updateBasketTimeWantedSuccess(data: ResponseBasket) {
  displayToast('SUCCESS', 'Order Time updated.')
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIME_WANTED_SUCCESS,
    payload: data,
  };
}

export function updateBasketTimeWantedFailure(error: any) {
  displayToast('ERROR', error?.response?.data?.message  ? error.response.data.message : 'ERROR! Please Try agin later')
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIME_WANTED_FAILURE,
    error: error
  };
}

export function deleteBasketTimeWanted(basketId: string) {
  return {
    type: basketActionsTypes.DELETE_BASKET_TIME_WANTED,
    basketId
  };
}

export function deleteBasketTimeWantedSuccess(data: ResponseBasket) {
  displayToast('SUCCESS', 'Order Time updated to ASAP.')
  return {
    type: basketActionsTypes.DELETE_BASKET_TIME_WANTED_SUCCESS,
    payload: data,
  };
}

export function deleteBasketTimeWantedFailure(error: any) {
  displayToast('ERROR', error?.response?.data?.message  ? error.response.data.message : 'ERROR! Please Try agin later')

  return {
    type: basketActionsTypes.DELETE_BASKET_TIME_WANTED_FAILURE,
    error: error
  };
}

export function updateBasketTipAmount(basketId: string, data: RequestUpdateBasketTip) {
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT,
    basketId,
    data
  };
}

export function updateBasketTipAmountSuccess(data: ResponseBasket) {
  displayToast('SUCCESS', 'Order Tip updated.')
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT_SUCCESS,
    payload: data,
  };
}

export function updateBasketTipAmountFailure(error: any) {
  displayToast('ERROR', error?.response?.data?.message  ? error.response.data.message : 'ERROR! Please Try agin later')
  return {
    type: basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT_FAILURE,
    error: error
  };
}

export function updateBasketCouponCode(basketId: string, data: RequestApplyCoupon) {
  return {
    type: basketActionsTypes.UPDATE_BASKET_COUPON_CODE,
    basketId,
    data
  };
}

export function updateBasketCouponCodeSuccess(data: ResponseBasket) {
  displayToast('SUCCESS', 'Coupon applied to order.')
  return {
    type: basketActionsTypes.UPDATE_BASKET_COUPON_CODE_SUCCESS,
    payload: data,
  };
}

export function updateBasketCouponCodeFailure(error: any) {
  displayToast('ERROR', error?.response?.data?.message  ? error.response.data.message : 'ERROR! Please Try agin later')
  return {
    type: basketActionsTypes.UPDATE_BASKET_COUPON_CODE_FAILURE,
    error: error
  };
}


