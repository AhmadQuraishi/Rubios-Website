import { productOptionActionsTypes } from '../../../types/product/option';
import { ResponseModifiers } from '../../../../types/olo-api';
import { displayToast } from '../../../../helpers/toast';

export function getProductOptionRequest(id: number) {
  return {
    type: productOptionActionsTypes.GET_PRODUCT_OPTION_REQUEST,
    id,
  };
}

export function getProductOptionRequestSuccess(data: ResponseModifiers) {
  return {
    type: productOptionActionsTypes.GET_PRODUCT_OPTION_SUCCESS,
    payload: data,
  };
}

export function getProductOptionRequestFailure(error: any) {
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try agin later',
  );
  return {
    type: productOptionActionsTypes.GET_PRODUCT_OPTION_FAILURE,
    error: error,
  };
}
