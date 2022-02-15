import { categoryActionsTypes } from '../../types/category';
import { ResponseMenu } from '../../../types/olo-api';

export function getCategoriesRequest(id: number) {
  return {
    type: categoryActionsTypes.GET_CATEGORY_ITMES_REQUEST,
    restaurantID: id,
  };
}

export function getCategoriesRequestSuccess(data: ResponseMenu) {
  return {
    type: categoryActionsTypes.GET_CATEGORY_ITMES_SUCCESS,
    payload: data,
  };
}

export function getCategoriesRequestFailure(error: any) {
  return {
    type: categoryActionsTypes.GET_CATEGORY_ITMES_FAILURE,
    error: error,
  };
}
