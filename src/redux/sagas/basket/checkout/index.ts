import { takeEvery, put, call } from 'redux-saga/effects';
import { basketActionsTypes } from '../../../types/basket';
import { userTypes } from '../../../types/user';

import { getRestaurantCalendar } from '../../../../services/restaurant/calendar';
import {
  setTimeWantedBasket,
  deleteTimeWantedBasket,
  setTipAmountBasket,
  applyCouponBasket,
  validateBasket,
  submitSinglePaymentBasket,
  getBasketAllowedCards,
  removeCouponBasket,
} from '../../../../services/checkout';
import {
  getSingleRestaurantCalendarSuccess,
  getSingleRestaurantCalendarFailure,
  updateBasketTimeWantedSuccess,
  updateBasketTimeWantedFailure,
  deleteBasketTimeWantedSuccess,
  deleteBasketTimeWantedFailure,
  updateBasketTipAmountSuccess,
  updateBasketTipAmountFailure,
  updateBasketCouponCodeSuccess,
  updateBasketCouponCodeFailure,
  removeBasketCouponCodeSuccess,
  removeBasketCouponCodeFailure,
  validateBasketSuccess,
  validateBasketFailure,
  submitBasketSinglePaymentSuccess,
  submitBasketSinglePaymentFailure,
  validateBasketPhoneFailure,
  setBasketDeliveryModeSuccess,
  setBasketDeliveryModeFailure,
  setBasketDeliveryAddressSuccess,
  setBasketDeliveryAddressFailure,
  getBasketAllowedCardsRequestSuccess,
  getBasketAllowedCardsRequestFailure,
} from '../../../actions/basket/checkout';

import { requestUpdateUser } from '../../../../services/user';
import { updateUserSuccess } from '../../../actions/user';
import { getProviderRequestSuccess } from '../../../actions/provider';
import {
  getBasket,
  setBasketCustomFields,
  setBasketDeliveryAddress,
  setBasketDeliveryMode,
} from '../../../../services/basket';
import { getBasketRequestSuccess } from '../../../actions/basket';
import { navigateAppAction } from '../../../actions/navigate-app';
import { updateGuestUserInfo } from '../../../actions/order';

function* asyncgetSingleRestaurantCalendarRequest(action: any): any {
  try {
    const response = yield call(
      getRestaurantCalendar,
      action.id,
      action.dateFrom,
      action.dateTo,
    );
    yield put(getSingleRestaurantCalendarSuccess(response));
  } catch (error) {
    yield put(getSingleRestaurantCalendarFailure(error));
  }
}

function* asyncUpdateBasketTimeWanted(action: any): any {
  try {
    const response = yield call(
      setTimeWantedBasket,
      action.basketId,
      action.data,
    );
    yield put(updateBasketTimeWantedSuccess(response));
    yield put({
      type: basketActionsTypes.VALIDATE_AND_GET_BASKET_REQUEST,
      action,
    });
  } catch (error) {
    yield put(updateBasketTimeWantedFailure(error));
  }
}

function* asyncDeleteBasketTimeWanted(action: any): any {
  try {
    const response = yield call(deleteTimeWantedBasket, action.basketId);
    yield put(deleteBasketTimeWantedSuccess(response));
    yield put({
      type: basketActionsTypes.VALIDATE_AND_GET_BASKET_REQUEST,
      action,
    });
  } catch (error) {
    yield put(deleteBasketTimeWantedFailure(error));
  }
}

function* asyncUpdateBasketTipAmount(action: any): any {
  try {
    const response = yield call(
      setTipAmountBasket,
      action.basketId,
      action.data,
    );
    yield put(updateBasketTipAmountSuccess(response));
    yield put({
      type: basketActionsTypes.VALIDATE_AND_GET_BASKET_REQUEST,
      action,
    });
  } catch (error) {
    yield put(updateBasketTipAmountFailure(error));
  }
}

function* asyncUpdateBasketCouponCode(action: any): any {
  try {
    const response = yield call(
      applyCouponBasket,
      action.basketId,
      action.data,
    );
    yield put(updateBasketCouponCodeSuccess(response));
    yield put({
      type: basketActionsTypes.VALIDATE_AND_GET_BASKET_REQUEST,
      action,
    });
  } catch (error) {
    yield put(updateBasketCouponCodeFailure(error));
  }
}

function* asyncRemoveBasketCouponCode(action: any): any {
  try {
    const response = yield call(removeCouponBasket, action.basketId);
    yield put(removeBasketCouponCodeSuccess(response));
    yield put({
      type: basketActionsTypes.VALIDATE_AND_GET_BASKET_REQUEST,
      action,
    });
  } catch (error) {
    yield put(removeBasketCouponCodeFailure(error));
  }
}

function* asyncSetBasketDeliveryModeRequest(action: any): any {
  try {
    const response = yield call(
      setBasketDeliveryMode,
      action.action.payload.basketId,
      action.action.payload.deliverymode,
    );
    yield put(setBasketDeliveryModeSuccess(response));
  } catch (error) {
    yield put(setBasketDeliveryModeFailure(error));
  }
}

function* asyncSetBasketDeliveryAddressRequest(action: any): any {
  try {
    const response = yield call(
      setBasketDeliveryAddress,
      action.basketid,
      action.payload,
    );
    yield put(setBasketDeliveryAddressSuccess(response));
  } catch (error) {
    yield put(setBasketDeliveryAddressFailure(error));
  }
}

function* asyncValidateBasket(action: any): any {
  try {
    if (action.basketPayload) {
      yield put({
        type: basketActionsTypes.ADD_BASKET_ORDER_SUBMIT,
      });
    }
    // if (action.userData) {
    //   const userResponse = yield call(requestUpdateUser, action.userData);
    //   yield put(updateUserSuccess(userResponse));
    //   yield put(getProviderRequestSuccess(userResponse));
    // }
    if (action.customFields.length) {
      const customFieldsResponse = yield call(
        setBasketCustomFields,
        action.basketId,
        action.customFields,
      );
    }
    // if (action.deliveryAddress) {
    //   const deliveryAddressResponse = yield call(
    //     setBasketDeliveryAddress,
    //     action.basketId,
    //     action.deliveryAddress,
    //   );
    // const deliveryAddressResponse = yield put({
    //   type: basketActionsTypes.SET_BASKET_DELIVERY_ADDRESS_REQUEST,
    //   action,
    // });
    // }
    // if (action.deliverymode && !action.deliveryAddress) {
    //   const deliveryModeResponse = yield put({
    //     type: basketActionsTypes.SET_BASKET_DELIVERY_MODE_REQUEST,
    //     action,
    //   });
    // }
    const validateResponse = yield call(validateBasket, action.basketId);
    yield put(validateBasketSuccess(validateResponse));
    const basketResponse = yield call(getBasket, action.basketId);
    yield put(getBasketRequestSuccess(basketResponse));
    if (action.basketPayload) {
      action.submitOrder(action.basketPayload);
      // yield put({
      //   type: basketActionsTypes.SUBMIT_BASKET_SINGLE_PAYMENT,
      //   action,
      // });
    }
  } catch (error: any) {
    yield put({
      type: basketActionsTypes.REMOVE_BASKET_ORDER_SUBMIT,
    });
    if (error?.config?.url && error.config.url.includes('api/auth/users')) {
      yield put(validateBasketPhoneFailure(error));
    } else {
      yield put(validateBasketFailure(error));
    }
  }
}

function* asyncSubmitBasketSinglePayment(action: any): any {
  try {
    // let response = null;
    // const response = yield call(
    //   submitSinglePaymentBasket,
    //   action.action.basketId,
    //   action.action.basketPayload,
    // );
    console.log('action.action.basketPayload', action.action.basketPayload);
    action.action.ccsfObj.submit(action.action.basketPayload);

    // action.action.ccsfObj.registerSuccess();

    // let userInfo = {};
    // console.log('orderddddddddddd', response);
    // if (action.action.basketPayload.receivinguser) {
    //   userInfo = {
    //     ...action.action.basketPayload.receivinguser,
    //     id: response.id,
    //   };
    // }
    // yield put(
    //   submitBasketSinglePaymentSuccess(response, action.action.basketId),
    // );
    // yield put(updateGuestUserInfo(userInfo));
    // yield put(navigateAppAction(`/order-confirmation/${response.id}`));
  } catch (error) {
    // yield put(submitBasketSinglePaymentFailure(error));
  }
}

function* asyncGetBasketAllowedCardsRequest(action: any): any {
  try {
    const response = yield call(getBasketAllowedCards, action.basketid);
    yield put(getBasketAllowedCardsRequestSuccess(response));
  } catch (error) {
    yield put(getBasketAllowedCardsRequestFailure(error));
  }
}

function* asyncValidateAndGetBasketRequest(action: any): any {
  try {
    const validateResponse = yield call(validateBasket, action.action.basketId);
    yield put(validateBasketSuccess(validateResponse));
    const basketResponse = yield call(getBasket, action.action.basketId);
    yield put(getBasketRequestSuccess(basketResponse));
  } catch (error) {}
}

export function* checkoutSaga() {
  yield takeEvery(
    basketActionsTypes.GET_SINGLE_RESTAURANT_CALENDAR,
    asyncgetSingleRestaurantCalendarRequest,
  );
  yield takeEvery(
    basketActionsTypes.UPDATE_BASKET_TIME_WANTED,
    asyncUpdateBasketTimeWanted,
  );
  yield takeEvery(
    basketActionsTypes.DELETE_BASKET_TIME_WANTED,
    asyncDeleteBasketTimeWanted,
  );
  yield takeEvery(
    basketActionsTypes.UPDATE_BASKET_TIP_AMOUNT,
    asyncUpdateBasketTipAmount,
  );
  yield takeEvery(
    basketActionsTypes.UPDATE_BASKET_COUPON_CODE,
    asyncUpdateBasketCouponCode,
  );
  yield takeEvery(
    basketActionsTypes.REMOVE_BASKET_COUPON_CODE,
    asyncRemoveBasketCouponCode,
  );
  yield takeEvery(basketActionsTypes.VALIDETE_BASKET, asyncValidateBasket);
  yield takeEvery(
    basketActionsTypes.SUBMIT_BASKET_SINGLE_PAYMENT,
    asyncSubmitBasketSinglePayment,
  );
  yield takeEvery(
    basketActionsTypes.SET_BASKET_DELIVERY_MODE_REQUEST,
    asyncSetBasketDeliveryModeRequest,
  );
  yield takeEvery(
    basketActionsTypes.SET_BASKET_DELIVERY_ADDRESS_REQUEST,
    asyncSetBasketDeliveryAddressRequest,
  );
  yield takeEvery(
    basketActionsTypes.GET_BASKET_ALLOWED_CARDS_REQUEST,
    asyncGetBasketAllowedCardsRequest,
  );
  yield takeEvery(
    basketActionsTypes.VALIDATE_AND_GET_BASKET_REQUEST,
    asyncValidateAndGetBasketRequest,
  );
}
