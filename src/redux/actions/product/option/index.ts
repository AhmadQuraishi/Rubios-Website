import { productOptionActionsTypes } from '../../../types/product/option';
import { Option } from '../../../../types/olo-api';

export function getProductOptionRequest(id: number) {
  return {
    type: productOptionActionsTypes.GET_PRODUCT_OPTION_REQUEST,
    id,
  };
}

export function getProductOptionRequestSuccess(data: Option) {
  return {
    type: productOptionActionsTypes.GET_PRODUCT_OPTION_SUCCESS,
    payload: data,
  };
}

export function getProductOptionRequestFailure(error: any) {
  return {
    type: productOptionActionsTypes.GET_PRODUCT_OPTION_FAILURE,
    error: error,
  };
}
