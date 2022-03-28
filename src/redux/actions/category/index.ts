import { categoryActionsTypes } from '../../types/category';
import { ResponseMenu } from '../../../types/olo-api';
import { displayToast } from '../../../helpers/toast';

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
  displayToast(
    'ERROR',
    error?.response?.data?.message
      ? error.response.data.message
      : 'ERROR! Please Try again later',
  );
  return {
    type: categoryActionsTypes.GET_CATEGORY_ITMES_FAILURE,
    error: error,
  };
}
